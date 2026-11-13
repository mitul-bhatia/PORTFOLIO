import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { WorkRouteTransition } from '@/components/shell/WorkRouteTransition';
import { CaseStudyFocal } from '@/components/proof/CaseStudyFocal';
import { WORK_NAV_BACK, WORK_NAV_FORWARD } from '@/lib/workNavTransition';
import { MetricRow } from '@/components/lines/MetricRow';
import { LineRun } from '@/components/lines/LineRun';
import { Bullet } from '@/components/ui/Bullet';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@/components/ui/icons';
import { lineFor } from '@/content/lines';
import { PROJECTS, FLAGSHIP_PROJECTS, getProjectBySlug } from '@/content/projects';
import { absoluteUrl, pageMetadata, serializeJsonLd, SITE_URL } from '@/lib/site';

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — ${project.tag}`,
    description: project.problem,
    ...pageMetadata({
      path: `/work/${project.slug}`,
      title: `${project.title} — Mitul Bhatia | ${project.tag}`,
      description: `${project.title}: ${project.problem}`,
      image: project.image,
      imageAlt: `${project.title} interface designed by Mitul Bhatia`,
      type: 'article',
      keywords: [
        project.title,
        project.tag,
        'Mitul Bhatia',
        'mitulb95',
        'Mitul Bhatia Projects',
        'Mitul Bhatia Case Study',
        ...project.stack,
      ],
    }),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    headline: `${project.title} — ${project.tag}`,
    description: project.problem,
    url: absoluteUrl(`/work/${project.slug}`),
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    ...(project.liveUrl ? { targetProduct: { '@type': 'SoftwareApplication', url: project.liveUrl } } : {}),
    ...(project.image ? { image: absoluteUrl(project.image) } : {}),
    programmingLanguage: project.stack,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Mitul Bhatia',
      url: SITE_URL,
    },
  };

  // One other flagship: the next in order, or the first for secondary projects.
  const flagshipIndex = FLAGSHIP_PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProject = FLAGSHIP_PROJECTS[(flagshipIndex + 1) % FLAGSHIP_PROJECTS.length];

  const line = lineFor(project.slug);
  const longTitle = project.title.length > 12;

  return (
    <WorkRouteTransition>
      <article className={`line-${line.color}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectJsonLd) }}
        />

        <header className="bg-[var(--line)] text-[var(--on-line)] [--focus:var(--on-line)]">
          <div className="wrap animate-pageEnter pb-14 pt-8 sm:pb-20">
            <Link
              href="/work"
              transitionTypes={[...WORK_NAV_BACK]}
              className="inline-flex min-h-11 items-center gap-2 font-bold hover:underline"
            >
              <ArrowLeft size={16} />
              All work
            </Link>
            <span
              className="bullet bullet-lg mt-8"
              style={{ background: 'var(--on-line)', color: 'var(--line-ink)' }}
              aria-hidden="true"
            >
              {line.bullet}
            </span>
            <h1 className={`${longTitle ? 't-h1' : 't-display t-display-fit'} mt-5 max-w-[16ch] break-words`}>{project.title}</h1>
            <p className="t-h3 mt-5">{project.tag}</p>
            <p className="t-lead mt-4 max-w-[60ch]">{project.problem}</p>
            {project.liveUrl || project.githubUrl ? (
              <div className="mt-9 flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-on-line">
                    Open the live build
                    <ArrowUpRight size={16} />
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-on-line">
                    Source on GitHub
                    <ArrowUpRight size={16} />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </header>

        <div className="wrap pb-6">
          {project.isFlagship && project.metrics && project.metrics.length > 0 ? (
            <section data-tour="metrics" className="py-14 sm:py-16" aria-labelledby="outcomes-heading">
              <h2 id="outcomes-heading" className="t-h2">
                Documented outcomes
              </h2>
              <MetricRow metrics={project.metrics} className="mt-8 max-w-4xl" />
            </section>
          ) : null}

          {project.nodes && project.nodes.length > 1 ? (
            <section data-tour="pipeline" className="border-t border-rule py-14 sm:py-16" aria-labelledby="pipeline-heading">
              <h2 id="pipeline-heading" className="t-h2">
                How the system moves
              </h2>
              <div className="mt-10">
                <LineRun nodes={project.nodes} title={project.title} />
              </div>
            </section>
          ) : null}

          {project.image ? (
            <section className="border-t border-rule py-14 sm:py-16" aria-labelledby="interface-heading">
              <h2 id="interface-heading" className="t-h2">
                The interface
              </h2>
              <a
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-8 block overflow-hidden rounded-md border-2 border-ink bg-ink"
                aria-label={`Open the ${project.title} screenshot at full size`}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} interface`}
                  width={1376}
                  height={768}
                  sizes="(min-width: 1280px) 1184px, 100vw"
                  loading="eager"
                  className="h-auto w-full"
                />
                <span className="absolute inset-x-0 bottom-0 h-2 bg-[var(--line)]" />
              </a>
            </section>
          ) : null}

          <CaseStudyFocal project={project} />

          <section className="grid gap-12 border-t border-rule py-14 sm:py-16 lg:grid-cols-2">
            <div>
              <h2 className="t-h2">Stack</h2>
              <ul className="stops mt-8 sm:grid-cols-2">
                {project.stack.map((item) => (
                  <li key={item} className="t-sign text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {project.isFlagship && project.reflection ? (
              <div>
                <h2 className="t-h2">Engineering note</h2>
                <p className="t-lead mt-8 max-w-[52ch] text-muted">{project.reflection}</p>
              </div>
            ) : null}
          </section>
        </div>

        <nav aria-label="Keep going" className="wrap pb-20">
          <h2 className="t-h2 border-t-2 border-ink pt-10">Next stop</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Link
              href={`/work/${nextProject.slug}`}
              transitionTypes={[...WORK_NAV_FORWARD]}
              className={`line-${lineFor(nextProject.slug).color} group flex flex-col rounded-md border-2 border-ink bg-panel p-6 transition-colors hover:bg-[var(--elevated)]`}
            >
              <Bullet slug={nextProject.slug} />
              <span className="t-h3 mt-5 flex items-center gap-2">
                {nextProject.title}
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="mt-2 text-muted">{nextProject.tag}</span>
            </Link>
            <Link
              href="/news"
              className="group flex flex-col rounded-md border-2 border-ink bg-panel p-6 transition-colors hover:bg-[var(--elevated)]"
            >
              <span className="t-sign text-muted">Off the clock</span>
              <span className="t-h3 mt-5 flex items-center gap-2">
                What I&apos;m reading
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="mt-2 text-muted">This week&apos;s AI and DevOps headlines.</span>
            </Link>
            <Link
              href="/contact"
              className="group flex flex-col rounded-md border-2 border-ink bg-ink p-6 text-paper transition-colors hover:border-red hover:bg-red hover:text-white [&_span]:hover:text-white"
            >
              <span className="t-sign text-paper/75">Hiring?</span>
              <span className="t-h3 mt-5 flex items-center gap-2">
                Contact Mitul
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="mt-2 text-paper/80">Email is the fastest way in.</span>
            </Link>
          </div>
        </nav>
      </article>
    </WorkRouteTransition>
  );
}
