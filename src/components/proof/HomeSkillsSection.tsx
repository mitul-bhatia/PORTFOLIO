import Link from 'next/link';
import { SKILL_CLUSTERS } from '@/content/skills';

export function HomeSkillsSection() {
  return (
    <section className="border-b border-[var(--border-notebook)] py-16 sm:py-20">
      <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="balanced-heading font-serif text-4xl font-semibold text-[var(--ink)] sm:text-5xl">
            Working stack
          </h2>
          <p className="mt-3 max-w-[62ch] text-sm leading-6 text-[var(--muted)] sm:text-base">
            Tools used across shipped projects, startup work, coursework, and independent builds.
          </p>
        </div>
        <Link
          href="/skills"
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-dark)] hover:underline"
        >
          View the full stack
        </Link>
      </div>

      <div className="grid gap-px border border-[var(--border-notebook)] bg-[var(--border-notebook)] md:grid-cols-2">
        {SKILL_CLUSTERS.map((cluster) => (
          <article key={cluster.id} className="bg-[var(--paper-soft)] p-6 sm:p-8">
            <h3 className="font-serif text-2xl font-semibold text-[var(--ink)]">{cluster.name}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{cluster.description}</p>
            <p className="mt-5 font-mono text-[10px] leading-6 uppercase tracking-[0.08em] text-[var(--ink)]">
              {cluster.skills.join(' · ')}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
