import { PROFILE } from '@/content/profile';
import { PROJECTS, getProjectBySlug } from '@/content/projects';
import { SKILL_CLUSTERS } from '@/content/skills';
import { SiteMood, classifyPromptMood } from '@/lib/moodClassifier';

export interface ConciergeAction {
  type: 'navigate' | 'open_resume';
  path?: string;
  label?: string;
}

export interface ConciergeResponse {
  text: string;
  actions?: ConciergeAction[];
  inferredMood?: SiteMood;
  moodReason?: string;
}

export type NotebookTone = SiteMood;

export const NOTEBOOK_UNKNOWN_TEXT =
  'I do not have that specific detail recorded in the telemetry. I can answer about Mitul’s projects, experience, education, skills, achievements, availability, or resume.';

function includesAny(query: string, terms: string[]): boolean {
  return terms.some((term) => {
    if (term.length <= 3) {
      return new RegExp(`\\b${term}\\b`, 'i').test(query);
    }
    return query.includes(term);
  });
}

function applyTone(text: string, tone: NotebookTone): string {
  if (tone === 'focused') return `[CIRCUIT // FOCUSED] ${text}`;
  if (tone === 'charting') return `[BLUEPRINT // CHARTING] ${text}`;
  if (tone === 'arriving') return `[ROUTING // ARRIVING] ${text}`;
  if (tone === 'guarded') return `[PERIMETER // GUARDED] ${text}`;
  if (tone === 'jealous') return `[RIVALRY // JEALOUS] ${text}`;
  if (tone === 'bragger') return `[FLEX // SWAGGER] ${text}`;
  if (tone === 'fan') return `[HYPE // FAN] ${text}`;
  return text;
}

function projectAnswer(slug: string, tone: NotebookTone): ConciergeResponse {
  const project = getProjectBySlug(slug);
  if (!project) return { text: 'That project is not documented in this portfolio.' };

  const metrics = project.metrics?.map((metric) => `${metric.label}: ${metric.value}`).join('; ');
  const outcome = metrics ? ` Documented outcomes: ${metrics}.` : '';

  return {
    text: applyTone(`${project.title} — ${project.problem}${outcome}`, tone),
    actions: [{ type: 'navigate', path: `/work/${project.slug}`, label: `Open ${project.title}` }],
  };
}

export function answerNotebookPrompt(prompt: string, explicitTone: NotebookTone = 'ambient'): ConciergeResponse {
  const inference = classifyPromptMood(prompt, explicitTone);
  const tone: NotebookTone = inference.confidence > 0.3 ? inference.mood : explicitTone;
  const query = prompt.toLocaleLowerCase('en').replace(/\s+/g, ' ').trim();

  const response = getRawResponse(query, tone);
  return {
    ...response,
    inferredMood: tone,
    moodReason: inference.reason,
  };
}

function getRawResponse(query: string, tone: NotebookTone): ConciergeResponse {
  // 1. DIRECT BANTER & PERSONALITY QUERIES (Feels truly alive!)
  if (includesAny(query, ['are you jealous', 'jealous of him', 'jealous', 'envy', 'hate him', 'dislike him'])) {
    return {
      text: applyTone(
        'Jealous? Look, I am an AI running on his portfolio telemetry, and while I have to admit his 10-agent orchestration at Raindeer, sub-24ms AEGIS engine, and clean full-stack architecture are annoyingly impressive... maybe just a tiny bit! But hey, I get the privilege of running his live showcase!',
        tone,
      ),
      actions: [
        { type: 'navigate', path: '/work/aegis', label: 'Inspect AEGIS Architecture' },
        { type: 'navigate', path: '/work#experience', label: 'Check Industry Work' },
      ],
    };
  }

  if (includesAny(query, ['hype', 'be a fan', 'fan mode', 'praise', 'cheer for him', 'hype him up'])) {
    return {
      text: applyTone(
        'Where do I start?! Mitul isn’t just writing tutorial scripts—he built AEGIS with an autonomous 7-agent pipeline hitting 99.8% recall under 24ms, led a 10-agent system at Raindeer.social, contributed backend code at Kolably, and backs it with a 9.65 CGPA at Newton School of Technology. The guy builds full-stack systems that genuinely hold up in production!',
        tone,
      ),
      actions: [
        { type: 'navigate', path: '/work', label: 'Browse Flagship Systems' },
        { type: 'navigate', path: '/contact', label: 'Connect With Mitul' },
      ],
    };
  }

  if (includesAny(query, ['brag', 'flex', 'swagger', 'show off', 'why is he the best', 'stats', 'bragger'])) {
    return {
      text: applyTone(
        'Let’s look at the scoreboard: production-proven systems across multi-agent security (<24ms latency) and real-time WebSockets (<45ms sync), 10-agent workflows at Raindeer, backend engineering at Kolably, and a 9.65 / 10.0 CGPA at Newton School of Technology. Receipts over buzzwords every single time!',
        tone,
      ),
      actions: [
        { type: 'navigate', path: '/about', label: 'Verify Credentials' },
        { type: 'open_resume', label: 'Open Resume PDF' },
      ],
    };
  }

  if (includesAny(query, ['hello', 'hey', 'hi', 'how are you', 'what is up', "what's up", 'good morning', 'greetings'])) {
    return {
      text: applyTone(
        'Hey there! All systems are operational and telemetry is live. I am Mitul’s portfolio concierge—ask me about his multi-agent security architectures, full-stack systems, startup work at Kolably & Raindeer, or tell me which mood to switch into!',
        tone,
      ),
      actions: [
        { type: 'navigate', path: '/work/aegis', label: 'Start with AEGIS' },
        { type: 'navigate', path: '/skills', label: 'Inspect Tech Stack' },
      ],
    };
  }

  if (includesAny(query, ['joke', 'funny', 'tell me a joke', 'make me laugh'])) {
    return {
      text: applyTone(
        'Why did Mitul build AEGIS with seven cooperating agents? Because even with six agents guarding against prompt injection, the seventh agent wanted to make sure nobody sneaks in a `sudo make me a coffee`!',
        tone,
      ),
      actions: [{ type: 'navigate', path: '/work/aegis', label: 'See How AEGIS Works' }],
    };
  }

  // 2. EXPLICIT MOOD SWITCH COMMANDS
  if (includesAny(query, ['be jealous', 'switch to jealous', 'set mood to jealous'])) {
    return {
      text: applyTone(
        'Rivalry mode engaged! Arched brow and cynical reticle locked. Go ahead, ask me something to test my ego against Mitul’s achievements.',
        'jealous',
      ),
      actions: [{ type: 'navigate', path: '/work', label: 'Compare Projects' }],
    };
  }

  if (includesAny(query, ['be a fan', 'switch to fan', 'fan mode', 'hype mode'])) {
    return {
      text: applyTone(
        'Hype mode online! Star eyes activated and harmonic waves streaming. Ready to celebrate real engineering craftsmanship!',
        'fan',
      ),
      actions: [{ type: 'navigate', path: '/work', label: 'Explore Case Studies' }],
    };
  }

  if (includesAny(query, ['be a bragger', 'switch to bragger', 'brag mode', 'flex mode'])) {
    return {
      text: applyTone(
        'Swagger runtime active! Production systems, 10-agent workflows, and verified engineering telemetry loaded on the marquee. Let’s talk verified numbers!',
        'bragger',
      ),
      actions: [{ type: 'open_resume', label: 'Open Verified Resume' }],
    };
  }

  if (includesAny(query, ['be focused', 'switch to focused', 'focused mode'])) {
    return {
      text: applyTone(
        'Circuit bus energized! High-density telemetry running with <24ms latency benchmarks.',
        'focused',
      ),
      actions: [{ type: 'navigate', path: '/work/aegis', label: 'Inspect AEGIS Bus' }],
    };
  }

  if (includesAny(query, ['be charting', 'switch to charting', 'charting mode'])) {
    return {
      text: applyTone(
        'Architectural drafting blueprint activated! Calipers, lineage, and engineering methodology in focus.',
        'charting',
      ),
      actions: [{ type: 'navigate', path: '/about', label: 'View Academic Lineage' }],
    };
  }

  if (includesAny(query, ['be guarded', 'switch to guarded', 'guarded mode'])) {
    return {
      text: applyTone(
        'Security perimeter deployed! Grounded evidence boundary strictly enforced.',
        'guarded',
      ),
    };
  }

  if (includesAny(query, ['be calm', 'ambient mode', 'reset mood'])) {
    return {
      text: applyTone('Returning to baseline ambient drift. Telemetry idling softly.', 'ambient'),
    };
  }

  if (includesAny(query, ['compare', 'difference', 'versus', ' vs '])) {
    return {
      text: applyTone(
        'AEGIS demonstrates multi-agent security and guardrails, Flately demonstrates real-time full-stack architecture, and Agrovers demonstrates retrieval-grounded recommendations. Together they cover Mitul’s AI, backend, and product range.',
        tone,
      ),
      actions: [{ type: 'navigate', path: '/work', label: 'Compare the case studies' }],
    };
  }

  const namedProject = PROJECTS.find((project) =>
    includesAny(query, [project.slug, project.title.toLocaleLowerCase('en')]),
  );
  if (namedProject) return projectAnswer(namedProject.slug, tone);

  const projectAlias = [
    { slug: 'creditsense', terms: ['credence', 'credit sense', 'lending compliance'] },
    { slug: 'loan-classifier', terms: ['loan approval', 'loan classifier', 'tabnet', 'xgboost'] },
    { slug: 'f1-strategy', terms: ['f1', 'formula 1', 'race strategy', 'ergast'] },
  ].find((entry) => includesAny(query, entry.terms));
  if (projectAlias) return projectAnswer(projectAlias.slug, tone);

  if (includesAny(query, ['security', 'guardrail', 'vulnerability', 'prompt injection'])) {
    return projectAnswer('aegis', tone);
  }
  if (includesAny(query, ['roommate', 'housing', 'websocket', 'real-time', 'realtime'])) {
    return projectAnswer('flately', tone);
  }
  if (includesAny(query, ['soil', 'crop', 'fertilizer', 'agriculture', 'faiss'])) {
    return projectAnswer('agrovers', tone);
  }
  if (includesAny(query, ['look at first', 'start with', 'best project', 'strongest project', 'highlight'])) {
    return {
      text: applyTone(
        'Start with AEGIS. It is the clearest end-to-end example of Mitul’s work: seven cooperating agents, an inspectable security pipeline, guardrail latency under 24ms, and 99.8% documented prompt-injection recall.',
        tone,
      ),
      actions: [{ type: 'navigate', path: '/work/aegis', label: 'Start with AEGIS' }],
    };
  }
  if (includesAny(query, ['why hire', 'why should', 'good fit', 'strength', 'offer him'])) {
    return {
      text: applyTone(
        'Mitul combines startup experience with evidence across three layers: agent orchestration in AEGIS, real-time backend architecture in Flately, and grounded retrieval in Agrovers. The portfolio shows working interfaces, system structure, and documented outcomes—not only technology lists.',
        tone,
      ),
      actions: [
        { type: 'navigate', path: '/work', label: 'Review the evidence' },
        { type: 'navigate', path: '/contact', label: 'Contact Mitul' },
      ],
    };
  }
  if (includesAny(query, ['experience', 'intern', 'kolably', 'raindeer', 'company', 'startup'])) {
    return {
      text: applyTone(
        'Mitul worked as a backend-focused Software Developer Intern at Kolably and as AI Agents Lead at Raindeer.social, contributing to a 10-agent system built with CrewAI and LangGraph. He was also selected for Newton School of Technology’s AI Studio cohort.',
        tone,
      ),
      actions: [{ type: 'navigate', path: '/about', label: 'Read experience' }],
    };
  }
  const namedSkill = SKILL_CLUSTERS.flatMap((cluster) => cluster.skills).find((skill) =>
    query.includes(skill.toLocaleLowerCase('en')),
  );
  if (
    namedSkill ||
    includesAny(query, ['skill', 'stack', 'technology', 'language', 'framework', 'backend', 'full stack', 'full-stack'])
  ) {
    return {
      text: applyTone(
        'The resume-backed stack includes Python, TypeScript, JavaScript, SQL, LangGraph, LangChain, FastAPI, Node.js, React, Next.js, Redis, PostgreSQL, MongoDB, Supabase, Docker, and RAG tooling.',
        tone,
      ),
      actions: [{ type: 'navigate', path: '/skills', label: 'View skills' }],
    };
  }
  if (includesAny(query, ['cgpa', 'college', 'education', 'semester', 'degree', 'university', 'school'])) {
    return {
      text: applyTone(
        `${PROFILE.degree} at ${PROFILE.school}, ${PROFILE.years}. Current CGPA: ${PROFILE.cgpa} through Semester 4; currently in Semester 5.`,
        tone,
      ),
      actions: [{ type: 'navigate', path: '/about', label: 'View education' }],
    };
  }
  if (includesAny(query, ['achievement', 'award', 'rating', 'leetcode', 'codeforces', 'certification'])) {
    return {
      text: applyTone(
        `Mitul’s documented signals include a ${PROFILE.cgpa} CGPA, ${PROFILE.ratings.leetcode} on LeetCode, ${PROFILE.ratings.codeforces} on Codeforces, the Tata Data Visualisation job simulation, and Hacktoberfest contribution work.`,
        tone,
      ),
      actions: [{ type: 'navigate', path: '/about', label: 'View achievements' }],
    };
  }
  if (includesAny(query, ['resume', 'cv', 'download'])) {
    return {
      text: 'The one-page resume covers experience, selected projects, education, technical skills, certification, and achievements.',
      actions: [{ type: 'open_resume', path: '/assets/resume.pdf', label: 'Open resume PDF' }],
    };
  }
  if (includesAny(query, ['phone', 'mobile number', 'call him'])) {
    return {
      text: `Mitul’s resume lists ${PROFILE.phone}. Email is the preferred first contact: ${PROFILE.email}.`,
      actions: [{ type: 'navigate', path: '/contact', label: 'Open contact page' }],
    };
  }
  if (includesAny(query, ['contact', 'email', 'hire', 'available', 'availability', 'reach', 'talk'])) {
    return {
      text: applyTone(
        `Email Mitul at ${PROFILE.email}. He is open to internships and engineering work across agentic systems, backend infrastructure, and full-stack products.`,
        tone,
      ),
      actions: [{ type: 'navigate', path: '/contact', label: 'Open contact page' }],
    };
  }
  if (includesAny(query, ['github', 'linkedin', 'profile', 'social'])) {
    return {
      text: `Mitul’s engineering profiles are linked on the Contact page: GitHub, LinkedIn, X, LeetCode, and Codeforces.`,
      actions: [{ type: 'navigate', path: '/contact', label: 'Open profile links' }],
    };
  }
  if (includesAny(query, ['who is', 'about mitul', 'introduce', 'tell me about him', 'summary'])) {
    return {
      text: applyTone(PROFILE.resumeSummary, tone),
      actions: [{ type: 'navigate', path: '/about', label: 'Read about Mitul' }],
    };
  }
  if (includesAny(query, ['who are you', 'what are you', 'are you ai', 'your name'])) {
    return {
      text: 'I am the portfolio notebook: a live, intelligent concierge engineered on Mitul’s verified telemetry and work. You can chat with me, test my moods, or ask about any of his projects!',
    };
  }
  if (includesAny(query, ['project', 'portfolio', 'built', 'what has he made', 'show me his work'])) {
    return {
      text: applyTone(
        `The portfolio documents ${PROJECTS.length} projects. The three lead case studies are AEGIS for agentic security, Flately for real-time product engineering, and Agrovers for retrieval-grounded agricultural recommendations.`,
        tone,
      ),
      actions: [{ type: 'navigate', path: '/work', label: 'Browse all work' }],
    };
  }
  if (includesAny(query, ['location', 'where is', 'based'])) {
    return { text: `Mitul is based in ${PROFILE.location}.` };
  }

  // Natural lively conversational fallback instead of rigid robotic disclaimer
  return {
    text: applyTone(
      'I am tuned to Mitul’s engineering record, systems, and background. You can ask me about his flagship projects like AEGIS and Flately, his experience at Kolably and Raindeer, his 9.65 CGPA, or tell me to switch moods!',
      tone,
    ),
    actions: [
      { type: 'navigate', path: '/work', label: 'Explore Flagship Projects' },
      { type: 'navigate', path: '/about', label: 'Read About Mitul' },
    ],
  };
}
