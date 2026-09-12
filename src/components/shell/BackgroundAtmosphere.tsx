'use client';

import React from 'react';
import { useBotMood } from '@/context/BotMoodContext';
import { motion, AnimatePresence } from 'motion/react';
import { ThreeAtmosphereCanvas } from './ThreeAtmosphereCanvas';

export function BackgroundAtmosphere() {
  const { mood, lastSteerFeedback } = useBotMood();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ─── 0. THREE.JS GPU-ACCELERATED INTERACTIVE CANVAS ───────────────── */}
      <ThreeAtmosphereCanvas />

      {/* ─── 1. BASE TACTILE PAPER FIBER TEXTURE ──────────────────────────── */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-multiply transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/textures/paper-grain.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '240px 240px',
        }}
      />

      {/* ─── 2. JEALOUS ATMOSPHERE: VINTAGE ARCHIVAL LABORATORY LEDGER ────── */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          mood === 'jealous' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Parchment depth gradient: Warm antique paper wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 95% 85% at 50% 35%, #F7EFE2 0%, #EFE5D4 65%, #E4D5BE 100%)',
            opacity: 0.85,
          }}
        />

        {/* Engineering Left Margin: Double Crimson Rule with Metric Ticks */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-16 xl:left-24 w-4 pointer-events-none z-10">
          <div
            className="absolute top-0 bottom-0 left-0 w-[1.5px] opacity-40"
            style={{ backgroundColor: '#B84A39' }}
          />
          <div
            className="absolute top-0 bottom-0 left-2 w-[1px] opacity-25"
            style={{ backgroundColor: '#B84A39' }}
          />
          <div
            className="absolute top-0 bottom-0 left-3 w-3 opacity-30 font-mono text-[8px] text-[#B84A39]"
            style={{
              backgroundImage:
                'linear-gradient(to bottom, #B84A39 1px, transparent 1px, transparent 28px)',
              backgroundSize: '8px 28px',
            }}
          />
        </div>

        {/* Crisp horizontal ledger ruling lines */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, transparent 27px, rgba(43, 29, 20, 0.07) 28px)',
            backgroundSize: '100% 28px',
          }}
        />

        {/* Peripheral Vignette for tactile page curvature */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(43, 29, 20, 0.05) 100%)',
          }}
        />

        {/* Precision Registration Marks in outer perimeter gutters */}
        <div className="hidden 2xl:block absolute top-8 left-8 font-mono text-[9px] text-[#A8672E]/50 tracking-widest">
          ⌖ 28°58&apos;48&quot; N // NST ARCHIVE
        </div>
        <div className="hidden 2xl:block absolute top-8 right-8 font-mono text-[9px] text-[#6B5744]/50 tracking-widest text-right">
          77°03&apos;36&quot; E // RECORD 01 ⌖
        </div>
      </div>

      {/* ─── 3. FAN ATMOSPHERE: WARM RADIANT SUNLIT SANCTUM ───────────────── */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          mood === 'fan' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Soft, rich radiant sunlight wash from top */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 15%, #FFFDF8 0%, #FFF7E8 55%, #F4E5C6 100%)',
            opacity: 0.88,
          }}
        />

        {/* Top radiant sunburst aura */}
        <div
          className="absolute -top-36 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] rounded-full blur-3xl opacity-35 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 25%, rgba(245, 158, 11, 0.28) 0%, rgba(212, 133, 10, 0.1) 60%, transparent 90%)',
          }}
        />

        {/* Golden corner brackets */}
        <div className="hidden xl:block absolute top-7 left-7 w-6 h-6 border-l-2 border-t-2 border-[#D4850A]/45" />
        <div className="hidden xl:block absolute top-7 right-7 w-6 h-6 border-r-2 border-t-2 border-[#D4850A]/45" />
        <div className="hidden xl:block absolute bottom-7 left-7 w-6 h-6 border-l-2 border-b-2 border-[#D4850A]/45" />
        <div className="hidden xl:block absolute bottom-7 right-7 w-6 h-6 border-r-2 border-b-2 border-[#D4850A]/45" />

        <div className="hidden 2xl:block absolute top-8 left-16 font-mono text-[9px] text-[#D4850A]/70 font-semibold tracking-wider">
          ✦ DEVOTED ARCHIVIST // VERIFIED MERIT
        </div>
        <div className="hidden 2xl:block absolute top-8 right-16 font-mono text-[9px] text-[#D4850A]/70 font-semibold tracking-wider text-right">
          CUMULATIVE CGPA 9.80 · NST &apos;28 ✦
        </div>
      </div>

      {/* ─── 4. BRAGGER ATMOSPHERE: CYBER-ARCHITECT EXECUTIVE BLUEPRINT ──── */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          mood === 'bragger' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Rich golden-amber architectural blueprint base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 95% 85% at 50% 30%, #FBF3E0 0%, #F6E8C5 60%, #EBCE93 100%)',
            opacity: 0.82,
          }}
        />

        {/* Double-line architectural blueprint perimeter frame */}
        <div className="hidden lg:block absolute inset-5 border border-[#E07A00]/25 pointer-events-none" />
        <div className="hidden lg:block absolute inset-6 border border-[#E07A00]/15 pointer-events-none" />

        {/* Perimeter Telemetry Badges in far margins */}
        <div className="hidden 2xl:block absolute top-8 left-12 font-mono text-[9px] text-[#E07A00]/80 font-bold tracking-widest">
          ⚡ [SYS-AUDIT: FULL PRODUCTION VERIFICATION]
        </div>
        <div className="hidden 2xl:block absolute top-8 right-12 font-mono text-[9px] text-[#E07A00]/80 font-bold tracking-widest text-right">
          RANK: 1ST PERCENTILE // ZERO HUMILITY 👑
        </div>
      </div>

      {/* ─── LIVE MOOD STEER TOAST NOTIFICATION ─────────────────────────── */}
      <AnimatePresence>
        {lastSteerFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-18 left-1/2 -translate-x-1/2 z-50 pointer-events-auto shadow-notebook px-4 py-2 border border-[#2B1D14] bg-[#FFF0CC] text-[#2B1D14] font-mono text-xs flex items-center gap-2.5"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4850A] animate-ping" />
            <span className="font-semibold">{lastSteerFeedback}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
