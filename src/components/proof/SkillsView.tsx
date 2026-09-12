'use client';

import React, { useState } from 'react';
import { PageSheet } from '@/components/shell/PageSheet';
import { SkillCluster } from '@/components/proof/SkillCluster';
import { SKILL_CLUSTERS, ALL_SKILLS_COUNT } from '@/content/skills';

export function SkillsView() {
  const [selectedCluster, setSelectedCluster] = useState<string>('all');

  const filteredClusters =
    selectedCluster === 'all'
      ? SKILL_CLUSTERS
      : SKILL_CLUSTERS.filter((c) => c.id === selectedCluster);

  return (
    <PageSheet folio="04 / SKILLS — 48-NODE TAXONOMY">
      {/* Header */}
      <section className="py-8 border-b border-[#D9C9AC]">
        <div className="font-mono text-xs text-[#A8672E] tracking-widest uppercase mb-2">
          Technical Inventory
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#2B1D14] mb-4">
          Skills & Architecture Stack
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-[#6B5744] font-serif leading-relaxed">
          48 validated engineering nodes organized across 5 distinct domains. No logo clouds or unverified buzzwords.
        </p>
      </section>

      {/* Cluster Filter Buttons */}
      <section className="py-6 border-b border-[#D9C9AC] flex flex-wrap gap-2 font-mono text-xs" aria-label="Skill cluster filters">
        <button
          type="button"
          onClick={() => setSelectedCluster('all')}
          className={`px-3 py-1.5 border transition-colors cursor-pointer ${
            selectedCluster === 'all'
              ? 'bg-[#2B1D14] text-[#F3E9DA] border-[#2B1D14]'
              : 'bg-[#EADFC8] text-[#2B1D14] border-[#D9C9AC] hover:border-[#2B1D14]'
          }`}
        >
          ALL CLUSTERS ({ALL_SKILLS_COUNT})
        </button>
        {SKILL_CLUSTERS.map((cluster) => (
          <button
            key={cluster.id}
            type="button"
            onClick={() => setSelectedCluster(cluster.id)}
            className={`px-3 py-1.5 border transition-colors cursor-pointer ${
              selectedCluster === cluster.id
                ? 'bg-[#2B1D14] text-[#F3E9DA] border-[#2B1D14]'
                : 'bg-[#EADFC8] text-[#2B1D14] border-[#D9C9AC] hover:border-[#2B1D14]'
            }`}
          >
            {cluster.name.split(' ')[0]} ({cluster.skills.length})
          </button>
        ))}
      </section>

      {/* Cluster Display Grid */}
      <section className="py-10 space-y-10">
        {filteredClusters.map((cluster) => (
          <SkillCluster key={cluster.id} cluster={cluster} />
        ))}
      </section>
    </PageSheet>
  );
}
