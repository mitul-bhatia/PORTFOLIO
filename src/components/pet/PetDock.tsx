'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PET_NAME, TOUR } from '@/content/pet';
import { usePet } from '@/context/PetContext';
import { MOOD_META } from '@/lib/moods';
import { usePrefersReducedMotion } from '@/lib/motion';
import { PetCharacter, type PetFaceStatus } from './PetCharacter';
import { ArrowRight, ChevronDown, Close } from '@/components/ui/icons';

const PetChat = dynamic(() => import('./PetChat'), { ssr: false });
const preloadChat = () => void import('./PetChat');

const DESKTOP = '(min-width: 1024px)';
const SLEEP_AFTER_MS = 60_000;

function formatEdition(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? 'new reading'
    : `new edition · ${new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(date)}`;
}

export function PetDock() {
  const pet = usePet();
  const pathname = usePathname() || '/';
  const reduced = usePrefersReducedMotion();

  const dockRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLButtonElement>(null);
  const [chatMounted, setChatMounted] = useState(false);
  const [moodMenu, setMoodMenu] = useState(false);
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
  const [sleeping, setSleeping] = useState(false);
  const [talking, setTalking] = useState(false);
  const wasOpen = useRef(false);

  const { open, setOpen, guide, bubble, tourIndex } = pet;

  const openChat = useCallback(
    (withMoodMenu = false) => {
      setChatMounted(true);
      setMoodMenu(withMoodMenu);
      setOpen(true);
    },
    [setOpen],
  );

  // Opening from elsewhere (e.g. "Ask Pip" on /news) mounts the chat too.
  if (open && !chatMounted) setChatMounted(true);

  // Focus returns to the pet when the chat closes.
  useEffect(() => {
    if (open) wasOpen.current = true;
    else if (wasOpen.current) {
      wasOpen.current = false;
      // A guided walk closes the chat on purpose; focus stays with the page then.
      if (bubble?.kind !== 'guide' && bubble?.kind !== 'tour') botRef.current?.focus({ preventScroll: true });
    }
  }, [open, bubble]);

  // Keyboard: Cmd/Ctrl+K toggles, Esc closes whatever is showing.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (open) setOpen(false);
        else openChat();
        return;
      }
      if (event.key === 'Escape') {
        if (open) setOpen(false);
        else if (tourIndex !== null) pet.endTour();
        else if (bubble) pet.dismissBubble();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen, openChat, tourIndex, bubble, pet]);

  // Falls asleep after a minute of nothing; any activity wakes it.
  useEffect(() => {
    let last = Date.now();
    const wake = () => {
      last = Date.now();
      setSleeping(false);
    };
    const events = ['pointermove', 'keydown', 'scroll', 'touchstart'] as const;
    events.forEach((name) => window.addEventListener(name, wake, { passive: true }));
    const timer = window.setInterval(() => {
      if (Date.now() - last > SLEEP_AFTER_MS) setSleeping(true);
    }, 5000);
    return () => {
      events.forEach((name) => window.removeEventListener(name, wake));
      window.clearInterval(timer);
    };
  }, []);

  // ── Guiding: find the section, scroll to it, walk over and perch on it ──
  useEffect(() => {
    if (!guide || guide.path !== pathname || !guide.target) return;

    let element: HTMLElement | null = null;
    let tries = 0;
    let frame = 0;
    let poll = 0;

    const place = () => {
      const dock = dockRef.current;
      if (!dock || !element) return;
      if (!window.matchMedia(DESKTOP).matches) {
        setOffset(null);
        return;
      }
      const rect = element.getBoundingClientRect();
      const width = dock.offsetWidth;
      const height = dock.offsetHeight;
      const style = getComputedStyle(dock);
      const homeLeft = window.innerWidth - parseFloat(style.right) - width;
      const homeTop = window.innerHeight - parseFloat(style.bottom) - height;

      if (rect.bottom < 96 || rect.top > window.innerHeight - 80) {
        setOffset(null);
        return;
      }
      const left = Math.min(rect.right - width - 8, window.innerWidth - width - 16);
      let top = rect.top - height + 18; // feet on the section's top rule
      if (top < 72) top = Math.min(Math.max(rect.top + 16, 72), window.innerHeight - height - 16);
      setOffset({ x: Math.round(left - homeLeft), y: Math.round(top - homeTop) });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(place);
    };

    const found = (target: HTMLElement) => {
      element = target;
      target.setAttribute('data-pet-highlight', '');
      const top = target.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.3;
      window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' });
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      onScroll();
    };

    const look = () => {
      const target = document.querySelector<HTMLElement>(`[data-tour="${guide.target}"]`);
      if (target) found(target);
      else if (tries++ < 40) poll = window.setTimeout(look, 100);
    };
    look();

    return () => {
      window.clearTimeout(poll);
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      element?.removeAttribute('data-pet-highlight');
      setOffset(null);
    };
  }, [guide, pathname, reduced]);

  const lastLane = pet.lastReply?.lane ?? null;
  const faceStatus: PetFaceStatus =
    pet.status === 'thinking'
      ? 'thinking'
      : pet.status === 'error'
        ? 'error'
        : talking
          ? 'talking'
          : sleeping && !open
            ? 'sleeping'
            : pet.lastReply?.degraded && open
              ? 'degraded'
              : 'idle';

  const statusLine =
    pet.status === 'thinking'
      ? 'thinking…'
      : pet.freshEdition
        ? formatEdition(pet.freshEdition)
        : sleeping
          ? 'napping'
          : `${MOOD_META[pet.mood].label.toLowerCase()} · ask me`;

  const [arrived, setArrived] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setArrived(true), 3200);
    return () => window.clearTimeout(timer);
  }, []);
  const pose = offset ? 'point' : bubble?.kind === 'hello' || !arrived ? 'wave' : 'rest';
  const showBubble = bubble && (!open || bubble.kind === 'poke');

  const onBotClick = () => {
    if (sleeping) setSleeping(false);
    if (open) {
      pet.poke();
      return;
    }
    if (bubble?.kind === 'tour' || bubble?.kind === 'guide') pet.dismissBubble();
    openChat();
  };

  return (
    <>
      {chatMounted ? (
        <PetChat
          moodMenu={moodMenu}
          setMoodMenu={setMoodMenu}
          onTalkingChange={setTalking}
        />
      ) : null}

      <div
        ref={dockRef}
        className="pet-dock"
        data-open={open ? 'true' : 'false'}
        data-awake={open || showBubble || pet.reaction || talking || pet.status === 'thinking' ? 'true' : 'false'}
        data-travelling={offset ? 'true' : 'false'}
        style={offset ? { transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` } : undefined}
      >
        {showBubble ? (
          <div
            className="pet-bubble"
            // Scroll-triggered remarks are decoration; only bubbles the visitor asked for are announced.
            role={bubble.kind === 'remark' ? undefined : 'status'}
            aria-live={bubble.kind === 'remark' ? 'off' : 'polite'}
            data-kind={bubble.kind}
          >
            <p>{bubble.text}</p>
            {bubble.kind === 'tour' && tourIndex !== null ? (
              <div className="pet-bubble-actions">
                <span className="font-mono text-[11px] text-[var(--muted)]">
                  {tourIndex + 1}/{TOUR.length}
                </span>
                <button type="button" className="pet-chip pet-chip-solid" onClick={pet.tourNext}>
                  {tourIndex === TOUR.length - 1 ? 'Finish' : 'Next'}
                  {tourIndex === TOUR.length - 1 ? null : <ArrowRight size={13} />}
                </button>
                <button type="button" className="pet-chip" onClick={pet.endTour}>
                  End tour
                </button>
              </div>
            ) : bubble.kind === 'hello' ? (
              <div className="pet-bubble-actions">
                <button
                  type="button"
                  className="pet-chip pet-chip-solid"
                  onClick={() => {
                    openChat();
                    pet.sayHi();
                  }}
                >
                  Say hi
                </button>
                {bubble.actions?.map((action) => (
                  <button key={action.label} type="button" className="pet-chip" onClick={() => pet.runAction(action)}>
                    {action.label}
                  </button>
                ))}
              </div>
            ) : bubble.kind !== 'poke' ? (
              <button type="button" className="pet-bubble-close" aria-label="Dismiss" onClick={pet.dismissBubble}>
                <Close size={13} />
              </button>
            ) : null}
          </div>
        ) : null}

        <button
          ref={botRef}
          type="button"
          className="pet-bot"
          onClick={onBotClick}
          onPointerEnter={preloadChat}
          onFocus={preloadChat}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={
            open
              ? `${PET_NAME}, the portfolio guide. Poke`
              : `Talk to ${PET_NAME}, the portfolio guide (Command or Control K)${pet.freshEdition ? '. A new reading edition is waiting' : ''}`
          }
          data-state={open ? 'open' : pet.freshEdition ? 'closed-new' : 'closed'}
        >
          <PetCharacter
            mood={pet.mood}
            status={faceStatus}
            reaction={pet.reaction}
            pose={pose}
            alert={Boolean(pet.freshEdition)}
            lane={lastLane}
            track
          />
        </button>

        <button
          type="button"
          className="pet-status gap-1"
          onClick={() => (open ? setMoodMenu((current) => !current) : openChat(true))}
          aria-label={`Change ${PET_NAME}'s mood. Currently ${MOOD_META[pet.mood].label}`}
        >
          <span className="font-semibold text-[var(--ink)]">{PET_NAME}</span>
          <span aria-hidden="true">·</span>
          <span>{statusLine}</span>
          <ChevronDown size={12} />
        </button>
      </div>
    </>
  );
}
