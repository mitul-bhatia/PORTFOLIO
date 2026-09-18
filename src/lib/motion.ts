'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Native pointermove-based magnetic hover hook (07B §2).
 * Applies subtle attraction to buttons within magnetic proximity threshold.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(threshold = 40) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    // Skip on touch devices or prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from element perimeter
      const nearestX = Math.max(rect.left, Math.min(e.clientX, rect.right));
      const nearestY = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
      const distToEdge = Math.hypot(e.clientX - nearestX, e.clientY - nearestY);

      if (distToEdge <= threshold) {
        // Proportional attraction toward cursor capped to avoid jarring displacements
        const factor = Math.max(0, 1 - distToEdge / threshold);
        const pullX = Math.max(-12, Math.min(12, (e.clientX - centerX) * 0.22 * factor));
        const pullY = Math.max(-8, Math.min(8, (e.clientY - centerY) * 0.22 * factor));
        setOffset({ x: pullX, y: pullY });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };

    const handlePointerLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [threshold]);

  return { ref, style: { transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`, transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)' } };
}

/**
 * Lightweight native IntersectionObserver hook for in-view trigger.
 */
export function useInView(options: IntersectionObserverInit = { threshold: 0.15, once: true } as IntersectionObserverInit & { once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setIsInView(true);
        if ((options as { once?: boolean }).once !== false) {
          observer.disconnect();
        }
      } else if ((options as { once?: boolean }).once === false) {
        setIsInView(false);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}
