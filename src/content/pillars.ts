export interface Pillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  proof: string;
  capabilities: string[];
}

export const PILLARS: Pillar[] = [
  {
    id: 'agentic-systems',
    number: '01',
    title: 'Agentic Systems',
    subtitle: 'Orchestration & Guardrails',
    proof: 'AEGIS and Raindeer.social show hands-on work with multi-agent roles, workflow state, and validation.',
    capabilities: [
      'LangGraph and CrewAI orchestration',
      'Prompt-injection guardrails',
      'Explicit workflow state',
      'Agent responsibility boundaries',
    ],
  },
  {
    id: 'retrieval-data',
    number: '02',
    title: 'Retrieval & Data',
    subtitle: 'Grounded Recommendations',
    proof: 'Agrovers uses FAISS-based RAG and multi-stage validation to improve recommendation reliability by 35%.',
    capabilities: [
      'FAISS and ChromaDB retrieval',
      'LightRAG and GraphRAG workflows',
      'Multi-stage validation',
      'Domain-oriented recommendation systems',
    ],
  },
  {
    id: 'production-infra',
    number: '03',
    title: 'Product Engineering',
    subtitle: 'Backend to Interface',
    proof: 'Kolably and Flately connect backend APIs, real-time state, databases, and responsive product interfaces.',
    capabilities: [
      'FastAPI and Express services',
      'Redis Pub/Sub and WebSockets',
      'React, Next.js, and Redux',
      'PostgreSQL, MongoDB, and Supabase',
    ],
  },
];
