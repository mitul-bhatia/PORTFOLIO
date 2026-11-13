import type { Metadata } from 'next';
import { PageHeader } from '@/components/shell/PageHeader';
import { WorkRouteTransition } from '@/components/shell/WorkRouteTransition';
import { WorkIndex } from '@/components/lines/WorkIndex';
import { ExperienceBoard } from '@/components/lines/ExperienceBoard';
import { ContactBand } from '@/components/lines/ContactBand';
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
      <PageHeader
        title="Systems built to be used, inspected, and improved."
        lead="Three lead case studies and four smaller builds. Each keeps the problem, the implementation, and the documented result together."
      />
      <WorkIndex />
      <ExperienceBoard />
      <ContactBand />
    </WorkRouteTransition>
  );
}
