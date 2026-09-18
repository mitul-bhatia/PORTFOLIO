'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROFILE } from '@/content/profile';

const PIPELINE_STAGES = [
  {
    id: 'planner',
    step: '01',
    name: 'DAG Planner',
    role: 'Decomposition',
    tech: 'LangGraph / Symbolic',
    latency: '3.4ms',
    detail: 'Decomposes complex queries into deterministic dependency graphs.',
  },
  {
    id: 'retrieval',
    step: '02',
    name: 'Vector RAG',
    role: 'Dense Retrieval',
    tech: 'BM25 + Qdrant / Redis',
    latency: '8.2ms',
    detail: 'Hybrid lexical and semantic retrieval with sub-millisecond Redis caching.',
  },
  {
    id: 'arbiter',
    step: '03',
    name: 'BFT Arbiter',
    role: 'Consensus Kernel',
    tech: 'State Machine Engine',
    latency: '<24ms p99',
    detail: 'Multi-agent vote tallying and conflict resolution before user delivery.',
  },
];

const SIGNALS = [
  { label: 'Current', role: 'Software Developer Intern', org: 'Kolably' },
  { label: 'Earlier', role: 'AI Agents Lead', org: 'Raindeer.social (10-Agent System)' },
  { label: 'Cohort', role: 'AI Studio Fellow', org: 'Newton School of Technology' },
];

export function HeroSchematicPlate() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <aside className="relative border border-[var(--ink)] bg-[var(--paper-soft)] p-4 shadow-notebook sm:p-5">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-notebook)] pb-3 font-mono text-[9px] uppercase tracking-[0.14em]">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 bg-[var(--accent)] animate-ping" />
          <span className="font-semibold text-[var(--ink)]">SPEC NO. 2026-MB-AI</span>
          <span className="text-[var(--muted)]">// SYS.REG 84-MB</span>
        </div>
        <div className="border border-[var(--ink)] bg-[var(--ink)] px-2 py-0.5 text-[var(--paper)]">
          AUTONOMOUS RUNTIME: ACTIVE
        </div>
      </div>

      {/* Main Architectural Schema Title */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-dark)] font-medium">
            FIGURE 1.0 // TOPOLOGICAL SYSTEM SCHEMATIC
          </span>
          <span className="font-mono text-[9px] text-[var(--muted)]">LATENCY: &lt;24ms p99</span>
        </div>
        <h2 className="mt-1 font-serif text-xl font-semibold tracking-tight text-[var(--ink)] sm:text-2xl">
          Distributed Multi-Agent Consensus Architecture
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
          Interactive topology based on Mitul&apos;s flagship AEGIS kernel. Click nodes to inspect runtime telemetry.
        </p>
      </div>

      {/* Interactive Pipeline Schematic Card */}
      <div className="mt-4 border border-[var(--border-notebook)] bg-[var(--paper)] p-3.5">
        {/* Visual Pipeline Nodes */}
        <div className="grid grid-cols-3 gap-2">
          {PIPELINE_STAGES.map((stage, index) => {
            const isSelected = activeStage === index;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(index)}
                className={`relative flex flex-col p-2.5 text-left transition-all ${
                  isSelected
                    ? 'border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] shadow-sm'
                    : 'border border-[var(--border-notebook)] bg-[var(--paper-soft)] text-[var(--ink)] hover:border-[var(--ink)]'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.1em] opacity-75">
                  <span>{stage.step}</span>
                  <span>{stage.latency}</span>
                </div>
                <div className="mt-1 font-mono text-[11px] font-semibold tracking-tight truncate">
                  {stage.name}
                </div>
                <div className="mt-0.5 text-[9px] opacity-80 truncate">
                  {stage.role}
                </div>
                {isSelected && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-[var(--ink)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Animated Connecting Data Bus Line (SVG) */}
        <div className="my-2.5 flex items-center px-2" aria-hidden="true">
          <svg className="h-2 w-full overflow-visible" viewBox="0 0 300 8" fill="none">
            <line x1="0" y1="4" x2="300" y2="4" stroke="var(--border-notebook)" strokeWidth="1" />
            <line
              x1="0"
              y1="4"
              x2="300"
              y2="4"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="animate-path-flow-fast"
            />
          </svg>
        </div>

        {/* Selected Stage Live Inspector */}
        <div className="border border-[var(--border-notebook)] bg-[var(--paper-soft)] px-3 py-2 font-mono text-[10px]">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.1em] text-[var(--accent-dark)] font-semibold">
            <span>[STAGE {PIPELINE_STAGES[activeStage].step} TELEMETRY]</span>
            <span>STACK: {PIPELINE_STAGES[activeStage].tech}</span>
          </div>
          <p className="mt-1 text-[11px] leading-snug text-[var(--ink)]">
            {PIPELINE_STAGES[activeStage].detail}
          </p>
        </div>
      </div>

      {/* 4-Cell Engineering Scorecard */}
      <div className="mt-4 grid grid-cols-2 gap-px border border-[var(--ink)] bg-[var(--ink)] sm:grid-cols-4">
        <div className="bg-[var(--paper)] p-2.5 text-center">
          <div className="font-serif text-lg font-bold text-[var(--ink)] sm:text-xl">10-Agent</div>
          <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--muted)]">
            Orchestration
          </div>
        </div>
        <div className="bg-[var(--paper)] p-2.5 text-center">
          <div className="font-serif text-lg font-bold text-[var(--accent-dark)] sm:text-xl">&lt;24ms</div>
          <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--muted)]">
            p99 Latency
          </div>
        </div>
        <div className="bg-[var(--paper)] p-2.5 text-center">
          <div className="font-serif text-lg font-bold text-[var(--ink)] sm:text-xl">99.8%</div>
          <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--muted)]">
            Recall Rate
          </div>
        </div>
        <div className="bg-[var(--paper)] p-2.5 text-center">
          <div className="font-serif text-lg font-bold text-[var(--ink)] sm:text-xl">9.65</div>
          <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--muted)]">
            CGPA (Sem 1–5)
          </div>
        </div>
      </div>

      {/* Deployment & Experience Records Table */}
      <div className="mt-4 border-t border-[var(--border-notebook)] pt-3">
        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--muted)]">
          VERIFIED INDUSTRY RECORD:
        </div>
        <dl className="mt-2 divide-y divide-[var(--border-notebook)]">
          {SIGNALS.map((item) => (
            <div key={item.label} className="grid grid-cols-[68px_1fr] gap-2 py-2">
              <dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--accent-dark)] font-semibold">
                {item.label}
              </dt>
              <dd className="text-xs font-medium text-[var(--ink)]">
                {item.role} <span className="text-[var(--muted)]">· {item.org}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Action Links */}
      <div className="mt-4 flex flex-wrap gap-2 pt-1">
        <Link
          href="/work/aegis"
          className="flex-1 border border-[var(--ink)] bg-[var(--ink)] px-3 py-2 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--paper)] transition-colors hover:bg-[var(--accent-dark)]"
        >
          Inspect AEGIS Kernel →
        </Link>
        <Link
          href="/about"
          className="flex-1 border border-[var(--ink)] bg-[var(--paper)] px-3 py-2 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
        >
          Read Candidate Dossier →
        </Link>
      </div>

      {/* Mechanical Broadheet Registration Footer */}
      <div className="mt-3.5 flex items-center justify-between border-t border-[var(--border-notebook)] pt-2 font-mono text-[8.5px] uppercase tracking-[0.12em] text-[var(--muted)]">
        <span>ARCHIVAL BROADSHEET SPEC // 2026</span>
        <span>RESUME VERIFIED · ZERO PLACEHOLDERS</span>
      </div>
    </aside>
  );
}
