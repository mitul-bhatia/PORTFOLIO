import type { PetAction } from '@/lib/petTypes';

/** The pet's name. Change it here and everywhere follows. */
export const PET_NAME = 'Pip';

export const PET_GREETING =
  `Hey, I'm ${PET_NAME}. I live on Mitul's portfolio and I know where everything is. Say hi and I'll show you around.`;

export const PET_HI_REPLY =
  'Hi! Okay, now we are friends. Ask me anything about his work, tell me to take you somewhere, or let me give you the tour. You can type now.';

/** Three prompts per page, shown after the visitor says hi. */
export function promptsForRoute(pathname: string): string[] {
  if (pathname === '/work') return ['Which project should I open first?', 'Take me to AEGIS', 'Show me his experience'];
  if (pathname.startsWith('/work/')) return ['Explain this pipeline', 'What did it measure?', 'Take me to the next project'];
  if (pathname.startsWith('/about')) return ['What is his CGPA?', 'Where has he interned?', 'Take me to his contact'];
  if (pathname.startsWith('/skills')) return ['What is his strongest stack?', 'Where did he use LangGraph?', 'Show me the work'];
  if (pathname.startsWith('/news')) return ["What's he reading?", 'Summarise the AI headlines', 'Take me to his projects'];
  if (pathname.startsWith('/contact')) return ['How do I reach him?', 'Is he available?', 'Open his résumé'];
  return ['Give me the tour', 'Start with AEGIS', "What's he reading?"];
}

/** One speech-bubble remark per page visit, shown while the pet is closed. */
export function remarkForRoute(pathname: string): string {
  if (pathname === '/work') return 'Psst. AEGIS is the one to open first.';
  if (pathname.startsWith('/work/')) return 'Scroll to the pipeline. I can walk you through it.';
  if (pathname.startsWith('/about')) return 'Want the short version? Ask me.';
  if (pathname.startsWith('/skills')) return 'Every skill here is tied to a project. Ask me which.';
  if (pathname.startsWith('/news')) return 'These are headlines he reads, not his work.';
  if (pathname.startsWith('/contact')) return 'Email works best. He does answer.';
  return 'Want the tour? I know all the good parts.';
}

export interface TourStop {
  path: string;
  /** Matches a `data-tour` attribute on the page. */
  target: string;
  say: string;
}

export const TOUR: TourStop[] = [
  { path: '/', target: 'hero', say: "This is Mitul. AI and full-stack engineer. I'm the one who knows where everything is." },
  { path: '/', target: 'selected-systems', say: 'Three flagship systems, each with the problem, the architecture and a measured result.' },
  { path: '/work', target: 'work-filters', say: 'The full work index. Filter by stack if you only care about agents or real-time stuff.' },
  { path: '/work/aegis', target: 'metrics', say: 'AEGIS. Seven agents, under 24ms guardrail latency, 99.8% injection recall. Yes, I checked.' },
  { path: '/work/aegis', target: 'pipeline', say: 'Five stages from payload ingest to sanitized output. This is the part people ask about.' },
  { path: '/about', target: 'about', say: 'School, internships and how he works. The CGPA is real, I asked.' },
  { path: '/news', target: 'news', say: 'What he has been reading lately. Headlines, not his work.' },
  { path: '/contact', target: 'contact', say: "That's the tour! Email is the fastest way to reach him. Go on, I'll wait." },
];

/** Places the pet can walk the visitor to when asked ("take me to…"). */
export const DESTINATIONS: Array<{ terms: string[]; action: Extract<PetAction, { type: 'navigate' }> }> = [
  { terms: ['aegis'], action: { type: 'navigate', path: '/work/aegis', label: 'AEGIS', target: 'metrics' } },
  { terms: ['flately'], action: { type: 'navigate', path: '/work/flately', label: 'Flately', target: 'metrics' } },
  { terms: ['agrovers'], action: { type: 'navigate', path: '/work/agrovers', label: 'Agrovers', target: 'metrics' } },
  { terms: ['creditsense', 'credence'], action: { type: 'navigate', path: '/work/creditsense', label: 'CreditSense' } },
  { terms: ['vulnswarm'], action: { type: 'navigate', path: '/work/vulnswarm', label: 'VULNSWARM' } },
  { terms: ['f1', 'formula'], action: { type: 'navigate', path: '/work/f1-strategy', label: 'F1 Strategy' } },
  { terms: ['loan'], action: { type: 'navigate', path: '/work/loan-classifier', label: 'Loan Classifier' } },
  { terms: ['experience', 'internship', 'interned', 'jobs'], action: { type: 'navigate', path: '/work', label: 'Experience', target: 'experience' } },
  { terms: ['work', 'projects', 'project', 'portfolio'], action: { type: 'navigate', path: '/work', label: 'Work', target: 'lead-case-studies' } },
  { terms: ['about', 'education', 'school', 'bio'], action: { type: 'navigate', path: '/about', label: 'About', target: 'about' } },
  { terms: ['skills', 'stack'], action: { type: 'navigate', path: '/skills', label: 'Skills' } },
  { terms: ['news', 'reading', 'edition'], action: { type: 'navigate', path: '/news', label: 'News', target: 'news' } },
  { terms: ['contact', 'email', 'reach'], action: { type: 'navigate', path: '/contact', label: 'Contact', target: 'contact' } },
  { terms: ['home', 'start', 'top'], action: { type: 'navigate', path: '/', label: 'Home', target: 'hero' } },
];

export const POKE_LINES = ['Hey!', 'That tickles.', 'I am working here.', 'Okay, stop.'];

export const TANTRUM_LINES = [
  'THAT IS IT. I am having a moment.',
  'Rude! I keep his whole record and this is the thanks I get?',
  'Fine. FINE. I will still answer, but I am annoyed.',
];

export const SLEEPY_LINE = "zZz… oh! Still here. Ask me something, I'm awake.";
