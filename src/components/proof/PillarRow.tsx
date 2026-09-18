import { PILLARS } from '@/content/pillars';
import { PillarCard } from './PillarCard';

export function PillarRow() {
  return (
    <section className="border-b border-[var(--border-notebook)] py-16 sm:py-20">
      <h2 className="balanced-heading max-w-[820px] font-serif text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
        Three areas that connect the work
      </h2>
      <div className="mt-9 grid gap-px border-y border-[var(--border-notebook)] bg-[var(--border-notebook)] md:grid-cols-3">
        {PILLARS.map((pillar) => (
          <PillarCard key={pillar.id} pillar={pillar} />
        ))}
      </div>
    </section>
  );
}
