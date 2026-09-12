'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { PROFILE } from '@/content/profile';

export function HeroStamp() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="pt-8 pb-16 border-b border-[#D9C9AC]">
      {/* Top institution stamp */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="inline-flex items-center gap-2 px-3 py-1 bg-[#EADFC8] border border-[#D9C9AC] text-[#2B1D14] font-mono text-xs tracking-wider mb-8 shadow-sm"
      >
        <span className="w-1.5 h-1.5 bg-[#A8672E]" />
        <span>{PROFILE.heroStamp}</span>
      </motion.div>

      {/* Kinetic Split Name */}
      <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#2B1D14] leading-[0.95] mb-6 select-none overflow-hidden">
        <motion.span
          className="block"
          initial={shouldReduceMotion ? false : { y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          MITUL
        </motion.span>
        <motion.span
          className="block italic font-normal text-[#A8672E]"
          initial={shouldReduceMotion ? false : { y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          BHATIA
        </motion.span>
      </h1>

      {/* Role / Subtitle */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center gap-3 font-mono text-sm sm:text-base text-[#6B5744] tracking-wide mb-8"
      >
        <span className="font-semibold text-[#2B1D14]">{PROFILE.primaryTitle}</span>
        <span>/</span>
        <span>{PROFILE.subtitle}</span>
      </motion.div>

      {/* Tagline Text Effect */}
      <motion.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25 }}
        className="max-w-2xl text-lg sm:text-xl text-[#2B1D14] leading-relaxed font-serif mb-10"
      >
        &ldquo;{PROFILE.positioning}&rdquo;
      </motion.p>

      {/* Action triggers */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-wrap items-center gap-4 font-mono text-xs"
      >
        <Link
          href="/work"
          className="px-6 py-3 bg-[#2B1D14] text-[#F3E9DA] border border-[#2B1D14] shadow-notebook hover:bg-[#A8672E] hover:border-[#A8672E] transition-colors tracking-wider font-semibold"
        >
          VIEW WORK (07) ↗
        </Link>
        <Link
          href="/about"
          className="px-6 py-3 bg-[#EADFC8] text-[#2B1D14] border border-[#2B1D14] shadow-notebook hover:bg-[#2B1D14] hover:text-[#F3E9DA] transition-colors tracking-wider font-semibold"
        >
          METHODOLOGY & ABOUT →
        </Link>
      </motion.div>
    </section>
  );
}
