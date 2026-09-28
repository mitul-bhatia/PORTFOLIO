import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageSheet } from '@/components/shell/PageSheet';
import { ScrollProgress } from '@/components/shell/ScrollProgress';
import { WorkRouteTransition } from '@/components/shell/WorkRouteTransition';
import { CaseHero } from '@/components/proof/CaseHero';
import { CaseStudyFocal } from '@/components/proof/CaseStudyFocal';
import { WORK_NAV_BACK, WORK_NAV_FORWARD } from '@/lib/workNavTransition';
import { MetricStrip } from '@/components/proof/MetricStrip';
import { PipelineSchematic } from '@/components/proof/PipelineSchematic';
import { StackStamps } from '@/components/proof/StackStamps';
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
    title: `${project.title} — Case Study`,
    description: project.problem,
    ...pageMetadata({
      path: `/work/${project.slug}`,
      title: `${project.title} case study — Mitul Bhatia`,
      description: project.problem,
      image: project.image,
      imageAlt: `${project.title} interface`,
      type: 'article',
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
    },
  };

  // One other flagship: the next in order, or the first for secondary projects.
  const flagshipIndex = FLAGSHIP_PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProject = FLAGSHIP_PROJECTS[(flagshipIndex + 1) % FLAGSHIP_PROJECTS.length];

  return (
    <WorkRouteTransition>
    <ScrollProgress />
    <PageSheet folio={`Work / ${project.title}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectJsonLd) }}
      />
      {/* 1. Case Hero: Title, Tag, Problem Statement, Direct Links */}
      <CaseHero project={project} />

      {project.isFlagship && project.metrics && project.metrics.length > 0 && (
        <section data-tour="metrics" className="border-b border-[var(--border-notebook)] py-12 sm:py-16">
          <h2 className="mb-6 font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
            Documented outcomes
          </h2>

          <MetricStrip metrics={project.metrics} />
        </section>
      )}

      {project.isFlagship && project.nodes && project.nodes.length === 5 && (
        <section data-tour="pipeline" className="border-b border-[var(--border-notebook)] py-12 sm:py-16">
          <h2 className="mb-6 font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
            How the system moves
          </h2>

          <PipelineSchematic nodes={project.nodes} title={project.title} />
        </section>
      )}

      <CaseStudyFocal project={project} />

      <section className="border-b border-[var(--border-notebook)] py-12 sm:py-16">
        <h2 className="mb-6 font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">Stack</h2>
        <StackStamps stack={project.stack} />
      </section>

      {project.isFlagship && project.reflection && (
        <section className="border-b border-[var(--border-notebook)] py-12 sm:py-16">
          <h2 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">Engineering note</h2>
          <div className="mt-6 max-w-[var(--measure)] border-t border-[var(--ink)] pt-5">
            <p className="text-sm leading-7 text-[var(--muted)] sm:text-base">
              {project.reflection}
            </p>
          </div>
        </section>
      )}

      <nav aria-label="Keep going" className="py-12 sm:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">Next</h2>
          <Link
            href="/work"
            transitionTypes={[...WORK_NAV_BACK]}
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--ink)]"
          >
            ← All work
          </Link>
        </div>
        <div className="grid gap-px border border-[var(--border-notebook)] bg-[var(--border-notebook)] md:grid-cols-3">
          <Link
            href={`/work/${nextProject.slug}`}
            transitionTypes={[...WORK_NAV_FORWARD]}
            className="group bg-[var(--paper-soft)] p-6 transition-colors duration-[var(--dur-1)] hover:bg-[var(--elevated)]"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">Next case study</p>
            <p className="mt-3 font-serif text-2xl font-semibold text-[var(--ink)] group-hover:text-[var(--accent-ink)]">
              {nextProject.title} →
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{nextProject.tag}</p>
          </Link>
          <Link
            href="/news"
            className="group bg-[var(--paper-soft)] p-6 transition-colors duration-[var(--dur-1)] hover:bg-[var(--elevated)]"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">Off the clock</p>
            <p className="mt-3 font-serif text-2xl font-semibold text-[var(--ink)] group-hover:text-[var(--accent-ink)]">
              What he&apos;s been reading →
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">This week&apos;s AI and DevOps headlines.</p>
          </Link>
          <Link
            href="/contact"
            className="group bg-[var(--ink)] p-6 text-[var(--paper)] transition-colors duration-[var(--dur-1)] hover:bg-[var(--accent-ink)]"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--paper)]/75">Hiring?</p>
            <p className="mt-3 font-serif text-2xl font-semibold">Contact Mitul →</p>
            <p className="mt-2 text-sm leading-6 text-[var(--paper)]/75">Email is the fastest way in.</p>
          </Link>
        </div>
      </nav>
    </PageSheet>
    </WorkRouteTransition>
  );
}
