'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { animate, stagger } from 'animejs';
import { PipelineNode } from '@/content/projects';

export function PipelineSchematic({
  nodes,
  title,
}: {
  nodes: PipelineNode[];
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || hasAnimated) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // 1. Anime.js SVG path stroke draw-in
          if (pathRef.current) {
            const length = pathRef.current.getTotalLength();
            pathRef.current.style.strokeDasharray = `${length}`;
            pathRef.current.style.strokeDashoffset = `${length}`;

            animate(pathRef.current, {
              strokeDashoffset: [length, 0],
              duration: 1000,
              ease: 'easeOutQuad',
            });
          }

          // 2. Anime.js Node stamp stagger reveal
          if (containerRef.current) {
            const nodeElements = containerRef.current.querySelectorAll('.schematic-node-card');
            if (nodeElements.length > 0) {
              animate(nodeElements, {
                opacity: [0, 1],
                translateY: [12, 0],
                delay: stagger(140, { start: 200 }),
                duration: 500,
                ease: 'easeOutQuad',
              });
            }
          }
        }
      },
      { threshold: 0.25 }
    );

    const currentEl = containerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [hasAnimated, shouldReduceMotion]);

  // Strict rule: PipelineSchematic refuses to render if nodes.length !== 5
  if (!nodes || nodes.length !== 5) {
    return null;
  }

  const isAnimated = hasAnimated || shouldReduceMotion;

  return (
    <div
      ref={containerRef}
      className="border border-[#2B1D14] bg-[#F3E9DA] p-6 sm:p-8 shadow-notebook"
    >
      {/* Header plate */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between font-mono text-xs text-[#6B5744] mb-8 pb-3 border-b border-[#D9C9AC] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#A8672E]" />
          <span className="font-bold text-[#2B1D14] tracking-wider uppercase">
            5-NODE SYSTEM PIPELINE SCHEMATIC
          </span>
        </div>
        <div className="text-[11px] text-[#A8672E] font-semibold">
          {title.toUpperCase()} · AUDITABLE STATE GRAPH
        </div>
      </div>

      {/* Desktop 5-Node Layout with Anime.js SVG Stroke Draw */}
      <div className="hidden md:block relative py-6">
        {/* Orthogonal SVG connector line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 1000 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            className="schematic-connector-path"
            d="M 100 60 L 900 60"
            stroke="#A8672E"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>

        {/* 5 Node Cards */}
        <div className="grid grid-cols-5 gap-4 relative z-10">
          {nodes.map((node, idx) => (
            <div
              key={node.id}
              className={`schematic-node-card border-2 border-[#2B1D14] bg-[#EADFC8] p-4 flex flex-col justify-between min-h-[120px] shadow-notebook hover:bg-[#2B1D14] hover:text-[#F3E9DA] transition-all group relative ${
                !isAnimated ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[11px] mb-2">
                <span className="text-[#A8672E] group-hover:text-[#F3E9DA] font-bold">
                  STAGE {node.number}
                </span>
                <span className="w-1.5 h-1.5 bg-[#2B1D14] group-hover:bg-[#A8672E]" />
              </div>
              <div className="font-mono text-xs font-bold tracking-tight text-[#2B1D14] group-hover:text-[#F3E9DA] leading-snug">
                {node.label}
              </div>
              <div className="mt-3 pt-2 border-t border-[#D9C9AC] group-hover:border-[#6B5744] font-mono text-[9px] text-[#6B5744] group-hover:text-[#F3E9DA]/70 uppercase">
                {idx === 0
                  ? 'INGEST'
                  : idx === 4
                  ? 'FINAL DISPATCH'
                  : 'ISOLATED THREAD'}
              </div>

              {/* Direction Indicator */}
              {idx < 4 && (
                <div
                  className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#2B1D14] text-[#F3E9DA] text-[10px] font-mono flex items-center justify-center z-20 shadow-sm"
                  aria-hidden="true"
                >
                  ›
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Vertical Flow */}
      <div className="block md:hidden space-y-3">
        {nodes.map((node, idx) => (
          <div key={node.id} className="relative">
            <div className="border-2 border-[#2B1D14] bg-[#EADFC8] p-3 flex items-center justify-between shadow-notebook">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#A8672E] font-bold">
                  STAGE {node.number}
                </span>
                <span className="font-mono text-xs font-semibold text-[#2B1D14]">
                  {node.label}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#6B5744] uppercase">
                {idx === 0 ? 'INGEST' : idx === 4 ? 'DISPATCH' : 'STATE'}
              </span>
            </div>
            {idx < 4 && (
              <div className="text-center font-mono text-xs text-[#A8672E] py-1 font-bold">
                ↓
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Meta & Audit Trail */}
      <div className="mt-6 pt-3 border-t border-[#D9C9AC] flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] text-[#6B5744]">
        <span>CONSTRAINT: STRICT STATE GRAPH · NO UNBOUNDED RECURSION</span>
        <span className="text-[#2B1D14] font-semibold">VERIFICATION: 100% REPRODUCIBLE</span>
      </div>
    </div>
  );
}
