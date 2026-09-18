'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBotMood } from '@/context/BotMoodContext';
import { answerNotebookPrompt, ConciergeAction } from '@/lib/notebook';
import { ALL_MOODS, classifyPromptMood, MOOD_DETAILS, MoodInferenceResult, SiteMood } from '@/lib/moodClassifier';
import { MoodFace } from './MoodFace';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  actions?: ConciergeAction[];
  mood?: SiteMood;
  moodReason?: string;
}

const QUICK_PROMPTS = [
  { label: 'Are you jealous of him?', moodHint: 'jealous' as const },
  { label: 'Hype Mitul up! (Fan mode)', moodHint: 'fan' as const },
  { label: 'Show his production systems & work', moodHint: 'bragger' as const },
  { label: 'What are verified metrics for AEGIS?', moodHint: 'focused' as const },
  { label: 'Academic lineage & AI Studio', moodHint: 'charting' as const },
  { label: 'How to contact or open resume?', moodHint: 'arriving' as const },
];

function safeActions(value: unknown): ConciergeAction[] {
  if (!Array.isArray(value)) return [];
  return value.filter((action): action is ConciergeAction => {
    if (!action || typeof action !== 'object') return false;
    const candidate = action as Partial<ConciergeAction>;
    if (candidate.type === 'open_resume') return true;
    return (
      candidate.type === 'navigate' &&
      typeof candidate.path === 'string' &&
      candidate.path.startsWith('/') &&
      !candidate.path.startsWith('//')
    );
  });
}

const MOOD_TELEMETRY_GAUGES: Record<SiteMood, { primary: string; secondary: string; stat: string }> = {
  ambient: { primary: 'RESTING: 100%', secondary: 'ATTENTION: PASSIVE', stat: '1.2 Hz' },
  focused: { primary: 'CLOCK: 4.8 GHz', secondary: 'LATENCY: <24ms', stat: '99.9% PRECISION' },
  charting: { primary: 'LINEAGE: ARCHIVAL', secondary: 'AXIS: CAD / BENTO', stat: '1:1 SCALE' },
  arriving: { primary: 'RECEPTIVITY: 99.4%', secondary: 'BEACON: CONVERGING', stat: 'GATE: OPEN' },
  guarded: { primary: 'FIREWALL: LOCKED', secondary: 'PERIMETER: 100%', stat: 'EVIDENCE ONLY' },
  jealous: { primary: 'SKEPTICISM: 98.6%', secondary: 'SIDE-EYE: MAXIMUM', stat: 'RIVALRY MODE' },
  bragger: { primary: 'PRIDE: 100.0%', secondary: 'PRODUCTION WORK VERIFIED', stat: 'SWAGGER: 11/10' },
  fan: { primary: 'HYPE LEVEL: 100.0%', secondary: 'ADMIRATION: MAX', stat: 'AURA: OVER 9000' },
};

const TICKER_THOUGHTS = [
  'AI CONCIERGE // ONLINE',
  '10-AGENT AEGIS & WORK VERIFIED',
  'MONITORING MITUL\'S CODEBASE',
  'PRESS [CMD+K] TO CHAT',
  'FEELING MOOD-REACTIVE',
];

function TypewriterBubble({
  text,
  isLatest,
  isAssistant,
}: {
  text: string;
  isLatest: boolean;
  isAssistant: boolean;
}) {
  const [displayedText, setDisplayedText] = useState(isAssistant && isLatest ? '' : text);
  const [isDone, setIsDone] = useState(!isAssistant || !isLatest);

  useEffect(() => {
    if (!isAssistant || !isLatest) {
      setDisplayedText(text);
      setIsDone(true);
      return;
    }

    let index = 0;
    const step = text.length > 180 ? 3 : 2;
    const interval = setInterval(() => {
      index += step;
      if (index >= text.length) {
        setDisplayedText(text);
        setIsDone(true);
        clearInterval(interval);
      } else {
        setDisplayedText(text.slice(0, index));
      }
    }, 14);

    return () => clearInterval(interval);
  }, [text, isLatest, isAssistant]);

  return (
    <div
      onClick={() => {
        if (!isDone) {
          setDisplayedText(text);
          setIsDone(true);
        }
      }}
      className={!isDone ? 'cursor-pointer' : undefined}
      title={!isDone ? 'Click to reveal entire message' : undefined}
    >
      <span>{displayedText}</span>
      {!isDone && (
        <span className="ml-1 inline-block h-3.5 w-1.5 bg-[var(--accent)] align-middle animate-pulse">
          █
        </span>
      )}
    </div>
  );
}

export function BotDock() {
  const router = useRouter();
  const { mood, setMood, inferFromPrompt } = useBotMood();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingInference, setTypingInference] = useState<MoodInferenceResult | null>(null);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_THOUGHTS.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Hey! I am Mitul’s portfolio concierge—live, intelligent, and grounded in his real engineering record. Ask about his multi-agent systems, startup work at Kolably & Raindeer, or tell me to switch moods!',
      mood: 'ambient',
      moodReason: 'System at rest — baseline ambient state.',
      actions: [
        { type: 'navigate', path: '/work', label: 'Browse work' },
        { type: 'open_resume', label: 'Open resume' },
      ],
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);

  // Debounced real-time mood prediction as visitor types
  useEffect(() => {
    const trimmed = input.trim();
    if (!trimmed || trimmed.length < 2) {
      setTypingInference(null);
      return;
    }

    const timer = window.setTimeout(() => {
      const result = classifyPromptMood(trimmed, mood);
      setTypingInference(result);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [input, mood]);

  // Active display mood: shows typing preview if confident, otherwise committed context mood
  const activeDisplayMood: SiteMood = useMemo(() => {
    if (typingInference && typingInference.confidence > 0.45) {
      return typingInference.mood;
    }
    return mood;
  }, [typingInference, mood]);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleDialogKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleDialogKeyboard);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleDialogKeyboard);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      const timer = window.setTimeout(() => inputRef.current?.focus(), 180);
      return () => window.clearTimeout(timer);
    }
    if (wasOpenRef.current) {
      launcherRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleAction = (action: ConciergeAction) => {
    if (action.type === 'navigate' && action.path?.startsWith('/') && !action.path.startsWith('//')) {
      setIsOpen(false);
      router.push(action.path);
    }
    if (action.type === 'open_resume') {
      window.open('/assets/resume.pdf', '_blank', 'noopener,noreferrer');
    }
  };

  const handleManualMoodSwitch = (targetMood: SiteMood) => {
    setMood(targetMood);
    document.documentElement.dataset.mood = targetMood;

    const detail = MOOD_DETAILS[targetMood];
    setMessages((current) => [
      ...current,
      {
        role: 'assistant',
        text: `Switched to [${detail.label.toUpperCase()}] mode! ${detail.description}. Background path field updated to: "${detail.pathBehavior}".`,
        mood: targetMood,
        moodReason: `Manual showcase switch to ${detail.label}`,
      },
    ]);
  };

  const submitPrompt = async (promptText: string) => {
    const trimmed = promptText.trim();
    if (!trimmed || isLoading) return;

    // Trigger dynamic mood swing as a direct by-product of user input
    const newMood = inferFromPrompt(trimmed);
    const classification = classifyPromptMood(trimmed, mood);

    setMessages((current) => [
      ...current,
      {
        role: 'user',
        text: trimmed,
        mood: newMood,
        moodReason: classification.reason,
      },
    ]);

    setInput('');
    setTypingInference(null);
    setIsLoading(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch('/api/notebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed, tone: newMood }),
        signal: controller.signal,
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) throw new Error('Notebook unavailable');
      const data: unknown = await response.json();
      const payload = data && typeof data === 'object' ? (data as Record<string, unknown>) : {};
      if (!response.ok && response.status !== 429) throw new Error('Notebook unavailable');

      const serverMood = (payload.inferredMood as SiteMood) || newMood;
      const serverReason = typeof payload.moodReason === 'string' ? payload.moodReason : classification.reason;

      // Ensure document.documentElement.dataset.mood matches the server outcome
      document.documentElement.dataset.mood = serverMood;

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text:
            typeof payload.text === 'string' && payload.text.trim()
              ? payload.text
              : 'I am live on Mitul’s portfolio telemetry. What would you like to explore next?',
          actions: safeActions(payload.actions),
          mood: serverMood,
          moodReason: serverReason,
        },
      ]);
    } catch {
      const fallback = answerNotebookPrompt(trimmed, newMood);
      document.documentElement.dataset.mood = fallback.inferredMood || newMood;

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: fallback.text,
          actions: fallback.actions,
          mood: fallback.inferredMood || newMood,
          moodReason: fallback.moodReason || classification.reason,
        },
      ]);
    } finally {
      window.clearTimeout(timeout);
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitPrompt(input);
  };

  return (
    <>
      {/* Floating launcher with animated face, pulse aura, and mood badge */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center sm:bottom-6 sm:right-6">
        {/* Living pill next to launcher */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto mr-2.5 hidden items-center gap-2 border border-[var(--ink)] bg-[var(--paper-soft)] px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--ink)] shadow-notebook transition-all hover:bg-[var(--ink)] hover:text-[var(--paper)] sm:inline-flex"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-ping" />
          <span className="transition-all duration-300">{TICKER_THOUGHTS[tickerIndex]}</span>
        </button>

        <button
          ref={launcherRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-[var(--ink)] bg-[var(--paper-soft)] text-[var(--ink)] shadow-notebook transition-all duration-200 hover:scale-105 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="Open portfolio concierge (Shortcut: Command+K)"
        >
          {/* Subtle live radar ping ring around the launcher */}
          <span className="pointer-events-none absolute -inset-1 rounded-full border border-[var(--accent)] opacity-40 group-hover:animate-ping" />
          <MoodFace mood={mood} size="sm" isSpeaking={isLoading} />
        </button>
      </div>

      {/* Dialog Drawer - Hand-rolled native CSS transitions (Zero runtime motion dependency) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[var(--ink)]/45 backdrop-blur-[1px] transition-opacity duration-200"
          />

          {/* Drawer Panel - Strict 0px Sheet */}
          <aside
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="notebook-title"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[500px] flex-col border-l border-[var(--ink)] bg-[var(--paper)] shadow-2xl transition-transform duration-300 ease-out"
          >
            {/* Header with Live Animated Reticle */}
            <header className="border-b border-[var(--border-notebook)] bg-[var(--paper-soft)] px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative">
                    <MoodFace
                      mood={activeDisplayMood}
                      size="md"
                      isSpeaking={isLoading}
                      isListening={input.trim().length > 0}
                    />
                    {typingInference && typingInference.mood !== mood && (
                      <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--accent)]" />
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h2 id="notebook-title" className="font-serif text-2xl font-bold tracking-tight text-[var(--ink)]">
                      Portfolio Concierge
                    </h2>

                    {/* Live Telemetry Pill */}
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.09em]">
                      <span className="inline-block border border-[var(--ink)] bg-[var(--ink)] px-1.5 py-0.5 text-[var(--paper)]">
                        {MOOD_DETAILS[activeDisplayMood].label}
                      </span>
                      <span className="text-[var(--muted)]">
                        {typingInference && typingInference.mood !== mood
                          ? `Typing shifts to: ${MOOD_DETAILS[typingInference.mood].label}`
                          : MOOD_DETAILS[activeDisplayMood].description}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="border border-[var(--ink)] px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                >
                  Close
                </button>
              </div>

              {/* CRAFTED TELEMETRY MOOD SELECTOR MATRIX (2-row grid, no clipping) */}
              <div className="mt-3 border-t border-[var(--border-notebook)]/60 pt-2.5">
                <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  <span>TELEMETRY MOOD MATRIX (MANUAL TRIGGER):</span>
                  <span className="font-semibold text-[var(--accent-dark)]">CHANGES BACKGROUND LIVE</span>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {ALL_MOODS.map((m) => {
                    const isActive = mood === m;
                    const meta = MOOD_DETAILS[m];
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => handleManualMoodSwitch(m)}
                        className={`flex items-center justify-center border px-1.5 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.06em] transition-all active:translate-x-[1px] active:translate-y-[1px] ${
                          isActive
                            ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] shadow-sm'
                            : 'border-[var(--border-notebook)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--ink)] hover:bg-[var(--elevated)]'
                        }`}
                        title={meta.pathBehavior}
                      >
                        {isActive && <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />}
                        <span className="truncate">{meta.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* LIVE PSYCHOLOGICAL TELEMETRY GAUGES */}
              <div className="mt-2.5 flex items-center justify-between border-t border-[var(--border-notebook)]/50 pt-2 font-mono text-[8.5px] uppercase tracking-[0.08em]">
                <span className="font-semibold text-[var(--accent-dark)]">
                  ▶ {MOOD_TELEMETRY_GAUGES[activeDisplayMood].primary}
                </span>
                <span className="text-[var(--muted)]">
                  {MOOD_TELEMETRY_GAUGES[activeDisplayMood].secondary}
                </span>
                <span className="border border-[var(--ink)] bg-[var(--ink)] px-1 py-0.5 text-[var(--paper)]">
                  {MOOD_TELEMETRY_GAUGES[activeDisplayMood].stat}
                </span>
              </div>

              {/* Path Behavior Telemetry */}
              <div className="mt-2 font-mono text-[9px] text-[var(--muted)]">
                <span className="font-semibold text-[var(--accent-dark)]">[PATH FIELD] </span>
                {MOOD_DETAILS[activeDisplayMood].pathBehavior}
              </div>
            </header>

            {/* Conversation Area */}
            <div
              className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-5 py-5"
              aria-live="polite"
              aria-busy={isLoading}
            >
              {messages.map((message, index) => {
                const isUser = message.role === 'user';
                const msgMood = message.mood || 'ambient';

                return (
                  <div key={`${message.role}-${index}`} className={`space-y-1.5 ${isUser ? 'ml-8' : 'mr-4'}`}>
                    {/* Message Metadata Header */}
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--muted)]">
                      <span>{isUser ? 'Visitor' : `Concierge // ${MOOD_DETAILS[msgMood].label}`}</span>
                      {message.moodReason && (
                        <span className="hidden text-[8px] opacity-75 sm:inline">
                          {message.moodReason.slice(0, 50)}...
                        </span>
                      )}
                    </div>

                    {/* Message Bubble - 0px Brutalist Box with Teletype Stream */}
                    <div
                      className={`border p-4 text-sm leading-relaxed ${
                        isUser
                          ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                          : 'border-[var(--border-notebook)] bg-[var(--paper-soft)] text-[var(--ink)] shadow-sm'
                      }`}
                    >
                      <TypewriterBubble
                        text={message.text}
                        isLatest={index === messages.length - 1}
                        isAssistant={!isUser}
                      />
                    </div>

                    {/* Navigation or Sourced Action Chips */}
                    {message.actions && message.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {message.actions.map((action, actionIndex) => (
                          <button
                            key={`${action.type}-${action.path || actionIndex}`}
                            type="button"
                            onClick={() => handleAction(action)}
                            className="border border-[var(--ink)] bg-[var(--paper)] px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.09em] text-[var(--ink)] transition-colors hover:bg-[var(--accent-dark)] hover:text-[var(--paper)]"
                          >
                            {action.label || 'Open page'} →
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Loading indicator with precision 7-bar audio visualizer */}
              {isLoading && (
                <div className="flex items-center gap-3 py-2" aria-label="Concierge is formulating answer">
                  <MoodFace mood={activeDisplayMood} size="xs" isSpeaking={true} />
                  {/* 7-bar animated precision audio equalizer */}
                  <div className="flex h-5 items-end gap-1 border border-[var(--border-notebook)] bg-[var(--paper)] px-2 py-0.5">
                    <span className="w-1 bg-[var(--accent)] h-full animate-eq-1" />
                    <span className="w-1 bg-[var(--ink)] h-full animate-eq-2" />
                    <span className="w-1 bg-[var(--accent)] h-full animate-eq-3" />
                    <span className="w-1 bg-[var(--ink)] h-full animate-eq-4" />
                    <span className="w-1 bg-[var(--accent)] h-full animate-eq-5" />
                    <span className="w-1 bg-[var(--ink)] h-full animate-eq-6" />
                    <span className="w-1 bg-[var(--accent)] h-full animate-eq-7" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--muted)]">
                    [TELEMETRY STREAMING // {MOOD_DETAILS[activeDisplayMood].tag}]
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Dynamic Mood Preview Strip (Typing shift) */}
            {typingInference && typingInference.mood !== mood && typingInference.confidence > 0.45 && (
              <div className="border-t border-[var(--accent)] bg-[var(--elevated)] px-4 py-1.5 font-mono text-[9px] text-[var(--ink)] transition-all">
                <span className="font-semibold text-[var(--accent-dark)]">⚡ PATH FIELD SHIFT: </span>
                Switching to <strong className="uppercase">{MOOD_DETAILS[typingInference.mood].label}</strong> (
                {typingInference.reason})
              </div>
            )}

            {/* Footer Form & Prompt Trigger Chips */}
            <div className="border-t border-[var(--border-notebook)] bg-[var(--paper-soft)] p-4">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--muted)]">
                Try asking directly or trigger moods in chat:
              </p>

              {/* Quick Prompts that trigger states */}
              <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto pb-1">
                {QUICK_PROMPTS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => void submitPrompt(item.label)}
                    disabled={isLoading}
                    className="shrink-0 border border-[var(--border-notebook)] bg-[var(--paper)] px-2.5 py-1.5 text-left font-mono text-[10px] text-[var(--ink)] transition-colors hover:border-[var(--ink)] hover:bg-[var(--elevated)]"
                  >
                    <span className="mr-1.5 font-semibold text-[var(--accent)]">
                      [{MOOD_DETAILS[item.moodHint].tag}]
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <label htmlFor="notebook-question" className="sr-only">
                  Ask about Mitul&apos;s work or tell me to change moods
                </label>
                <div className="relative min-w-0 flex-1">
                  <input
                    ref={inputRef}
                    id="notebook-question"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask anything or say 'be jealous', 'hype him up'..."
                    maxLength={500}
                    className="min-h-12 w-full border border-[var(--ink)] bg-[var(--paper)] px-3 pr-10 text-base text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] sm:text-sm"
                  />
                  {input.trim() && (
                    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase text-[var(--muted)]">
                      {input.length}/500
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="min-h-12 border border-[var(--ink)] bg-[var(--ink)] px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--paper)] transition-colors hover:bg-[var(--accent-dark)] disabled:opacity-40"
                >
                  Send
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-3 flex items-center justify-between font-mono text-[9px] text-[var(--muted)]">
                <span>Decays to Ambient after 8s idle (or click matrix above)</span>

                <Link href="/work" onClick={() => setIsOpen(false)} className="underline hover:text-[var(--ink)]">
                  Work index →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
