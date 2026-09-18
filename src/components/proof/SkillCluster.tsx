import { SkillCluster as SkillClusterType } from '@/content/skills';

export function SkillCluster({ cluster }: { cluster: SkillClusterType }) {
  return (
    <article className="grid gap-7 border-t border-[var(--ink)] pt-5 md:grid-cols-12">
      <div className="md:col-span-4">
        <h2 className="balanced-heading font-serif text-3xl font-semibold text-[var(--ink)]">
          {cluster.name}
        </h2>
        <p className="mt-3 max-w-[36ch] text-sm leading-6 text-[var(--muted)]">{cluster.description}</p>
      </div>
      <ul className="grid gap-px border border-[var(--border-notebook)] bg-[var(--border-notebook)] sm:grid-cols-2 md:col-span-8">
        {cluster.skills.map((skill) => (
          <li key={skill} className="flex min-h-14 items-center bg-[var(--paper-soft)] px-4 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--ink)]">
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}
