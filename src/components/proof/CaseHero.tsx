import React from 'react';
import Link from 'next/link';
import { Project } from '@/content/projects';

export function CaseHero({ project }: { project: Project }) {
  return (
    <section className="py-8 border-b border-[#D9C9AC]">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs mb-4">
        <Link
          href="/work"
          className="text-[#6B5744] hover:text-[#2B1D14] transition-colors flex items-center gap-1.5 font-medium"
        >
          <span>←</span>
          <span>RETURN TO WORK INDEX</span>
        </Link>
        <span className="px-2 py-0.5 bg-[#EADFC8] border border-[#D9C9AC] text-[#A8672E] font-semibold text-[11px] tracking-wider">
          {project.isFlagship ? 'FLAGSHIP ARCHITECTURE' : 'SYSTEM STUDY'}
        </span>
      </div>

      {/* Category Tag */}
      <div className="font-mono text-xs text-[#A8672E] tracking-widest uppercase mb-2">
        {project.tag}
      </div>

      {/* Title */}
      <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#2B1D14] mb-6">
        {project.title}
      </h1>

      {/* Problem Definition Callout */}
      <div className="p-6 bg-[#EADFC8] border border-[#D9C9AC] shadow-notebook text-base sm:text-lg text-[#2B1D14] font-serif leading-relaxed mb-6">
        <span className="font-mono text-[10px] uppercase font-bold text-[#6B5744] block mb-1">
          Problem Definition:
        </span>
        {project.problem}
      </div>

      {/* Action Links */}
      <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#2B1D14] text-[#F3E9DA] border border-[#2B1D14] shadow-notebook hover:bg-[#A8672E] hover:border-[#A8672E] transition-colors font-semibold"
          >
            SOURCE REPOSITORY ↗
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#EADFC8] text-[#2B1D14] border border-[#2B1D14] shadow-notebook hover:bg-[#2B1D14] hover:text-[#F3E9DA] transition-colors font-semibold"
          >
            PRODUCTION DEPLOYMENT ↗
          </a>
        )}
      </div>
    </section>
  );
}
