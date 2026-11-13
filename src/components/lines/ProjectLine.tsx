import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/content/projects';
import { lineFor } from '@/content/lines';
import { Bullet } from '@/components/ui/Bullet';
import { ArrowRight, ArrowUpRight } from '@/components/ui/icons';
import { LineRun } from './LineRun';
import { MetricRow } from './MetricRow';
import { Reveal } from '@/components/ui/Reveal';

/** One flagship system: the claim, the evidence, and the line it runs on. */
export function ProjectLine({ project, flip = false }: { project: Project; flip?: boolean }) {
  const line = lineFor(project.slug);

  return (
    <article className={`line-${line.color}`} aria-labelledby={`project-${project.slug}`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <Reveal kind="stagger" className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
          <h3 id={`project-${project.slug}`} className="t-h2 flex items-center gap-4">
            <Bullet slug={project.slug} size="lg" />
            {project.title}
          </h3>
          <div>
            <p className="t-sign mt-4 text-base text-[var(--line-ink)]">{project.tag}</p>
            <p className="t-body mt-3">{project.problem}</p>
          </div>

          {project.metrics ? <MetricRow metrics={project.metrics} className="mt-8" /> : null}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={`/work/${project.slug}`} className="btn btn-primary">
              Read the case study
              <ArrowRight />
            </Link>
            {project.liveUrl || project.githubUrl ? (
              <span className="flex items-center gap-6 whitespace-nowrap">
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link min-h-11">
                    Live
                    <ArrowUpRight size={16} />
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-link min-h-11">
                    Code
                    <ArrowUpRight size={16} />
                  </a>
                ) : null}
              </span>
            ) : null}
          </div>
        </Reveal>

        {project.image ? (
          <Reveal kind="wipe" className="lg:col-span-7">
          <Link
            href={`/work/${project.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            className="group relative block overflow-hidden rounded-md border-2 border-ink bg-ink"
          >
            <Image
              src={project.image}
              alt=""
              width={1376}
              height={768}
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="h-auto w-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.025]"
            />
            <span className="absolute inset-x-0 bottom-0 h-2 bg-[var(--line)]" />
          </Link>
          </Reveal>
        ) : null}
      </div>

      {project.nodes && project.nodes.length > 1 ? (
        <div className="mt-12">
          <LineRun nodes={project.nodes} title={project.title} />
        </div>
      ) : null}
    </article>
  );
}
