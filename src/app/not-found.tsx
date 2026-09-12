import React from 'react';
import Link from 'next/link';
import { PageSheet } from '@/components/shell/PageSheet';

export const metadata = {
  title: 'Page Not Found',
  description: 'The requested system page or route does not exist in the portfolio corpus.',
};

export default function NotFound() {
  return (
    <PageSheet folio="00 / ERROR — RECORD MISSING">
      <div className="py-16 sm:py-24 text-center max-w-xl mx-auto flex flex-col items-center">
        {/* Monospace Error Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EADFC8] border border-[#D9C9AC] font-mono text-xs text-[#A8672E] uppercase mb-6 shadow-notebook">
          <span className="w-2 h-2 bg-[#A8672E]" />
          <span>HTTP 404 · AUDIT FAULT</span>
        </div>

        {/* 404 Heading */}
        <h1 className="font-serif text-6xl sm:text-8xl font-bold text-[#2B1D14] tracking-tight mb-4">
          404
        </h1>

        <div className="font-mono text-xs text-[#6B5744] uppercase tracking-widest mb-6">
          RECORD ABSENT FROM NOTEBOOK CORPUS
        </div>

        <p className="font-serif text-lg sm:text-xl text-[#6B5744] leading-relaxed mb-8">
          The route you requested could not be located in this state machine. Verify the path or navigate to a verified index below.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
          <Link
            href="/"
            className="px-5 py-2.5 bg-[#2B1D14] text-[#F3E9DA] hover:bg-[#A8672E] transition-colors font-semibold shadow-notebook"
          >
            ← RETURN TO HOMEPAGE
          </Link>
          <Link
            href="/work"
            className="px-5 py-2.5 bg-[#EADFC8] text-[#2B1D14] border border-[#2B1D14] hover:bg-[#2B1D14] hover:text-[#F3E9DA] transition-colors font-semibold shadow-notebook"
          >
            VIEW WORK INDEX (07) →
          </Link>
        </div>

        {/* Technical audit footer */}
        <div className="mt-16 pt-6 border-t border-[#D9C9AC] w-full flex justify-between items-center text-[10px] font-mono text-[#6B5744]">
          <span>ERROR CODE: ERR_ROUTE_NOT_FOUND</span>
          <span className="text-[#2B1D14] font-semibold">STATE: GROUNDED & SAFE</span>
        </div>
      </div>
    </PageSheet>
  );
}
