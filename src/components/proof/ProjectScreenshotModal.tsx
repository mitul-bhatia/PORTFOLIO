'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/content/projects';

interface ProjectScreenshotModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectScreenshotModal({ project, isOpen, onClose }: ProjectScreenshotModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project?.image) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-8">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[var(--ink)]/88 backdrop-blur-[1px] transition-opacity duration-200"
      />

      {/* Dialog Frame */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`screenshot-title-${project.slug}`}
        className="relative z-10 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-[var(--ink)] bg-[var(--paper)] shadow-2xl transition-all duration-200 animate-fadeIn"
      >
        <header className="flex items-center justify-between gap-4 border-b border-[var(--border-notebook)] bg-[var(--paper-soft)] px-4 py-3">
          <h2 id={`screenshot-title-${project.slug}`} className="font-serif text-xl font-semibold text-[var(--ink)]">
            {project.title} interface
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="border border-[var(--ink)] px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            Close
          </button>
        </header>

        <div className="overflow-y-auto p-3 sm:p-5">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--border-notebook)] bg-[#17191c]">
            <Image
              src={project.image}
              alt={`${project.title} interface screenshot`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 border-t border-[var(--border-notebook)] pt-4 sm:flex-row sm:items-start sm:justify-between">
            <p className="max-w-[68ch] text-sm leading-6 text-[var(--muted)]">{project.problem}</p>
            <div className="flex flex-wrap gap-3 font-mono text-[9px] font-semibold uppercase tracking-[0.1em]">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-dark)] hover:underline"
                >
                  Live project ↗
                </a>
              )}
              <Link href={`/work/${project.slug}`} onClick={onClose} className="text-[var(--ink)] hover:underline">
                Case study
              </Link>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted)] hover:text-[var(--ink)]"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
