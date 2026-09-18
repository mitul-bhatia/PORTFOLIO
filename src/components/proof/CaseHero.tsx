'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/content/projects';
import { ProjectScreenshotModal } from './ProjectScreenshotModal';

export function CaseHero({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="border-b border-[var(--border-notebook)] pb-12 pt-4 sm:pb-16">
        <Link href="/work" className="font-mono text-[10px] font-semibold uppercase tracking-[0.11em] text-[var(--muted)] hover:text-[var(--ink)]">
          ← Back to work
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent-dark)]">{project.tag}</p>
            <h1 className="mt-3 balanced-heading font-serif text-5xl font-semibold leading-[0.92] text-[var(--ink)] sm:text-7xl">
              {project.title}
            </h1>
            <p className="mt-7 max-w-[65ch] text-base leading-7 text-[var(--muted)] sm:text-lg">{project.problem}</p>
            <div className="mt-7 flex flex-wrap gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em]">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center bg-[var(--ink)] px-4 text-[var(--paper)] hover:bg-[var(--accent-dark)]">
                  GitHub repository ↗
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center border border-[var(--ink)] px-4 text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]">
                  Live project ↗
                </a>
              )}
            </div>
          </div>

          {project.image && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="group relative aspect-[16/10] overflow-hidden border border-[var(--border-notebook)] bg-[#17191c] text-left shadow-notebook lg:col-span-5"
              aria-label={`Open ${project.title} interface screenshot`}
            >
              <Image
                src={project.image}
                alt={`${project.title} interface`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.025]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-[var(--ink)] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--paper)]">
                Open interface capture ↗
              </span>
            </button>
          )}
        </div>
      </section>

      <ProjectScreenshotModal project={project} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
