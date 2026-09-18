import { PageSheet } from '@/components/shell/PageSheet';
import { SkillCluster } from '@/components/proof/SkillCluster';
import { SKILL_CLUSTERS } from '@/content/skills';

export function SkillsView() {
  return (
    <PageSheet folio="Skills / Tools used in practice">
      <section className="border-b border-[var(--border-notebook)] pb-12 pt-4 sm:pb-16">
        <h1 className="balanced-heading max-w-[820px] font-serif text-5xl font-semibold leading-[0.98] text-[var(--ink)] sm:text-6xl">
          A practical stack for AI systems and full-stack products.
        </h1>
        <p className="mt-6 max-w-[68ch] text-base leading-7 text-[var(--muted)] sm:text-lg">
          This inventory follows the supplied resume: languages, frameworks, databases, and tools that appear in projects, internships, and current study.
        </p>
      </section>

      <section className="space-y-12 py-12 sm:py-16">
        {SKILL_CLUSTERS.map((cluster) => (
          <SkillCluster key={cluster.id} cluster={cluster} />
        ))}
      </section>
    </PageSheet>
  );
}
