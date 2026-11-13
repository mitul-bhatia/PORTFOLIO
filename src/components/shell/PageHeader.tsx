import type { ReactNode } from 'react';

/** Shared opening block for the inner routes. */
export function PageHeader({
  title,
  lead,
  children,
  tour,
}: {
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  tour?: string;
}) {
  return (
    <header data-tour={tour} className="border-b-2 border-ink">
      <div className="wrap animate-pageEnter pb-12 pt-14 sm:pb-16 sm:pt-20">
        <h1 className="t-h1 max-w-[18ch]">{title}</h1>
        {lead ? <p className="t-lead mt-6 max-w-[58ch] text-muted">{lead}</p> : null}
        {children}
      </div>
    </header>
  );
}
