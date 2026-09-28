'use client';

import { useMemo, useState } from 'react';
import { FLAGSHIP_PROJECTS, SECONDARY_PROJECTS, type Project } from '@/content/projects';
import { FolioReveal } from '@/components/shell/FolioReveal';
import { ProjectPlate } from '@/components/proof/ProjectPlate';
import { SecondaryProjectCard } from '@/components/proof/SecondaryProjectCard';
import { ExperienceSection } from '@/components/proof/ExperienceSection';
import { WORK_LENSES, projectMatchesLens, type WorkLensId } from '@/lib/projectLenses';

export function WorkProjectIndex() {
  const [lens, setLens] = useState<WorkLensId>('all');

  const activeLens = WORK_LENSES.find((item) => item.id === lens) ?? WORK_LENSES[0];

  const flagship = useMemo(
    () => FLAGSHIP_PROJECTS.filter((project) => projectMatchesLens(project, lens)),
    [lens],
  );
  const secondary = useMemo(
    () => SECONDARY_PROJECTS.filter((project) => projectMatchesLens(project, lens)),
    [lens],
  );

  return (
    <>
      <div data-tour="work-filters" className="mt-8 border border-[var(--border-notebook)] bg-[var(--paper-soft)] p-5 sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">Filter by stack & domain</p>
        <p className="mt-2 max-w-[var(--measure)] text-sm text-[var(--muted)]">{activeLens.description}</p>
        <div
          role="toolbar"
          aria-label="Project filters"
          className="mt-5 flex flex-wrap gap-2"
        >
          {WORK_LENSES.map((item) => {
            const pressed = lens === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => setLens(item.id)}
                className={`min-h-11 border px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                  pressed
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                    : 'border-[var(--border-notebook)] bg-[var(--paper)] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <section data-tour="lead-case-studies" className="space-y-8 border-b border-[var(--border-notebook)] py-12 sm:py-16" aria-live="polite">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">Lead case studies</h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
            {flagship.length} of {FLAGSHIP_PROJECTS.length} shown
          </span>
        </div>

        {flagship.length === 0 ? (
          <p className="border border-dashed border-[var(--border-notebook)] p-6 font-mono text-xs uppercase tracking-[0.1em] text-[var(--muted)]">
            No lead projects match this lens. Choose another filter or view all work.
          </p>
        ) : (
          flagship.map((project, index) => (
            <FolioReveal key={project.slug} delayMs={index * 90}>
              <ProjectPlate project={project} headingLevel="h2" />
            </FolioReveal>
          ))
        )}
      </section>

      <ExperienceSection />

      <section className="py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-serif text-4xl font-semibold text-[var(--ink)]">Additional work</h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
            {secondary.length} of {SECONDARY_PROJECTS.length} shown
          </span>
        </div>
        {secondary.length === 0 ? (
          <p className="mt-8 border border-dashed border-[var(--border-notebook)] p-6 font-mono text-xs uppercase tracking-[0.1em] text-[var(--muted)]">
            No additional projects in this lens.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-px border border-[var(--border-notebook)] bg-[var(--border-notebook)] md:grid-cols-2">
            {secondary.map((project: Project) => (
              <SecondaryProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
