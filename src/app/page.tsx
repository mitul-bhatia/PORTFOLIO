import Link from 'next/link';
import { HeroStamp } from '@/components/proof/HeroStamp';
import { PillarRow } from '@/components/proof/PillarRow';
import { ProjectPlate } from '@/components/proof/ProjectPlate';
import { SecondaryProjectCard } from '@/components/proof/SecondaryProjectCard';
import { ExperienceSection } from '@/components/proof/ExperienceSection';
import { FolioReveal } from '@/components/shell/FolioReveal';
import { FLAGSHIP_PROJECTS, SECONDARY_PROJECTS } from '@/content/projects';
import { ReadingStrip } from '@/components/proof/ReadingStrip';
import { getNewsEdition } from '@/lib/news/edition';

export const revalidate = 21600;


export default async function HomePage() {
  const edition = await getNewsEdition().catch(() => null);
  const reading = edition?.status === 'ready' ? edition.items.slice(0, 3) : [];

  return (
    <div className="w-full">
      <HeroStamp />

      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <FolioReveal as="section" data-tour="selected-systems" className="border-b border-[var(--border-notebook)] py-16 sm:py-20">
          <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="balanced-heading font-serif text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
                Selected systems
              </h2>
              <p className="mt-3 max-w-[var(--measure)] text-sm leading-6 text-[var(--muted)] sm:text-base">
                Three projects from the resume, presented through the problem, architecture, interface, and measured outcome.
              </p>
            </div>
            <Link
              href="/work"
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-dark)] hover:underline"
            >
              Browse all projects
            </Link>
          </div>

          <div className="space-y-8">
            {FLAGSHIP_PROJECTS.map((project, index) => (
              <FolioReveal key={project.slug} delayMs={index * 90}>
                <ProjectPlate project={project} />
              </FolioReveal>
            ))}
          </div>
        </FolioReveal>

        <ExperienceSection />

        <PillarRow />

        <FolioReveal as="section" className="border-b border-[var(--border-notebook)] py-16 sm:py-20">

          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="balanced-heading font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
              More experiments and applied work
            </h2>
            <Link
              href="/work"
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-dark)] hover:underline"
            >
              Full work index
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-px border border-[var(--border-notebook)] bg-[var(--border-notebook)] md:grid-cols-2">
            {SECONDARY_PROJECTS.map((project, index) => (
              <FolioReveal key={project.slug} className="contents" delayMs={index * 70}>
                <SecondaryProjectCard project={project} />
              </FolioReveal>
            ))}
          </div>
        </FolioReveal>

        <ReadingStrip items={reading} />

        <FolioReveal
          as="section"
          className="grid gap-8 py-16 sm:grid-cols-[1fr_auto] sm:items-end sm:py-20"
        >
          <div>
            <h2 className="balanced-heading max-w-[var(--measure-wide)] font-serif text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
              Looking for an engineer who can move between AI workflows and the product around them?
            </h2>
            <p className="mt-4 max-w-[var(--measure)] text-base leading-7 text-[var(--muted)]">
              I&apos;m open to internships and engineering work across agentic systems, backend infrastructure, and full-stack products.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center bg-[var(--ink)] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--paper)] hover:bg-[var(--accent-dark)]"
            >
              Contact me
            </Link>
            <a
              href="/assets/Mitul_Bhatia_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center border border-[var(--ink)] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              Resume PDF ↗
            </a>
            <a
              href="/assets/mitul-bhatia-resume.docx"
              download
              className="inline-flex min-h-12 items-center border border-[var(--border-notebook)] bg-[var(--paper)] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
            >
              Resume DOCX ↓
            </a>
          </div>
        </FolioReveal>
      </div>
    </div>
  );
}
