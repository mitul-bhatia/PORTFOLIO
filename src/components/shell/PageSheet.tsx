'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SHEET_VARIANTS, REDUCED_MOTION_VARIANTS } from '@/lib/motion';

interface PageSheetProps {
  children: React.ReactNode;
  className?: string;
  folio?: string;
}

export function PageSheet({ children, className = '', folio }: PageSheetProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? REDUCED_MOTION_VARIANTS : SHEET_VARIANTS;

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className={`flex-1 w-full max-w-[1180px] mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-14 ${className}`}
    >
      {folio && (
        <div className="mb-6 pb-2 border-b border-[#D9C9AC] flex justify-between items-center text-[11px] font-mono tracking-widest text-[#6B5744] uppercase">
          <span>{folio}</span>
          <span>MITULBHATIA.DEV</span>
        </div>
      )}
      {children}
    </motion.main>
  );
}
