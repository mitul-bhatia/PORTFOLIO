'use client';

import { ViewTransition } from 'react';

type WorkRouteTransitionProps = {
  children: React.ReactNode;
};

/**
 * Directional enter/exit for /work ↔ case study navigations tagged on Link.
 * Layouts must not wrap ViewTransition — only route pages.
 */
export function WorkRouteTransition({ children }: WorkRouteTransitionProps) {
  return (
    <ViewTransition
      enter={{
        'nav-forward': 'nav-forward',
        'nav-back': 'nav-back',
        default: 'none',
      }}
      exit={{
        'nav-forward': 'nav-forward',
        'nav-back': 'nav-back',
        default: 'none',
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
