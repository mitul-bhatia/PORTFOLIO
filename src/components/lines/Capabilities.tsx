import Link from 'next/link';
import { PILLARS } from '@/content/pillars';
import { lineFor } from '@/content/lines';
import { getProjectBySlug } from '@/content/projects';
import { Bullet } from '@/components/ui/Bullet';
import { Reveal } from '@/components/ui/Reveal';

/** Which line demonstrates which capability. */
const PROOF_LINE: Record<string, string> = {
  'agentic-systems': 'aegis',
  'retrieval-data': 'agrovers',
  'production-infra': 'flately',
};

export function Capabilities() {
  return (
    <section
      className="wrap section"
      aria-labelledby="capabilities-heading"
      data-pip-mood="bragger"
      data-pip-say="Three kinds of work, and he does all three. Show-off."
    >
      <Reveal>
        <h2 id="capabilities-heading" className="t-h2 max-w-[20ch]">
          Three kinds of work, each with a system behind it.
        </h2>
      </Reveal>

      <Reveal kind="stagger" className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-10">
        {PILLARS.map((pillar) => {
          const slug = PROOF_LINE[pillar.id];
          const project = slug ? getProjectBySlug(slug) : undefined;
          const color = slug ? lineFor(slug).color : 'yellow';
          return (
            <div key={pillar.id} className={`line-${color} border-t-[10px] border-[var(--line)] pt-6`}>
              <h3 className="t-h3">{pillar.title}</h3>
              <p className="t-sign mt-1 text-[var(--line-ink)]">{pillar.subtitle}</p>
              <p className="mt-4 text-muted text-pretty">{pillar.proof}</p>
              <ul className="stops mt-6">
                {pillar.capabilities.map((capability) => (
                  <li key={capability} className="t-sign">
                    {capability}
                  </li>
                ))}
              </ul>
              {project ? (
                <Link href={`/work/${project.slug}`} className="mt-7 inline-flex min-h-11 items-center gap-3 font-bold hover:underline">
                  <Bullet slug={project.slug} size="sm" />
                  Shown in {project.title}
                </Link>
              ) : null}
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
