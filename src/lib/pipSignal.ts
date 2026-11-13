import type { SiteMood } from '@/lib/moods';
import type { PetReaction } from '@/lib/petTypes';

export const PIP_SIGNAL = 'pip:signal';

export interface PipSignal {
  /** Mood Pip takes on while the visitor is in this part of the page. */
  mood?: SiteMood;
  /** The visitor left every briefed section: fall back to the page's mood. */
  clearMood?: boolean;
  /** One-off body reaction. */
  reaction?: PetReaction;
  /** A short remark in a speech bubble. Shown once per session per line. */
  say?: string;
}

/** Tell Pip something happened on the page. Safe to call from anywhere on the client. */
export function signalPip(detail: PipSignal) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<PipSignal>(PIP_SIGNAL, { detail }));
}
