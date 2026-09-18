import type { Metadata } from 'next';
import Link from 'next/link';
import { PageSheet } from '@/components/shell/PageSheet';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The requested portfolio page could not be found.',
};

export default function NotFound() {
  return (
    <PageSheet folio="404 / Page not found">
      <section className="mx-auto flex max-w-[760px] flex-col items-start py-20 sm:py-28">
        <p className="font-bodoni text-[clamp(6rem,20vw,12rem)] font-bold leading-[0.75] tracking-[-0.03em] text-[var(--accent-dark)]">404</p>
        <h1 className="mt-8 balanced-heading font-serif text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
          This page isn&apos;t in the portfolio.
        </h1>
        <p className="mt-5 max-w-[58ch] text-base leading-7 text-[var(--muted)]">
          The link may be outdated, or the project may have moved. The work index is the fastest way back in.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/work" className="inline-flex min-h-12 items-center bg-[var(--ink)] px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.11em] text-[var(--paper)] hover:bg-[var(--accent-dark)]">
            View work
          </Link>
          <Link href="/" className="inline-flex min-h-12 items-center border border-[var(--ink)] px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.11em] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]">
            Go home
          </Link>
        </div>
      </section>
    </PageSheet>
  );
}
