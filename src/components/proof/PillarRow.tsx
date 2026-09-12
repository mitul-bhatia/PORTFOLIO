import React from 'react';
import { PILLARS } from '@/content/pillars';
import { PillarCard } from './PillarCard';

export function PillarRow() {
  return (
    <section className="py-16 border-b border-[#D9C9AC]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="font-mono text-xs text-[#A8672E] tracking-widest uppercase mb-1">
            Architectural Foundation
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D14]">
            Three Systems Pillars
          </h2>
        </div>
        <div className="font-mono text-xs text-[#6B5744]">
          [03 CORE DISCIPLINES]
        </div>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS.map((pillar) => (
          <PillarCard key={pillar.id} pillar={pillar} />
        ))}
      </div>
    </section>
  );
}
