'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { isSiteMood } from '@/lib/moods';
import { signalPip } from '@/lib/pipSignal';
import type { PetReaction } from '@/lib/petTypes';

const REACTIONS: PetReaction[] = ['tantrum', 'happy', 'sulk', 'shy'];

/**
 * Lets any section brief Pip as the visitor reaches it:
 * `data-pip-mood`, `data-pip-say`, `data-pip-react`.
 * The section that crosses the middle of the viewport wins.
 */
export function PipSense() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const sections = document.querySelectorAll<HTMLElement>('[data-pip-mood], [data-pip-say], [data-pip-react]');
    if (sections.length === 0) return;

    const inView = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            // Leaving the last briefed section hands the mood back to the page.
            if (inView.delete(entry.target) && inView.size === 0) signalPip({ clearMood: true });
            continue;
          }
          inView.add(entry.target);
          const { pipMood, pipSay, pipReact } = (entry.target as HTMLElement).dataset;
          signalPip({
            mood: isSiteMood(pipMood) ? pipMood : undefined,
            say: pipSay || undefined,
            reaction: REACTIONS.includes(pipReact as PetReaction) ? (pipReact as PetReaction) : undefined,
          });
        }
      },
      { rootMargin: '-48% 0px -48% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
