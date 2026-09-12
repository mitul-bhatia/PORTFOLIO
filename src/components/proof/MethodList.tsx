import React from 'react';
import { PROFILE } from '@/content/profile';

export function MethodList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {PROFILE.methodology.map((m) => (
        <div
          key={m.id}
          className="border border-[#D9C9AC] bg-[#F3E9DA] p-6 shadow-notebook hover:border-[#2B1D14] transition-colors flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between font-mono text-xs text-[#A8672E] font-bold mb-3">
              <span>METHOD {m.id}</span>
              <span className="text-[10px] tracking-widest text-[#6B5744] uppercase">
                ENGINEERING DISCIPLINE
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2B1D14] mb-3">
              {m.title}
            </h3>
            <p className="text-sm text-[#2B1D14] leading-relaxed font-sans">
              {m.description}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#D9C9AC] flex justify-between font-mono text-[10px] text-[#6B5744]">
            <span>CONSTRAINT: DETERMINISTIC</span>
            <span className="text-[#A8672E]">PRODUCTION BOUND</span>
          </div>
        </div>
      ))}
    </div>
  );
}
