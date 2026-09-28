'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PROFILE } from '@/content/profile';
import { getProjectBySlug } from '@/content/projects';

const aegis = getProjectBySlug('aegis');
const currentRole = PROFILE.experience[0];

export function HeroSchematicPlate() {
  return (
    <aside className="flex max-h-[calc(100svh-64px-4.5rem)] flex-col border border-[var(--ink)] bg-[var(--paper-soft)]">
      <figure className="relative aspect-[4/5] min-h-0 w-full flex-1 overflow-hidden bg-[var(--elevated)] max-h-[calc(100svh-64px-7rem)]">
        <Image
          src="/assets/profile.jpg"
          alt={`Portrait of ${PROFILE.name}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 38vw"
          className="object-cover object-[center_12%]"
        />
        <figcaption className="absolute inset-x-0 bottom-0 border-t border-[var(--paper)]/20 bg-[color-mix(in_srgb,var(--ink)_72%,transparent)] px-4 py-4">
          <p className="font-serif text-lg font-semibold leading-snug text-[var(--paper-soft)] sm:text-xl">
            {currentRole?.role}
          </p>
          <p className="mt-1 text-sm text-[var(--paper-soft)]/85">
            {currentRole?.organization} · {currentRole?.tenure}
          </p>
        </figcaption>
      </figure>

      <div className="shrink-0 border-t border-[var(--border-notebook)] px-4 py-4 sm:px-5 sm:py-5">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">Education</dt>
            <dd className="mt-1 font-medium leading-snug text-[var(--ink)]">{PROFILE.school}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">CGPA</dt>
            <dd className="mt-1 font-serif text-xl font-semibold tabular-nums text-[var(--ink)]">{PROFILE.cgpa}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">Location</dt>
            <dd className="mt-1 font-medium text-[var(--ink)]">{PROFILE.location}</dd>
          </div>
        </dl>

        {aegis && (
          <div className="mt-5 border-t border-[var(--border-notebook)] pt-4">
            <p className="text-sm leading-6 text-[var(--muted)]">
              Flagship work:{' '}
              <span className="text-[var(--ink)]">{aegis.title}</span>
              {aegis.metrics?.[0] ? (
                <>
                  {' '}
                  — {aegis.metrics[0].value} {aegis.metrics[0].label.toLowerCase()}
                </>
              ) : null}
            </p>
            <Link
              href="/work/aegis"
              className="mt-3 inline-flex font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-dark)] hover:underline"
            >
              Read the AEGIS case study →
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
