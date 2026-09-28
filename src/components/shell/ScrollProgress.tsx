'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/motion';

export function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-[var(--accent)]"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}
