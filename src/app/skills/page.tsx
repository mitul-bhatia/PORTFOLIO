import type { Metadata } from 'next';
import { SkillsView } from '@/components/proof/SkillsView';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Engineering Skills & Tech Stack — Mitul Bhatia',
  description:
    'The languages, frameworks, databases, and tools Mitul Bhatia uses across AI systems, LangGraph agent workflows, and full-stack products.',
  ...pageMetadata({
    path: '/skills',
    title: 'Engineering Skills & Tech Stack — Mitul Bhatia',
    description:
      'Languages, frameworks, databases, and tools used by Mitul Bhatia across AI systems, RAG, and full-stack products.',
    keywords: [
      'Mitul Bhatia Skills',
      'Mitul Bhatia Tech Stack',
      'LangGraph Developer',
      'FastAPI Developer',
      'Next.js AI Engineer',
      'Python AI Engineer',
      'RAG Specialist',
      'Multi-Agent Orchestration',
      'Vector Databases',
      'FAISS',
      'LightRAG',
    ],
  }),
};

export default function SkillsPage() {
  return <SkillsView />;
}
