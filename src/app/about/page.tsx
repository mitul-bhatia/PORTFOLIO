import React from 'react';
import Link from 'next/link';
import { PageSheet } from '@/components/shell/PageSheet';
import { PortraitFrame } from '@/components/proof/PortraitFrame';
import { MethodList } from '@/components/proof/MethodList';
import { PROFILE } from '@/content/profile';

export const metadata = {
  title: 'About & Methodology',
  description: 'AI Systems Engineer specializing in agentic orchestration loops, memory consistency, and predictable scaling runtimes.',
};

export default function AboutPage() {
  return (
    <PageSheet folio="03 / ABOUT — PERSON & METHODOLOGY">
      {/* Bio Header */}
      <section className="py-8 border-b border-[#D9C9AC]">
        <div className="font-mono text-xs text-[#A8672E] tracking-widest uppercase mb-2">
          Engineering Dossier
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#2B1D14] mb-4">
          Mitul Bhatia
        </h1>
        <p className="font-mono text-sm text-[#6B5744]">
          {PROFILE.primaryTitle} · {PROFILE.subtitle}
        </p>
      </section>

      {/* Main Grid: Portrait & Bio */}
      <section className="py-12 border-b border-[#D9C9AC] grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Modular Portrait Plate */}
        <div className="lg:col-span-4">
          <PortraitFrame />
        </div>

        {/* Canonical Bio */}
        <div className="lg:col-span-8 space-y-6">
          <div className="font-mono text-xs text-[#A8672E] uppercase tracking-wider font-semibold">
            Canonical Narrative (CGPA 9.80 / 10.0)
          </div>
          <div className="text-lg sm:text-xl text-[#2B1D14] font-serif leading-relaxed space-y-4">
            {PROFILE.bio.split('\n\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="p-6 bg-[#EADFC8] border border-[#D9C9AC] shadow-notebook font-mono text-xs sm:text-sm text-[#2B1D14] leading-relaxed">
            <span className="font-bold block mb-1 text-[#6B5744] uppercase text-[11px]">
              Summary for Recruiters & AI Labs:
            </span>
            {PROFILE.resumeSummary}
          </div>

          <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#2B1D14] text-[#F3E9DA] shadow-notebook hover:bg-[#A8672E] transition-colors"
            >
              DOWNLOAD RESUME PDF ↗
            </a>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-[#EADFC8] text-[#2B1D14] border border-[#2B1D14] shadow-notebook hover:bg-[#2B1D14] hover:text-[#F3E9DA] transition-colors"
            >
              DIRECT CONTACT →
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Methodologies via MethodList */}
      <section className="py-12 border-b border-[#D9C9AC]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="font-mono text-xs text-[#A8672E] font-semibold uppercase mb-1">
              01 / Engineering Methodology
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D14]">
              How I Design Production Agents
            </h2>
          </div>
          <div className="font-mono text-xs text-[#6B5744]">
            [EXPLICIT STATE & DETERMINISTIC LOOPS]
          </div>
        </div>

        <MethodList />
      </section>

      {/* Academics, CP & Signal */}
      <section className="py-12 border-b border-[#D9C9AC]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="font-mono text-xs text-[#2B1D14] font-semibold uppercase mb-1">
              02 / Academic & Algorithmic Signal
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D14]">
              Competitive Metrics & Rigor
            </h2>
          </div>
          <div className="font-mono text-xs text-[#6B5744]">
            [AUDITABLE CREDENTIALS]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Degree & CGPA */}
          <div className="border border-[#D9C9AC] bg-[#EADFC8] p-6 shadow-notebook">
            <div className="font-mono text-[10px] text-[#A8672E] uppercase font-bold mb-1">
              Degree & CGPA
            </div>
            <div className="font-serif text-xl font-bold text-[#2B1D14] mb-1">
              {PROFILE.degree}
            </div>
            <div className="text-xs text-[#6B5744] mb-4">
              {PROFILE.school} ({PROFILE.years})
            </div>
            <div className="p-2.5 bg-[#F3E9DA] border border-[#D9C9AC] font-mono text-sm font-bold text-[#2B1D14]">
              CGPA: <span className="text-[#A8672E]">{PROFILE.cgpa}</span>
            </div>
          </div>

          {/* Competitive Programming */}
          <div className="border border-[#D9C9AC] bg-[#EADFC8] p-6 shadow-notebook">
            <div className="font-mono text-[10px] text-[#A8672E] uppercase font-bold mb-1">
              Competitive Programming
            </div>
            <div className="font-serif text-xl font-bold text-[#2B1D14] mb-1">
              Algorithmic Foundation
            </div>
            <div className="text-xs text-[#6B5744] mb-4">
              Daily practice on data structures & graph algorithms
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between p-2 bg-[#F3E9DA] border border-[#D9C9AC]">
                <span>LEETCODE:</span>
                <span className="font-bold text-[#A8672E]">{PROFILE.ratings.leetcode}</span>
              </div>
              <div className="flex justify-between p-2 bg-[#F3E9DA] border border-[#D9C9AC]">
                <span>CODEFORCES:</span>
                <span className="font-bold text-[#A8672E]">{PROFILE.ratings.codeforces}</span>
              </div>
            </div>
          </div>

          {/* AI Studio & Cluster */}
          <div className="border border-[#D9C9AC] bg-[#EADFC8] p-6 shadow-notebook">
            <div className="font-mono text-[10px] text-[#A8672E] uppercase font-bold mb-1">
              Specialized Program
            </div>
            <div className="font-serif text-xl font-bold text-[#2B1D14] mb-1">
              AI Studio Program
            </div>
            <div className="text-xs text-[#6B5744] mb-4">
              {PROFILE.aiStudio.tenure}
            </div>
            <div className="p-2.5 bg-[#F3E9DA] border border-[#D9C9AC] text-xs text-[#2B1D14]">
              {PROFILE.aiStudio.description}
            </div>
          </div>
        </div>

        {/* School Percentages Allowed on About */}
        <div className="mt-8 p-4 border border-[#D9C9AC] bg-[#F3E9DA] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#6B5744]">
          <div>
            <span className="font-semibold text-[#2B1D14]">Class XII:</span>{' '}
            {PROFILE.classXII.school} ({PROFILE.classXII.percentage})
          </div>
          <div>
            <span className="font-semibold text-[#2B1D14]">Class X:</span>{' '}
            {PROFILE.classX.school} ({PROFILE.classX.percentage})
          </div>
          <div>
            <span className="font-semibold text-[#2B1D14]">Certifications & Hackathons:</span>{' '}
            Tata Data Visualisation · Mumbai Hacks · Hacktoberfest
          </div>
        </div>
      </section>
    </PageSheet>
  );
}
