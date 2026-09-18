'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId: number;
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

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-[var(--accent)] pointer-events-none transition-transform duration-75 ease-out"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}
