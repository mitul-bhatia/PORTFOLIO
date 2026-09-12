import React from 'react';
import Link from 'next/link';
import { PageSheet } from '@/components/shell/PageSheet';
import { HeroStamp } from '@/components/proof/HeroStamp';
import { PillarRow } from '@/components/proof/PillarRow';
import { ProjectPlate } from '@/components/proof/ProjectPlate';
import { PROJECTS } from '@/content/projects';

export default function HomePage() {
  const aegisProject = PROJECTS.find((p) => p.slug === 'aegis') || PROJECTS[0];

  return (
    <PageSheet folio="01 / MITUL — ORIENTATION">
      {/* Screen 1: Orientation */}
      <HeroStamp />

      {/* Screen 2: Proof & Architecture */}
      <PillarRow />

      {/* Featured Flagship Case: AEGIS */}
      <section className="py-16 border-b border-[#D9C9AC]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="font-mono text-xs text-[#A8672E] tracking-widest uppercase mb-1">
              Start Here / Flagship 01
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D14]">
              AEGIS — Multi-Agent AI Security
            </h2>
          </div>
          <div className="font-mono text-xs text-[#6B5744]">
            [REAL-TIME AST & LATENCY &lt;24ms]
          </div>
        </div>

        <ProjectPlate project={aegisProject} featured />

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <span className="text-[#6B5744]">
            EXPLORE THE COMPLETE ARCHITECTURAL RECORD:
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/work"
              className="px-5 py-2.5 bg-[#2B1D14] text-[#F3E9DA] hover:bg-[#A8672E] transition-colors shadow-notebook font-semibold"
            >
              VIEW ALL 7 PROJECTS (WORK INDEX) →
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-[#EADFC8] text-[#2B1D14] border border-[#2B1D14] hover:bg-[#2B1D14] hover:text-[#F3E9DA] transition-colors shadow-notebook font-semibold"
            >
              GET IN TOUCH →
            </Link>
          </div>
        </div>
      </section>
    </PageSheet>
  );
}
