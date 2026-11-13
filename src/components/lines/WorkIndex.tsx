'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FLAGSHIP_PROJECTS, SECONDARY_PROJECTS } from '@/content/projects';
import { lineFor } from '@/content/lines';
import { WORK_LENSES, projectMatchesLens, type WorkLensId } from '@/lib/projectLenses';
import { WORK_NAV_FORWARD } from '@/lib/workNavTransition';
import { Bullet } from '@/components/ui/Bullet';
import { ArrowRight } from '@/components/ui/icons';
import { BranchList } from './BranchList';
import { MetricRow } from './MetricRow';
import { Reveal } from '@/components/ui/Reveal';

export function WorkIndex() {
  const [lens, setLens] = useState<WorkLensId>('all');
  const activeLens = WORK_LENSES.find((item) => item.id === lens) ?? WORK_LENSES[0];
  const flagship = FLAGSHIP_PROJECTS.filter((project) => projectMatchesLens(project, lens));
  const secondary = SECONDARY_PROJECTS.filter((project) => projectMatchesLens(project, lens));
  const total = flagship.length + secondary.length;

  return (
    <div className="wrap section !pt-10">
      <div data-tour="work-filters" className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <div role="toolbar" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {WORK_LENSES.map((item) => (
            <button
              key={item.id}
              type="button"
              className="seg"
              aria-pressed={lens === item.id}
              onClick={() => setLens(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="t-data text-muted" aria-live="polite">
          {total} {total === 1 ? 'project' : 'projects'} · {activeLens.description}
        </p>
      </div>

      <section data-tour="lead-case-studies" className="mt-14" aria-labelledby="lead-heading">
        <h2 id="lead-heading" className="t-h2">
          Lead case studies
        </h2>
        {flagship.length === 0 ? (
          <p className="mt-6 border-t-2 border-ink pt-6 text-muted">
            No lead case study sits under this filter. The smaller builds below do.
          </p>
        ) : (
          <ul className="mt-8 grid gap-14 border-t-2 border-ink pt-10">
            {flagship.map((project) => (
              <Reveal as="li" key={project.slug} className={`line-${lineFor(project.slug).color}`}>
                <Link
                  href={`/work/${project.slug}`}
                  transitionTypes={[...WORK_NAV_FORWARD]}
                  className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12"
                >
                  {project.image ? (
                    <span className="relative block overflow-hidden rounded-md border-2 border-ink bg-ink lg:col-span-6">
                      <Image
                        src={project.image}
                        alt=""
                        width={1376}
                        height={768}
                        sizes="(min-width: 1024px) 46vw, 100vw"
                        className="h-auto w-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.025]"
                      />
                      <span className="absolute inset-x-0 bottom-0 h-2 bg-[var(--line)]" />
                    </span>
                  ) : null}
                  <span className="block lg:col-span-6">
                    <span className="flex items-center gap-4">
                      <Bullet slug={project.slug} size="lg" />
                      <span className="t-h2 group-hover:underline group-hover:decoration-[var(--line)] group-hover:decoration-[6px] group-hover:underline-offset-8">
                        {project.title}
                      </span>
                    </span>
                    <span className="t-sign mt-4 block text-base text-[var(--line-ink)]">{project.tag}</span>
                    <span className="t-body mt-3 block">{project.problem}</span>
                    {project.metrics ? <MetricRow metrics={project.metrics} className="mt-6" /> : null}
                    <span className="mt-6 inline-flex items-center gap-2 font-bold">
                      Read the case study
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-20" aria-labelledby="more-work-heading">
        <h2 id="more-work-heading" className="t-h2">
          Experiments and applied work
        </h2>
        <div className="mt-8">
          {secondary.length === 0 ? (
            <p className="border-t-2 border-ink pt-6 text-muted">Nothing smaller sits under this filter.</p>
          ) : (
            <BranchList projects={secondary} />
          )}
        </div>
      </section>
    </div>
  );
}
