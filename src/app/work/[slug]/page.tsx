import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageSheet } from '@/components/shell/PageSheet';
import { CaseHero } from '@/components/proof/CaseHero';
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

  // Flagship pager navigation
  const flagshipIndex = FLAGSHIP_PROJECTS.findIndex((p) => p.slug === project.slug);
  const prevFlagship =
    flagshipIndex > 0 ? FLAGSHIP_PROJECTS[flagshipIndex - 1] : null;
  const nextFlagship =
    flagshipIndex >= 0 && flagshipIndex < FLAGSHIP_PROJECTS.length - 1
      ? FLAGSHIP_PROJECTS[flagshipIndex + 1]
      : null;

  return (
    <PageSheet folio={`Work / ${project.title}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectJsonLd) }}
      />
      {/* 1. Case Hero: Title, Tag, Problem Statement, Direct Links */}
      <CaseHero project={project} />

      {project.isFlagship && project.metrics && project.metrics.length > 0 && (
        <section className="border-b border-[var(--border-notebook)] py-12 sm:py-16">
          <h2 className="mb-6 font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
            Documented outcomes
          </h2>

          <MetricStrip metrics={project.metrics} />
        </section>
      )}

      {project.isFlagship && project.nodes && project.nodes.length === 5 && (
        <section className="border-b border-[var(--border-notebook)] py-12 sm:py-16">
          <h2 className="mb-6 font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
            How the system moves
          </h2>

          <PipelineSchematic nodes={project.nodes} title={project.title} />
        </section>
      )}

      <section className="border-b border-[var(--border-notebook)] py-12 sm:py-16">
        <h2 className="mb-6 font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">Stack</h2>
        <StackStamps stack={project.stack} />
      </section>

      {project.isFlagship && project.reflection && (
        <section className="border-b border-[var(--border-notebook)] py-12 sm:py-16">
          <h2 className="font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">Engineering note</h2>
          <div className="mt-6 max-w-[72ch] border-t border-[var(--ink)] pt-5">
            <p className="text-sm leading-7 text-[var(--muted)] sm:text-base">
              {project.reflection}
            </p>
          </div>
        </section>
      )}

      <section className="flex flex-col items-center justify-between gap-4 py-10 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] sm:flex-row">
        {project.isFlagship ? (
          <>
            {prevFlagship ? (
              <Link
                href={`/work/${prevFlagship.slug}`}
                className="text-[var(--ink)] hover:text-[var(--accent)] flex items-center gap-1.5 font-semibold"
              >
                <span>← Previous:</span>
                <span>{prevFlagship.title}</span>
              </Link>
            ) : (
              <span className="text-[var(--muted)]/60">First project</span>
            )}

            <Link
              href="/work"
              className="border border-[var(--ink)] px-4 py-2 text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              All work
            </Link>

            {nextFlagship ? (
              <Link
                href={`/work/${nextFlagship.slug}`}
                className="text-[var(--ink)] hover:text-[var(--accent)] flex items-center gap-1.5 font-semibold"
              >
                <span>Next:</span>
                <span>{nextFlagship.title}</span>
                <span>→</span>
              </Link>
            ) : (
              <span className="text-[var(--muted)]/60">Last project</span>
            )}
          </>
        ) : (
          <div className="w-full flex items-center justify-between">
            <Link
              href="/work"
              className="bg-[var(--ink)] px-5 py-2.5 text-[var(--paper)] transition-colors hover:bg-[var(--accent-dark)]"
            >
              ← Return to work
            </Link>
            <Link
              href="/work/aegis"
              className="border border-[var(--ink)] px-5 py-2.5 text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              Start with AEGIS →
            </Link>
          </div>
        )}
      </section>
    </PageSheet>
  );
}
