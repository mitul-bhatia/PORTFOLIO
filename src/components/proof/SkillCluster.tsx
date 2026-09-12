import React from 'react';
import { SkillCluster as SkillClusterType } from '@/content/skills';

export function SkillCluster({ cluster }: { cluster: SkillClusterType }) {
  return (
    <div className="border border-[#D9C9AC] bg-[#F3E9DA] p-6 sm:p-8 shadow-notebook">
      {/* Cluster Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#D9C9AC] pb-4 mb-6 gap-2">
        <div>
          <span className="font-mono text-xs text-[#A8672E] font-semibold">
            CLUSTER {cluster.number}
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#2B1D14]">
            {cluster.name}
          </h2>
        </div>
        <p className="font-mono text-xs text-[#6B5744]">
          {cluster.description}
        </p>
      </div>

      {/* Skills Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {cluster.skills.map((skill, idx) => (
          <div
            key={idx}
            className="p-3 bg-[#EADFC8] border border-[#2B1D14] font-mono text-xs text-[#2B1D14] flex items-center justify-between hover:bg-[#2B1D14] hover:text-[#F3E9DA] transition-colors group shadow-notebook"
          >
            <span className="font-semibold">{skill}</span>
            <span className="text-[10px] text-[#A8672E] group-hover:text-[#F3E9DA]">
              ●
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
