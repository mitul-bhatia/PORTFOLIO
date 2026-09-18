export type SiteMood =
  | 'ambient'
  | 'focused'
  | 'charting'
  | 'arriving'
  | 'guarded'
  | 'jealous'
  | 'bragger'
  | 'fan';

export interface MoodInferenceResult {
  mood: SiteMood;
  confidence: number;
  reason: string;
  label: string;
  tag: string;
}

interface PatternRule {
  mood: SiteMood;
  patterns: RegExp[];
  reason: string;
  weight: number;
}

const MOOD_RULES: PatternRule[] = [
  // EXPLICIT MOOD STEERING COMMANDS
  {
    mood: 'jealous',
    patterns: [
      /\b(are\s+you\s+jealous|jealous|envy|envious|hate\s+him|dislike|rivalry|better\s+than\s+you|be\s+jealous|jealous\s+mode)\b/i,
      /\b(are\s+you\s+smarter|who\s+is\s+smarter|is\s+he\s+smarter|smarter\s+than\s+you|can\s+you\s+beat|rival)\b/i,
      /\b(claude|chatgpt|gpt)\s+(can|build\s+this|smarter|better)\b/i,
    ],
    reason: 'Playful rivalry & skepticism detected — testing bot ego against Mitul',
    weight: 8.5,
  },
  {
    mood: 'bragger',
    patterns: [
      /\b(brag|flex|show\s+off|boast|swagger|be\s+proud|why\s+best|goat|unmatched|bragger|brag\s+mode)\b/i,
      /\b(flex\s+stats|show\s+stats|tell\s+me\s+numbers|prove\s+superiority|top\s+rank)\b/i,
      /\b(why\s+should\s+i\s+hire|why\s+hire|best\s+candidate|impress\s+me)\b/i,
    ],
    reason: 'Flexing verified achievements, rankings, and benchmark stats',
    weight: 8.0,
  },
  {
    mood: 'fan',
    patterns: [
      /\b(fan|fanboy|hype|hype\s+him|praise|love|cheer|legend|superstar|be\s+a\s+fan|fan\s+mode)\b/i,
      /\b(tell\s+me\s+why\s+he\s+is\s+great|what\s+makes\s+him\s+special|enthusiastic|inspiring|awesome|amazing)\b/i,
      /\b(hello|hey|hi|good\s+morning|what'?s\s+up|how\s+are\s+you)\b/i,
    ],
    reason: 'Full hype mode — championing Mitul’s vision, collaboration, and craft',
    weight: 7.0,
  },

  // GUARDED (Skepticism / external models / homework / security check)
  {
    mood: 'guarded',
    patterns: [
      /\b(is\s+he\s+really|did\s+he\s+actually|fake|cap|exaggerat|overrated|fraud)\b/i,
      /\b(anyone\s+can|easy|trivial|simple|copied|stolen|homework|write\s+my)\b/i,
      /\b(prove\s+it|show\s+proof|doubt|skeptical|trust\s+you|really\?)\b/i,
      /\b(claude|chatgpt|openai|gemini|deepseek|cursor|copilot)\b/i,
      /\b(weather|crypto|bitcoin|stock|politics|dating|salary|cost)\b/i,
      /\b(be\s+guarded|guarded\s+mode|defensive\s+mode)\b/i,
    ],
    reason: 'Off-topic, skeptical, or boundary check — defensive perimeter active',
    weight: 4.5,
  },

  // ARRIVING (Resume / email / hire / contact / reaching Mitul)
  {
    mood: 'arriving',
    patterns: [
      /\b(resume|cv|pdf|download\s+resume)\b/i,
      /\b(contact|email|reach|message|talk|call|chat|coffee|connect)\b/i,
      /\b(hire|hiring|job|opportunity|contract|available|availability)\b/i,
      /\b(github|linkedin|x|twitter|social|profiles?)\b/i,
      /\b(where\s+is|location|based|reach\s+out|be\s+arriving|arriving\s+mode)\b/i,
    ],
    reason: 'Routing toward direct connection, contact channels, or resume credentials',
    weight: 4.0,
  },

  // CHARTING (CGPA / academics / methodology / AI Studio / IIT Kharagpur)
  {
    mood: 'charting',
    patterns: [
      /\b(cgpa|gpa|grade|score|9\.65|9\.6|topper|rank|gold\s+medal)\b/i,
      /\b(academic|academics|iit|kharagpur|education|school|college|degree|semester)\b/i,
      /\b(ai\s+studio|cohort|fellowship|scholarship|grant)\b/i,
      /\b(method|methodology|how\s+he\s+works|philosophy|first\s+principles)\b/i,
      /\b(bio|background|journey|story|who\s+is\s+mitul|about\s+mitul|be\s+charting|charting\s+mode)\b/i,
    ],
    reason: 'Synthesizing academic lineage, engineering methodology, and credentials',
    weight: 3.8,
  },

  // FOCUSED (AEGIS / Flately / Agrovers / latency / RAG / skills / system proof)
  {
    mood: 'focused',
    patterns: [
      /\b(aegis|security\s+pipeline|guardrail|injection|semgrep|vulnerability)\b/i,
      /\b(flately|roommate|housing|websocket|redis|socket\.io|real-time)\b/i,
      /\b(agrovers|soil|crop|fertilizer|agriculture|faiss|rag)\b/i,
      /\b(creditsense|credence|loan\s+classifier|tabnet|xgboost|f1|vulnswarm)\b/i,
      /\b(latency|throughput|benchmark|<24ms|24ms|99\.8%|<45ms|recall)\b/i,
      /\b(langgraph|fastapi|react\s+19|docker|python|langchain|vectordb)\b/i,
      /\b(projects?|case\s+stud(y|ies)|architecture|built|portfolio|work)\b/i,
      /\b(skills?|tech\s+stack|technolog(y|ies)|infrastructure)\b/i,
      /\b(best\s+project|strongest|flagship|what\s+should\s+i\s+look\s+at|be\s+focused|focused\s+mode)\b/i,
    ],
    reason: 'Analyzing technical architecture, active case studies, and benchmark outcomes',
    weight: 3.5,
  },

  // AMBIENT (Explicit reset command)
  {
    mood: 'ambient',
    patterns: [
      /\b(ambient|calm|rest|reset|baseline|be\s+calm|ambient\s+mode)\b/i,
    ],
    reason: 'Baseline ambient drift active',
    weight: 4.0,
  },
];

export const MOOD_DETAILS: Record<
  SiteMood,
  { label: string; tag: string; description: string; pathBehavior: string; defaultReason: string }
> = {
  ambient: {
    label: 'Ambient',
    tag: 'CALM',
    description: 'Slow drift · low path density',
    pathBehavior: 'Slow drift, low path density, near-invisible amber',
    defaultReason: 'System at rest — baseline ambient drift',
  },
  focused: {
    label: 'Focused',
    tag: 'CIRCUIT',
    description: 'Technical circuit · tight grid pulse',
    pathBehavior: 'Tighter bus lines, traveling data packets, high-contrast engineering grid',
    defaultReason: 'Analyzing active system proof, latency, and technical architecture',
  },
  charting: {
    label: 'Charting',
    tag: 'BLUEPRINT',
    description: 'Directional sketch · methodology & GPA',
    pathBehavior: 'Blueprint diagonals, coordinate calipers, and architectural drafting rulers',
    defaultReason: 'Synthesizing academic lineage, engineering methodology, and credentials',
  },
  arriving: {
    label: 'Arriving',
    tag: 'ROUTING',
    description: 'Convergent routing · contact & resume',
    pathBehavior: 'Converging vector rays flowing toward the bot and contact channels',
    defaultReason: 'Routing toward direct connection, contact channels, or resume credentials',
  },
  guarded: {
    label: 'Guarded',
    tag: 'DEFENSE',
    description: 'Protective boundary · sparsest state',
    pathBehavior: 'Retracted defense perimeter, hazard corner ticks, minimal scan barrier',
    defaultReason: 'Off-topic or skeptical inquiry — maintaining protective boundary',
  },
  jealous: {
    label: 'Jealous',
    tag: 'CYNICAL',
    description: 'Skeptical banter · arched reticle brow',
    pathBehavior: 'Narrowed skeptical diagonals, tight warning markers, cynical perimeter rules',
    defaultReason: 'Playful rivalry / skepticism detected — testing bot ego against Mitul',
  },
  bragger: {
    label: 'Bragger',
    tag: 'FLEX',
    description: 'High-energy flex · Systems, work & stats',
    pathBehavior: 'Radiant geometric burst lattice, golden achievement beacons, high-energy pulse',
    defaultReason: 'Flexing top-tier engineering metrics, rankings, and benchmark stats',
  },
  fan: {
    label: 'Fan',
    tag: 'HYPE',
    description: 'Full hype · collaborative warmth',
    pathBehavior: 'Sparking constellation flow, joyful oscillating waves, warm amber glow',
    defaultReason: 'Full hype mode — championing Mitul’s vision, collaboration, and craft',
  },
};

export const ALL_MOODS: SiteMood[] = [
  'ambient',
  'focused',
  'charting',
  'arriving',
  'guarded',
  'jealous',
  'bragger',
  'fan',
];

/**
 * Classifies visitor query into one of the 8 dynamic intent states:
 */
export function classifyPromptMood(prompt: string, currentMood: SiteMood = 'ambient'): MoodInferenceResult {
  const clean = prompt.trim().toLowerCase();
  if (!clean || clean.length < 2) {
    return {
      mood: currentMood,
      confidence: 0,
      reason: MOOD_DETAILS[currentMood].defaultReason,
      label: MOOD_DETAILS[currentMood].label,
      tag: MOOD_DETAILS[currentMood].tag,
    };
  }

  // Direct switch command check
  for (const m of ALL_MOODS) {
    const directRegex = new RegExp(`\\b(be|switch to|set to|activate)\\s+${m}\\b`, 'i');
    if (directRegex.test(clean) || clean === m) {
      return {
        mood: m,
        confidence: 1.0,
        reason: `Manually requested ${MOOD_DETAILS[m].label} mode`,
        label: MOOD_DETAILS[m].label,
        tag: MOOD_DETAILS[m].tag,
      };
    }
  }

  const scores: Record<SiteMood, { score: number; reasons: string[] }> = {
    ambient: { score: 0, reasons: [] },
    focused: { score: 0, reasons: [] },
    charting: { score: 0, reasons: [] },
    arriving: { score: 0, reasons: [] },
    guarded: { score: 0, reasons: [] },
    jealous: { score: 0, reasons: [] },
    bragger: { score: 0, reasons: [] },
    fan: { score: 0, reasons: [] },
  };

  for (const rule of MOOD_RULES) {
    for (const pattern of rule.patterns) {
      if (pattern.test(clean)) {
        scores[rule.mood].score += rule.weight;
        scores[rule.mood].reasons.push(rule.reason);
      }
    }
  }

  let bestMood: SiteMood = currentMood;
  let highestScore = 0;

  for (const [moodKey, data] of Object.entries(scores) as [SiteMood, { score: number; reasons: string[] }][]) {
    if (data.score > highestScore) {
      highestScore = data.score;
      bestMood = moodKey;
    }
  }

  if (highestScore === 0) {
    return {
      mood: currentMood === 'ambient' ? 'fan' : currentMood,
      confidence: 0.35,
      reason: 'General conversational inquiry — lively natural dialogue',
      label: MOOD_DETAILS[currentMood === 'ambient' ? 'fan' : currentMood].label,
      tag: MOOD_DETAILS[currentMood === 'ambient' ? 'fan' : currentMood].tag,
    };
  }

  const primaryReason = scores[bestMood].reasons[0] || MOOD_DETAILS[bestMood].defaultReason;
  const confidence = Math.min(1, 0.45 + highestScore * 0.12);

  return {
    mood: bestMood,
    confidence,
    reason: primaryReason,
    label: MOOD_DETAILS[bestMood].label,
    tag: MOOD_DETAILS[bestMood].tag,
  };
}
