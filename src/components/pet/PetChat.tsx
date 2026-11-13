'use client';

import { FormEvent, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { PET_NAME, promptsForRoute } from '@/content/pet';
import { usePet, type PetMessage } from '@/context/PetContext';
import { ALL_MOODS, MOOD_META } from '@/lib/moods';
import { usePrefersReducedMotion } from '@/lib/motion';
import type { NotebookLane } from '@/lib/petTypes';
import { PetCharacter } from './PetCharacter';
import { ArrowRight, ArrowUpRight, ChevronDown, Close } from '@/components/ui/icons';

const DESKTOP_QUERY = '(min-width: 1024px)';

function subscribeDesktop(onChange: () => void) {
  const media = window.matchMedia(DESKTOP_QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

function isDesktop() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

const LANE_LABEL: Record<NotebookLane, string> = {
  record: 'from his record',
  edition: 'from his reading',
  general: 'outside the notebook',
};

const THINKING_LINE: Record<NotebookLane, string> = {
  record: 'reading the record…',
  edition: 'reading the edition…',
  general: 'thinking outside the notebook…',
};

function Typewriter({
  text,
  animate,
  onDone,
}: {
  text: string;
  animate: boolean;
  onDone: () => void;
}) {
  const [shown, setShown] = useState(animate ? 0 : text.length);
  const done = shown >= text.length;
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    if (!animate) return;
    const step = text.length > 220 ? 4 : 2;
    const timer = window.setInterval(() => {
      setShown((current) => {
        const next = Math.min(text.length, current + step);
        if (next >= text.length) window.clearInterval(timer);
        return next;
      });
    }, 16);
    return () => window.clearInterval(timer);
  }, [text, animate]);

  useEffect(() => {
    if (done) onDoneRef.current();
  }, [done]);

  // Enter or Space anywhere in the sheet skips the typing.
  useEffect(() => {
    if (done) return;
    const skip = (event: KeyboardEvent) => {
      const typing = (event.target as HTMLElement | null)?.tagName === 'INPUT';
      if (event.key === 'Enter' || (event.key === ' ' && !typing)) {
        if (!typing) event.preventDefault();
        setShown(text.length);
      }
    };
    window.addEventListener('keydown', skip);
    return () => window.removeEventListener('keydown', skip);
  }, [done, text.length]);

  return (
    <span
      aria-hidden="true"
      onClick={() => setShown(text.length)}
      className={done ? 'whitespace-pre-line' : 'cursor-pointer whitespace-pre-line'}
    >
      {text.slice(0, shown)}
      {!done ? <span className="pet-caret" /> : null}
    </span>
  );
}

function PetSlip({
  message,
  latest,
  onTalking,
}: {
  message: PetMessage;
  latest: boolean;
  onTalking: (talking: boolean) => void;
}) {
  const pet = usePet();
  const reduced = usePrefersReducedMotion();
  const reply = message.reply;
  const lane = reply?.lane;
  const [animate] = useState(() => latest && !reduced && message.id > 0);

  useEffect(() => {
    if (animate) onTalking(true);
  }, [animate, onTalking]);

  return (
    <li className="pet-message pet-message-pet">
      {lane ? (
        <p className="pet-lane-tag" data-lane={lane}>
          {LANE_LABEL[lane]}
          {reply?.degraded ? ' · model off' : ''}
        </p>
      ) : null}
      <div className="pet-slip" data-lane={lane ?? 'none'}>
        <Typewriter text={message.text} animate={animate} onDone={() => onTalking(false)} />
        {/* The typed copy is hidden from assistive tech; this one is always readable. */}
        <span className="sr-only">{message.text}</span>
      </div>
      {reply && reply.citations.length > 0 ? (
        <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Sources">
          {reply.citations.map((citation) => (
            <li key={citation.href}>
              <a href={citation.href} target="_blank" rel="noopener noreferrer" className="pet-citation">
                {citation.label}
                <ArrowUpRight size={12} />
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      {reply && reply.actions.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {reply.actions.map((action) => (
            <button key={`${action.type}-${action.label}`} type="button" className="pet-chip" onClick={() => pet.runAction(action)}>
              {action.type === 'navigate' ? `Take me: ${action.label}` : action.label}
              {action.type === 'navigate' ? <ArrowRight size={12} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </li>
  );
}

export default function PetChat({
  moodMenu,
  setMoodMenu,
  onTalkingChange,
}: {
  moodMenu: boolean;
  setMoodMenu: (open: boolean | ((current: boolean) => boolean)) => void;
  onTalkingChange: (talking: boolean) => void;
}) {
  const pet = usePet();
  const pathname = usePathname() || '/';
  const [input, setInput] = useState('');
  const [lane, setLane] = useState<NotebookLane | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const hiRef = useRef<HTMLButtonElement>(null);
  const threadRef = useRef<HTMLOListElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const dragStart = useRef<number | null>(null);
  const { open, greeted, messages, status, draft } = pet;
  const prompts = promptsForRoute(pathname);
  const desktop = useSyncExternalStore(subscribeDesktop, isDesktop, () => true);
  /** Below 1024px the chat is a sheet over the page, so it behaves as a modal dialog. */
  const modal = open && !desktop;

  // Prefilled asks from elsewhere on the site ("Ask Pip" on a news item).
  const [seenDraft, setSeenDraft] = useState(draft);
  if (draft && draft !== seenDraft) {
    setSeenDraft(draft);
    setInput(draft.text);
    setLane(draft.lane);
  }
  useEffect(() => {
    if (!draft) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [draft]);

  // Screen readers get each pet answer once, in full, not the typewriter.
  const lastMessage = messages[messages.length - 1];
  const liveText = lastMessage?.role === 'pet' && lastMessage.id > 0 ? lastMessage.text : '';

  useEffect(() => {
    if (!open) {
      setMoodMenu(false);
      return;
    }
    const timer = window.setTimeout(() => (greeted ? inputRef.current : hiRef.current)?.focus({ preventScroll: true }), 120);
    return () => window.clearTimeout(timer);
  }, [open, greeted, setMoodMenu]);

  useEffect(() => {
    threadRef.current?.lastElementChild?.scrollIntoView({ block: 'end' });
  }, [messages, status]);

  // Mobile sheet: scroll lock is fine here, desktop never locks.
  useEffect(() => {
    if (!modal) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // While the sheet covers the page, the page behind it is out of reach for keyboard and screen reader.
    const behind = Array.from(document.querySelectorAll<HTMLElement>('body > a, header, main, footer')).filter(
      (element) => !element.inert,
    );
    behind.forEach((element) => {
      element.inert = true;
    });
    return () => {
      document.body.style.overflow = previous;
      behind.forEach((element) => {
        element.inert = false;
      });
    };
  }, [modal]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;
    pet.ask(input, { lane });
    setInput('');
    setLane(undefined);
  };

  const lastIndex = messages.length - 1;

  return (
    <>
      <div className="pet-scrim" data-open={open ? 'true' : 'false'} onClick={() => pet.setOpen(false)} aria-hidden="true" />
      <aside
        ref={sheetRef}
        className="pet-sheet"
        data-open={open ? 'true' : 'false'}
        role="dialog"
        aria-modal={modal}
        aria-labelledby="pet-title"
        inert={!open}
        onTouchStart={(event) => {
          const target = event.target as HTMLElement;
          dragStart.current = target.closest('.pet-handle, header') ? event.touches[0].clientY : null;
        }}
        onTouchMove={(event) => {
          if (dragStart.current !== null && event.touches[0].clientY - dragStart.current > 90) {
            dragStart.current = null;
            pet.setOpen(false);
          }
        }}
      >
        <div className="pet-handle" aria-hidden="true" />
        <header className="relative flex items-center justify-between gap-3 border-b border-[var(--border-notebook)] px-4 py-3">
          <div className="min-w-0">
            <h2 id="pet-title" className="font-serif text-xl font-semibold leading-none text-[var(--ink)]">
              {PET_NAME}
            </h2>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
              {status === 'thinking' ? THINKING_LINE[lane ?? 'record'] : 'your guide to this portfolio'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="pet-chip whitespace-nowrap"
              aria-expanded={moodMenu}
              aria-controls="pet-moods"
              title="Pip's mood changes with the page. The facts don't."
              onClick={() => setMoodMenu((current) => !current)}
            >
              Mood: {MOOD_META[pet.mood].label}
              <ChevronDown size={12} />
            </button>
            <button type="button" className="pet-chip" onClick={() => pet.setOpen(false)} aria-label="Close chat">
              <Close size={14} />
            </button>
          </div>

          {moodMenu ? (
            <div id="pet-moods" className="pet-mood-menu" role="group" aria-label={`Pick ${PET_NAME}'s mood`}>
              <p className="col-span-full font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
                Pip&apos;s mood changes. The facts don&apos;t.
              </p>
              <button
                type="button"
                className="pet-mood-option col-span-full"
                aria-pressed={pet.pinnedMood === null}
                onClick={() => {
                  pet.pinMood(null);
                  setMoodMenu(false);
                }}
              >
                Auto: follow the page ({MOOD_META[pet.autoMood].label})
              </button>
              {ALL_MOODS.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  className="pet-mood-option"
                  aria-pressed={pet.pinnedMood === mood}
                  title={MOOD_META[mood].blurb}
                  onClick={() => {
                    pet.pinMood(mood);
                    setMoodMenu(false);
                  }}
                >
                  <PetCharacter mood={mood} className="h-10 w-10" />
                  <span>{MOOD_META[mood].label}</span>
                </button>
              ))}
            </div>
          ) : null}
        </header>

        <ol ref={threadRef} className="pet-thread" aria-label="Conversation">
          {messages.map((message, index) =>
            message.role === 'user' ? (
              <li key={message.id} className="pet-message pet-message-user">
                <p>{message.text}</p>
              </li>
            ) : (
              <PetSlip key={message.id} message={message} latest={index === lastIndex} onTalking={onTalkingChange} />
            ),
          )}
          {status === 'thinking' ? (
            <li className="pet-message pet-message-pet">
              <p className="font-mono text-[12px] text-[var(--muted)]">{PET_NAME} is thinking…</p>
            </li>
          ) : null}
        </ol>
        <p className="sr-only" aria-live="polite">
          {liveText}
        </p>

        <div className="border-t border-[var(--border-notebook)] bg-[var(--paper-soft)] p-3">
          {!greeted ? (
            <button ref={hiRef} type="button" className="pet-hi" onClick={pet.sayHi}>
              Say hi to {PET_NAME}
            </button>
          ) : (
            <div className="no-scrollbar mb-2 flex gap-1.5 overflow-x-auto pb-1">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="pet-chip shrink-0"
                  disabled={status === 'thinking'}
                  onClick={() => pet.ask(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={submit} className="mt-2 flex gap-2">
            <label htmlFor="pet-input" className="sr-only">
              Ask {PET_NAME} anything, or tell it where to take you
            </label>
            <div className="relative min-w-0 flex-1">
              {lane ? (
                <button
                  type="button"
                  className="absolute -top-7 left-0 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent-ink)]"
                  onClick={() => setLane(undefined)}
                >
                  asking {LANE_LABEL[lane]}
                  <Close size={11} />
                </button>
              ) : null}
              <input
                ref={inputRef}
                id="pet-input"
                value={input}
                disabled={!greeted}
                onChange={(event) => setInput(event.target.value)}
                placeholder={greeted ? 'Ask anything, or "take me to AEGIS"' : 'Say hi first'}
                maxLength={500}
                autoComplete="off"
                className="min-h-11 w-full border border-[var(--ink)] bg-[var(--paper)] px-3 text-base text-[var(--ink)] placeholder:text-[var(--muted)] sm:text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={!greeted || status === 'thinking' || !input.trim()}
              className="min-h-11 border border-[var(--ink)] bg-[var(--ink)] px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--paper)] transition-colors duration-[var(--dur-1)] hover:bg-[var(--accent-ink)]"
            >
              Send
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
