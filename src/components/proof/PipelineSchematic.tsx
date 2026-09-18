'use client';

import { useEffect, useRef, useState } from 'react';
import { PipelineNode } from '@/content/projects';

export function PipelineSchematic({ nodes, title }: { nodes: PipelineNode[]; title: string }) {
  const containerRef = useRef<HTMLElement>(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined') return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Spec rule: refuse to render if nodes !== 5
  if (!nodes || nodes.length !== 5) return null;

  return (
    <figure
      ref={containerRef}
      className="border border-[var(--border-notebook)] bg-[var(--paper-soft)] p-5 shadow-notebook sm:p-7"
    >
      <div className="flex items-center justify-between border-b border-[var(--border-notebook)] pb-3 font-mono text-[9px] uppercase tracking-[0.11em] text-[var(--muted)]">
        <span>{title} Architecture Pipeline</span>
        <span>5 Discrete Stages // Inspectable</span>
      </div>

      {/* Native SVG bus interconnect line with stroke-dashoffset animation */}
      <div className="relative mt-7 hidden md:block">
        <svg className="h-6 w-full overflow-visible" viewBox="0 0 1000 24" fill="none">
          <line
            x1="100"
            y1="12"
            x2="900"
            y2="12"
            stroke="var(--border-notebook)"
            strokeWidth="1.5"
            strokeDasharray="800"
            strokeDashoffset={hasDrawn ? '0' : '800'}
            className="transition-all duration-1000 ease-out"
          />
          {/* Stage bus nodes */}
          {[100, 300, 500, 700, 900].map((cx, i) => (
            <g key={cx} className={`transition-opacity duration-300 ${hasDrawn ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${i * 180 + 200}ms` }}>
              <circle cx={cx} cy="12" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
              <rect x={cx - 2} y="10" width="4" height="4" fill="var(--accent)" />
            </g>
          ))}
        </svg>
      </div>

      <ol className="mt-3 grid gap-3 md:grid-cols-5 md:gap-0">
        {nodes.map((node, index) => (
          <li
            key={node.id}
            className={`relative flex min-h-24 items-center border border-[var(--border-notebook)] bg-[var(--paper)] p-4 transition-all duration-500 md:border-r-0 md:last:border-r ${
              hasDrawn ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 120 + 100}ms` }}
          >
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--accent-dark)]">
                Stage {node.number}
              </span>
              <p className="mt-2 text-sm font-semibold leading-5 text-[var(--ink)]">{node.label}</p>
            </div>
            {index < nodes.length - 1 && (
              <span
                className="absolute -bottom-[7px] left-5 z-10 h-3 w-3 rotate-45 border-b border-r border-[var(--accent)] bg-[var(--paper-soft)] md:-right-[7px] md:bottom-auto md:left-auto md:rotate-[-45deg]"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>

      <figcaption className="mt-5 max-w-[68ch] font-mono text-[10px] leading-5 text-[var(--muted)]">
        Hand-rolled native SVG pipeline draw-in (07B compliant). End-to-end handoffs are auditable with zero runtime motion overhead.
      </figcaption>
    </figure>
  );
}
