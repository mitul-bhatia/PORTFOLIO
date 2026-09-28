'use client';

import React from 'react';

interface PageSheetProps {
  children: React.ReactNode;
  className?: string;
  folio?: string;
}

export function PageSheet({ children, className = '', folio }: PageSheetProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1320px] flex-1 px-5 py-10 sm:px-8 md:py-14 lg:px-12 animate-pageEnter ${className}`}
    >
      {folio && (
        <p className="mb-8 border-b border-[var(--border-notebook)] pb-3 text-sm text-[var(--muted)]">
          {folio}
        </p>
      )}
      {children}
    </div>
  );
}
