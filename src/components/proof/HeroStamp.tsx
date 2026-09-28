'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PROFILE } from '@/content/profile';
import { usePrefersReducedMotion } from '@/lib/motion';
import { HeroSchematicPlate } from './HeroSchematicPlate';

export function HeroStamp() {
  const reduced = usePrefersReducedMotion();
  const [enterReady, setEnterReady] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const frame = requestAnimationFrame(() => setEnterReady(true));
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return (
    <section
      data-tour="hero"
      className={`relative mx-auto w-full max-w-[1320px] overflow-hidden px-5 pb-0 pt-8 sm:px-8 sm:pt-10 lg:px-12 lg:pt-8 ${enterReady ? 'hero-enter-ready' : ''}`}
    >
      <div className="grid items-center gap-8 border-b border-[var(--border-notebook)] pb-8 lg:grid-cols-12 lg:gap-10 lg:pb-8">
        <div className="lg:col-span-7">
          <h1
            className="balanced-heading font-serif font-bold leading-[0.86] tracking-[-0.03em] text-[var(--ink)] transition-transform duration-[var(--dur-3)] ease-[var(--ease-move)]"
            style={{ fontSize: `calc(clamp(4.4rem, 10vw, 7.5rem) * var(--mood-display, 1))` }}
          >
            <span className="hero-enter-line block">Mitul</span>
            <span className="hero-enter-line block text-[var(--accent-dark)]">Bhatia</span>
          </h1>

          <p className="hero-enter-copy mt-5 max-w-[var(--measure-wide)] balanced-heading font-serif text-[clamp(1.35rem,2.2vw,2.15rem)] leading-[1.12] text-[var(--ink)]">
            {PROFILE.positioning}
          </p>

          <p className="mt-5 max-w-[var(--measure)] text-base leading-7 text-[var(--muted)]">
            {PROFILE.primaryTitle} focused on {PROFILE.subtitle.toLowerCase()}, backend APIs, and real-time product systems.
          </p>

          <div className="hero-enter-actions mt-8 flex flex-wrap gap-3">
            <Link
              href="/work"
              className="inline-flex min-h-12 items-center justify-between gap-10 bg-[var(--ink)] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--paper)] transition-colors hover:bg-[var(--accent-dark)]"
            >
              View selected work
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href="/assets/Mitul_Bhatia_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-between gap-8 border border-[var(--ink)] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              Resume PDF
              <span aria-hidden="true">↗</span>
            </a>
          </div>

        </div>

        <div className="hero-enter-plate lg:col-span-5">
          <HeroSchematicPlate />
        </div>
      </div>
    </section>
  );
}
