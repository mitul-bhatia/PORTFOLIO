import type { SiteMood } from '@/lib/moods';

export type NotebookLane = 'record' | 'edition' | 'general';

export type PetAction =
  | { type: 'navigate'; path: string; label: string; target?: string }
  | { type: 'open_resume'; label: string }
  | { type: 'tour'; label: string };

export interface Citation {
  label: string;
  href: string;
}

/** A one-off body reaction layered over the mood face. */
export type PetReaction = 'tantrum' | 'happy' | 'sulk' | 'shy';

export interface NotebookReply {
  lane: NotebookLane;
  text: string;
  citations: Citation[];
  actions: PetAction[];
  degraded: boolean;
  mood: SiteMood;
  reaction?: PetReaction;
  /** When set, the pet walks the visitor there right after answering. */
  go?: PetAction;
}

export function isSafePath(path: unknown): path is string {
  return typeof path === 'string' && path.startsWith('/') && !path.startsWith('//');
}

export function sanitizeActions(value: unknown): PetAction[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((raw): PetAction[] => {
    if (!raw || typeof raw !== 'object') return [];
    const action = raw as Record<string, unknown>;
    const label = typeof action.label === 'string' ? action.label.slice(0, 60) : '';
    if (action.type === 'open_resume') return [{ type: 'open_resume', label: label || 'Open résumé' }];
    if (action.type === 'tour') return [{ type: 'tour', label: label || 'Give me the tour' }];
    if (action.type === 'navigate' && isSafePath(action.path)) {
      return [
        {
          type: 'navigate',
          path: action.path,
          label: label || 'Open page',
          ...(typeof action.target === 'string' ? { target: action.target } : {}),
        },
      ];
    }
    return [];
  });
}

export function sanitizeCitations(value: unknown): Citation[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((raw): Citation[] => {
    if (!raw || typeof raw !== 'object') return [];
    const { label, href } = raw as Record<string, unknown>;
    if (typeof label !== 'string' || typeof href !== 'string') return [];
    if (!/^https?:\/\//.test(href) && !isSafePath(href)) return [];
    return [{ label: label.slice(0, 80), href }];
  });
}
