import Link from 'next/link';
import { HeroStamp } from '@/components/proof/HeroStamp';
import { PillarRow } from '@/components/proof/PillarRow';
import { ProjectPlate } from '@/components/proof/ProjectPlate';
import { SecondaryProjectCard } from '@/components/proof/SecondaryProjectCard';
import { ExperienceSection } from '@/components/proof/ExperienceSection';
import { FLAGSHIP_PROJECTS, SECONDARY_PROJECTS } from '@/content/projects';


export default function HomePage() {
  return (
    <div className="w-full">
      <HeroStamp />

      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <section className="border-b border-[var(--border-notebook)] py-16 sm:py-20">
          <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="balanced-heading font-serif text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
                Selected systems
              </h2>
              <p className="mt-3 max-w-[60ch] text-sm leading-6 text-[var(--muted)] sm:text-base">
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
            {FLAGSHIP_PROJECTS.map((project) => (
              <ProjectPlate key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <ExperienceSection />

        <PillarRow />

        <section className="border-b border-[var(--border-notebook)] py-16 sm:py-20">

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
            {SECONDARY_PROJECTS.map((project) => (
              <SecondaryProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-16 sm:grid-cols-[1fr_auto] sm:items-end sm:py-20">
          <div>
            <h2 className="balanced-heading max-w-[760px] font-serif text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
              Looking for an engineer who can move between AI workflows and the product around them?
            </h2>
            <p className="mt-4 max-w-[60ch] text-base leading-7 text-[var(--muted)]">
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
              href="/assets/mitul-bhatia-resume.docx"
              download
              className="inline-flex min-h-12 items-center border border-[var(--ink)] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              Resume DOCX
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
