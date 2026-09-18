import type { Metadata } from 'next';
import Link from 'next/link';
import { PageSheet } from '@/components/shell/PageSheet';
import { PortraitFrame } from '@/components/proof/PortraitFrame';
import { MethodList } from '@/components/proof/MethodList';
import { ExperienceSection } from '@/components/proof/ExperienceSection';
import { PROFILE } from '@/content/profile';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Mitul Bhatia\'s experience, education, engineering approach, and resume.',
  ...pageMetadata({
    path: '/about',
    title: 'About Mitul Bhatia — AI / Full-Stack Engineer',
    description: 'Experience, education, engineering approach, and resume.',
    image: '/assets/profile.jpg',
    imageAlt: 'Portrait of Mitul Bhatia',
  }),
};

export default function AboutPage() {
  return (
    <PageSheet folio="About / Experience and approach">
      <section className="grid gap-10 border-b border-[var(--border-notebook)] pb-14 pt-4 lg:grid-cols-12 lg:items-start lg:pb-20">
        <div className="lg:col-span-5">
          <PortraitFrame />
        </div>
        <div className="lg:col-span-7 lg:pt-4">
          <h1 className="balanced-heading font-serif text-5xl font-semibold leading-[0.98] text-[var(--ink)] sm:text-6xl">
            Engineer, student, and careful system builder.
          </h1>
          <div className="mt-7 max-w-[68ch] space-y-5 text-base leading-7 text-[var(--muted)] sm:text-lg">
            {PROFILE.bio.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 border-y border-[var(--border-notebook)] py-5">
            <p className="max-w-[68ch] text-sm leading-6 text-[var(--ink)]">{PROFILE.resumeSummary}</p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center bg-[var(--ink)] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--paper)] hover:bg-[var(--accent-dark)]"
            >
              Open resume PDF
            </a>
            <a
              href="/assets/mitul-bhatia-resume.docx"
              download
              className="inline-flex min-h-12 items-center border border-[var(--ink)] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              Download DOCX
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center px-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-dark)] hover:underline"
            >
              Contact me
            </Link>
          </div>
        </div>
      </section>

      <ExperienceSection />

      <section className="border-b border-[var(--border-notebook)] py-14 sm:py-20">
        <h2 className="balanced-heading font-serif text-4xl font-semibold text-[var(--ink)] sm:text-5xl">
          How I approach the work
        </h2>
        <div className="mt-9">
          <MethodList />
        </div>
      </section>

      <section className="grid gap-12 py-14 sm:py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-4xl font-semibold text-[var(--ink)]">Education</h2>
          <div className="mt-7 border-t border-[var(--ink)] pt-5">
            <p className="font-serif text-2xl font-semibold text-[var(--ink)]">{PROFILE.degree}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{PROFILE.school} · {PROFILE.years}</p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent-dark)]">
              {PROFILE.cgpa} CGPA · {PROFILE.academicStatus}
            </p>
            <p className="mt-5 text-sm leading-6 text-[var(--muted)]">{PROFILE.aiStudio.description}</p>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-4xl font-semibold text-[var(--ink)]">Other signals</h2>
          <dl className="mt-7 border-t border-[var(--ink)]">
            <div className="flex items-baseline justify-between gap-5 border-b border-[var(--border-notebook)] py-4">
              <dt className="text-sm text-[var(--muted)]">LeetCode</dt>
              <dd className="font-serif text-2xl font-semibold text-[var(--ink)]">{PROFILE.ratings.leetcode}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-5 border-b border-[var(--border-notebook)] py-4">
              <dt className="text-sm text-[var(--muted)]">Codeforces</dt>
              <dd className="font-serif text-2xl font-semibold text-[var(--ink)]">{PROFILE.ratings.codeforces}</dd>
            </div>
            {PROFILE.honors.map((honor) => (
              <div key={honor.title} className="border-b border-[var(--border-notebook)] py-4">
                <dt className="text-sm font-medium text-[var(--ink)]">{honor.title}</dt>
                {honor.detail && <dd className="mt-1 text-xs text-[var(--muted)]">{honor.detail}</dd>}
              </div>
            ))}
          </dl>
        </div>
      </section>
    </PageSheet>
  );
}
