'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PROFILE } from '@/content/profile';

const FOLIO_MAP: Record<string, string> = {
  '/': '01 / HOME',
  '/work': '02 / WORK',
  '/about': '03 / ABOUT',
  '/skills': '04 / SKILLS',
  '/contact': '05 / CONTACT',
};

export function FooterFolio() {
  const pathname = usePathname();
  
  // Resolve folio string
  let currentFolio = '01 / HOME';
  if (FOLIO_MAP[pathname]) {
    currentFolio = FOLIO_MAP[pathname];
  } else if (pathname.startsWith('/work/')) {
    const slug = pathname.replace('/work/', '').toUpperCase();
    currentFolio = `02 / WORK / ${slug}`;
  }

  return (
    <footer className="w-full border-t border-[var(--border-notebook)] bg-[var(--elevated)] mt-auto transition-colors duration-500">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[var(--muted)]">
        {/* Folio Identifier */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-[var(--accent)]" />
          <span className="font-semibold text-[var(--ink)] tracking-wider uppercase">
            FOLIO {currentFolio}
          </span>
        </div>

        {/* Email & Contact Action */}
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${PROFILE.email}`}
            className="hover:text-[var(--accent)] hover:underline underline-offset-4 transition-colors"
          >
            {PROFILE.email}
          </a>
          <Link
            href="/contact"
            className="text-[var(--ink)] hover:text-[var(--accent)] font-medium"
          >
            INDEX ↗
          </Link>
        </div>

        {/* Copyright / Stamp */}
        <div className="tracking-wide">
          © {new Date().getFullYear()} MITUL BHATIA · SONIPAT, IN
        </div>
      </div>
    </footer>
  );
}
