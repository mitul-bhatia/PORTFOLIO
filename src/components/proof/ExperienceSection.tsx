import { PROFILE } from '@/content/profile';

interface ExperienceSectionProps {
  headingLevel?: 'h2' | 'h3';
  showTitle?: boolean;
}

export function ExperienceSection({ headingLevel = 'h2', showTitle = true }: ExperienceSectionProps) {
  const HeadingTag = headingLevel;

  return (
    <section className="border-b border-[var(--border-notebook)] py-16 sm:py-20" id="experience">
      {showTitle && (
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-dark)]">
              Track Record // Industry &amp; Research
            </div>
            <HeadingTag className="balanced-heading mt-2 font-serif text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
              Industry experience &amp; engineering roles
            </HeadingTag>
            <p className="mt-3 max-w-[62ch] text-sm leading-6 text-[var(--muted)] sm:text-base">
              Hands-on software development at high-velocity startups, from autonomous multi-agent systems to backend APIs and GPU compute cohorts.
            </p>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
            [3 Documented Appointments]
          </div>
        </div>
      )}

      <div className="divide-y divide-[var(--border-notebook)] border-y border-[var(--ink)]">
        {PROFILE.experience.map((item, index) => {
          const expIndex = String(index + 1).padStart(2, '0');
          return (
            <article
              key={`${item.organization}-${item.role}`}
              className="group grid gap-6 py-8 transition-colors hover:bg-[var(--paper-soft)]/50 md:grid-cols-[160px_1fr_1.5fr] md:gap-8 lg:grid-cols-[180px_1.1fr_1.8fr]"
            >
              {/* Column 1: Index, Tenure & Context */}
              <div className="flex flex-col justify-between font-mono text-[10px]">
                <div>
                  <div className="inline-block border border-[var(--border-notebook)] bg-[var(--paper-soft)] px-2 py-0.5 font-bold uppercase tracking-[0.12em] text-[var(--ink)]">
                    EXP-{expIndex}
                  </div>
                  <div className="mt-3 font-semibold uppercase tracking-[0.1em] text-[var(--ink)]">
                    {item.tenure}
                  </div>
                  <div className="mt-1 text-[var(--muted)] leading-relaxed">
                    {item.context}
                  </div>
                </div>
              </div>

              {/* Column 2: Role, Org & Tech Stack */}
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-[1.65rem]">
                  {item.role}
                </h3>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="font-serif text-lg font-medium text-[var(--accent-dark)]">
                    {item.organization}
                  </span>
                </div>

                {item.skills && item.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="border border-[var(--border-notebook)] bg-[var(--paper)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--ink-muted)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Column 3: Work Deliverables & Impact */}
              <div>
                <ul className="space-y-2.5 text-sm leading-6 text-[var(--muted)]">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--accent)]" aria-hidden="true" />
                      <span className="text-[var(--ink)]">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
