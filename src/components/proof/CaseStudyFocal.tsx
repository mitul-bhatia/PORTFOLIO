'use client';

import { useState } from 'react';
import type { Project } from '@/content/projects';
import { usePrefersReducedMotion } from '@/lib/motion';

function FocalShell({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[var(--border-notebook)] py-12 sm:py-16" aria-labelledby={`focal-${label}`}>
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent-dark)]">{label}</p>
      <h2 id={`focal-${label}`} className="mt-2 font-serif text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function AegisThreatLanes() {
  const lanes = [
    {
      id: 'benign',
      label: 'Benign payload',
      detail: 'AST policy passes; guardrail short-circuits in <24ms with no isolation spin-up.',
    },
    {
      id: 'injection',
      label: 'Injection attempt',
      detail: 'Prompt-injection patterns routed to Threat Evaluator; 99.8% recall on held-out probes.',
    },
    {
      id: 'policy',
      label: 'Semgrep hit',
      detail: 'Static rule fires → memory-isolated exploit path → sanitized output only.',
    },
  ];
  const [active, setActive] = useState(lanes[0].id);
  const current = lanes.find((lane) => lane.id === active) ?? lanes[0];

  return (
    <FocalShell label="Inspect // AEGIS" title="Trace a payload through the guardrail">
      <div
        role="tablist"
        aria-label="Threat lanes"
        className="flex flex-wrap gap-2 border-b border-[var(--border-notebook)] pb-4"
      >
        {lanes.map((lane) => (
          <button
            key={lane.id}
            type="button"
            role="tab"
            id={`aegis-tab-${lane.id}`}
            aria-selected={active === lane.id}
            aria-controls={`aegis-panel-${lane.id}`}
            onClick={() => setActive(lane.id)}
            className={`min-h-11 border px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors ${
              active === lane.id
                ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                : 'border-[var(--border-notebook)] bg-[var(--paper-soft)] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
            }`}
          >
            {lane.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`aegis-panel-${current.id}`}
        aria-labelledby={`aegis-tab-${current.id}`}
        className="mt-6 border border-[var(--border-notebook)] bg-[var(--paper-soft)] p-6 font-mono text-xs leading-6 text-[var(--ink)] sm:text-sm"
      >
        <span className="text-[var(--accent-dark)]">Outcome // </span>
        {current.detail}
      </div>
    </FocalShell>
  );
}

function FlatelySyncToggle() {
  const [mode, setMode] = useState<'single' | 'cluster'>('cluster');
  const copy =
    mode === 'single'
      ? {
          headline: 'Single Node.js worker',
          body: 'Socket.IO holds connections in-process. Fine for demos; workers cannot share room state.',
          metric: '—',
        }
      : {
          headline: 'Redis Pub/Sub fan-out',
          body: 'Horizontal WebSocket workers subscribe to the same channels; chat + match events stay <45ms across instances.',
          metric: '<45ms',
        };

  return (
    <FocalShell label="Inspect // Flately" title="How match state stays synchronized">
      <div className="flex flex-wrap gap-3">
        {(
          [
            { id: 'single' as const, label: 'Single instance' },
            { id: 'cluster' as const, label: 'Redis Pub/Sub cluster' },
          ] as const
        ).map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={mode === option.id}
            onClick={() => setMode(option.id)}
            className={`min-h-11 border px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] ${
              mode === option.id
                ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                : 'border-[var(--border-notebook)] text-[var(--muted)] hover:border-[var(--ink)]'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-px border border-[var(--border-notebook)] bg-[var(--border-notebook)] sm:grid-cols-[1fr_auto]">
        <div className="bg-[var(--paper-soft)] p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">{copy.headline}</p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{copy.body}</p>
        </div>
        <div className="flex min-w-[140px] flex-col justify-center bg-[var(--paper)] px-6 py-4 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">Socket sync</span>
          <span className="mt-1 font-serif text-3xl font-semibold tabular-nums text-[var(--ink)]">{copy.metric}</span>
        </div>
      </div>
    </FocalShell>
  );
}

function AgroversEvidenceStack() {
  const layers = [
    { id: 'telemetry', label: 'Raw telemetry', note: 'Soil moisture, NPK, and season inputs — often incomplete in the field.' },
    { id: 'embed', label: 'Embedding pass', note: 'Encoder normalizes sparse readings before vector lookup.' },
    { id: 'retrieve', label: 'FAISS retrieval', note: 'Nearest agronomy chunks pulled for the LangChain loop.' },
    { id: 'validate', label: 'Multi-stage validation', note: 'Conflicting evidence trimmed; +35% reliability vs single-shot prompts.' },
  ];
  const reduced = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(1);
  const shown = reduced ? layers.length : revealed;

  return (
    <FocalShell label="Inspect // Agrovers" title="Peel back the validation stack">
      <ol className="space-y-3">
        {layers.map((layer, index) => {
          const visible = index < shown;
          return (
            <li key={layer.id}>
              <div
                className={`border px-5 py-4 ${
                  visible
                    ? 'border-[var(--ink)] bg-[var(--paper-soft)]'
                    : 'border-[var(--border-notebook)] bg-[var(--paper)] text-[var(--muted)]'
                }`}
                aria-hidden={!visible}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent-dark)]">
                  Layer {index + 1} · {layer.label}
                </span>
                {visible ? (
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{layer.note}</p>
                ) : (
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em]">Queued</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {shown < layers.length && (
        <button
          type="button"
          onClick={() => setRevealed((count) => Math.min(layers.length, count + 1))}
          className="mt-4 min-h-11 border border-[var(--ink)] bg-[var(--paper)] px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
        >
          Reveal next layer ({layers.length - shown} remaining)
        </button>
      )}
    </FocalShell>
  );
}

function CreditSenseRuleStepper() {
  const steps = [
    { title: 'Profile retrieval', body: 'LightRAG pulls the customer lending profile in one pass for downstream rules.' },
    { title: 'RBI rule graph', body: 'Regulatory checks encoded as explicit predicates — not buried in prompt prose.' },
    { title: 'Compliance verdict', body: 'Groq-backed reasoning returns a traceable approve / flag / deny with citations.' },
  ];
  const [step, setStep] = useState(0);

  return (
    <FocalShell label="Inspect // CreditSense" title="Step through a compliance run">
      <div className="flex flex-wrap gap-2">
        {steps.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-current={step === index ? 'step' : undefined}
            onClick={() => setStep(index)}
            className={`min-h-11 border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] ${
              step === index
                ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                : 'border-[var(--border-notebook)] text-[var(--muted)]'
            }`}
          >
            {index + 1}. {item.title}
          </button>
        ))}
      </div>
      <div className="mt-6 border-t border-[var(--ink)] pt-5">
        <h3 className="font-serif text-2xl font-semibold text-[var(--ink)]">{steps[step].title}</h3>
        <p className="mt-3 max-w-[var(--measure)] text-sm leading-7 text-[var(--muted)]">{steps[step].body}</p>
      </div>
    </FocalShell>
  );
}

function LoanExplainToggle() {
  const [view, setView] = useState<'score' | 'audit'>('score');
  return (
    <FocalShell label="Inspect // Loan classifier" title="Score vs audit trail">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          aria-pressed={view === 'score'}
          onClick={() => setView('score')}
          className={`min-h-11 border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] ${
            view === 'score' ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]' : 'border-[var(--border-notebook)]'
          }`}
        >
          XGBoost score
        </button>
        <button
          type="button"
          aria-pressed={view === 'audit'}
          onClick={() => setView('audit')}
          className={`min-h-11 border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] ${
            view === 'audit' ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]' : 'border-[var(--border-notebook)]'
          }`}
        >
          TabNet + LlamaIndex audit
        </button>
      </div>
      <div className="mt-6 grid gap-4 border border-[var(--border-notebook)] bg-[var(--paper-soft)] p-6 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">Signal</p>
          <p className="mt-2 font-serif text-3xl font-semibold text-[var(--ink)]">
            {view === 'score' ? '0.82 approve band' : '12 cited features'}
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">What the reviewer sees</p>
          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
            {view === 'score'
              ? 'Tabular model output with calibrated threshold — fast batch decisions.'
              : 'RAG-backed narrative ties each feature weight to policy language for human sign-off.'}
          </p>
        </div>
      </div>
    </FocalShell>
  );
}

function F1PitPhases() {
  const phases = [
    { id: 'early', label: 'Laps 1–15', kpi: 'Tire deg + traffic', note: 'Undercut windows open when front runners pit early on softs.' },
    { id: 'mid', label: 'Laps 16–40', kpi: 'Fuel-adjusted pace', note: 'Ten KPI panel compares stint lengths against Ergast baselines.' },
    { id: 'late', label: 'Laps 41+', kpi: 'Pit window optimization', note: '744K+ rows inform whether a late stop beats track position.' },
  ];
  const [active, setActive] = useState(phases[0].id);
  const phase = phases.find((p) => p.id === active) ?? phases[0];

  return (
    <FocalShell label="Inspect // F1 strategy" title="Scrub race phase emphasis">
      <div className="flex flex-wrap gap-2">
        {phases.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={active === item.id}
            onClick={() => setActive(item.id)}
            className={`min-h-11 border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] ${
              active === item.id
                ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                : 'border-[var(--border-notebook)] text-[var(--muted)]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <dl className="mt-6 grid gap-px border border-[var(--border-notebook)] bg-[var(--border-notebook)] sm:grid-cols-2">
        <div className="bg-[var(--paper-soft)] p-5">
          <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">Leading KPI</dt>
          <dd className="mt-2 font-serif text-2xl font-semibold text-[var(--ink)]">{phase.kpi}</dd>
        </div>
        <div className="bg-[var(--paper)] p-5">
          <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">Notebook read</dt>
          <dd className="mt-2 text-sm leading-7 text-[var(--muted)]">{phase.note}</dd>
        </div>
      </dl>
    </FocalShell>
  );
}

function VulnswarmHandoff() {
  const stages = [
    'Repository ingest',
    'Semgrep sweep',
    'ChromaDB memory',
    'LangGraph triage',
    'CVE patch proposal',
  ];
  const [index, setIndex] = useState(0);

  return (
    <FocalShell label="Inspect // VULNSWARM" title="Advance the remediation handoff">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Previous stage"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className="min-h-11 min-w-11 border border-[var(--border-notebook)] font-mono text-lg disabled:opacity-40"
        >
          ←
        </button>
        <div className="flex-1 border border-[var(--ink)] bg-[var(--paper-soft)] px-5 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent-dark)]">
            Stage {index + 1} / {stages.length}
          </p>
          <p className="mt-2 font-serif text-2xl font-semibold text-[var(--ink)]">{stages[index]}</p>
        </div>
        <button
          type="button"
          aria-label="Next stage"
          disabled={index === stages.length - 1}
          onClick={() => setIndex((i) => Math.min(stages.length - 1, i + 1))}
          className="min-h-11 min-w-11 border border-[var(--border-notebook)] font-mono text-lg disabled:opacity-40"
        >
          →
        </button>
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
        Each hop is inspectable — agents never skip straight to a patch without triage context.
      </p>
    </FocalShell>
  );
}

const FOCAL_BY_SLUG: Record<string, () => React.ReactNode> = {
  aegis: AegisThreatLanes,
  flately: FlatelySyncToggle,
  agrovers: AgroversEvidenceStack,
  creditsense: CreditSenseRuleStepper,
  'loan-classifier': LoanExplainToggle,
  'f1-strategy': F1PitPhases,
  vulnswarm: VulnswarmHandoff,
};

export function CaseStudyFocal({ project }: { project: Project }) {
  const render = FOCAL_BY_SLUG[project.slug];
  if (!render) return null;
  return render();
}
