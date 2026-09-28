import type { Metadata } from 'next';
import { PageSheet } from '@/components/shell/PageSheet';
import { WorkRouteTransition } from '@/components/shell/WorkRouteTransition';
import { WorkProjectIndex } from '@/components/proof/WorkProjectIndex';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Selected Engineering Work & AI Projects — Mitul Bhatia',
  description: 'Selected agentic, backend, data, and full-stack projects by Mitul Bhatia with architecture diagrams and documented metrics.',
  ...pageMetadata({
    path: '/work',
    title: 'Selected Engineering Work & AI Projects — Mitul Bhatia',
    description: 'Selected agentic, backend, data, and full-stack projects by Mitul Bhatia with architecture diagrams and documented metrics.',
    keywords: [
      'Mitul Bhatia Projects',
      'Mitul Bhatia Work',
      'AEGIS AI Guardrail',
      'Flately Roommate Matcher',
      'Agrovers Crop Intelligence',
      'CreditSense RBI Lending',
      'Agentic Systems Portfolio',
      'LangGraph Projects',
      'FastAPI Backend Projects',
      'Full-Stack Portfolio',
    ],
  }),
};

export default function WorkPage() {
  return (
    <WorkRouteTransition>
      <PageSheet folio="Work / Selected projects">
        <section className="border-b border-[var(--border-notebook)] pb-12 pt-4 sm:pb-16">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-dark)]">
            Mitul Bhatia · Systems Portfolio
          </p>
          <h1 className="mt-2 balanced-heading max-w-[var(--measure-wide)] font-serif text-5xl font-semibold leading-[0.98] text-[var(--ink)] sm:text-6xl">
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
