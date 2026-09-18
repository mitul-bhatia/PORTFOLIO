export interface MetricItem {
  label: string;
  value: string;
  suffix?: string;
  numericTarget?: number;
}

export interface PipelineNode {
  id: string;
  number: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  tag: string;
  isFlagship: boolean;
  problem: string;
  stack: string[];
  metrics?: MetricItem[];
  reflection?: string;
  nodes?: PipelineNode[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'aegis',
    title: 'AEGIS',
    tag: 'Multi-Agent AI Security & Guardrail Engine',
    isFlagship: true,
    problem:
      'An autonomous seven-agent security pipeline that detects, exploits, patches, and validates software vulnerabilities. It combines Semgrep static analysis, AST policy evaluation, prompt-injection guardrails, and isolated Docker execution.',
    stack: ['FastAPI', 'Python', 'LangChain', 'Semgrep', 'React', 'Next.js', 'Docker'],
    metrics: [
      { label: 'Guardrail latency', value: '<24ms' },
      { label: 'Injection recall', value: '99.8%' },
      { label: 'Cooperating agents', value: '7' },
    ],
    reflection:
      'The project separates detection, exploitation, patching, and validation into explicit roles so the security workflow stays inspectable from end to end.',
    nodes: [
      { id: '01', number: '01', label: 'Payload Ingest' },
      { id: '02', number: '02', label: 'Semgrep AST Scan' },
      { id: '03', number: '03', label: 'Memory Isolation' },
      { id: '04', number: '04', label: 'Threat Evaluator' },
      { id: '05', number: '05', label: 'Sanitized Output' },
    ],
    githubUrl: 'https://github.com/mitul-bhatia/Aegis',
    liveUrl: 'https://aegis-ecru-eta.vercel.app/',
    image: '/assets/projects/aegis.jpg',
  },
  {
    slug: 'flately',
    title: 'Flately',
    tag: 'Full-Stack & Real-Time',
    isFlagship: true,
    problem:
      'A real-time housing and roommate matching product with multi-factor preference scoring, concurrent chat, and low-latency state delivery.',
    stack: ['React 19', 'Redux Toolkit', 'Express 5', 'MongoDB Atlas', 'Socket.IO', 'Redis', 'Node.js'],
    metrics: [
      { label: 'Socket sync', value: '<45ms' },
      { label: 'Match precision', value: '94.2%' },
      { label: 'State transport', value: 'WebSocket' },
    ],
    reflection:
      'Redis Pub/Sub lets WebSocket workers scale horizontally while keeping chat state and matching updates responsive across instances.',
    nodes: [
      { id: '01', number: '01', label: 'Client Dispatch' },
      { id: '02', number: '02', label: 'Socket.IO Gateway' },
      { id: '03', number: '03', label: 'Redis Pub/Sub' },
      { id: '04', number: '04', label: 'Scoring Engine' },
      { id: '05', number: '05', label: 'Match Resolver' },
    ],
    githubUrl: 'https://github.com/mitul-bhatia/flately',
    liveUrl: 'https://frontend-roan-one-suwo5dr71s.vercel.app/',
    image: '/assets/projects/flately.jpg',
  },
  {
    slug: 'agrovers',
    title: 'Agrovers',
    tag: 'AI Soil & Crop Intelligence',
    isFlagship: true,
    problem:
      'An AI assistant that turns raw soil inputs into crop and fertilizer recommendations for low-connectivity, low-literacy users.',
    stack: ['FastAPI', 'LangChain', 'FAISS RAG', 'Python', 'React'],
    metrics: [
      { label: 'Recommendation reliability', value: '+35%' },
      { label: 'Retrieval', value: 'FAISS RAG' },
      { label: 'Validation', value: 'Multi-stage' },
    ],
    reflection:
      'The system combines retrieval with multi-stage validation so recommendations remain useful when source inputs are incomplete or inconsistent.',
    nodes: [
      { id: '01', number: '01', label: 'Telemetry Ingest' },
      { id: '02', number: '02', label: 'Embedding Encoder' },
      { id: '03', number: '03', label: 'FAISS Vector Store' },
      { id: '04', number: '04', label: 'LangChain Loop' },
      { id: '05', number: '05', label: 'Yield Advisory' },
    ],
    githubUrl: 'https://github.com/mitul-bhatia/agrovers_wow',
    liveUrl: 'https://agrovers-wow-tau.vercel.app/',
    image: '/assets/projects/agrovers.jpg',
  },
  {
    slug: 'creditsense',
    title: 'CreditSense (CREDENCE)',
    tag: 'RBI Lending Compliance Engine',
    isFlagship: false,
    problem:
      'RBI lending compliance engine with rapid customer profile retrieval and regulatory rule checks.',
    stack: ['LightRAG', 'Groq API', 'FastAPI', 'React', 'Vite'],
    image: '/assets/projects/creditsense.jpg',
  },
  {
    slug: 'loan-classifier',
    title: 'GEN AI Loan Approval Classifier',
    tag: 'Explainable Tabular Classification',
    isFlagship: false,
    problem:
      'Explainable tabular classification: XGBoost + LlamaIndex + TabNet audit trails.',
    stack: ['XGBoost', 'RAG', 'Streamlit', 'Python', 'LlamaIndex'],
    githubUrl: 'https://github.com/mitul-bhatia/GEN_AI_LOAN_APPROVAL',
    liveUrl: 'https://genailoanapproval-fdwemcnw96p8fgwpen6xcd.streamlit.app/',
    image: '/assets/projects/loan-classifier.jpg',
  },
  {
    slug: 'f1-strategy',
    title: 'F1 Race Strategy Intelligence',
    tag: 'Formula 1 Telemetry Analytics',
    isFlagship: false,
    problem:
      'DVA capstone, 7-member team, 744K+ Ergast rows, 10 KPIs analyzing pit window optimization.',
    stack: ['Jupyter', 'Python', 'Tableau'],
    githubUrl: 'https://github.com/mitul-bhatia/Sec-A_g-4_F1_Race_Strategy_Intelligence',
    image: '/assets/projects/f1-strategy.jpg',
  },
  {
    slug: 'vulnswarm',
    title: 'VULNSWARM',
    tag: 'Autonomous Repo Triage & CVE Remediation',
    isFlagship: false,
    problem:
      'Autonomous repository triage and CVE remediation through multi-agent vulnerability analysis.',
    stack: ['LangGraph', 'ChromaDB', 'Docker', 'Semgrep', 'FastAPI'],
    image: '/assets/projects/vulnswarm.jpg',
  },
];

export const FLAGSHIP_PROJECTS = PROJECTS.filter((p) => p.isFlagship);
export const SECONDARY_PROJECTS = PROJECTS.filter((p) => !p.isFlagship);

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
