import React from 'react';
import { Pillar } from '@/content/pillars';

export function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <div className="border border-[#D9C9AC] bg-[#F3E9DA] p-6 sm:p-8 flex flex-col justify-between hover:border-[#2B1D14] transition-colors">
      <div>
        <div className="flex items-center justify-between font-mono text-xs text-[#6B5744] mb-4">
          <span className="font-semibold text-[#A8672E]">PILLAR {pillar.number}</span>
          <span className="text-[10px] tracking-widest uppercase">DISCIPLINE</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#2B1D14] mb-1">
          {pillar.title}
        </h3>
        <p className="font-mono text-xs text-[#A8672E] tracking-wide mb-4">
          {pillar.subtitle}
        </p>
        <div className="p-3.5 bg-[#EADFC8] border border-[#D9C9AC] mb-6 text-xs text-[#2B1D14] leading-relaxed">
          <span className="font-mono text-[10px] uppercase font-bold text-[#6B5744] block mb-1">
            Proof of Work:
          </span>
          {pillar.proof}
        </div>
      </div>

      <div>
        <div className="font-mono text-[11px] text-[#6B5744] uppercase tracking-wider mb-2 border-b border-[#D9C9AC] pb-1">
          Core Capabilities
        </div>
        <ul className="space-y-1.5 font-mono text-xs text-[#2B1D14]">
          {pillar.capabilities.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#A8672E] font-bold">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
