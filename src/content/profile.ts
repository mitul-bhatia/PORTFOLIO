export interface ExperienceItem {
  role: string;
  organization: string;
  tenure: string;
  context: string;
  skills?: string[];
  details: string[];
}

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
  x: string;
  leetcode: string;
  codeforces: string;
  degree: string;
  school: string;
  years: string;
  cgpa: string;
  academicStatus: string;
  classXII: { school: string; percentage: string };
  classX: { school: string; percentage: string };
  ratings: { leetcode: string; codeforces: string };
  aiStudio: { tenure: string; description: string };
  experience: ExperienceItem[];
  honors: Array<{ title: string; detail?: string }>;
  heroStamp: string;
  positioning: string;
  bio: string;
  resumeSummary: string;
  metaDescription: string;
  openGraphDescription: string;
  methodology: Array<{ id: string; title: string; description: string }>;
}

export const PROFILE: Profile = {
  name: 'Mitul Bhatia',
  primaryTitle: 'AI / Full-Stack Engineer',
  alternateTitle: 'Backend-focused engineering student',
  subtitle: 'Agentic Systems & LLM Infrastructure',
  email: 'mitul.bhatia2024@nst.rishihood.edu.in',
  phone: '+91 76686 46665',
  location: 'Sonipat, Haryana, India',
  domain: 'https://mitulbhatia.dev',
  github: 'https://github.com/mitul-bhatia',
  linkedin: 'https://linkedin.com/in/mitul-bhatia',
  x: 'https://x.com/mitulb05',
  leetcode: 'https://leetcode.com/mitul-bhatia',
  codeforces: 'https://codeforces.com/profile/mitul-bhatia',
  degree: 'B.Tech in Artificial Intelligence',
  school: 'Newton School of Technology, Rishihood University',
  years: '2024 - 2028',
  cgpa: '9.65 / 10.0',
  academicStatus: 'Through Semester 4 · Currently in Semester 5',
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
    tenure: '2025 - 2026',
    description:
      'Selected for the competitive AI Studio cohort with dedicated GPU compute for agentic and RAG projects.',
  },
  experience: [
    {
      role: 'Software Developer Intern',
      organization: 'Kolably',
      tenure: 'Jul 2026 - Sep 2026',
      context: 'Remote · Creator-business collaboration platform',
      skills: ['FastAPI', 'Node.js', 'REST APIs', 'PostgreSQL', 'Auth'],
      details: [
        'Worked alongside the founding team on a live platform connecting local businesses with nearby content creators.',
        'Contributed backend APIs, product features, and bug fixes while following the team\'s security and confidentiality practices.',
      ],
    },
    {
      role: 'AI Agents Lead',
      organization: 'Raindeer.social',
      tenure: 'Jun 2026 · 1 month',
      context: 'Remote · AI-agent social media platform',
      skills: ['CrewAI', 'LangGraph', 'Python', 'Multi-Agent', 'Asyncio'],
      details: [
        'Led the AI layer of a 10-agent orchestration system built with CrewAI and LangGraph.',
        'Contributed orchestration and pipeline logic across research, content generation, design, and scheduling.',
      ],
    },
    {
      role: 'AI Studio Fellow',
      organization: 'Newton School of Technology',
      tenure: '2025 - 2026',
      context: 'Selected cohort · Dedicated GPU compute',
      skills: ['PyTorch', 'NVIDIA GPUs', 'FAISS RAG', 'LangChain'],
      details: [
        'Prototyped and shipped production-oriented agentic and RAG pipelines through coursework and independent systems.',
      ],
    },
  ],
  honors: [
    { title: 'Tata Data Visualisation', detail: 'Forage Job Simulation · Jan 2026' },
    { title: 'Hacktoberfest Contributor', detail: 'Reviewed open-source pull requests' },
    { title: 'Mumbai Hacks', detail: 'Prototype and presentation participant' },
  ],
  heroStamp: "B.Tech AI · Newton School of Technology '28",
  positioning:
    'I build agentic and full-stack systems with explicit state, measurable behavior, and interfaces people can understand.',
  bio:
    'I am an AI and full-stack engineering student at Newton School of Technology, Rishihood University. My work spans agent orchestration, retrieval systems, backend APIs, and real-time product experiences.\n\nI care about the parts that make an AI system dependable: clear state, useful guardrails, grounded retrieval, and software that remains understandable after the demo.',
  resumeSummary:
    'Backend and AI systems engineer with startup experience at Kolably and Raindeer.social, hands-on work across multi-agent systems, RAG pipelines, FastAPI, React, and real-time infrastructure, holding a 9.65 CGPA at Newton School of Technology.',
  metaDescription:
    'Portfolio of Mitul Bhatia, an AI and full-stack engineer building agentic systems, RAG pipelines, backend APIs, and real-time products.',
  openGraphDescription:
    'Agentic systems, backend engineering, and full-stack products with clear architecture and measured results.',
  methodology: [
    {
      id: '01',
      title: 'Start with the user path',
      description: 'Define the decision or task before choosing models, tools, or infrastructure.',
    },
    {
      id: '02',
      title: 'Make state explicit',
      description: 'Keep orchestration steps, memory boundaries, and failure handling visible in the system design.',
    },
    {
      id: '03',
      title: 'Measure the critical path',
      description: 'Track latency, matching quality, and retrieval behavior where they affect the product experience.',
    },
    {
      id: '04',
      title: 'Ship and iterate',
      description: 'Move from prototype to a working interface, then use real constraints and feedback to improve it.',
    },
  ],
};
