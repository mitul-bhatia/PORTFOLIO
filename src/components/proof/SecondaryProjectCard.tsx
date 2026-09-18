'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/content/projects';
import { ProjectScreenshotModal } from './ProjectScreenshotModal';

export function SecondaryProjectCard({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article className="flex flex-col bg-[var(--paper-soft)]">
        {project.image && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group relative aspect-[16/8] w-full overflow-hidden bg-[#17191c] text-left"
            aria-label={`Open ${project.title} interface screenshot`}
          >
            <Image
              src={project.image}
              alt={`${project.title} interface`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.025]"
            />
          </button>
        )}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <p className="font-mono text-[9px] uppercase tracking-[0.11em] text-[var(--accent-dark)]">{project.tag}</p>
          <h3 className="mt-3 font-serif text-2xl font-semibold text-[var(--ink)]">
            <Link href={`/work/${project.slug}`} className="hover:text-[var(--accent-dark)]">{project.title}</Link>
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.problem}</p>
          <p className="mt-5 font-mono text-[9px] uppercase leading-5 tracking-[0.08em] text-[var(--muted)]">
            {project.stack.join(' · ')}
          </p>
          <div className="mt-auto flex flex-wrap gap-4 pt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.1em]">
            <Link href={`/work/${project.slug}`} className="text-[var(--accent-dark)] hover:underline">Details</Link>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--ink)]">GitHub ↗</a>
            )}
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--ink)]">Live ↗</a>}
          </div>
        </div>
      </article>

      <ProjectScreenshotModal project={project} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
