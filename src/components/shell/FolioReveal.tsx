'use client';

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIsClient, usePrefersReducedMotion } from '@/lib/motion';

type FolioRevealProps<E extends ElementType = 'div'> = {
  as?: E;
  children: ReactNode;
  className?: string;
  delayMs?: number;
} & Omit<ComponentPropsWithoutRef<E>, 'as' | 'children' | 'className'>;

/**
 * Wipe reveal on first appearance.
 *
 * The observed boxes are never clipped: Chrome's IntersectionObserver honours the
 * target's own clip-path, so a fully clipped start state never reports as visible.
 * `display: contents` wrappers have no box, so their children are observed instead.
 */
export function FolioReveal<E extends ElementType = 'div'>({
  as,
  children,
  className = '',
  delayMs = 0,
  style,
  ...rest
}: FolioRevealProps<E>) {
  const Component = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const client = useIsClient();
  const reduced = usePrefersReducedMotion();
  const motionEnabled = client && !reduced;

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionEnabled || isInView) return;

    const targets =
      getComputedStyle(el).display === 'contents' ? Array.from(el.children) : [el];
    if (targets.length === 0 || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Anything intersecting, or already scrolled past (anchor jumps), reveals.
        if (entries.some((entry) => entry.isIntersecting || entry.boundingClientRect.bottom < 0)) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -6% 0px' },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [motionEnabled, isInView]);

  const revealClass = motionEnabled ? `folio-reveal ${isInView ? 'is-visible' : ''}` : '';

  return (
    <Component
      ref={ref}
      className={`${revealClass} ${className}`.trim()}
      style={{
        ...(style as object),
        ...(motionEnabled ? { transitionDelay: `${delayMs}ms` } : {}),
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
