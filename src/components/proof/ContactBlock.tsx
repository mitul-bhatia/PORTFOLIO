'use client';

import { PROFILE } from '@/content/profile';
import { useMagnetic } from '@/lib/motion';

const PROFILES = [
  { label: 'GitHub', detail: '@mitul-bhatia', href: PROFILE.github },
  { label: 'LinkedIn', detail: 'Mitul Bhatia', href: PROFILE.linkedin },
  { label: 'X', detail: '@mitulb05', href: PROFILE.x },
  { label: 'LeetCode', detail: `Rating ${PROFILE.ratings.leetcode}`, href: PROFILE.leetcode },
  { label: 'Codeforces', detail: `Rating ${PROFILE.ratings.codeforces}`, href: PROFILE.codeforces },
];

export function ContactBlock() {
  const emailMagnetic = useMagnetic<HTMLAnchorElement>(36);
  const resumeMagnetic = useMagnetic<HTMLAnchorElement>(36);

  return (
    <div>
      <div className="grid gap-px border border-[var(--border-notebook)] bg-[var(--border-notebook)] md:grid-cols-2">
        <section className="flex min-h-[270px] flex-col justify-between bg-[var(--paper-soft)] p-6 sm:p-8">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-[var(--ink)]">Email</h2>
            <p className="mt-4 max-w-[42ch] text-sm leading-6 text-[var(--muted)]">
              The best way to reach me about internships, engineering roles, projects, or technical collaboration.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              ref={emailMagnetic.ref}
              style={emailMagnetic.style}
              href={`mailto:${PROFILE.email}`}
              className="inline-flex min-h-11 items-center border border-[var(--ink)] bg-[var(--ink)] px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--paper)] shadow-notebook transition-colors hover:border-[var(--accent-dark)] hover:bg-[var(--accent-dark)]"
            >
              Send Email ↗
            </a>
            <span className="font-mono text-[11px] text-[var(--muted)]">
              {PROFILE.email}
            </span>
          </div>
        </section>

        <section className="flex min-h-[270px] flex-col justify-between bg-[var(--paper-soft)] p-6 sm:p-8">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-[var(--ink)]">Resume</h2>
            <p className="mt-4 max-w-[42ch] text-sm leading-6 text-[var(--muted)]">
              One page covering experience at Kolably and Raindeer.social, selected projects, education, skills, and achievements.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              ref={resumeMagnetic.ref}
              style={resumeMagnetic.style}
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center border border-[var(--ink)] bg-[var(--ink)] px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--paper)] shadow-notebook transition-colors hover:border-[var(--accent-dark)] hover:bg-[var(--accent-dark)]"
            >
              Open PDF ↗
            </a>
            <a
              href="/assets/mitul-bhatia-resume.docx"
              download
              className="inline-flex min-h-11 items-center border border-[var(--ink)] bg-[var(--paper-soft)] px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.11em] text-[var(--ink)] shadow-notebook transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              Download DOCX
            </a>
          </div>
        </section>
      </div>

      <div className="mt-12">
        <h2 className="font-serif text-3xl font-semibold text-[var(--ink)]">Elsewhere</h2>
        <div className="mt-6 grid gap-px border-y border-[var(--border-notebook)] bg-[var(--border-notebook)] sm:grid-cols-2 lg:grid-cols-5">
          {PROFILES.map((profile) => (
            <a
              key={profile.label}
              href={profile.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[var(--paper)] px-4 py-5 transition-colors hover:bg-[var(--paper-soft)]"
            >
              <span className="block font-serif text-xl font-semibold text-[var(--ink)]">{profile.label}</span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--muted)] group-hover:text-[var(--accent-dark)]">
                {profile.detail} ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-2 border-t border-[var(--border-notebook)] pt-5 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted)] sm:flex-row sm:justify-between">
        <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`} className="hover:text-[var(--ink)]">
          {PROFILE.phone}
        </a>
        <span>{PROFILE.location}</span>
      </div>
    </div>
  );
}
