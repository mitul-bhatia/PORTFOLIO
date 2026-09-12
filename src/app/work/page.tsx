import React from 'react';
import Link from 'next/link';
import { PageSheet } from '@/components/shell/PageSheet';
import { ProjectPlate } from '@/components/proof/ProjectPlate';
import { FLAGSHIP_PROJECTS, SECONDARY_PROJECTS } from '@/content/projects';

export const metadata = {
  title: 'Work Index',
  description: 'Auditable systems, measured latency metrics, and 5-node pipeline schematics across production projects.',
};

export default function WorkPage() {
  return (
    <PageSheet folio="02 / WORK — CATALOG OF PROOF">
      <div className="py-8 border-b border-[#D9C9AC]">
        <div className="font-mono text-xs text-[#A8672E] tracking-widest uppercase mb-2">
          Systems Catalog
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#2B1D14] mb-4">
          Production Work & Architectures
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-[#6B5744] font-serif leading-relaxed">
          Every project below carries verified metrics, exact state transitions, and live deployment artifacts. No placeholders or inflated statistics.
        </p>
      </div>

      {/* Flagship Projects Section */}
      <section className="py-12 border-b border-[#D9C9AC]">
        <div className="flex items-center justify-between font-mono text-xs text-[#6B5744] mb-8">
          <span className="text-[#A8672E] font-semibold">01 / FLAGSHIP CASE STUDIES (03)</span>
          <span>5-NODE SCHEMATICS & VERIFIED METRICS</span>
        </div>

        <div className="space-y-10">
          {FLAGSHIP_PROJECTS.map((project) => (
            <ProjectPlate key={project.slug} project={project} featured={project.slug === 'aegis'} />
          ))}
        </div>
      </section>

      {/* Secondary Projects Section */}
      <section className="py-12">
        <div className="flex items-center justify-between font-mono text-xs text-[#6B5744] mb-8">
          <span className="text-[#2B1D14] font-semibold">02 / SECONDARY SYSTEMS & RESEARCH (04)</span>
          <span>COMPACT PROOF INDEX</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SECONDARY_PROJECTS.map((project) => (
            <div
              key={project.slug}
              className="border border-[#D9C9AC] bg-[#F3E9DA] p-6 flex flex-col justify-between hover:border-[#2B1D14] transition-colors shadow-notebook"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] text-[#6B5744] mb-2">
                  <span className="text-[#A8672E] font-semibold uppercase">{project.tag}</span>
                  <span>SYSTEM</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2B1D14] mb-2 hover:text-[#A8672E] transition-colors">
                  <Link href={`/work/${project.slug}`}>{project.title}</Link>
                </h3>
                <p className="text-xs sm:text-sm text-[#2B1D14] leading-relaxed mb-4">
                  {project.problem}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] px-1.5 py-0.5 bg-[#EADFC8] border border-[#D9C9AC] text-[#2B1D14]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#D9C9AC] font-mono text-xs">
                  <Link
                    href={`/work/${project.slug}`}
                    className="text-[#2B1D14] font-semibold hover:text-[#A8672E]"
                  >
                    DETAILS →
                  </Link>
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#6B5744] hover:text-[#2B1D14]"
                      >
                        GITHUB ↗
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#A8672E] hover:underline"
                      >
                        LIVE ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageSheet>
  );
}
