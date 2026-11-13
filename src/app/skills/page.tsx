import type { Metadata } from 'next';
import { PageHeader } from '@/components/shell/PageHeader';
import { ContactBand } from '@/components/lines/ContactBand';
import { SKILL_CLUSTERS } from '@/content/skills';
import { Reveal } from '@/components/ui/Reveal';
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

const CLUSTER_COLORS = ['red', 'blue', 'green', 'yellow'] as const;

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        title="A practical stack for AI systems and full-stack products."
        lead="Languages, frameworks, databases, and tools that appear in my projects, internships, and current study. Each group is a line; each stop is a tool from that work."
      />
      <div className="wrap section grid gap-16 !pt-14">
        {SKILL_CLUSTERS.map((cluster, index) => (
          <Reveal
            as="section"
            key={cluster.id}
            className={`line-${CLUSTER_COLORS[index % CLUSTER_COLORS.length]} grid gap-8 lg:grid-cols-12 lg:gap-12`}
            aria-labelledby={`cluster-${cluster.id}`}
          >
            <div className="lg:col-span-4">
              <span className="bullet bullet-lg" aria-hidden="true">
                {index + 1}
              </span>
              <h2 id={`cluster-${cluster.id}`} className="t-h2 mt-5">
                {cluster.name}
              </h2>
              <p className="mt-4 max-w-[36ch] text-muted">{cluster.description}</p>
            </div>
            <ul className="stops content-start sm:grid-cols-2 lg:col-span-8 lg:pt-2">
              {cluster.skills.map((skill) => (
                <li key={skill} className="t-sign text-[1.05rem]">
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <ContactBand />
    </>
  );
}
