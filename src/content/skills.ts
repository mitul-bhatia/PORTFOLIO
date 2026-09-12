export interface SkillCluster {
  id: string;
  number: string;
  name: string;
  description: string;
  skills: string[];
}

export const SKILL_CLUSTERS: SkillCluster[] = [
  {
    id: 'agentic-orchestration',
    number: '01',
    name: 'Agentic Orchestration & Protocols',
    description: 'Autonomous multi-agent loops, state machines, and execution bounds.',
    skills: [
      'MCP',
      'LangGraph',
      'CrewAI',
      'AutoGen',
      'LangChain',
      'LlamaIndex',
      'Tool / Function Calling',
      'Sub-Graph Compiling',
      'Episodic & Semantic Memory',
      'Hierarchical Planning',
    ],
  },
  {
    id: 'models-inference',
    number: '02',
    name: 'Models, Fine-Tuning & Inference Runtimes',
    description: 'Neural weight distillation, local LPU acceleration, and inference serving.',
    skills: [
      'PyTorch',
      'Hugging Face Transformers',
      'vLLM',
      'Ollama',
      'Groq LPU API',
      'Anthropic Claude API',
      'OpenAI API',
      'LoRA & QLoRA',
      'Quantization (GGUF / AWQ)',
      'Model Distillation',
    ],
  },
  {
    id: 'rag-retrieval',
    number: '03',
    name: 'RAG, Vector DBs & Knowledge Retrieval',
    description: 'Deterministic knowledge extraction, cross-encoders, and hybrid vector indexers.',
    skills: [
      'Qdrant',
      'ChromaDB',
      'FAISS',
      'Pinecone',
      'Hybrid Search',
      'GraphRAG / LightRAG',
      'Cross-Encoder Reranking',
      'BM25',
      'Ragas & TruLens',
    ],
  },
  {
    id: 'backend-infra',
    number: '04',
    name: 'Backend, Async Runtime & Infrastructure',
    description: 'High-concurrency async runtimes, event queues, and container orchestration.',
    skills: [
      'Python 3.12+',
      'FastAPI',
      'Asyncio',
      'Redis & Celery',
      'PostgreSQL',
      'MongoDB',
      'Docker & Compose',
      'Kubernetes',
      'gRPC & WebSockets',
    ],
  },
  {
    id: 'frontend-tools',
    number: '05',
    name: 'Frontend UI, Languages & Engineering Tools',
    description: 'Engineered interfaces, type-safe full-stack systems, and developer ergonomics.',
    skills: [
      'TypeScript',
      'Next.js 14 / 15',
      'React 19',
      'Tailwind CSS',
      'Motion (Motion.dev)',
      'Git & GitHub Actions',
      'Vercel / Cloud Deploy',
      'VS Code & MCP Dev',
      'Anime.js v4',
      'REST & GraphQL APIs',
    ],
  },
];

export const ALL_SKILLS_COUNT = SKILL_CLUSTERS.reduce(
  (acc, cluster) => acc + cluster.skills.length,
  0
);
