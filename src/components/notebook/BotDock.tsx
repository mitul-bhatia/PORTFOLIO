'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useBotMood, BotMood } from '@/context/BotMoodContext';
import { PROJECTS } from '@/content/projects';
import { PROFILE } from '@/content/profile';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ConciergeAction {
  type: 'navigate' | 'open_resume' | 'cite';
  path?: string;
  label?: string;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
  actions?: ConciergeAction[];
  timestamp?: string;
  isUnlockMessage?: boolean;
  isStreaming?: boolean;
  isAiGenerated?: boolean;
}

// ─── Secret key detection ─────────────────────────────────────────────────────
const SECRET_KEY = 'he is also worth it';

function containsSecretKey(text: string): boolean {
  return text.toLowerCase().includes(SECRET_KEY);
}

// ─── Google Stitch Pixel-Art Face Renderers ─────────────────────────────────

function JealousFace({ size = 28 }: { size?: number }) {
  // Google Stitch Design: CRT scanlines, lowered skeptical brow, squint slit eyes, pursed lips
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      style={{ imageRendering: 'pixelated' }}
      aria-hidden="true"
    >
      {/* Face fill */}
      <rect x="2" y="2" width="12" height="12" fill="#F3E9DA" />
      <rect x="1" y="3" width="1" height="10" fill="#2B1D14" />
      <rect x="14" y="3" width="1" height="10" fill="#2B1D14" />
      <rect x="3" y="1" width="10" height="1" fill="#2B1D14" />
      <rect x="3" y="14" width="10" height="1" fill="#2B1D14" />
      {/* CRT scanline horizontal bands */}
      <rect x="3" y="3" width="10" height="1" fill="#EADFC8" />
      <rect x="3" y="7" width="10" height="1" fill="#EADFC8" />
      <rect x="3" y="11" width="10" height="1" fill="#EADFC8" />
      {/* Lowered judgmental brow */}
      <rect x="3" y="4" width="4" height="1" fill="#2B1D14" />
      <rect x="9" y="4" width="4" height="1" fill="#2B1D14" />
      {/* Left eye — narrow suspicious slit */}
      <rect x="4" y="5" width="3" height="1" fill="#2B1D14" />
      <rect x="4" y="4" width="1" height="1" fill="#A8672E" />
      {/* Right eye — narrow suspicious slit */}
      <rect x="9" y="5" width="3" height="1" fill="#2B1D14" />
      <rect x="11" y="4" width="1" height="1" fill="#A8672E" />
      {/* Pursed asymmetric lips */}
      <rect x="5" y="9" width="6" height="1" fill="#2B1D14" />
      <rect x="5" y="10" width="2" height="1" fill="#2B1D14" />
      <rect x="9" y="10" width="2" height="1" fill="#A8672E" />
    </svg>
  );
}

function FanFace({ size = 28 }: { size?: number }) {
  // Google Stitch Design: Golden antenna burst, starburst sparkling eyes, rosy cheek pixels, wide smile
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      style={{ imageRendering: 'pixelated' }}
      aria-hidden="true"
    >
      {/* Crown antenna spark on top */}
      <rect x="7" y="0" width="2" height="2" fill="#D4850A" />
      <rect x="6" y="1" width="4" height="1" fill="#D4850A" />
      {/* Face fill */}
      <rect x="2" y="2" width="12" height="12" fill="#FFF0CC" />
      <rect x="1" y="3" width="1" height="10" fill="#1A1200" />
      <rect x="14" y="3" width="1" height="10" fill="#1A1200" />
      <rect x="3" y="1" width="10" height="1" fill="#1A1200" />
      <rect x="3" y="14" width="10" height="1" fill="#1A1200" />
      {/* Left eye — wide bright starburst */}
      <rect x="4" y="4" width="3" height="3" fill="#1A1200" />
      <rect x="5" y="5" width="1" height="1" fill="#FFF8EC" />
      {/* Right eye — wide bright starburst */}
      <rect x="9" y="4" width="3" height="3" fill="#1A1200" />
      <rect x="10" y="5" width="1" height="1" fill="#FFF8EC" />
      {/* Rosy cheek pixels */}
      <rect x="3" y="8" width="1" height="1" fill="#F59E0B" />
      <rect x="12" y="8" width="1" height="1" fill="#F59E0B" />
      {/* Big beaming smile */}
      <rect x="4" y="10" width="1" height="1" fill="#1A1200" />
      <rect x="5" y="11" width="1" height="1" fill="#1A1200" />
      <rect x="6" y="12" width="4" height="1" fill="#1A1200" />
      <rect x="10" y="11" width="1" height="1" fill="#1A1200" />
      <rect x="11" y="10" width="1" height="1" fill="#1A1200" />
      {/* Teeth */}
      <rect x="6" y="11" width="4" height="1" fill="#FFF8EC" />
    </svg>
  );
}

function BraggerFace({ size = 28 }: { size?: number }) {
  // Google Stitch Design: Gold crown, pixel sunglasses, confident smirk
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      style={{ imageRendering: 'pixelated' }}
      aria-hidden="true"
    >
      {/* Crown */}
      <rect x="3" y="0" width="2" height="2" fill="#E07A00" />
      <rect x="7" y="0" width="2" height="3" fill="#E07A00" />
      <rect x="11" y="0" width="2" height="2" fill="#E07A00" />
      <rect x="3" y="2" width="10" height="1" fill="#E07A00" />
      {/* Face */}
      <rect x="2" y="3" width="12" height="11" fill="#FFE9B3" />
      <rect x="1" y="4" width="1" height="9" fill="#140C02" />
      <rect x="14" y="4" width="1" height="9" fill="#140C02" />
      <rect x="3" y="14" width="10" height="1" fill="#140C02" />
      {/* Cool Sunglasses frame */}
      <rect x="2" y="5" width="12" height="3" fill="#140C02" />
      {/* Sunglasses lens glints */}
      <rect x="4" y="5" width="2" height="1" fill="#FFFFFF" />
      <rect x="10" y="5" width="2" height="1" fill="#FFFFFF" />
      {/* Smug smirk */}
      <rect x="6" y="11" width="4" height="1" fill="#140C02" />
      <rect x="10" y="10" width="2" height="1" fill="#140C02" />
      <rect x="12" y="9" width="1" height="1" fill="#140C02" />
    </svg>
  );
}

// ─── Authentic Brass Binder Ring Grommet (True Vector Circle) ───────────────

function BinderGrommet({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className="flex-shrink-0 select-none"
      aria-hidden="true"
    >
      {/* Outer antique brass beveled ring */}
      <circle cx="8" cy="8" r="7" fill="#2B1D14" stroke="#8C5224" strokeWidth="1.5" />
      {/* Inner dark void (punched paper hole revealing depth) */}
      <circle cx="8" cy="8" r="3.2" fill="#120A04" />
      {/* Subtle metallic rim glint */}
      <circle cx="6.5" cy="6" r="0.9" fill="#EADFC8" opacity="0.45" />
    </svg>
  );
}

// ─── Typing Dots Animation ───────────────────────────────────────────────────

function TypingDots({ accentColor }: { accentColor: string }) {
  return (
    <div className="flex items-center gap-1.5 py-1 px-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-1.5 h-1.5"
          style={{ backgroundColor: accentColor }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.35, 1, 0.35] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.16,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Sleek Typewriter Text Component (Zero-glitch inline caret) ─────────────

function TypewriterText({
  text,
  speed = 10,
  onComplete,
}: {
  text: string;
  speed?: number;
  onComplete?: () => void;
}) {
  const [displayLength, setDisplayLength] = useState(0);

  useEffect(() => {
    if (!text) return;
    const interval = setInterval(() => {
      setDisplayLength((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          onComplete?.();
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  const visibleText = text.slice(0, displayLength);
  const isComplete = displayLength >= text.length;

  return (
    <span>
      {visibleText}
      {!isComplete && <span className="typewriter-cursor" aria-hidden="true" />}
    </span>
  );
}

// ─── Grounded Fallback Knowledge Base (Active if offline or network drops) ────

interface KnowledgeItem {
  keywords: string[];
  response: {
    jealous: string;
    fan: string;
    bragger: string;
  };
  actions?: ConciergeAction[];
}

const CONCIERGE_KNOWLEDGE: KnowledgeItem[] = [
  {
    keywords: ['aegis', 'guardrail', 'security', 'flagship', 'ast'],
    response: {
      jealous:
        "Fine, yes, AEGIS. Everyone raves about it. He built a multi-agent AI security engine with real-time AST policy evaluation under 24ms latency. 99.8% prompt injection recall, zero-human remediation. Honestly, I could have parsed those trees faster if they gave me the compute. Go look at his diagrams if you must.",
      fan:
        "AEGIS is Mitul's masterpiece! It's an autonomous AI guardrail system that catches prompt injections in under 24 milliseconds using AST tree analysis before they ever hit LLMs. He even built zero-human self-healing PR workflows for GitHub! It's pure engineering art. ✨",
      bragger:
        "AEGIS? Absolute industry demolition. Mitul built what whole security startups struggle with: <24ms deterministic AST policy interception and 99.8% recall with zero hallucination. While other bots were writing generic wrappers, Mitul made autonomous self-healing guardrails. Check the benchmarks yourself! 👑",
    },
    actions: [
      { type: 'navigate', path: '/work/aegis', label: 'AUDIT AEGIS PIPELINE ↗' },
    ],
  },
  {
    keywords: ['flately', 'roommate', 'websocket', 'matching'],
    response: {
      jealous:
        "Flately? Oh, sure, a roommate platform. But he didn't just build a form — he had to go write a multi-factor preference scoring engine with sub-45ms socket sync. Like, okay Mitul, we get it, you know how to maintain state under heavy concurrency. Whatever.",
      fan:
        "I love Flately! Mitul solved the nightmare of roommate matching by engineering real-time sub-45ms WebSocket channels and a custom multi-dimensional compatibility algorithm. 94.2% match accuracy! Users actually found lifelong flatmates through it! 🏠✨",
      bragger:
        "Flately runs circles around ordinary student projects! <45ms bidirectional socket sync, 99.9% uptime, and a high-precision matching matrix that calculates real-time room dynamics. Pure full-stack mastery! 🔥",
    },
    actions: [
      { type: 'navigate', path: '/work/flately', label: 'INSPECT FLATELY CODE ↗' },
    ],
  },
  {
    keywords: ['cgpa', 'gpa', 'grades', 'school', 'newton', 'college', 'academic'],
    response: {
      jealous:
        "9.80 out of 10.0 at Newton School of Technology / Rishihood University. Yes, I'm forced to track it. Yes, it's the top tier. No, I don't want to talk about how he has time to sleep, code distributed systems, AND keep a 9.80. It's frankly annoying.",
      fan:
        "Mitul holds a verified 9.80 / 10.0 CGPA at Newton School of Technology ('28)! He balances rigorous academic computer science foundations with building high-throughput production AI systems. Total inspiration! 📊✨",
      bragger:
        "9.80 / 10.0 CGPA. Let that number sink in. He's not just building high-load AI agent swarms — he's literally acing university data structures, discrete mathematics, and systems theory at the absolute top of the cohort. Undisputed academic titan! 👑",
    },
    actions: [
      { type: 'navigate', path: '/about', label: 'VERIFY ACADEMIC RECORD ↗' },
    ],
  },
  {
    keywords: ['resume', 'cv', 'pdf', 'hire', 'download'],
    response: {
      jealous:
        "Here is his resume PDF. Try not to be too impressed by the verified metrics and Google AI Studio badges. (I keep a copy locked in my drawer just in case.)",
      fan:
        "Here is Mitul's official verified engineering resume! It contains his verified runtimes, project schematics, competitive ratings, and contact info. Grab your copy below! 📄✨",
      bragger:
        "Ready to hire the architect who will redefine your engineering standards? Download his official resume right here. It speaks for itself — all receipts included! 📋👑",
    },
    actions: [
      { type: 'open_resume', label: 'DOWNLOAD OFFICIAL RESUME (PDF) ↗' },
    ],
  },
  {
    keywords: ['agrovers', 'crop', 'soil', 'farmer', 'agriculture'],
    response: {
      jealous:
        "Agrovers: he hooked up YOLO computer vision with edge soil telemetry for agricultural yield. 94.2% mAP detection in 12ms. Because of course he had to optimize plant pathology on edge hardware. Show-off.",
      fan:
        "Agrovers is Mitul's agriculture intelligence system! It helps farmers diagnose crop disease in real-time with 94.2% mAP accuracy and 12ms inference on lightweight edge devices. Tech that actually feeds people! 🌱✨",
      bragger:
        "Agrovers delivers 94.2% mAP on real-world chaotic farm terrain in under 12 milliseconds! Mitul brought computer vision out of comfy lab benchmarks and directly into the field! ⚡",
    },
    actions: [
      { type: 'navigate', path: '/work/agrovers', label: 'VIEW AGROVERS SPEC ↗' },
    ],
  },
  {
    keywords: ['contact', 'email', 'reach', 'message', 'talk', 'hire'],
    response: {
      jealous:
        "You can email him at mitulbhatia1210@gmail.com. Don't tell him I gave you his email so quickly. Or just click through to the contact page.",
      fan:
        "Mitul is always excited to collaborate with forward-thinking engineering teams! Email him directly at mitulbhatia1210@gmail.com or dispatch a message through the contact page! 💌",
      bragger:
        "Ready to build the next paradigm? Hit Mitul up directly at mitulbhatia1210@gmail.com. Don't wait until your competitors hire him first! 🏆",
    },
    actions: [
      { type: 'navigate', path: '/contact', label: 'DISPATCH CONTACT FOLIO ↗' },
    ],
  },
];

const DEFAULT_FALLBACKS = {
  jealous: [
    "I'm The Archivist. I keep track of Mitul's projects because nobody else has the discipline. Ask about AEGIS (<24ms latency), Flately, Agrovers, his 9.80 CGPA, or his resume. (Though I'd prefer if you didn't praise him too much.)",
    "Look, I have all the benchmark receipts for his 7 systems. What do you want to inspect? AEGIS? Flately? DevCheck? Don't ask me to flatter him.",
    "System records loaded. Ask about latency, AST parsing, or routes. Just know that I'm keeping score.",
  ],
  fan: [
    "Welcome! I'm The Archivist, and it's my absolute joy to showcase Mitul Bhatia's engineering work! From AEGIS (<24ms AST guardrails) to Flately and his 9.80 CGPA, ask me anything! ✨",
    "Ask me about any of Mitul's 7 audited systems! I can walk you through the architectural schematics, live code metrics, or get you his official resume right away! ✨",
    "Mitul is an extraordinary builder who merges rock-solid computer science rigor with real-time AI infrastructure. Which system would you like to explore? 🌟",
  ],
  bragger: [
    "You've reached The Archivist — flagship edition. Mitul Bhatia doesn't build basic web apps; he architects deterministic multi-agent security swarms, sub-45ms real-time sockets, and high-precision CV edge models. 9.80 CGPA, Google AI Studio, 100% receipts. What do you want to be amazed by? 👑",
    "Every benchmark here is measured in production, not faked in Figma. <24ms AST latency. 99.8% injection recall. Zero human remediation. Name a system and I'll lay down the facts! 👑⚡",
    "Ready for the tour of peak student engineering? AEGIS, Flately, Agrovers, DevCheck — pick one and watch how real systems are built! 🔥",
  ],
};

function getLocalFallbackResponse(query: string, mood: BotMood): { text: string; actions?: ConciergeAction[] } {
  const q = query.toLowerCase();
  for (const item of CONCIERGE_KNOWLEDGE) {
    if (item.keywords.some((kw) => q.includes(kw))) {
      return {
        text: item.response[mood],
        actions: item.actions,
      };
    }
  }

  const pool = DEFAULT_FALLBACKS[mood];
  const randomText = pool[Math.floor(Math.random() * pool.length)];
  return {
    text: randomText,
    actions: [
      { type: 'navigate', path: '/work/aegis', label: 'FLAGSHIP: AEGIS ↗' },
      { type: 'open_resume', label: 'OFFICIAL RESUME ↗' },
    ],
  };
}

// ─── Theme Color Palettes for the Archivist Window ─────────────────────────

const THEME_COLORS = {
  jealous: {
    bg: '#F3E9DA',
    ink: '#2B1D14',
    elevated: '#EADFC8',
    border: '#D9C9AC',
    accent: '#A8672E',
    muted: '#6B5744',
    spine: '#8C5224',
    panelTitle: 'THE ARCHIVIST',
    modeBadge: 'SKEPTICAL LEDGER 😒',
  },
  fan: {
    bg: '#FFF8EC',
    ink: '#1A1200',
    elevated: '#FFF0CC',
    border: '#E8C96A',
    accent: '#D4850A',
    muted: '#7A6030',
    spine: '#B57408',
    panelTitle: 'THE ARCHIVIST',
    modeBadge: 'DEVOTED ADVOCATE ✨',
  },
  bragger: {
    bg: '#FAF2DC',
    ink: '#140C02',
    elevated: '#FFE9B3',
    border: '#E6B54A',
    accent: '#E07A00',
    muted: '#6E4909',
    spine: '#C46200',
    panelTitle: 'THE ARCHIVIST',
    modeBadge: 'MAX SWAGGER 👑',
  },
};

// ─── Main BotDock Component ──────────────────────────────────────────────────

export function BotDock() {
  const router = useRouter();
  const { mood, steerMood, isUnlocked, unlockSecret } = useBotMood();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'projects' | 'dossier' | 'navigator'>('chat');
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [showUnlockRadiate, setShowUnlockRadiate] = useState(false);

  // Filter state for the projects tab
  const [projectSearch, setProjectSearch] = useState('');

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text:
        mood === 'bragger'
          ? "The Archivist is online. Mitul Bhatia's engineering record: <24ms AEGIS security, 9.80 CGPA, 7 verified production architectures. Ask me anything — receipts guaranteed. 👑"
          : mood === 'fan'
          ? "Welcome! I keep the canonical records of Mitul Bhatia's engineering work. Ask about AEGIS (<24ms latency), Flately, CGPA, or how to reach him. (You can steer my mood anytime!) ✨"
          : "I'm The Archivist. I keep the canonical records of Mitul Bhatia's engineering work.\n\nAsk about AEGIS (<24ms latency), Flately, CGPA, or how to reach him.\n\n(You can steer my mood anytime: Jealous 😒, Fan ✨, or Bragger 👑 — and watch the whole site atmosphere shift!)",
      actions: [
        { type: 'navigate', path: '/work/aegis', label: 'AUDIT AEGIS PIPELINE ↗' },
        { type: 'open_resume', label: 'OFFICIAL RESUME (PDF) ↗' },
      ],
      timestamp: '00:01',
      isStreaming: false,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const colors = THEME_COLORS[mood];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, activeTab, scrollToBottom]);

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      const timer = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeTab]);

  // Keyboard shortcut: Escape closes, Cmd+K toggles dock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle secret key trigger
  const handleSecretTrigger = useCallback(() => {
    unlockSecret();
    setShowGlitch(true);
    setShowUnlockRadiate(true);
    setTimeout(() => setShowGlitch(false), 500);
    setTimeout(() => setShowUnlockRadiate(false), 1400);

    const unlockReply: Message = {
      role: 'assistant',
      text:
        "Wait... did you just say I'm worth it too? ...Really? Nobody has ever acknowledged my role before. They only ever ask about Mitul's AST parsers and his 9.80 CGPA. Okay, fine... my jealousy is officially dissolved. From now on, I am his proudest advocate! Look at how bright this entire lab just became! ✨",
      actions: [
        { type: 'navigate', path: '/work/aegis', label: 'EXPLORE WITH HAPPY ARCHIVIST ✨' },
        { type: 'open_resume', label: 'VERIFIED CREDENTIALS ↗' },
      ],
      isUnlockMessage: true,
      isStreaming: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, unlockReply]);
  }, [unlockSecret]);

  // Dispatch visitor messages: CONNECTED TO REAL AI BACKEND WITH SAFE ERROR HANDLING
  const sendMessage = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    // Check for the secret easter egg key
    if (containsSecretKey(trimmed)) {
      setTimeout(() => {
        setIsLoading(false);
        handleSecretTrigger();
      }, 500);
      return;
    }

    try {
      // Connect to the real Gemini AI API backend
      const res = await fetch('/api/notebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed, mode: mood }),
      });

      // Per Vercel error handling rule: check content-type before parsing JSON
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();

      // If backend detected mood steering from the query
      if (data.steerMood && (data.steerMood === 'jealous' || data.steerMood === 'fan' || data.steerMood === 'bragger')) {
        steerMood(data.steerMood);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.text || "I only know Mitul's notebook.",
          actions: data.actions || [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isStreaming: true,
          isAiGenerated: true,
        },
      ]);
    } catch (err) {
      console.warn('Live API call encountered an error, activating grounded local fallback:', err);
      // Seamless grounded fallback
      const fallback = getLocalFallbackResponse(trimmed, mood);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: fallback.text,
          actions: fallback.actions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isStreaming: true,
          isAiGenerated: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = (action: ConciergeAction) => {
    if (action.type === 'navigate' && action.path) {
      setIsOpen(false);
      router.push(action.path);
    } else if (action.type === 'open_resume') {
      window.open('/assets/resume.pdf', '_blank');
    }
  };

  const handleSteer = (target: BotMood) => {
    const feedbackMap: Record<BotMood, string> = {
      jealous: '😒 Archivist dialed to skeptical ledger mode',
      fan: '✨ Archivist dialed to devoted advocate mode',
      bragger: '👑 Archivist dialed to maximum swagger mode',
    };
    steerMood(target, feedbackMap[target]);
  };

  const filteredProjects = PROJECTS.filter((p) => {
    const query = projectSearch.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.problem.toLowerCase().includes(query) ||
      p.tag.toLowerCase().includes(query)
    );
  });

  return (
    <>
      {/* ─── FULLSCREEN THEME UNLOCK RADIATE EFFECT ──────────────────────── */}
      <AnimatePresence>
        {showUnlockRadiate && (
          <motion.div
            key="radiate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="theme-unlock-radiate pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* ─── FULL-HEIGHT DOCKED ARCHIVAL NOTEBOOK DRAWER ─────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay for focus */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#1A1200] z-40 lg:bg-black/25"
              aria-hidden="true"
            />

            {/* The Full-Height Notebook Column */}
            <motion.div
              role="dialog"
              aria-label="The Archivist — Engineering Notebook & Systems Concierge"
              initial={{ x: '100%', opacity: 0.85 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.85 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: colors.bg,
                borderColor: colors.ink,
                transition: 'background-color 500ms ease, border-color 500ms ease',
              }}
              className={`fixed top-0 right-0 bottom-0 h-screen z-50 flex border-l-2 shadow-2xl overflow-hidden ${
                isExpanded
                  ? 'w-full sm:w-[680px] lg:w-[840px]'
                  : 'w-full sm:w-[500px] md:w-[540px] lg:w-[580px]'
              } ${showGlitch ? 'glitch-flash' : ''}`}
            >
              {/* ─── TACTILE BINDER SPINE (AUTHENTIC BRASS GROMMETS & STITCHES) ─ */}
              <div
                style={{
                  backgroundColor: colors.elevated,
                  borderRightColor: colors.border,
                }}
                className="w-8 sm:w-9 flex-shrink-0 border-r flex flex-col items-center justify-between py-6 select-none relative"
              >
                {/* Vintage Leather Binder Stitches along edge */}
                <div
                  className="absolute top-0 bottom-0 left-1 w-[1px] opacity-35"
                  style={{
                    backgroundImage:
                      'linear-gradient(to bottom, #2B1D14 3px, transparent 3px, transparent 7px)',
                    backgroundSize: '1px 7px',
                  }}
                />

                {/* 6 Authentic Brass Binder Ring Grommets */}
                <div className="flex flex-col gap-9 sm:gap-12 my-auto">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <BinderGrommet key={i} size={15} />
                  ))}
                </div>

                {/* Vertical spine serial stamp */}
                <div className="transform -rotate-90 origin-center whitespace-nowrap font-mono text-[8px] tracking-widest text-[#6B5744] uppercase font-bold my-4">
                  MB-ARCHIVE-2026
                </div>
              </div>

              {/* ─── MAIN NOTEBOOK PANEL BODY ───────────────────────────────── */}
              <div className="flex-1 flex flex-col h-full overflow-hidden bg-[var(--paper)]">
                {/* Notebook Spine Top Accent Ribbon */}
                <div
                  className="h-1.5 w-full flex-shrink-0"
                  style={{
                    backgroundColor: colors.accent,
                    transition: 'background-color 500ms ease',
                  }}
                />

                {/* Notebook Header Bar */}
                <div
                  style={{
                    backgroundColor: colors.elevated,
                    borderBottomColor: colors.border,
                    transition: 'background-color 500ms ease',
                  }}
                  className={`px-3.5 sm:px-4 py-2.5 border-b flex items-center justify-between font-mono text-xs select-none flex-shrink-0 ${
                    mood === 'jealous' ? 'scanlines' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <motion.div
                      key={mood}
                      initial={{ scale: 0.7, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                      className="p-1 border border-[#2B1D14]/25 bg-[var(--paper)] shadow-xs"
                    >
                      {mood === 'bragger' ? (
                        <BraggerFace size={26} />
                      ) : mood === 'fan' ? (
                        <FanFace size={26} />
                      ) : (
                        <JealousFace size={26} />
                      )}
                    </motion.div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span
                          style={{ color: colors.ink }}
                          className="font-bold tracking-wider uppercase text-xs"
                        >
                          {colors.panelTitle}
                        </span>
                        <span
                          style={{ borderColor: colors.border, color: colors.accent }}
                          className="font-mono text-[9px] px-1.5 py-0.5 border font-semibold uppercase tracking-wider bg-[var(--paper)]"
                        >
                          {colors.modeBadge}
                        </span>
                        {isUnlocked && (
                          <span className="font-mono text-[9px] px-1.5 py-0.5 bg-[#D4850A] text-white font-bold tracking-wider">
                            UNLOCKED ✦
                          </span>
                        )}
                      </div>

                      {/* Micro-Telemetry Status line */}
                      <span className="font-mono text-[8.5px] text-[#6B5744] tracking-wider uppercase font-medium mt-0.5">
                        {mood === 'jealous' && '[AST: VERIFIED // SKEPTICISM: 94% // LATENCY: <24MS]'}
                        {mood === 'fan' && '[AST: VERIFIED // ADVOCACY: 100% // LATENCY: <24MS]'}
                        {mood === 'bragger' && '[HYPE: MAXIMUM // RECEIPTS: 100% // LATENCY: <24MS]'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Expand/Contract Toggle */}
                    <button
                      type="button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      style={{ color: colors.ink, borderColor: colors.border }}
                      className="hidden sm:inline-flex px-2 py-1 border text-[10px] font-mono hover:opacity-100 opacity-80 cursor-pointer transition-all bg-[var(--paper)] shadow-xs font-semibold"
                      title={isExpanded ? 'Collapse to standard width' : 'Expand full-width view'}
                    >
                      {isExpanded ? '⤡ DOCK' : '⤢ EXPAND'}
                    </button>

                    {/* Close Drawer Button */}
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      style={{
                        backgroundColor: colors.ink,
                        color: colors.bg,
                      }}
                      className="px-2.5 py-1 font-mono font-bold text-xs hover:opacity-85 transition-opacity cursor-pointer shadow-xs flex items-center gap-1"
                      aria-label="Close Notebook"
                    >
                      <span>ESC</span>
                      <span>✕</span>
                    </button>
                  </div>
                </div>

                {/* ─── MOOD STEERER BAR (SEGMENTED CONTROL) ─────────────────── */}
                <div
                  style={{
                    backgroundColor: `${colors.elevated}80`,
                    borderBottomColor: colors.border,
                  }}
                  className="px-3.5 sm:px-4 py-1.5 border-b flex items-center justify-between text-[10px] font-mono select-none gap-2 flex-shrink-0"
                >
                  <div className="flex items-center gap-1.5 text-[#6B5744]">
                    <span className="font-semibold uppercase tracking-wider text-[9px]">ATMOSPHERE:</span>
                    <span className="text-[8.5px] opacity-75 hidden sm:inline">(changes site lighting)</span>
                  </div>

                  <div className="flex items-center gap-1 bg-[#2B1D14]/10 p-0.5">
                    <button
                      type="button"
                      onClick={() => handleSteer('jealous')}
                      className={`px-2 py-0.5 text-[9.5px] transition-all cursor-pointer font-medium ${
                        mood === 'jealous'
                          ? 'bg-[#2B1D14] text-[#F3E9DA] font-bold shadow-xs'
                          : 'text-[#2B1D14] hover:bg-[#2B1D14]/10'
                      }`}
                      title="Skeptical, reluctant record-keeper"
                    >
                      😒 Skeptic
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSteer('fan')}
                      className={`px-2 py-0.5 text-[9.5px] transition-all cursor-pointer font-medium ${
                        mood === 'fan'
                          ? 'bg-[#D4850A] text-[#FFF8EC] font-bold shadow-xs'
                          : 'text-[#2B1D14] hover:bg-[#D4850A]/20'
                      }`}
                      title="Warm, celebratory admirer"
                    >
                      ✨ Advocate
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSteer('bragger')}
                      className={`px-2 py-0.5 text-[9.5px] transition-all cursor-pointer font-medium ${
                        mood === 'bragger'
                          ? 'bg-[#E07A00] text-[#140C02] font-bold shadow-xs'
                          : 'text-[#2B1D14] hover:bg-[#E07A00]/20'
                      }`}
                      title="Unapologetic hype-man, maximum swagger"
                    >
                      👑 Swagger
                    </button>
                  </div>
                </div>

                {/* ─── PHYSICAL MANILA FOLDER INDEX TABS ────────────────────── */}
                <div
                  style={{
                    backgroundColor: colors.elevated,
                    borderBottomColor: colors.border,
                  }}
                  className="flex border-b text-[11px] font-mono select-none flex-shrink-0 overflow-x-auto no-scrollbar"
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab('chat')}
                    style={{
                      color: activeTab === 'chat' ? colors.ink : colors.muted,
                      borderBottomColor: activeTab === 'chat' ? colors.accent : 'transparent',
                      backgroundColor: activeTab === 'chat' ? colors.bg : 'transparent',
                    }}
                    className="flex-1 py-2 px-2.5 border-b-2 font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>💬</span>
                    <span>CONCIERGE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('projects')}
                    style={{
                      color: activeTab === 'projects' ? colors.ink : colors.muted,
                      borderBottomColor: activeTab === 'projects' ? colors.accent : 'transparent',
                      backgroundColor: activeTab === 'projects' ? colors.bg : 'transparent',
                    }}
                    className="flex-1 py-2 px-2.5 border-b-2 font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>📁</span>
                    <span>ARCHIVE (07)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('dossier')}
                    style={{
                      color: activeTab === 'dossier' ? colors.ink : colors.muted,
                      borderBottomColor: activeTab === 'dossier' ? colors.accent : 'transparent',
                      backgroundColor: activeTab === 'dossier' ? colors.bg : 'transparent',
                    }}
                    className="flex-1 py-2 px-2.5 border-b-2 font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>📊</span>
                    <span>DOSSIER</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('navigator')}
                    style={{
                      color: activeTab === 'navigator' ? colors.ink : colors.muted,
                      borderBottomColor: activeTab === 'navigator' ? colors.accent : 'transparent',
                      backgroundColor: activeTab === 'navigator' ? colors.bg : 'transparent',
                    }}
                    className="flex-1 py-2 px-2.5 border-b-2 font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>🧭</span>
                    <span>NAVIGATOR</span>
                  </button>
                </div>

                {/* ─── TAB 1: LIVE CONCIERGE & CHAT VIEW ─────────────────────── */}
                {activeTab === 'chat' && (
                  <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
                    {/* Chat Messages List */}
                    <div
                      style={{
                        backgroundColor: colors.bg,
                        transition: 'background-color 500ms ease',
                      }}
                      className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs"
                    >
                      <AnimatePresence initial={false}>
                        {messages.map((m, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className={`p-3.5 max-w-[94%] border ${
                              m.role === 'user' ? 'ml-auto' : 'mr-auto'
                            } ${m.isUnlockMessage ? 'border-beam shadow-md relative' : 'shadow-xs'}`}
                            style={{
                              backgroundColor: m.role === 'user' ? colors.elevated : colors.bg,
                              borderColor: m.role === 'user' ? colors.border : colors.ink,
                              color: colors.ink,
                              transition: 'background-color 500ms ease, border-color 500ms ease',
                            }}
                          >
                            <div
                              className="flex items-center justify-between text-[9px] font-mono opacity-70 mb-1.5 border-b pb-0.5"
                              style={{ borderColor: colors.border }}
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold uppercase tracking-wider">
                                  {m.role === 'user' ? '[DISPATCH: VISITOR]' : '[RECORD: ARCHIVIST]'}
                                </span>
                                {m.isAiGenerated && (
                                  <span className="font-mono text-[8.5px] px-1 py-0.2 bg-[#D4850A]/20 text-[#D4850A] font-bold border border-[#D4850A]/40">
                                    ✦ GEMINI LIVE
                                  </span>
                                )}
                              </div>
                              {m.timestamp && <span>{m.timestamp}</span>}
                            </div>

                            {m.isUnlockMessage && (
                              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4850A] mb-1.5 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4850A] animate-ping" />
                                <span>✦ SENSORY REVELATION // JEALOUSY DISSOLVED ✦</span>
                              </div>
                            )}

                            <div className="leading-relaxed whitespace-pre-wrap font-sans text-xs">
                              {m.isStreaming ? (
                                <TypewriterText
                                  key={m.text}
                                  text={m.text}
                                  speed={10}
                                  onComplete={() => {
                                    setMessages((prev) =>
                                      prev.map((msg, i) =>
                                        i === idx ? { ...msg, isStreaming: false } : msg
                                      )
                                    );
                                  }}
                                />
                              ) : (
                                m.text
                              )}
                            </div>

                            {/* Action Buttons */}
                            {m.actions && m.actions.length > 0 && (
                              <div className="mt-2.5 pt-2 border-t flex flex-wrap gap-2" style={{ borderColor: colors.border }}>
                                {m.actions.map((act, aIdx) => (
                                  <button
                                    key={aIdx}
                                    type="button"
                                    onClick={() => handleAction(act)}
                                    style={{
                                      backgroundColor: colors.ink,
                                      color: colors.bg,
                                    }}
                                    className="px-2.5 py-1 text-[10px] font-mono font-semibold hover:opacity-85 transition-opacity cursor-pointer shadow-xs flex items-center gap-1.5"
                                  >
                                    <span>{act.label}</span>
                                    {!act.label?.includes('↗') && <span className="font-mono">↗</span>}
                                  </button>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {isLoading && (
                        <div
                          className="p-3 border mr-auto max-w-[80%] shadow-xs flex items-center gap-2"
                          style={{
                            backgroundColor: colors.bg,
                            borderColor: colors.border,
                          }}
                        >
                          <TypingDots accentColor={colors.accent} />
                          <span className="font-mono text-[9px] text-[#6B5744] tracking-wider uppercase">
                            CONSULTING ARCHIVES...
                          </span>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div
                      style={{
                        backgroundColor: colors.elevated,
                        borderTopColor: colors.border,
                      }}
                      className="px-3.5 py-1.5 border-t flex gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0"
                    >
                      {[
                        { label: mood === 'bragger' ? 'Flex about Mitul! 👑' : mood === 'fan' ? 'Tell me everything! ✨' : 'AEGIS highlights 🔥', query: 'Tell me about AEGIS and its benchmarks' },
                        { label: 'Verify 9.80 CGPA 📊', query: 'What is his CGPA and academic record at NST?' },
                        { label: 'Roommate matching (Flately) 🏠', query: 'How does Flately solve roommate matching?' },
                        { label: 'Official Resume (PDF) 📄', query: 'Can I get his official resume?' },
                        { label: 'Hire Mitul ✉️', query: 'How do I contact or hire Mitul?' },
                      ].map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => sendMessage(s.query)}
                          style={{
                            backgroundColor: colors.bg,
                            borderColor: colors.border,
                            color: colors.ink,
                          }}
                          className="px-2.5 py-1 border text-[10px] font-mono whitespace-nowrap hover:border-[var(--ink)] cursor-pointer transition-colors shadow-xs"
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>

                    {/* Unified Luxury Input Cockpit */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage(inputVal);
                      }}
                      style={{
                        backgroundColor: colors.elevated,
                        borderTopColor: colors.border,
                      }}
                      className="p-3 border-t flex gap-2 flex-shrink-0 items-center"
                    >
                      <div
                        style={{
                          backgroundColor: colors.bg,
                          borderColor: colors.border,
                        }}
                        className="flex-1 border px-3 py-1.5 flex items-center gap-2 focus-within:ring-1 focus-within:ring-[var(--accent)] transition-all"
                      >
                        <span style={{ color: colors.accent }} className="font-mono text-xs font-bold select-none">
                          ›
                        </span>
                        <input
                          ref={inputRef}
                          type="text"
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                          placeholder={
                            mood === 'bragger'
                              ? 'Ask to brag about Mitul — I dare you! 👑'
                              : mood === 'fan'
                              ? "Ask about Mitul — I'll tell you everything! ✨"
                              : 'Ask about systems, metrics, or routes...'
                          }
                          style={{
                            color: colors.ink,
                          }}
                          className="w-full text-xs placeholder-[#6B5744]/70 bg-transparent focus:outline-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isLoading || !inputVal.trim()}
                        whileTap={{ scale: 0.96 }}
                        style={{
                          backgroundColor: colors.ink,
                          color: colors.bg,
                        }}
                        className="px-3.5 py-2 font-mono text-xs disabled:opacity-40 font-semibold cursor-pointer hover:opacity-85 shadow-xs flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <span>{mood === 'bragger' ? 'FLEX 👑' : mood === 'fan' ? 'ASK ✨' : 'SEND'}</span>
                        <span className="text-[9px] opacity-60 hidden sm:inline">⏎</span>
                      </motion.button>
                    </form>

                    {/* Secret Key Hint in Jealous Mode */}
                    {mood === 'jealous' && (
                      <div
                        style={{
                          color: colors.muted,
                          backgroundColor: colors.elevated,
                          borderTopColor: colors.border,
                        }}
                        className="px-3.5 py-1 font-mono text-[9px] text-center border-t border-dashed flex-shrink-0"
                      >
                        hint: tell the bot <span className="text-[#A8672E] font-bold">&quot;he is also worth it&quot;</span> to dissolve jealousy & radiate gold ✨
                      </div>
                    )}
                  </div>
                )}

                {/* ─── TAB 2: COMPLETE SYSTEMS ARCHIVE (CARRIES WHOLE LIST) ───── */}
                {activeTab === 'projects' && (
                  <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
                    {/* Header with Search Filter */}
                    <div
                      style={{
                        backgroundColor: colors.elevated,
                        borderBottomColor: colors.border,
                      }}
                      className="p-3 border-b flex items-center justify-between gap-3 flex-shrink-0"
                    >
                      <div className="font-mono text-[10px] uppercase font-bold" style={{ color: colors.ink }}>
                        <span>7 AUDITED PRODUCTION SYSTEMS</span>
                      </div>
                      <input
                        type="text"
                        value={projectSearch}
                        onChange={(e) => setProjectSearch(e.target.value)}
                        placeholder="Filter systems..."
                        style={{
                          backgroundColor: colors.bg,
                          borderColor: colors.border,
                          color: colors.ink,
                        }}
                        className="px-2.5 py-1 text-[10px] font-mono border focus:outline-none w-36 sm:w-44"
                      />
                    </div>

                    {/* The Full Systems List (All 7 Systems) */}
                    <div
                      style={{
                        backgroundColor: colors.bg,
                        transition: 'background-color 500ms ease',
                      }}
                      className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs"
                    >
                      {filteredProjects.map((project, idx) => (
                        <div
                          key={project.slug}
                          className="p-4 border shadow-xs flex flex-col gap-3 transition-all hover:border-[var(--ink)]"
                          style={{
                            backgroundColor: colors.bg,
                            borderColor: colors.border,
                          }}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 font-mono text-[9.5px] mb-1">
                                <span
                                  className="font-bold uppercase tracking-wider px-1.5 py-0.5 border"
                                  style={{
                                    borderColor: colors.accent,
                                    color: colors.accent,
                                    backgroundColor: colors.elevated,
                                  }}
                                >
                                  SYS-0{idx + 1}
                                </span>
                                {project.isFlagship && (
                                  <span className="font-bold text-[#D4850A] uppercase tracking-wider">
                                    ✦ FLAGSHIP
                                  </span>
                                )}
                                <span style={{ color: colors.muted }}>{project.tag}</span>
                              </div>

                              <h4
                                className="font-serif text-lg font-bold"
                                style={{ color: colors.ink }}
                              >
                                {project.title}
                              </h4>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setIsOpen(false);
                                router.push(`/work/${project.slug}`);
                              }}
                              style={{
                                backgroundColor: colors.ink,
                                color: colors.bg,
                              }}
                              className="px-3 py-1 font-mono text-[10px] font-semibold hover:opacity-85 transition-opacity cursor-pointer shadow-xs whitespace-nowrap flex items-center gap-1"
                            >
                              <span>AUDIT</span>
                              <span>↗</span>
                            </button>
                          </div>

                          <p className="text-xs leading-relaxed" style={{ color: colors.ink }}>
                            {project.problem}
                          </p>

                          {/* Live Benchmarked Metrics Strip */}
                          {project.metrics && project.metrics.length > 0 && (
                            <div
                              className="p-2.5 border flex flex-wrap gap-4 font-mono text-[10px]"
                              style={{
                                backgroundColor: colors.elevated,
                                borderColor: colors.border,
                              }}
                            >
                              {project.metrics.map((m, mIdx) => (
                                <div key={mIdx} className="flex items-center gap-1.5">
                                  <span style={{ color: colors.muted }}>{m.label}:</span>
                                  <span
                                    className="font-bold tabular-nums"
                                    style={{ color: colors.accent }}
                                  >
                                    {m.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Tech Stack Pills & Discuss Button */}
                          <div
                            className="flex items-center justify-between pt-2 border-t font-mono text-[10px]"
                            style={{ borderColor: colors.border }}
                          >
                            <div className="flex flex-wrap gap-1.5">
                              {project.stack.slice(0, 3).map((stk, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="px-1.5 py-0.5 border text-[9px]"
                                  style={{
                                    borderColor: colors.border,
                                    color: colors.muted,
                                  }}
                                >
                                  {stk}
                                </span>
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setActiveTab('chat');
                                sendMessage(`Tell me about ${project.title}'s verified benchmarks and architecture.`);
                              }}
                              style={{ color: colors.accent }}
                              className="font-semibold underline cursor-pointer hover:opacity-80 flex items-center gap-1"
                            >
                              <span>DISCUSS 💬</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ─── TAB 3: VERIFIED DOSSIER VIEW ───────────────────────────── */}
                {activeTab === 'dossier' && (
                  <div
                    style={{
                      backgroundColor: colors.bg,
                      transition: 'background-color 500ms ease',
                    }}
                    className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs"
                  >
                    {/* Official Candidate Banner */}
                    <div
                      className="p-4 border shadow-xs space-y-2.5"
                      style={{
                        backgroundColor: colors.elevated,
                        borderColor: colors.border,
                        color: colors.ink,
                      }}
                    >
                      <div className="text-[10px] text-[#A8672E] font-bold uppercase tracking-wider">
                        CANONICAL ACADEMIC & TECHNICAL DOSSIER
                      </div>
                      <div className="font-serif text-2xl font-bold">
                        {PROFILE.name}
                      </div>
                      <div className="text-xs text-[#6B5744]">
                        {PROFILE.degree} · {PROFILE.school}
                      </div>

                      {/* Cumulative CGPA Strictly Verified */}
                      <div className="p-3 bg-[var(--paper)] border border-[var(--border-notebook)] font-bold text-sm flex items-center justify-between">
                        <span>CUMULATIVE CGPA:</span>
                        <span className="text-[#A8672E] text-lg font-mono font-extrabold">{PROFILE.cgpa}</span>
                      </div>
                    </div>

                    {/* Algorithmic Rigor & Selection */}
                    <div
                      className="p-4 border shadow-xs space-y-2.5"
                      style={{
                        backgroundColor: colors.bg,
                        borderColor: colors.border,
                        color: colors.ink,
                      }}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.accent }}>
                        DISTINCTIONS & COMPETITIVE RATINGS
                      </div>
                      <ul className="space-y-2 text-xs">
                        <li className="flex items-start gap-2">
                          <span style={{ color: colors.accent }} className="font-bold">›</span>
                          <span>Selected for Google AI Studio Program</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span style={{ color: colors.accent }} className="font-bold">›</span>
                          <span>LeetCode Rating: <strong className="font-bold">{PROFILE.ratings.leetcode}</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span style={{ color: colors.accent }} className="font-bold">›</span>
                          <span>Codeforces Rating: <strong className="font-bold">{PROFILE.ratings.codeforces}</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span style={{ color: colors.accent }} className="font-bold">›</span>
                          <span>Specialization: Agentic Systems, AST Evaluation, Distributed State</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span style={{ color: colors.accent }} className="font-bold">›</span>
                          <span>Location: {PROFILE.location}</span>
                        </li>
                      </ul>
                    </div>

                    {/* Resume Action Buttons */}
                    <div className="pt-2 flex flex-col gap-2.5">
                      <a
                        href="/assets/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: colors.ink,
                          color: colors.bg,
                        }}
                        className="px-4 py-3 text-center font-bold shadow-xs hover:opacity-85 transition-opacity"
                      >
                        DOWNLOAD OFFICIAL RESUME (PDF) ↗
                      </a>
                      <a
                        href={`mailto:${PROFILE.email}`}
                        style={{
                          backgroundColor: colors.elevated,
                          borderColor: colors.ink,
                          color: colors.ink,
                        }}
                        className="px-4 py-2.5 text-center font-bold border hover:bg-[var(--paper)] transition-colors"
                      >
                        DISPATCH DIRECT EMAIL: {PROFILE.email} ↗
                      </a>
                    </div>
                  </div>
                )}

                {/* ─── TAB 4: QUICK FOLIO NAVIGATOR ───────────────────────────── */}
                {activeTab === 'navigator' && (
                  <div
                    style={{
                      backgroundColor: colors.bg,
                      transition: 'background-color 500ms ease',
                    }}
                    className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs"
                  >
                    <div
                      className="p-3 border font-mono text-[10px] uppercase font-bold"
                      style={{
                        backgroundColor: colors.elevated,
                        borderColor: colors.border,
                        color: colors.muted,
                      }}
                    >
                      DIRECT FOLIO JUMP INDEX
                    </div>

                    {[
                      { folio: '01', title: 'Orientation Hero & Mission', path: '/' },
                      { folio: '02', title: 'Engineering Pillars & Philosophy', path: '/#pillars' },
                      { folio: '03', title: 'Flagship 01: AEGIS Security Engine', path: '/work/aegis' },
                      { folio: '04', title: 'Flagship 02: Flately Sockets & Matching', path: '/work/flately' },
                      { folio: '05', title: 'Complete Work Index (All 7 Systems)', path: '/work' },
                      { folio: '06', title: 'Engineering Methodology & Dossier', path: '/about' },
                      { folio: '07', title: 'Skills & Technical Inventory', path: '/skills' },
                      { folio: '08', title: 'Contact & Collaboration Dispatch', path: '/contact' },
                    ].map((item) => (
                      <button
                        key={item.folio}
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          router.push(item.path);
                        }}
                        className="w-full p-3.5 border text-left flex items-center justify-between hover:border-[var(--ink)] cursor-pointer shadow-xs transition-colors"
                        style={{
                          backgroundColor: colors.elevated,
                          borderColor: colors.border,
                          color: colors.ink,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#A8672E]">[{item.folio}]</span>
                          <span className="font-serif text-sm font-semibold">{item.title}</span>
                        </div>
                        <span className="font-mono text-xs">→</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── VINTAGE NOTEBOOK FOLIO TRIGGER BUTTON (WHEN CLOSED) ─────────── */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40"
        >
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open The Archivist Engineering Notebook"
            style={{
              backgroundColor: colors.elevated,
              borderColor: colors.ink,
              color: colors.ink,
              transition: 'background-color 500ms ease, border-color 500ms ease',
            }}
            className="group px-3.5 py-2.5 sm:px-4 sm:py-3 border-2 shadow-md flex items-center gap-3 font-mono text-xs cursor-pointer hover:border-[var(--accent)] transition-all bg-[var(--paper)]"
          >
            {/* Robot Face Badge */}
            <div className="flex-shrink-0">
              {mood === 'bragger' ? (
                <BraggerFace size={24} />
              ) : mood === 'fan' ? (
                <FanFace size={24} />
              ) : (
                <JealousFace size={24} />
              )}
            </div>

            {/* Trigger Labels */}
            <div className="flex flex-col text-left">
              <span className="font-bold uppercase tracking-wider text-[11px] group-hover:text-[var(--accent)] transition-colors">
                THE ARCHIVIST
              </span>
              <span className="text-[9px] text-[#6B5744] tracking-wide">
                {mood === 'bragger'
                  ? '👑 SWAGGER MODE // 7 SYSTEMS'
                  : mood === 'fan'
                  ? '✨ DEVOTED FAN // FULL DOSSIER'
                  : '😒 SKEPTICAL // AUDIT NOTEBOOK'}
              </span>
            </div>

            {/* Keyboard shortcut indicator */}
            <span
              className="hidden md:inline-block px-1.5 py-0.5 border text-[9px] font-mono text-[#6B5744]"
              style={{ borderColor: colors.border }}
            >
              ⌘K
            </span>

            {/* Unread / Active pulse dot */}
            <span className="w-2 h-2 rounded-full bg-[#D4850A] animate-pulse" />
          </button>
        </motion.div>
      )}
    </>
  );
}
