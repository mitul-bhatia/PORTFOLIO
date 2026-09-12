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
    subtitle: 'Autonomous Orchestration',
    proof: 'LangGraph pipelines with autonomous multi-agent orchestration, from research to production.',
    capabilities: [
      'Multi-agent loop design (LangGraph, CrewAI)',
      'Dynamic tool-calling & sandbox executions',
      'Hierarchical planning & state machine control',
      'Short/Long-term vector database memory integration',
    ],
  },
  {
    id: 'applied-ml-data',
    number: '02',
    title: 'Applied ML & Data',
    subtitle: 'Neural Reasoning & Retrievability',
    proof: 'Domain fine-tuning, embedding optimization, and hybrid Qdrant search pipelines.',
    capabilities: [
      'Supervised fine-tuning & model distillation',
      'Advanced RAG (Hybrid Search, Re-ranking)',
      'High-volume data streaming pipelines',
      'Evaluation framework integration (Ragas, TruLens)',
    ],
  },
  {
    id: 'production-infra',
    number: '03',
    title: 'Production Infra',
    subtitle: 'Resilient Runtime Systems',
    proof: 'High-throughput asynchronous services wrapping event loops on autoscaling clusters.',
    capabilities: [
      'GPU orchestration & autoscaling nodes',
      'Async event-driven execution (FastAPI, Redis)',
      'Dockerization, Kubernetes, & cloud deployments',
      'Low-latency streaming & token caching layers',
    ],
  },
];
