'use client';

import { useEffect, useRef } from 'react';

const DURATION_MS = 1100;

/**
 * Counts a figure such as "<24ms" or "99.8%" up from zero when it scrolls into view.
 * The server renders the final value; the count is written straight to the node.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !match || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    const decimals = digits.includes('.') ? digits.split('.')[1].length : 0;
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION_MS);
          const eased = 1 - Math.pow(1 - progress, 4);
          el.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;
          if (progress < 1) frame = requestAnimationFrame(tick);
          else el.textContent = value;
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
