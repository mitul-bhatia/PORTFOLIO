import type { Metadata } from 'next';
import { PageSheet } from '@/components/shell/PageSheet';
import { WorkRouteTransition } from '@/components/shell/WorkRouteTransition';
import { WorkProjectIndex } from '@/components/proof/WorkProjectIndex';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected agentic, backend, data, and full-stack projects by Mitul Bhatia.',
  ...pageMetadata({
    path: '/work',
    title: 'Selected engineering work — Mitul Bhatia',
    description: 'Agentic, backend, data, and full-stack case studies with architecture and documented outcomes.',
  }),
};

export default function WorkPage() {
  return (
    <WorkRouteTransition>
      <PageSheet folio="Work / Selected projects">
        <section className="border-b border-[var(--border-notebook)] pb-12 pt-4 sm:pb-16">
          <h1 className="balanced-heading max-w-[var(--measure-wide)] font-serif text-5xl font-semibold leading-[0.98] text-[var(--ink)] sm:text-6xl">
            Systems built to be used, inspected, and improved.
          </h1>
          <p className="mt-6 max-w-[var(--measure)] text-base leading-7 text-[var(--muted)] sm:text-lg">
            The three lead projects mirror the supplied resume. Each case study keeps the problem, implementation, interface, and documented result close together.
          </p>
        </section>

        <WorkProjectIndex />
      </PageSheet>
    </WorkRouteTransition>
  );
}
