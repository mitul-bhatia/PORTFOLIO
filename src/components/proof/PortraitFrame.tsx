import { PROFILE } from '@/content/profile';

export function PortraitFrame() {
  return (
    <figure className="border border-[var(--ink)] bg-[var(--paper-soft)] p-4 shadow-notebook sm:p-5">
      {/* Archival Dossier Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-notebook)] pb-3 font-mono text-[9px] uppercase tracking-[0.14em]">
        <span className="font-semibold text-[var(--accent-dark)]">[CANDIDATE DOSSIER]</span>
        <span className="text-[var(--muted)]">REF: MB-2026-AI</span>
      </div>

      {/* Architectural Identity Monogram Plate */}
      <div className="relative mt-4 flex aspect-[4/4.2] flex-col justify-between border border-[var(--ink)] bg-[var(--ink)] p-5 text-[var(--paper)]">
        {/* Background Grid Pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--paper) 1px, transparent 0)',
            backgroundSize: '16px 16px',
          }}
          aria-hidden="true"
        />

        {/* Top Monogram Coordinates */}
        <div className="relative flex items-start justify-between font-mono text-[9px] tracking-[0.12em] opacity-80">
          <div>
            <div>COORDINATES: 28.99° N, 77.02° E</div>
            <div className="text-[var(--accent)]">SONIPAT, HARYANA · INDIA</div>
          </div>
          <div className="border border-[var(--paper)] px-2 py-0.5 font-bold">
            SEAL // 2026
          </div>
        </div>

        {/* Center Architectural Monogram */}
        <div className="relative my-auto text-center">
          <div className="font-serif text-5xl font-bold tracking-tight sm:text-6xl">
            MB
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
            {PROFILE.name}
          </div>
          <div className="mt-1 font-mono text-[9px] tracking-[0.1em] opacity-75">
            {PROFILE.primaryTitle}
          </div>
        </div>

        {/* Bottom Verified Seals */}
        <div className="relative grid grid-cols-2 gap-2 border-t border-[var(--paper)]/30 pt-3 font-mono text-[9px]">
          <div>
            <div className="text-[var(--accent)] font-semibold">ACADEMIC CGPA</div>
            <div className="font-serif text-base font-bold leading-tight">{PROFILE.cgpa}</div>
          </div>
          <div>
            <div className="text-[var(--accent)] font-semibold">INSTITUTION</div>
            <div className="truncate text-[8.5px] opacity-85">Newton School of Tech</div>
          </div>
        </div>
      </div>

      {/* Bottom Technical Specifications Caption */}
      <figcaption className="mt-4 border-t border-[var(--border-notebook)] pt-3 font-mono text-[9.5px]">
        <div className="flex items-center justify-between text-[var(--muted)] uppercase tracking-[0.1em]">
          <span>STATUS: RESEARCH &amp; INDUSTRY</span>
          <span className="text-[var(--accent-dark)] font-semibold">VERIFIED RECORD</span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
          <div className="border border-[var(--border-notebook)] bg-[var(--paper)] p-2">
            <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--muted)]">Focus Area</div>
            <div className="font-medium text-[var(--ink)]">Agentic Systems &amp; LLM Infra</div>
          </div>
          <div className="border border-[var(--border-notebook)] bg-[var(--paper)] p-2">
            <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-[var(--muted)]">Current</div>
            <div className="font-medium text-[var(--ink)]">Kolably (Intern)</div>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
