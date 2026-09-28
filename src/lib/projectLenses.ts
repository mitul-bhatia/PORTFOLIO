import type { Project } from '@/content/projects';

export type WorkLensId = 'all' | 'agentic' | 'full-stack' | 'data';

export type WorkLens = {
  id: WorkLensId;
  label: string;
  description: string;
};

/** Honest filters derived from stack + tag copy — not invented categories. */
export const WORK_LENSES: WorkLens[] = [
  {
    id: 'all',
    label: 'All work',
    description: 'Lead case studies and additional projects',
  },
  {
    id: 'agentic',
    label: 'Agentic & AI',
    description: 'Multi-agent, RAG, and LLM orchestration in the stack',
  },
  {
    id: 'full-stack',
    label: 'Full-stack & real-time',
    description: 'Product surfaces with concurrent client + server delivery',
  },
  {
    id: 'data',
    label: 'Data & compliance',
    description: 'Tabular ML, telemetry analytics, and regulatory engines',
  },
];

const AGENTIC_MARKERS = ['LangChain', 'LangGraph', 'LightRAG', 'FAISS', 'Groq API', 'LlamaIndex', 'ChromaDB'];
const FULL_STACK_MARKERS = ['Socket.IO', 'Redis', 'Express 5', 'MongoDB Atlas'];
const DATA_MARKERS = ['XGBoost', 'Jupyter', 'Tableau', 'TabNet', 'Streamlit'];

export function projectMatchesLens(project: Project, lens: WorkLensId): boolean {
  if (lens === 'all') return true;

  const stack = project.stack;
  const haystack = `${project.tag} ${project.problem}`.toLowerCase();

  if (lens === 'agentic') {
    return (
      AGENTIC_MARKERS.some((marker) => stack.includes(marker)) ||
      haystack.includes('multi-agent') ||
      haystack.includes('agent')
    );
  }

  if (lens === 'full-stack') {
    const hasReact = stack.some((item) => item.startsWith('React'));
    return hasReact && FULL_STACK_MARKERS.some((marker) => stack.includes(marker));
  }

  if (lens === 'data') {
    return DATA_MARKERS.some((marker) => stack.includes(marker)) || haystack.includes('compliance');
  }

  return true;
}
