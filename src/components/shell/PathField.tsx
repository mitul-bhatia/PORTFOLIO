'use client';

import { useEffect, useState } from 'react';
import type { SiteMood } from '@/lib/moodClassifier';

export function PathField() {
  const [mood, setMood] = useState<SiteMood>('ambient');

  useEffect(() => {
    const updateMood = () => {
      const raw = document.documentElement.dataset.mood as SiteMood | undefined;
      const validMoods: SiteMood[] = [
        'ambient',
        'focused',
        'charting',
        'arriving',
        'guarded',
        'jealous',
        'bragger',
        'fan',
      ];
      if (raw && validMoods.includes(raw)) {
        setMood(raw);
      } else {
        setMood('ambient');
      }
    };

    updateMood();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'data-mood') {
          updateMood();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mood'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      data-active-path-mood={mood}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-100 transition-opacity duration-700"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Structural base grid */}
          <pattern id="path-grid-subtle" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--border-notebook)" strokeWidth="0.6" opacity="0.2" />
          </pattern>

          {/* High-density engineering grid */}
          <pattern id="path-grid-dense" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="var(--ink)" strokeWidth="0.6" opacity="0.18" />
          </pattern>

          {/* Diagonal drafting grid */}
          <pattern id="path-grid-diag" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 0 60 L 60 0 M 0 0 L 60 60" fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" />
          </pattern>

          {/* Hazard diagonal stripes for guarded/jealous */}
          <pattern id="hazard-stripes" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="20" stroke="var(--accent-dark)" strokeWidth="4" opacity="0.15" />
          </pattern>
        </defs>

        {/* ========================================================================= */}
        {/* DYNAMIC BACKGROUND GRIDS PER MOOD */}
        {/* ========================================================================= */}
        <rect
          width="100%"
          height="100%"
          fill={
            mood === 'focused' || mood === 'bragger'
              ? 'url(#path-grid-dense)'
              : mood === 'charting' || mood === 'fan'
                ? 'url(#path-grid-diag)'
                : mood === 'guarded' || mood === 'jealous'
                  ? 'url(#hazard-stripes)'
                  : 'url(#path-grid-subtle)'
          }
          className={`transition-opacity duration-700 ${
            mood === 'ambient' ? 'opacity-25' : 'opacity-70'
          }`}
        />

        {/* ========================================================================= */}
        {/* 1. BASELINE AMBIENT ROUTES (Slow persistent architectural drift) */}
        {/* ========================================================================= */}
        <g
          stroke="var(--border-notebook)"
          strokeWidth="1.2"
          className={`transition-all duration-700 ${
            mood === 'guarded' ? 'opacity-15' : mood === 'focused' ? 'opacity-40' : 'opacity-55'
          }`}
        >
          <path d="M1440 96H1080V240H860" />
          <path d="M1440 180H1200V360H980V440H740" />
          <path d="M1440 320H1120V620H890" />
          <path d="M1440 480H1260V740H1020" />
        </g>

        {/* Baseline Ambient Signal Nodes */}
        <g fill="var(--accent)" className="transition-opacity duration-700">
          <rect x="1076" y="236" width="7" height="7" className="node-pulse opacity-50" />
          <rect x="976" y="436" width="7" height="7" className="node-pulse opacity-40" />
          <rect x="1116" y="616" width="7" height="7" className="node-pulse opacity-45" />
        </g>

        {/* ========================================================================= */}
        {/* 2. FOCUSED: Live high-speed technical circuit doing work */}
        {/* ========================================================================= */}
        {mood === 'focused' && (
          <g className="transition-opacity duration-500 animate-fadeIn">
            {/* Primary data bus traces */}
            <g stroke="var(--ink)" strokeWidth="1.6" opacity="0.8">
              <path d="M1440 140H920V280H780V380H520" />
              <path d="M1440 210H1010V330H840V490H610" />
              <path d="M1440 280H1150V520H940V680H720" />
              <path d="M1010 330V610H760V730H480" />
            </g>

            {/* Traveling packet pulses */}
            <g stroke="var(--accent)" strokeWidth="2.4" strokeDasharray="12 12" className="animate-path-flow-fast">
              <path d="M1440 140H920V280H780V380H520" />
              <path d="M1440 210H1010V330H840V490H610" />
              <path d="M1440 280H1150V520H940V680H720" />
            </g>

            {/* Circuit Node Chips */}
            <g fill="var(--accent)">
              <rect x="916" y="276" width="9" height="9" />
              <rect x="776" y="376" width="9" height="9" />
              <rect x="836" y="486" width="9" height="9" />
              <rect x="936" y="676" width="9" height="9" />
              <rect x="756" y="606" width="9" height="9" />
              <circle cx="520" cy="380" r="4" fill="var(--ink)" />
              <circle cx="610" cy="490" r="4" fill="var(--ink)" />
            </g>

            {/* Watermark telemetry */}
            <text x="530" y="375" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em">
              [BUS_01: AEGIS_GUARDRAIL // &lt;24ms LATENCY]
            </text>
            <text x="620" y="485" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em">
              [BUS_02: REDIS_SOCKET_SYNC // ACTIVE]
            </text>
          </g>
        )}

        {/* ========================================================================= */}
        {/* 3. CHARTING: Architectural blueprint — measurement calipers & drafting lines */}
        {/* ========================================================================= */}
        {mood === 'charting' && (
          <g className="transition-opacity duration-500 animate-fadeIn">
            <g stroke="var(--ink)" strokeWidth="1.2" opacity="0.65">
              <path d="M1440 40L1040 440H680" strokeDasharray="8 4" />
              <path d="M1200 40L880 360V640H540" />
              <path d="M1440 240L1100 580H820V780H480" strokeDasharray="6 6" />
            </g>

            {/* Drafting calipers & angle crosshairs */}
            <g stroke="var(--accent)" strokeWidth="1.6">
              <path d="M880 330V390 M850 360H910" />
              <path d="M1040 410V470 M1010 440H1070" />
              <path d="M820 550V610 M790 580H850" />
              <circle cx="880" cy="360" r="24" fill="none" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="1040" cy="440" r="32" fill="none" strokeDasharray="4 4" opacity="0.6" />
            </g>

            {/* Scale registration text */}
            <text x="700" y="432" fill="var(--accent-dark)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" letterSpacing="0.12em">
              [ACADEMIC LINEAGE // CGPA 9.65 / 10.0 // NST AI STUDIO]
            </text>
            <text x="560" y="632" fill="var(--muted)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em">
              [AI STUDIO COHORT FELLOWSHIP // ARCHITECTURE SCALE 1:1]
            </text>
          </g>
        )}

        {/* ========================================================================= */}
        {/* 4. ARRIVING: Dynamic convergence rays toward the Bot & Contact channels */}
        {/* ========================================================================= */}
        {mood === 'arriving' && (
          <g className="transition-opacity duration-500 animate-fadeIn">
            {/* Converging rays targeting bottom-right dock (x: 1380, y: 830) */}
            <g stroke="var(--accent)" strokeWidth="1.6" opacity="0.75">
              <path d="M400 100L1050 480L1370 820" />
              <path d="M650 200L1140 540L1370 820" strokeDasharray="8 4" />
              <path d="M850 320L1220 620L1370 820" />
              <path d="M1050 450L1300 700L1370 820" strokeDasharray="6 3" />
            </g>

            {/* Flowing amber pulses */}
            <g stroke="var(--ink)" strokeWidth="2.2" strokeDasharray="14 14" className="animate-path-flow">
              <path d="M400 100L1050 480L1370 820" />
              <path d="M650 200L1140 540L1370 820" />
            </g>

            {/* Radar beacon expanding over bottom right */}
            <circle cx="1370" cy="820" r="12" stroke="var(--accent)" strokeWidth="2" fill="none" className="animate-beacon" />
            <circle cx="1370" cy="820" r="6" fill="var(--accent)" />
            <rect x="1362" y="812" width="16" height="16" stroke="var(--ink)" strokeWidth="1.5" fill="none" />

            <text x="1080" y="805" fill="var(--accent-dark)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" letterSpacing="0.1em">
              [DESTINATION // CONTACT &amp; RESUME ROUTING ACTIVE]
            </text>
          </g>
        )}

        {/* ========================================================================= */}
        {/* 5. GUARDED: Defensive security perimeter & protective rules */}
        {/* ========================================================================= */}
        {mood === 'guarded' && (
          <g className="transition-opacity duration-500 animate-fadeIn">
            {/* Top perimeter security barrier */}
            <line x1="0" y1="64" x2="1440" y2="64" stroke="var(--accent-dark)" strokeWidth="2" strokeDasharray="8 4" />
            {/* Corner defensive brackets */}
            <path d="M20 100H60V60" stroke="var(--accent)" strokeWidth="2.5" fill="none" />
            <path d="M1420 100H1380V60" stroke="var(--accent)" strokeWidth="2.5" fill="none" />
            <path d="M20 840H60V880" stroke="var(--accent)" strokeWidth="2.5" fill="none" />

            <text x="80" y="92" fill="var(--accent-dark)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" letterSpacing="0.14em">
              [DEFENSE PERIMETER ACTIVE // STRICT EVIDENCE BOUNDARY]
            </text>
          </g>
        )}

        {/* ========================================================================= */}
        {/* 6. JEALOUS: Asymmetrical rivalry lines & cynical reticles */}
        {/* ========================================================================= */}
        {mood === 'jealous' && (
          <g className="transition-opacity duration-500 animate-fadeIn">
            {/* Cynical jagged diagonal trace */}
            <path
              d="M0 180L420 220L780 160L1140 240L1440 190"
              stroke="var(--accent-dark)"
              strokeWidth="2"
              strokeDasharray="6 3"
              opacity="0.8"
            />
            {/* Squinted crosshairs */}
            <g stroke="var(--ink)" strokeWidth="1.8">
              <path d="M420 200V240 M400 220H440" />
              <path d="M780 140V180 M760 160H800" />
              <path d="M1140 220V260 M1120 240H1160" />
            </g>
            <text x="440" y="215" fill="var(--accent-dark)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" letterSpacing="0.1em">
              [RIVALRY SCAN // &quot;ARE YOU JEALOUS?&quot; // SKEPTICAL RETICLE LOCKED]
            </text>
          </g>
        )}

        {/* ========================================================================= */}
        {/* 7. BRAGGER: Radiant achievement lattice & golden flex beacons */}
        {/* ========================================================================= */}
        {mood === 'bragger' && (
          <g className="transition-opacity duration-500 animate-fadeIn">
            {/* Radial starburst lattice */}
            <g stroke="var(--accent)" strokeWidth="1.5" opacity="0.75">
              <line x1="720" y1="450" x2="180" y2="120" strokeDasharray="8 4" />
              <line x1="720" y1="450" x2="1260" y2="120" strokeDasharray="8 4" />
              <line x1="720" y1="450" x2="1400" y2="720" strokeDasharray="8 4" />
              <line x1="720" y1="450" x2="40" y2="720" strokeDasharray="8 4" />
              <circle cx="720" cy="450" r="70" fill="none" strokeWidth="2" />
              <circle cx="720" cy="450" r="140" fill="none" strokeWidth="1" strokeDasharray="4 4" />
            </g>

            {/* Achievement badges watermark */}
            <g fill="var(--accent)">
              <polygon points="720,410 726,428 745,428 730,440 735,458 720,446 705,458 710,440 695,428 714,428" />
            </g>
            <text x="720" y="490" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-serif)" fontSize="18" fontWeight="700" letterSpacing="0.05em">
              10-AGENT ORCHESTRATION · 9.65 CGPA · 1400+ LEETCODE
            </text>
            <text x="720" y="515" textAnchor="middle" fill="var(--accent-dark)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.14em">
              [VERIFIED PROOF OVER LISTS // SWAGGER RUNTIME]
            </text>
          </g>
        )}

        {/* ========================================================================= */}
        {/* 8. FAN: Warm harmonic waves & sparking constellation flow */}
        {/* ========================================================================= */}
        {mood === 'fan' && (
          <g className="transition-opacity duration-500 animate-fadeIn">
            {/* Harmonic sine waves */}
            <path
              d="M0 320 Q 360 220, 720 320 T 1440 320"
              stroke="var(--accent)"
              strokeWidth="2"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M0 360 Q 360 460, 720 360 T 1440 360"
              stroke="var(--ink)"
              strokeWidth="1.6"
              fill="none"
              strokeDasharray="6 4"
              opacity="0.6"
            />
            {/* Sparkle nodes */}
            <g fill="var(--accent)">
              <circle cx="360" cy="220" r="5" className="animate-beacon" />
              <circle cx="1080" cy="220" r="5" className="animate-beacon" />
              <circle cx="720" cy="320" r="6" />
            </g>
            <text x="720" y="290" textAnchor="middle" fill="var(--accent-dark)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" letterSpacing="0.12em">
              [HYPE ENGINE ACTIVE // BUILD SYSTEMS THAT MATTER]
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
