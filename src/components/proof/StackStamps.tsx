import React from 'react';

export function StackStamps({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {stack.map((item, idx) => (
        <span
          key={idx}
          className="font-mono text-xs px-3.5 py-1.5 bg-[#EADFC8] border border-[#2B1D14] text-[#2B1D14] shadow-notebook flex items-center gap-1.5 hover:bg-[#2B1D14] hover:text-[#F3E9DA] transition-colors"
        >
          <span className="text-[#A8672E] font-bold">›</span>
          <span className="font-semibold">{item}</span>
        </span>
      ))}
    </div>
  );
}
