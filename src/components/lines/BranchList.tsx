import Link from 'next/link';
import type { Project } from '@/content/projects';
import { lineFor } from '@/content/lines';
import { Bullet } from '@/components/ui/Bullet';
import { ArrowRight } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';

/** Compact project rows. Each row is one link to its case study. */
export function BranchList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;
  return (
    <Reveal as="ul" kind="stagger" className="border-t-2 border-ink">
      {projects.map((project) => (
        <li key={project.slug} className={`line-${lineFor(project.slug).color} border-b border-rule`}>
          <Link
            href={`/work/${project.slug}`}
            className="group grid gap-x-8 gap-y-3 py-6 transition-colors hover:bg-panel sm:px-3 lg:grid-cols-12 lg:items-center"
          >
            <span className="flex items-center gap-4 lg:col-span-4">
              <Bullet slug={project.slug} />
              <span className="t-h3 group-hover:underline group-hover:decoration-[var(--line)] group-hover:decoration-4 group-hover:underline-offset-4">
                {project.title}
              </span>
            </span>
            <span className="text-muted text-pretty lg:col-span-5">{project.problem}</span>
            <span className="t-data flex items-center !text-xs justify-between gap-4 text-muted lg:col-span-3">
              <span>{project.stack.slice(0, 3).join(' · ')}</span>
              <ArrowRight className="flex-none text-ink transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </li>
      ))}
    </Reveal>
  );
}
