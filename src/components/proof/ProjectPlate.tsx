import React from 'react';
import Link from 'next/link';
import { Project } from '@/content/projects';
import { MetricStrip } from './MetricStrip';

export function ProjectPlate({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article
      className={`border border-[#D9C9AC] bg-[#F3E9DA] p-6 sm:p-8 flex flex-col justify-between hover:border-[#2B1D14] transition-all shadow-notebook ${
        featured ? 'border-2 border-[#2B1D14]' : ''
      }`}
    >
      <div>
        {/* Header meta */}
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#6B5744] mb-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#EADFC8] border border-[#D9C9AC] text-[#A8672E] font-semibold text-[11px]">
            {project.isFlagship ? 'FLAGSHIP' : 'INDEXED CASE'}
          </span>
          <span className="text-[11px] tracking-wider uppercase">{project.tag}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D14] mb-3 hover:text-[#A8672E] transition-colors">
          <Link href={`/work/${project.slug}`}>{project.title}</Link>
        </h3>

        {/* Problem Description */}
        <p className="text-sm text-[#2B1D14] leading-relaxed mb-6 font-sans">
          {project.problem}
        </p>

        {/* Flagship Metrics Strip */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-6">
            <MetricStrip metrics={project.metrics} compact={!featured} />
          </div>
        )}
      </div>

      <div>
        {/* Tech Stack Stamps */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((tech, idx) => (
            <span
              key={idx}
              className="font-mono text-[10px] px-2 py-0.5 bg-[#EADFC8] border border-[#D9C9AC] text-[#2B1D14]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between pt-4 border-t border-[#D9C9AC] font-mono text-xs">
          <Link
            href={`/work/${project.slug}`}
            className="text-[#2B1D14] font-semibold hover:text-[#A8672E] flex items-center gap-1"
          >
            <span>AUDIT PIPELINE</span>
            <span>→</span>
          </Link>

          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6B5744] hover:text-[#2B1D14] transition-colors"
              >
                GITHUB ↗
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A8672E] font-medium hover:underline transition-colors"
              >
                LIVE DEMO ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
