'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/content/projects';
import { ProjectScreenshotModal } from './ProjectScreenshotModal';

export function ProjectPlate({
  project,
  headingLevel = 'h3',
}: {
  project: Project;
  headingLevel?: 'h2' | 'h3';
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Heading = headingLevel;

  return (
    <>
      <article className="grid overflow-hidden border border-[var(--border-notebook)] bg-[var(--paper-soft)] shadow-notebook lg:grid-cols-12">
        <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:col-span-7 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.11em] text-[var(--muted)]">
            <span>{project.tag}</span>
            <span>{project.stack.slice(0, 3).join(' · ')}</span>
          </div>

          <Heading className="mt-6 balanced-heading font-serif text-4xl font-semibold leading-none text-[var(--ink)] sm:text-5xl">
            <Link href={`/work/${project.slug}`} className="hover:text-[var(--accent-dark)]">
              {project.title}
            </Link>
          </Heading>

          <p className="mt-5 max-w-[64ch] text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7">
            {project.problem}
          </p>

          {project.metrics && (
            <dl className="mt-7 grid gap-px border-y border-[var(--border-notebook)] bg-[var(--border-notebook)] sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="bg-[var(--paper-soft)] px-3 py-4">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--muted)]">
                    {metric.label}
                  </dt>
                  <dd className="mt-1 font-serif text-xl font-semibold text-[var(--ink)] tabular-nums">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.11em]">
            <Link href={`/work/${project.slug}`} className="text-[var(--accent-dark)] hover:underline">
              Read case study
            </Link>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--ink)]">
                GitHub ↗
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--ink)]">
                Live demo ↗
              </a>
            )}
          </div>
        </div>

        {project.image && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group relative min-h-[280px] overflow-hidden border-t border-[var(--border-notebook)] bg-[#17191c] text-left lg:col-span-5 lg:min-h-full lg:border-l lg:border-t-0"
            aria-label={`Open ${project.title} interface screenshot`}
          >
            <Image
              src={project.image}
              alt={`${project.title} interface`}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.025]"
            />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[var(--ink)] px-4 py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--paper)]">
              Interface capture
              <span>View larger ↗</span>
            </span>
          </button>
        )}
      </article>

      <ProjectScreenshotModal project={project} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
