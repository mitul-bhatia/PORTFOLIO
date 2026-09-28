import { PILLARS } from '@/content/pillars';
import { PillarCard } from './PillarCard';
import { FolioReveal } from '@/components/shell/FolioReveal';

export function PillarRow() {
  return (
    <FolioReveal as="section" className="border-b border-[var(--border-notebook)] py-16 sm:py-20">
      <h2 className="balanced-heading max-w-[var(--measure-wide)] font-serif text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
        Three areas that connect the work
      </h2>
      <div className="mt-9 grid gap-px border-y border-[var(--border-notebook)] bg-[var(--border-notebook)] md:grid-cols-3">
        {PILLARS.map((pillar, index) => (
          <FolioReveal key={pillar.id} className="contents" delayMs={index * 75}>
            <PillarCard pillar={pillar} />
          </FolioReveal>
        ))}
      </div>
    </FolioReveal>
  );
}
