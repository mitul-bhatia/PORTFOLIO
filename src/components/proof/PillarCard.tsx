import { Pillar } from '@/content/pillars';

export function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <article className="bg-[var(--paper-soft)] p-6 sm:p-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent-dark)]">
        {pillar.subtitle}
      </p>
      <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[var(--ink)]">
        {pillar.title}
      </h3>
      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{pillar.proof}</p>
      <ul className="mt-6 border-t border-[var(--border-notebook)] pt-4 text-sm text-[var(--ink)]">
        {pillar.capabilities.map((item) => (
          <li key={item} className="border-b border-[var(--border-notebook)] py-2.5 last:border-b-0">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
