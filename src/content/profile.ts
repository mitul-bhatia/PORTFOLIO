export interface Profile {
  name: string;
  primaryTitle: string;
  alternateTitle: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  domain: string;
  github: string;
  linkedin: string;
  leetcode: string;
  codeforces: string;
  degree: string;
  school: string;
  years: string;
  cgpa: string;
  classXII: {
    school: string;
    percentage: string;
  };
  classX: {
    school: string;
    percentage: string;
  };
  ratings: {
    leetcode: string;
    codeforces: string;
  };
  aiStudio: {
    tenure: string;
    description: string;
  };
  honors: Array<{
    title: string;
    detail?: string;
  }>;
  heroStamp: string;
  positioning: string;
  bio: string;
  resumeSummary: string;
  metaDescription: string;
  openGraphDescription: string;
  methodology: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export const PROFILE: Profile = {
  name: 'Mitul Bhatia',
  primaryTitle: 'AI Agent & Systems Engineer',
  alternateTitle: 'AI & Full-Stack Engineer',
  subtitle: 'Agentic Systems & LLM Infrastructure',
  email: 'mitul.bhatia2024@nst.rishihood.edu.in',
  phone: '+91 76686 46665',
  location: 'Sonipat, Haryana, India',
  domain: 'https://mitulbhatia.dev',
  github: 'https://github.com/mitul-bhatia',
  linkedin: 'https://linkedin.com/in/mitul-bhatia',
  leetcode: 'https://leetcode.com/mitul-bhatia',
  codeforces: 'https://codeforces.com/profile/mitul-bhatia',
  degree: 'B.Tech in Artificial Intelligence',
  school: 'Newton School of Technology, Rishihood University',
  years: '2024 – 2028',
  cgpa: '9.80 / 10.0',
  classXII: {
    school: 'Shri Chetanya TechnoSchool',
    percentage: '80.2%',
  },
  classX: {
    school: 'St. Joseph Academy',
    percentage: '95.2%',
  },
  ratings: {
    leetcode: '1400+',
    codeforces: '900+',
  },
  aiStudio: {
    tenure: '2025 – present',
    description: 'Dedicated GPU cluster; production agentic + RAG pipelines',
  },
  honors: [
    { title: 'Selected for AI Studio Program (NST)' },
    { title: 'Tata Data Visualisation (Forage, Jan 2026)' },
    { title: 'Mumbai Hacks Contributor' },
    { title: 'Hacktoberfest Contributor' },
  ],
  heroStamp: '● Computer Science @ Newton School of Technology \'28',
  positioning:
    'Mitul Bhatia designs agentic systems the way an engineer designs a plant: explicit state, measured latency, and a diagram you can audit — not a vibe.',
  bio: 'I am an AI Systems Engineer currently pursuing a B.Tech in Artificial Intelligence at Newton School of Technology, Rishihood University (Class of 2028), holding a CGPA of 9.80/10.0.\n\nMy technical focus lies at the intersection of agentic orchestration loops, memory consistency, and predictable scaling runtimes. When I am not designing state machines in LangGraph, I test my skills algorithmically: I am rated 1400+ on LeetCode and 900+ on Codeforces.',
  resumeSummary:
    'AI/CS undergraduate selected for the AI Studio program at Newton School of Technology. Builds production-oriented agentic systems end-to-end — multi-agent orchestration (LangGraph), RAG pipelines, and full-stack apps (FastAPI, Next.js, PostgreSQL). Product-first engineering mindset with a competitive-programming foundation (1400+ LeetCode, 900+ Codeforces).',
  metaDescription:
    'Portfolio of Mitul Bhatia — Computer Science student at Newton School of Technology specializing in multi-agent systems, LangGraph pipelines, RAG architecture, and production AI infrastructure.',
  openGraphDescription:
    'Architecting autonomous coordination loops, RAG pipelines, and high-reliability AI infrastructure.',
  methodology: [
    {
      id: '01',
      title: 'Deterministic Loops',
      description:
        'I enforce rigid state constraints on LLM execution threads to guarantee predictable agent behaviors.',
    },
    {
      id: '02',
      title: 'Applied Fine-tuning',
      description:
        'I distill complex task knowledge into smaller models, aggressively reducing token latency and API overhead.',
    },
    {
      id: '03',
      title: 'Graph Orchestration',
      description:
        'I structure multi-agent responsibilities as explicit state graphs, ensuring clean routing and fault tolerance.',
    },
    {
      id: '04',
      title: 'Adversarial Eval',
      description:
        'I subject my workflows to automated logic stress tests, hunting for edge-case hallucinations before deployment.',
    },
  ],
};
