import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageSheet } from '@/components/shell/PageSheet';
import { CaseHero } from '@/components/proof/CaseHero';
import { MetricStrip } from '@/components/proof/MetricStrip';
import { PipelineSchematic } from '@/components/proof/PipelineSchematic';
import { StackStamps } from '@/components/proof/StackStamps';
import { PROJECTS, FLAGSHIP_PROJECTS, getProjectBySlug } from '@/content/projects';

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Case Study`,
    description: project.problem,
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

  // Flagship pager navigation
  const flagshipIndex = FLAGSHIP_PROJECTS.findIndex((p) => p.slug === project.slug);
  const prevFlagship =
    flagshipIndex > 0 ? FLAGSHIP_PROJECTS[flagshipIndex - 1] : null;
  const nextFlagship =
    flagshipIndex >= 0 && flagshipIndex < FLAGSHIP_PROJECTS.length - 1
      ? FLAGSHIP_PROJECTS[flagshipIndex + 1]
      : null;

  return (
    <PageSheet folio={`02 / WORK / ${project.slug.toUpperCase()}`}>
      {/* 1. Case Hero: Title, Tag, Problem Statement, Direct Links */}
      <CaseHero project={project} />

      {/* 2. Verified Metrics (Flagship Only) */}
      {project.isFlagship && project.metrics && project.metrics.length > 0 && (
        <section className="py-10 border-b border-[#D9C9AC]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2">
            <div>
              <div className="font-mono text-xs text-[#A8672E] font-semibold uppercase mb-1">
                02 / Operational Benchmarks
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D14]">
                Verified Latency & Recall Metrics
              </h2>
            </div>
            <div className="font-mono text-xs text-[#6B5744]">
              [MEASURED RUNTIME EXECUTION]
            </div>
          </div>

          <MetricStrip metrics={project.metrics} />
        </section>
      )}

      {/* 3. 5-Node Pipeline Schematic (Flagship Only) */}
      {project.isFlagship && project.nodes && project.nodes.length === 5 && (
        <section className="py-10 border-b border-[#D9C9AC]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2">
            <div>
              <div className="font-mono text-xs text-[#A8672E] font-semibold uppercase mb-1">
                03 / Architectural Graph
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D14]">
                System Pipeline & State Transitions
              </h2>
            </div>
            <div className="font-mono text-xs text-[#6B5744]">
              [DETERMINISTIC 5-NODE FLOW]
            </div>
          </div>

          <PipelineSchematic nodes={project.nodes} title={project.title} />
        </section>
      )}

      {/* 4. Tech Stack Stamps */}
      <section className="py-10 border-b border-[#D9C9AC]">
        <div className="font-mono text-xs text-[#6B5744] uppercase tracking-wider mb-4">
          {project.isFlagship ? '04 / Stack & Runtimes' : '02 / Stack & Runtimes'}
        </div>
        <StackStamps stack={project.stack} />
      </section>

      {/* 5. Architectural Reflection (Flagship Only) */}
      {project.isFlagship && project.reflection && (
        <section className="py-10 border-b border-[#D9C9AC]">
          <div className="font-mono text-xs text-[#A8672E] uppercase tracking-wider mb-2 font-semibold">
            05 / Architectural Reflection & Scaling
          </div>
          <div className="p-6 bg-[#EADFC8] border border-[#2B1D14] shadow-notebook">
            <p className="text-sm sm:text-base text-[#2B1D14] leading-relaxed font-sans">
              {project.reflection}
            </p>
          </div>
        </section>
      )}

      {/* 6. Modular Pager */}
      <section className="py-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        {project.isFlagship ? (
          <>
            {prevFlagship ? (
              <Link
                href={`/work/${prevFlagship.slug}`}
                className="text-[#2B1D14] hover:text-[#A8672E] flex items-center gap-1.5 font-semibold"
              >
                <span>← PREV FLAGSHIP:</span>
                <span>{prevFlagship.title}</span>
              </Link>
            ) : (
              <span className="text-[#6B5744]/60">← FIRST FLAGSHIP</span>
            )}

            <Link
              href="/work"
              className="px-4 py-2 bg-[#EADFC8] border border-[#2B1D14] hover:bg-[#2B1D14] hover:text-[#F3E9DA] text-[#2B1D14] transition-colors shadow-notebook font-semibold"
            >
              ALL WORK INDEX ↗
            </Link>

            {nextFlagship ? (
              <Link
                href={`/work/${nextFlagship.slug}`}
                className="text-[#2B1D14] hover:text-[#A8672E] flex items-center gap-1.5 font-semibold"
              >
                <span>NEXT FLAGSHIP:</span>
                <span>{nextFlagship.title}</span>
                <span>→</span>
              </Link>
            ) : (
              <span className="text-[#6B5744]/60">LAST FLAGSHIP →</span>
            )}
          </>
        ) : (
          <div className="w-full flex items-center justify-between">
            <Link
              href="/work"
              className="px-5 py-2.5 bg-[#2B1D14] text-[#F3E9DA] hover:bg-[#A8672E] transition-colors shadow-notebook font-semibold"
            >
              ← RETURN TO WORK CATALOG
            </Link>
            <Link
              href="/work/aegis"
              className="px-5 py-2.5 bg-[#EADFC8] text-[#2B1D14] border border-[#2B1D14] hover:bg-[#2B1D14] hover:text-[#F3E9DA] transition-colors shadow-notebook font-semibold"
            >
              EXPLORE FLAGSHIP ARCHITECTURES →
            </Link>
          </div>
        )}
      </section>
    </PageSheet>
  );
}
