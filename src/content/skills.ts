export interface SkillCluster {
  id: string;
  number: string;
  name: string;
  description: string;
  skills: string[];
}

export const SKILL_CLUSTERS: SkillCluster[] = [
  {
    id: 'ai-systems',
    number: '01',
    name: 'AI & Agentic Systems',
    description: 'Orchestration, retrieval, memory, and grounded model workflows.',
    skills: [
      'LangGraph',
      'LangChain',
      'CrewAI',
      'RAG Pipelines',
      'LightRAG / GraphRAG',
      'FAISS',
      'ChromaDB',
      'Groq API',
      'Anthropic Claude API',
      'Hugging Face',
    ],
  },
  {
    id: 'backend-infra',
    number: '02',
    name: 'Backend & Infrastructure',
    description: 'APIs, databases, real-time state, and containerized services.',
    skills: [
      'FastAPI',
      'Node.js / Express',
      'PostgreSQL',
      'MongoDB',
      'MySQL',
      'Redis',
      'Supabase',
      'Docker',
      'WebSockets',
    ],
  },
  {
    id: 'frontend',
    number: '03',
    name: 'Frontend Engineering',
    description: 'Responsive product interfaces and predictable client state.',
    skills: ['Next.js', 'React 19', 'Redux Toolkit', 'Tailwind CSS', 'TypeScript'],
  },
  {
    id: 'languages-tools',
    number: '04',
    name: 'Languages & Tools',
    description: 'The daily toolkit behind projects, experiments, and collaboration.',
    skills: [
      'Python',
      'TypeScript',
      'JavaScript',
      'SQL',
      'Git / GitHub Actions',
      'Claude Code',
      'Obsidian',
      'Ollama',
    ],
  },
];

export const ALL_SKILLS_COUNT = SKILL_CLUSTERS.reduce(
  (total, cluster) => total + cluster.skills.length,
  0,
);
