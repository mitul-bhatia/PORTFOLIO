/**
 * Client-safe mood vocabulary. No classifier logic lives here so the pet can
 * import it without pulling the notebook brain into the client bundle.
 */
export type SiteMood =
  | 'ambient'
  | 'focused'
  | 'charting'
  | 'arriving'
  | 'guarded'
  | 'jealous'
  | 'bragger'
  | 'fan';

export const ALL_MOODS: SiteMood[] = [
  'ambient',
  'focused',
  'charting',
  'arriving',
  'guarded',
  'jealous',
  'bragger',
  'fan',
];

export function isSiteMood(value: unknown): value is SiteMood {
  return typeof value === 'string' && (ALL_MOODS as string[]).includes(value);
}

/** Visitor-facing names. The keys are stable identifiers shared with the notebook API. */
export const MOOD_META: Record<SiteMood, { label: string; blurb: string }> = {
  ambient: { label: 'Chill', blurb: 'Calm and factual.' },
  focused: { label: 'Focused', blurb: 'Metrics and pipelines first.' },
  charting: { label: 'Nerdy', blurb: 'Glasses on. School and method.' },
  arriving: { label: 'Welcoming', blurb: 'Here to get you to him.' },
  guarded: { label: 'Grumpy', blurb: 'Only what is on the record.' },
  jealous: { label: 'Jealous', blurb: 'Annoyed at how good the work is.' },
  bragger: { label: 'Show-off', blurb: 'Numbers first, no modesty.' },
  fan: { label: 'Fan', blurb: 'Openly delighted you are here.' },
};

/** The room follows the page unless the visitor pins a mood. */
export function moodForRoute(pathname: string): SiteMood {
  if (pathname.startsWith('/work')) return 'focused';
  if (pathname.startsWith('/about') || pathname.startsWith('/skills')) return 'charting';
  if (pathname.startsWith('/contact')) return 'arriving';
  return 'ambient';
}
