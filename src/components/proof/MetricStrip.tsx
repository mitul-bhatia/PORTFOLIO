import React from 'react';
import { MetricItem } from '@/content/projects';
import { SlidingNumber } from './SlidingNumber';

export function MetricStrip({
  metrics,
  compact = false,
}: {
  metrics: MetricItem[];
  compact?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-3 gap-3 border border-[#D9C9AC] bg-[#EADFC8] ${
        compact ? 'p-3' : 'p-4 sm:p-6'
      }`}
    >
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className={`border-b sm:border-b-0 sm:border-r border-[#D9C9AC] last:border-b-0 last:border-r-0 ${
            compact ? 'pb-2 sm:pb-0 sm:pr-3' : 'pb-3 sm:pb-0 sm:pr-4'
          }`}
        >
          <div className="font-mono text-[10px] sm:text-[11px] text-[#6B5744] uppercase tracking-wider mb-1">
            {m.label}
          </div>
          <div className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold text-[#2B1D14] tracking-tight tabular-nums">
            <span className="text-[#A8672E]">
              <SlidingNumber value={m.value} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
