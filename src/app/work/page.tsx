import type { Metadata } from 'next';
import { PageSheet } from '@/components/shell/PageSheet';
import { ProjectPlate } from '@/components/proof/ProjectPlate';
import { SecondaryProjectCard } from '@/components/proof/SecondaryProjectCard';
import { ExperienceSection } from '@/components/proof/ExperienceSection';
import { FLAGSHIP_PROJECTS, SECONDARY_PROJECTS } from '@/content/projects';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected agentic, backend, data, and full-stack projects by Mitul Bhatia.',
  ...pageMetadata({
    path: '/work',
    title: 'Selected engineering work — Mitul Bhatia',
    description: 'Agentic, backend, data, and full-stack case studies with architecture and documented outcomes.',
  }),
};

export default function WorkPage() {
  return (
    <PageSheet folio="Work / Selected projects">
      <section className="border-b border-[var(--border-notebook)] pb-12 pt-4 sm:pb-16">
        <h1 className="balanced-heading max-w-[930px] font-serif text-5xl font-semibold leading-[0.98] text-[var(--ink)] sm:text-6xl">
          Systems built to be used, inspected, and improved.
        </h1>
        <p className="mt-6 max-w-[70ch] text-base leading-7 text-[var(--muted)] sm:text-lg">
          The three lead projects mirror the supplied resume. Each case study keeps the problem, implementation, interface, and documented result close together.
        </p>
      </section>

      <section className="space-y-8 border-b border-[var(--border-notebook)] py-12 sm:py-16">
        {FLAGSHIP_PROJECTS.map((project) => (
          <ProjectPlate key={project.slug} project={project} headingLevel="h2" />
        ))}
      </section>

      <ExperienceSection />

      <section className="py-12 sm:py-16">
        <h2 className="font-serif text-4xl font-semibold text-[var(--ink)]">Additional work</h2>
        <div className="mt-8 grid grid-cols-1 gap-px border border-[var(--border-notebook)] bg-[var(--border-notebook)] md:grid-cols-2">
          {SECONDARY_PROJECTS.map((project) => (
            <SecondaryProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </PageSheet>
  );
}
