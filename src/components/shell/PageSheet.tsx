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
        <div className="mb-8 flex items-center justify-between border-b border-[var(--border-notebook)] pb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
          <span>{folio}</span>
          <span>MITULBHATIA.DEV</span>
        </div>
      )}
      {children}
    </div>
  );
}
