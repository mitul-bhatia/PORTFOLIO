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
  githubUrl: string;
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
      'Production multi-agent systems face severe risks from untrusted prompt injections, rogue tool calls, and payload leaks. Aegis enforces real-time AST policy evaluation, strict memory isolation, and automated zero-human threat remediation.',
    stack: ['FastAPI', 'Python', 'LangChain', 'Semgrep', 'React', 'Next.js', 'Docker'],
    metrics: [
      { label: 'Guardrail latency', value: '<24ms' },
      { label: 'Injection recall', value: '99.8%' },
      { label: 'Zero-human intervention', value: '100%' },
    ],
    reflection:
      'Autonomous multi-agent guardrails filtering malicious payloads and enforcing strict execution bounds before tools execute.',
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
      'Matching compatible roommates requires complex multi-factor preference scoring, real-time message routing, and reliable state delivery under peak traffic without latency spikes.',
    stack: ['React 19', 'Redux Toolkit', 'Express 5', 'MongoDB Atlas', 'Socket.IO', 'Node.js'],
    metrics: [
      { label: 'Socket sync', value: '<45ms' },
      { label: 'Match precision', value: '94.2%' },
      { label: 'Uptime', value: '99.9%' },
    ],
    reflection:
      'Implement horizontal Redis Pub/Sub scaling across WebSocket worker instances to handle high concurrent chat volume with zero message loss.',
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
      'Agricultural soil testing and crop selection lack deterministic multi-factor analysis, resulting in yield losses due to unoptimized N-P-K nutrient application and poor weather integration.',
    stack: ['FastAPI', 'LangChain', 'FAISS RAG', 'Python', 'React'],
    metrics: [
      { label: 'Rec reliability', value: '+35%' },
      { label: 'Retrieval latency', value: '<85ms' },
      { label: 'Soil analysis acc.', value: '96.8%' },
    ],
    reflection:
      'Integrate multi-modal satellite spectral imagery to automatically validate soil nitrogen-phosphorus-potassium readings and soil moisture.',
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
    githubUrl: 'https://github.com/mitul-bhatia/creditsense',
  },
  {
    slug: 'loan-classifier',
    title: 'GEN AI Loan Approval Classifier',
    tag: 'Explainable Tabular Classification',
    isFlagship: false,
    problem:
      'Explainable tabular classification: XGBoost + LlamaIndex + TabNet audit trails.',
    stack: ['XGBoost', 'RAG', 'Streamlit', 'Python', 'LlamaIndex'],
    githubUrl: 'https://github.com/mitul-bhatia',
    liveUrl: 'https://genailoanapproval-fdwemcnw96p8fgwpen6xcd.streamlit.app/',
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
  },
  {
    slug: 'vulnswarm',
    title: 'VULNSWARM',
    tag: 'Autonomous Repo Triage & CVE Remediation',
    isFlagship: false,
    problem:
      'Autonomous repository triage and CVE remediation through multi-agent vulnerability analysis.',
    stack: ['LangGraph', 'ChromaDB', 'Docker', 'Semgrep', 'FastAPI'],
    githubUrl: 'https://github.com/mitul-bhatia/zombie-api-defense-operator',
  },
];

export const FLAGSHIP_PROJECTS = PROJECTS.filter((p) => p.isFlagship);
export const SECONDARY_PROJECTS = PROJECTS.filter((p) => !p.isFlagship);

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
