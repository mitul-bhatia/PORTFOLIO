import React from 'react';

export function PortraitFrame() {
  return (
    <div className="border border-[#2B1D14] bg-[#EADFC8] p-4 shadow-notebook w-full max-w-sm mx-auto lg:mx-0">
      <div className="relative w-full aspect-[4/5] bg-[#F3E9DA] border border-[#D9C9AC] flex flex-col items-center justify-between p-6 overflow-hidden">
        {/* Paper top stamp */}
        <div className="w-full flex justify-between items-center text-[10px] font-mono text-[#6B5744] border-b border-[#D9C9AC] pb-2">
          <span>PLATE REF: 01-PORTRAIT</span>
          <span className="text-[#A8672E] font-bold">SONIPAT, IN</span>
        </div>

        {/* Center portrait or paper fallback plate */}
        <div className="my-auto flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[#2B1D14] text-[#F3E9DA] flex items-center justify-center font-serif text-3xl font-bold shadow-notebook mb-4">
            MB
          </div>
          <div className="font-serif text-2xl font-bold text-[#2B1D14] tracking-tight">
            Mitul Bhatia
          </div>
          <div className="font-mono text-xs text-[#6B5744] mt-1">
            B.Tech in Artificial Intelligence
          </div>
          <div className="font-mono text-[11px] text-[#A8672E] font-semibold mt-1">
            Newton School of Technology &apos;28
          </div>
        </div>

        {/* Bottom footer stamp */}
        <div className="w-full pt-2 border-t border-[#D9C9AC] flex justify-between items-center text-[10px] font-mono text-[#6B5744]">
          <span>RECORD: VERIFIED</span>
          <span className="font-bold text-[#2B1D14]">CGPA 9.80</span>
        </div>
      </div>
      <div className="mt-2.5 flex justify-between items-center text-[10px] font-mono text-[#6B5744]">
        <span>FILE: /assets/portrait.jpg</span>
        <span>PAPER STOCK: CREAM</span>
      </div>
    </div>
  );
}
