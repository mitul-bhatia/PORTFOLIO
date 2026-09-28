'use client';

import { useState } from 'react';
import { Pillar } from '@/content/pillars';

export function PillarCard({ pillar }: { pillar: Pillar }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="relative bg-[var(--paper-soft)] p-6 transition-[background-color] duration-[var(--dur-1)] ease-[var(--ease-out)] sm:p-8 hover:bg-[var(--elevated)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-[var(--accent)] transition-transform duration-[var(--dur-1)] ease-[var(--ease-out)] ${hovered ? 'scale-x-100' : 'scale-x-0'}`}
      />
      <h3 className="font-serif text-3xl font-semibold leading-tight text-[var(--ink)]">
        {pillar.title}
      </h3>
      <p className="mt-2 text-sm text-[var(--accent-dark)]">{pillar.subtitle}</p>
      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{pillar.proof}</p>
      <ul className="mt-6 border-t border-[var(--border-notebook)] pt-4 text-sm text-[var(--ink)]">
        {pillar.capabilities.map((item) => (
          <li key={item} className="border-b border-[var(--border-notebook)] py-2.5 last:border-b-0">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
