'use client';

import Link from 'next/link';
import { PROFILE } from '@/content/profile';
import { HeroSchematicPlate } from './HeroSchematicPlate';

export function HeroStamp() {
  return (
    <section className="relative mx-auto w-full max-w-[1320px] overflow-hidden px-5 pb-0 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
      <div className="grid items-center gap-10 border-b border-[var(--border-notebook)] pb-14 lg:grid-cols-12 lg:gap-12 lg:pb-20">
        <div className="lg:col-span-7">
          <div className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Folio 01 / Architecture & Systems
          </div>

          <h1 className="balanced-heading font-serif text-[clamp(4.4rem,10vw,8rem)] font-bold uppercase leading-[0.82] tracking-[-0.03em] text-[var(--ink)]">
            <span className="block">Mitul</span>
            <span className="block text-[var(--accent-dark)]">Bhatia</span>
          </h1>

          <p className="mt-7 max-w-[650px] balanced-heading font-serif text-[clamp(1.45rem,2.5vw,2.45rem)] leading-[1.12] text-[var(--ink)]">
            {PROFILE.positioning}
          </p>

          <p className="mt-5 max-w-[64ch] text-base leading-7 text-[var(--muted)]">
            {PROFILE.primaryTitle} focused on {PROFILE.subtitle.toLowerCase()}, backend APIs, and real-time product systems.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/work"
              className="inline-flex min-h-12 items-center justify-between gap-10 bg-[var(--ink)] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--paper)] transition-colors hover:bg-[var(--accent-dark)]"
            >
              View selected work
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-between gap-8 border border-[var(--ink)] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              Resume PDF
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--border-notebook)] pt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
            <li>LangGraph</li>
            <li>FastAPI</li>
            <li>React 19</li>
            <li>Redis</li>
            <li>RAG</li>
          </ul>
        </div>

        <div className="lg:col-span-5">
          <HeroSchematicPlate />
        </div>
      </div>
    </section>
  );
}
