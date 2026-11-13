'use client';

import { type ElementType, type ReactNode, useEffect, useRef } from 'react';

type RevealKind = 'rise' | 'wipe' | 'stagger';

/**
 * Marks its box `data-in` the first time it enters the viewport; CSS does the rest.
 * Hidden states only apply under `html.js`, so content is never lost without script.
 */
export function Reveal({
  as,
  kind = 'rise',
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  kind?: RevealKind;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.in = '';
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          el.dataset.in = '';
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal={kind} className={className} {...rest}>
      {children}
    </Tag>
  );
}
