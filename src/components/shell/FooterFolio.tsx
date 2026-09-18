import Link from 'next/link';
import { PROFILE } from '@/content/profile';

export function FooterFolio() {
  return (
    <footer className="mt-auto border-t border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto grid w-full max-w-[1320px] gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-end lg:px-12">
        <div>
          <p className="font-serif text-3xl font-semibold">Mitul Bhatia</p>
          <a
            href={`mailto:${PROFILE.email}`}
            className="mt-3 inline-block break-all text-sm text-[var(--paper)]/75 hover:text-[var(--paper)] hover:underline"
          >
            {PROFILE.email}
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--paper)]/70">
          <Link href="/work" className="hover:text-[var(--paper)]">Work</Link>
          <Link href="/about" className="hover:text-[var(--paper)]">About</Link>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--paper)]">GitHub ↗</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--paper)]">LinkedIn ↗</a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
