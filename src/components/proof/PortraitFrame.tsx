import Image from 'next/image';
import { PROFILE } from '@/content/profile';

export function PortraitFrame() {
  const currentRole = PROFILE.experience[0];

  return (
    <figure className="border border-[var(--ink)] bg-[var(--paper-soft)]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--elevated)]">
        <Image
          src="/assets/profile.jpg"
          alt={`Portrait of ${PROFILE.name}`}
          fill
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover object-[center_12%]"
          priority
        />
      </div>
      <figcaption className="border-t border-[var(--border-notebook)] px-4 py-4 sm:px-5">
        <p className="font-serif text-xl font-semibold text-[var(--ink)]">{PROFILE.name}</p>
        <p className="mt-1 text-sm text-[var(--muted)]">{PROFILE.primaryTitle}</p>
        {currentRole && (
          <p className="mt-3 text-sm leading-6 text-[var(--ink)]">
            {currentRole.role} at {currentRole.organization}
            <span className="text-[var(--muted)]"> · {currentRole.tenure}</span>
          </p>
        )}
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent-dark)]">
          {PROFILE.degree} · {PROFILE.cgpa} CGPA
        </p>
      </figcaption>
    </figure>
  );
}
