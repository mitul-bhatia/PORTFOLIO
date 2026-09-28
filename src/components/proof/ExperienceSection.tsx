'use client';

import { PROFILE } from '@/content/profile';
import { FolioReveal } from '@/components/shell/FolioReveal';

interface ExperienceSectionProps {
  headingLevel?: 'h2' | 'h3';
  showTitle?: boolean;
}

export function ExperienceSection({ headingLevel = 'h2', showTitle = true }: ExperienceSectionProps) {
  const HeadingTag = headingLevel;

  return (
    <FolioReveal as="section" className="border-b border-[var(--border-notebook)] py-16 sm:py-20" id="experience" data-tour="experience">
      {showTitle && (
        <div className="mb-10 max-w-[var(--measure-wide)]">
          <HeadingTag className="balanced-heading font-serif text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
            Industry experience &amp; engineering roles
          </HeadingTag>
          <p className="mt-4 max-w-[var(--measure)] text-base leading-7 text-[var(--muted)]">
            Hands-on software development at high-velocity startups, from autonomous multi-agent systems to backend APIs and GPU compute cohorts.
          </p>
        </div>
      )}

      <div className="divide-y divide-[var(--border-notebook)] border-y border-[var(--ink)]">
        {PROFILE.experience.map((item, index) => (
          <FolioReveal key={`${item.organization}-${item.role}`} className="contents" delayMs={index * 80}>
            <article className="grid gap-6 py-8 md:grid-cols-[minmax(0,9.5rem)_1fr_1.6fr] md:gap-10 lg:gap-12">
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
                <div className="font-semibold text-[var(--ink)]">{item.tenure}</div>
                <div className="mt-2 leading-relaxed normal-case tracking-normal text-[var(--muted)]">{item.context}</div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-[1.65rem]">{item.role}</h3>
                <p className="mt-1 font-serif text-lg text-[var(--accent-dark)]">{item.organization}</p>
                {item.skills && item.skills.length > 0 && (
                  <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{item.skills.join(' · ')}</p>
                )}
              </div>

              <ul className="space-y-2.5 text-sm leading-6 text-[var(--ink)]">
                {item.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-3">
                    <span className="mt-[0.55rem] h-px w-3 shrink-0 bg-[var(--accent)]" aria-hidden="true" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          </FolioReveal>
        ))}
      </div>
    </FolioReveal>
  );
}
