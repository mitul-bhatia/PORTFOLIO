'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PET_GREETING, PET_NAME, POKE_LINES, remarkForRoute, TANTRUM_LINES, TOUR } from '@/content/pet';
import { isSiteMood, MOOD_META, moodForRoute, type SiteMood } from '@/lib/moods';
import { PIP_SIGNAL, type PipSignal } from '@/lib/pipSignal';
import {
  sanitizeActions,
  sanitizeCitations,
  type NotebookLane,
  type NotebookReply,
  type PetAction,
  type PetReaction,
} from '@/lib/petTypes';

export type PetStatus = 'idle' | 'thinking' | 'error';

export interface PetMessage {
  id: number;
  role: 'user' | 'pet';
  text: string;
  reply?: NotebookReply;
}

export interface PetBubble {
  text: string;
  actions?: PetAction[];
  kind: 'hello' | 'remark' | 'guide' | 'tour' | 'poke';
}

export interface PetGuide {
  path: string;
  target?: string;
}

interface PetContextValue {
  mood: SiteMood;
  /** The mood Pip follows when none is pinned. */
  autoMood: SiteMood;
  pinnedMood: SiteMood | null;
  pinMood: (mood: SiteMood | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  greeted: boolean;
  sayHi: () => void;
  messages: PetMessage[];
  status: PetStatus;
  lastReply: NotebookReply | null;
  reaction: PetReaction | null;
  bubble: PetBubble | null;
  dismissBubble: () => void;
  guide: PetGuide | null;
  tourIndex: number | null;
  tourNext: () => void;
  endTour: () => void;
  ask: (prompt: string, options?: { lane?: NotebookLane }) => void;
  runAction: (action: PetAction) => void;
  poke: () => void;
  draft: { text: string; lane?: NotebookLane } | null;
  prefill: (text: string, lane?: NotebookLane) => void;
  clearDraft: () => void;
  freshEdition: string | null;
}

const PetContext = createContext<PetContextValue | null>(null);

const GREETED_KEY = 'pip-greeted';
const HELLO_KEY = 'pip-hello-shown';
const REMARKS_KEY = 'pip-remarks';
const EDITION_KEY = 'notebook-edition-seen';
const SAID_KEY = 'pip-said';

function readSession(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {}
}

function helloBubble(): PetBubble {
  return {
    kind: 'hello',
    text: `Hi! I'm ${PET_NAME}. I know where all the good stuff is. Start with AEGIS?`,
    actions: [
      { type: 'navigate', path: '/work/aegis', label: 'Open AEGIS', target: 'metrics' },
      { type: 'tour', label: 'Give me the tour' },
    ],
  };
}

function normalisePath(path: string) {
  return path.split('#')[0].split('?')[0] || '/';
}

export function PetProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  const router = useRouter();

  const [pinnedMood, setPinnedMood] = useState<SiteMood | null>(null);
  const [askedMood, setAskedMood] = useState<{ mood: SiteMood; path: string } | null>(null);
  const [sectionMood, setSectionMood] = useState<{ mood: SiteMood; path: string } | null>(null);
  const [open, setOpenState] = useState(false);
  // Only the client-only chat reads this, so the server default never hydrates into markup.
  const [greeted, setGreeted] = useState(() => typeof window !== 'undefined' && Boolean(readSession(GREETED_KEY)));
  const [messages, setMessages] = useState<PetMessage[]>([{ id: 0, role: 'pet', text: PET_GREETING }]);
  const [status, setStatus] = useState<PetStatus>('idle');
  const [reaction, setReaction] = useState<PetReaction | null>(null);
  const [bubble, setBubble] = useState<PetBubble | null>(null);
  const [guide, setGuide] = useState<PetGuide | null>(null);
  const [tourIndex, setTourIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<{ text: string; lane?: NotebookLane } | null>(null);
  const [freshEdition, setFreshEdition] = useState<string | null>(null);

  const nextId = useRef(1);
  const inFlight = useRef(false);
  const reactionTimer = useRef<number | undefined>(undefined);
  const pokes = useRef<number[]>([]);
  const editionStamp = useRef<string | null>(null);

  // The mood from an ask lasts until the visitor changes page.
  const activeAsked = askedMood && askedMood.path === pathname ? askedMood.mood : null;
  const activeSection = sectionMood && sectionMood.path === pathname ? sectionMood.mood : null;
  /** What Pip feels when nothing is pinned or asked: the section in view, else the page. */
  const autoMood: SiteMood = activeSection ?? moodForRoute(pathname);
  const mood: SiteMood = activeAsked ?? pinnedMood ?? autoMood;
  // A guide only counts on the page it points at.
  const activeGuide = guide && guide.path === pathname ? guide : null;
  const bubbleRef = useRef(bubble);
  useEffect(() => {
    bubbleRef.current = bubble;
  }, [bubble]);

  useEffect(() => {
    document.documentElement.dataset.mood = mood;
  }, [mood]);

  const react = useCallback((next: PetReaction | null, ms = 2600) => {
    window.clearTimeout(reactionTimer.current);
    setReaction(next);
    if (next) reactionTimer.current = window.setTimeout(() => setReaction(null), ms);
  }, []);

  const push = useCallback((message: Omit<PetMessage, 'id'>) => {
    const id = nextId.current++;
    setMessages((current) => [...current.slice(-40), { ...message, id }]);
  }, []);

  const markEditionSeen = useCallback(() => {
    if (!editionStamp.current) return;
    try {
      window.localStorage.setItem(EDITION_KEY, editionStamp.current);
    } catch {}
    setFreshEdition(null);
  }, []);

  const setOpen = useCallback(
    (next: boolean) => {
      setOpenState(next);
      if (next) {
        setBubble(null);
        // Opening the chat ends a finished walk; a running tour keeps its guide.
        if (tourIndex === null) setGuide(null);
        markEditionSeen();
      }
    },
    [markEditionSeen, tourIndex],
  );

  // ── Guiding: walk to a page, then point at a section ──
  const walkTo = useCallback(
    (path: string, target?: string) => {
      const destination = normalisePath(path);
      setGuide({ path: destination, target });
      if (destination !== pathname) router.push(path);
    },
    [pathname, router],
  );

  const startTourAt = useCallback(
    (index: number) => {
      const stop = TOUR[index];
      if (!stop) return;
      setTourIndex(index);
      setOpenState(false);
      setBubble({ kind: 'tour', text: stop.say });
      walkTo(stop.path, stop.target);
    },
    [walkTo],
  );

  const endTour = useCallback(() => {
    setTourIndex(null);
    setGuide(null);
    setBubble(null);
  }, []);

  const tourNext = useCallback(() => {
    if (tourIndex === null) return;
    if (tourIndex >= TOUR.length - 1) {
      endTour();
      react('happy');
      return;
    }
    startTourAt(tourIndex + 1);
  }, [tourIndex, startTourAt, endTour, react]);

  const runAction = useCallback(
    (action: PetAction) => {
      if (action.type === 'open_resume') {
        window.open('/assets/Mitul_Bhatia_Resume.pdf', '_blank', 'noopener,noreferrer');
        return;
      }
      if (action.type === 'tour') {
        startTourAt(0);
        return;
      }
      setTourIndex(null);
      setOpenState(false);
      setBubble({ kind: 'guide', text: `Here it is: ${action.label}.` });
      walkTo(action.path, action.target);
    },
    [startTourAt, walkTo],
  );

  // ── Asking ──
  const ask = useCallback(
    (prompt: string, options: { lane?: NotebookLane } = {}) => {
      const trimmed = prompt.trim().slice(0, 500);
      if (!trimmed || inFlight.current) return;
      inFlight.current = true;

      if (!greeted) {
        setGreeted(true);
        writeSession(GREETED_KEY, '1');
      }
      setDraft(null);
      setBubble(null);
      push({ role: 'user', text: trimmed });
      setStatus('thinking');

      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 9000);

      void fetch('/api/notebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed, route: pathname, lane: options.lane }),
        signal: controller.signal,
      })
        .then(async (response) => {
          const data = (await response.json().catch(() => null)) as Record<string, unknown> | null;
          if (!data || typeof data.text !== 'string') throw new Error('bad reply');
          const reply: NotebookReply = {
            lane: data.lane === 'edition' || data.lane === 'general' ? data.lane : 'record',
            text: data.text,
            citations: sanitizeCitations(data.citations),
            actions: sanitizeActions(data.actions),
            degraded: data.degraded === true,
            mood: isSiteMood(data.mood) ? data.mood : moodForRoute(pathname),
            reaction:
              data.reaction === 'tantrum' || data.reaction === 'happy' || data.reaction === 'sulk' || data.reaction === 'shy'
                ? data.reaction
                : undefined,
            go: sanitizeActions(data.go ? [data.go] : [])[0],
          };
          push({ role: 'pet', text: reply.text, reply });
          setStatus('idle');
          setAskedMood({ mood: reply.mood, path: pathname });
          if (reply.reaction) react(reply.reaction, reply.reaction === 'tantrum' ? 3200 : 2600);
          if (reply.go) {
            const go = reply.go;
            window.setTimeout(() => runAction(go), 900);
          }
        })
        .catch(() => {
          push({
            role: 'pet',
            text: "I couldn't reach my brain just now. His work is still one click away, though.",
            reply: {
              lane: 'general',
              text: '',
              citations: [],
              actions: [
                { type: 'navigate', path: '/work', label: 'See his work', target: 'lead-case-studies' },
                { type: 'open_resume', label: 'Open résumé' },
              ],
              degraded: true,
              mood,
            },
          });
          setStatus('error');
          react('sulk');
        })
        .finally(() => {
          window.clearTimeout(timeout);
          inFlight.current = false;
        });
    },
    [greeted, pathname, push, react, runAction, mood],
  );

  const sayHi = useCallback(() => {
    setOpenState(true);
    ask('Hi!');
  }, [ask]);

  const pinMood = useCallback(
    (next: SiteMood | null) => {
      setPinnedMood(next);
      setAskedMood(null);
      const shown = next ?? autoMood;
      push({
        role: 'pet',
        text: next
          ? `Okay, ${MOOD_META[next].label.toLowerCase()} mode. ${MOOD_META[next].blurb}`
          : `Back to following the page. Right now that means ${MOOD_META[shown].label.toLowerCase()}.`,
      });
      if (next === 'jealous' || next === 'guarded') react('sulk', 1800);
      else react('happy', 1400);
    },
    [autoMood, push, react],
  );

  const poke = useCallback(() => {
    const now = Date.now();
    pokes.current = [...pokes.current.filter((time) => now - time < 5000), now];
    const count = pokes.current.length;
    if (count >= 5) {
      pokes.current = [];
      react('tantrum', 3200);
      setAskedMood({ mood: 'guarded', path: pathname });
      setBubble({ kind: 'poke', text: TANTRUM_LINES[Math.floor(Math.random() * TANTRUM_LINES.length)] });
      return;
    }
    react(count >= 3 ? 'sulk' : 'shy', 1200);
    setBubble({ kind: 'poke', text: POKE_LINES[Math.min(count - 1, POKE_LINES.length - 1)] });
  }, [pathname, react]);

  const prefill = useCallback(
    (text: string, lane?: NotebookLane) => {
      if (!greeted) {
        setGreeted(true);
        writeSession(GREETED_KEY, '1');
      }
      setDraft({ text, lane });
      setOpen(true);
    },
    [greeted, setOpen],
  );

  // ── The page talks to Pip: sections set a mood, events earn a reaction or a remark ──
  const quiet = open || activeGuide !== null || tourIndex !== null;
  useEffect(() => {
    const onSignal = (event: Event) => {
      const detail = (event as CustomEvent<PipSignal>).detail;
      if (!detail) return;
      if (detail.clearMood) setSectionMood(null);
      if (detail.mood && isSiteMood(detail.mood)) setSectionMood({ mood: detail.mood, path: pathname });
      if (detail.reaction) react(detail.reaction, 1800);
      if (detail.say && !quiet && window.matchMedia('(min-width: 1024px)').matches) {
        const said = (readSession(SAID_KEY) ?? '').split('|');
        if (said.includes(detail.say)) return;
        // A hello, tour or poke bubble keeps the floor; the remark stays unsaid for next time.
        const current = bubbleRef.current;
        if (current && current.kind !== 'remark') return;
        writeSession(SAID_KEY, [...said, detail.say].join('|'));
        setBubble({ kind: 'remark', text: detail.say });
      }
    };
    window.addEventListener(PIP_SIGNAL, onSignal);
    return () => window.removeEventListener(PIP_SIGNAL, onSignal);
  }, [pathname, react, quiet]);

  // ── Visiting /news clears the new-edition fold ──
  useEffect(() => {
    if (pathname.startsWith('/news')) markEditionSeen();
  }, [pathname, markEditionSeen]);

  useEffect(() => {
    if (tourIndex !== null && TOUR[tourIndex]?.path !== pathname) {
      // The visitor navigated away mid-tour on their own.
      const expected = TOUR[tourIndex]?.path;
      const timer = window.setTimeout(() => {
        if (expected && expected !== window.location.pathname) endTour();
      }, 2500);
      return () => window.clearTimeout(timer);
    }
  }, [pathname, tourIndex, endTour]);

  // ── First visit hello, then one remark per page per session ──
  useEffect(() => {
    if (open || activeGuide || tourIndex !== null) return;
    const helloShown = readSession(HELLO_KEY);
    const delay = helloShown ? 4500 : 1200;
    let waitForScroll: (() => void) | null = null;
    const timer = window.setTimeout(() => {
      const heroInView = pathname === '/' && window.scrollY < window.innerHeight * 0.45;
      if (!helloShown && heroInView && window.matchMedia('(min-width: 1024px)').matches) {
        waitForScroll = () => {
          if (window.scrollY < window.innerHeight * 0.45) return;
          window.removeEventListener('scroll', waitForScroll!);
          writeSession(HELLO_KEY, '1');
          setBubble((current) => current ?? helloBubble());
        };
        window.addEventListener('scroll', waitForScroll, { passive: true });
        return;
      }
      if (!helloShown) {
        writeSession(HELLO_KEY, '1');
        setBubble(helloBubble());
        return;
      }
      const seen = (readSession(REMARKS_KEY) ?? '').split('|');
      if (seen.includes(pathname)) return;
      writeSession(REMARKS_KEY, [...seen, pathname].join('|'));
      setBubble({ kind: 'remark', text: remarkForRoute(pathname) });
    }, delay);
    return () => {
      window.clearTimeout(timer);
      if (waitForScroll) window.removeEventListener('scroll', waitForScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-arm per page
  }, [pathname]);

  // Remarks and hellos leave on their own.
  useEffect(() => {
    if (!bubble || bubble.kind === 'tour' || bubble.kind === 'guide') return;
    const timer = window.setTimeout(() => setBubble(null), bubble.kind === 'hello' ? 9000 : bubble.kind === 'poke' ? 2600 : 6500);
    return () => window.clearTimeout(timer);
  }, [bubble]);

  // ── New edition check, off the critical path ──
  useEffect(() => {
    let ignore = false;
    const run = () =>
      fetch('/api/news')
        .then((response) => (response.ok ? response.json() : null))
        .then((edition: { fetchedAt?: string; status?: string } | null) => {
          if (ignore || !edition || edition.status !== 'ready' || typeof edition.fetchedAt !== 'string') return;
          editionStamp.current = edition.fetchedAt;
          let seen: string | null = null;
          try {
            seen = window.localStorage.getItem(EDITION_KEY);
          } catch {}
          if (seen !== edition.fetchedAt && !window.location.pathname.startsWith('/news')) {
            setFreshEdition(edition.fetchedAt);
          }
        })
        .catch(() => {});
    const handle = window.setTimeout(run, 2500);
    return () => {
      ignore = true;
      window.clearTimeout(handle);
    };
  }, []);

  const lastReply = useMemo(() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      if (messages[index].reply) return messages[index].reply ?? null;
    }
    return null;
  }, [messages]);

  const value: PetContextValue = {
    mood,
    pinnedMood,
    pinMood,
    open,
    setOpen,
    greeted,
    sayHi,
    messages,
    status,
    lastReply,
    reaction,
    bubble,
    dismissBubble: () => {
      setBubble(null);
      if (tourIndex === null) setGuide(null);
    },
    guide: activeGuide,
    autoMood,
    tourIndex,
    tourNext,
    endTour,
    ask,
    runAction,
    poke,
    draft,
    prefill,
    clearDraft: () => setDraft(null),
    freshEdition,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}

export function usePet(): PetContextValue {
  const context = useContext(PetContext);
  if (!context) throw new Error('usePet must be used within a PetProvider');
  return context;
}
