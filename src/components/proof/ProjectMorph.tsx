'use client';

import { ViewTransition } from 'react';

export function ProjectMorphTitle({
  slug,
  children,
  className,
}: {
  slug: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ViewTransition name={`project-title-${slug}`} share="morph" default="none">
      <span className={className}>{children}</span>
    </ViewTransition>
  );
}

export function ProjectMorphMedia({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <ViewTransition name={`project-media-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
