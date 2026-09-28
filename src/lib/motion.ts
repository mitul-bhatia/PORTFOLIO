'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function reducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, reducedMotionSnapshot, () => false);
}

export function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/**
 * Native pointermove-based magnetic hover hook (07B §2).
 * Applies subtle attraction to buttons within magnetic proximity threshold.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(threshold = 40) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined' || reduced) return;

    if (window.matchMedia('(pointer: coarse)').matches) {
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
  }, [threshold, reduced]);

  return {
    ref,
    style: {
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      transition: reduced ? 'none' : 'transform var(--dur-1) var(--ease-out)',
    },
  };
}
