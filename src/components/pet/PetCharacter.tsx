'use client';

import { useEffect, useRef, useState } from 'react';
import type { SiteMood } from '@/lib/moods';
import type { NotebookLane, PetReaction } from '@/lib/petTypes';
import { usePrefersReducedMotion } from '@/lib/motion';

export type PetFaceStatus = 'idle' | 'listening' | 'thinking' | 'talking' | 'sleeping' | 'error' | 'degraded';
export type PetPose = 'rest' | 'wave' | 'point';

interface PetCharacterProps {
  mood: SiteMood;
  status?: PetFaceStatus;
  reaction?: PetReaction | null;
  pose?: PetPose;
  /** Lights the antenna: a new edition is waiting. */
  alert?: boolean;
  /** Chest light colour: which lane answered last. */
  lane?: NotebookLane | null;
  /** Eyes follow the pointer. */
  track?: boolean;
  className?: string;
}

const INK = 'var(--ink)';
const FACE = 'var(--paper-soft)';
const ACCENT = 'var(--accent)';

/** Eyes centred at (47,58) and (73,58) on the screen. */
function Eyes({ mood, status, reaction, blink }: { mood: SiteMood; status: PetFaceStatus; reaction: PetReaction | null; blink: boolean }) {
  const stroke = { stroke: FACE, strokeWidth: 3, strokeLinecap: 'round' as const, fill: 'none' };

  if (status === 'sleeping' || reaction === 'sulk') {
    return (
      <g>
        <path d="M41 60 q6 4 12 0" {...stroke} />
        <path d="M67 60 q6 4 12 0" {...stroke} />
      </g>
    );
  }
  if (reaction === 'tantrum') {
    return (
      <g>
        <path d="M39 49 l12 5" {...stroke} />
        <path d="M81 49 l-12 5" {...stroke} />
        <rect x="43" y="57" width="7" height="6" fill={FACE} />
        <rect x="70" y="57" width="7" height="6" fill={FACE} />
      </g>
    );
  }
  if (reaction === 'happy' || reaction === 'shy' || mood === 'arriving') {
    return (
      <g>
        <path d="M41 60 q6 -8 12 0" {...stroke} />
        <path d="M67 60 q6 -8 12 0" {...stroke} />
      </g>
    );
  }
  if (mood === 'fan') {
    const heart = (x: number) => `M${x} 56 c0 -4 -6 -4 -6 0 c0 3 6 7 6 7 c0 0 6 -4 6 -7 c0 -4 -6 -4 -6 0 z`;
    return (
      <g fill={ACCENT} stroke={FACE} strokeWidth="1">
        <path d={heart(47)} />
        <path d={heart(73)} />
      </g>
    );
  }
  if (mood === 'bragger') {
    return (
      <g>
        <rect x="37" y="51" width="46" height="11" fill={ACCENT} stroke={FACE} strokeWidth="1.5" />
        <path d="M60 51 v11" stroke={INK} strokeWidth="2" />
        <path d="M41 54 l6 0" stroke={FACE} strokeWidth="1.5" opacity="0.7" />
      </g>
    );
  }

  const height = blink ? 1.5 : status === 'listening' ? 15 : mood === 'focused' ? 8 : mood === 'guarded' ? 6 : 12;
  const top = 58 - height / 2 + (mood === 'guarded' ? 2 : 0);
  const look =
    status === 'thinking'
      ? 'translate(-3px, -4px)'
      : mood === 'jealous'
        ? 'translate(3px, 0)'
        : 'translate(calc(var(--pet-look-x, 0) * 3px), calc(var(--pet-look-y, 0) * 2px))';

  return (
    <g style={{ transform: look, transition: 'transform var(--dur-2) var(--ease-out)' }}>
      <rect x="43" y={top} width="8" height={height} fill={FACE} />
      <rect x="69" y={top} width="8" height={height} fill={FACE} />
      {mood === 'charting' ? (
        <g stroke={ACCENT} strokeWidth="2" fill="none">
          <rect x="38" y="49" width="18" height="17" />
          <rect x="64" y="49" width="18" height="17" />
          <path d="M56 56 h8" />
        </g>
      ) : null}
    </g>
  );
}

function Brows({ mood, reaction, status }: { mood: SiteMood; reaction: PetReaction | null; status: PetFaceStatus }) {
  const stroke = { stroke: FACE, strokeWidth: 2.5, strokeLinecap: 'round' as const };
  if (reaction === 'tantrum' || reaction === 'sulk' || status === 'sleeping') return null;
  if (status === 'degraded') return <path d="M68 45 l10 -3" {...stroke} />;
  if (mood === 'guarded') {
    return (
      <g>
        <path d="M41 46 l11 4" {...stroke} />
        <path d="M79 46 l-11 4" {...stroke} />
      </g>
    );
  }
  if (mood === 'jealous') {
    return (
      <g>
        <path d="M41 48 h11" {...stroke} />
        <path d="M68 44 l11 -2" {...stroke} />
      </g>
    );
  }
  if (mood === 'focused') {
    return (
      <g>
        <path d="M42 48 h10" {...stroke} />
        <path d="M68 48 h10" {...stroke} />
      </g>
    );
  }
  return null;
}

function Mouth({ mood, status, reaction, talkOpen }: { mood: SiteMood; status: PetFaceStatus; reaction: PetReaction | null; talkOpen: boolean }) {
  const stroke = { stroke: FACE, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };

  if (reaction === 'tantrum') return <path d="M46 76 l4 -4 l4 4 l4 -4 l4 4 l4 -4 l4 4" {...stroke} />;
  if (reaction === 'sulk') return <path d="M52 76 q8 -5 16 0" {...stroke} />;
  if (status === 'thinking') {
    return (
      <g fill={FACE}>
        <rect className="pet-tick" x="50" y="73" width="4" height="4" />
        <rect className="pet-tick" x="58" y="73" width="4" height="4" style={{ animationDelay: '160ms' }} />
        <rect className="pet-tick" x="66" y="73" width="4" height="4" style={{ animationDelay: '320ms' }} />
      </g>
    );
  }
  if (status === 'sleeping') return <path d="M55 75 h10" {...stroke} />;
  if (status === 'error') return <path d="M50 75 h20" {...stroke} />;
  if (status === 'talking' && talkOpen) return <rect x="53" y="70" width="14" height="9" fill={FACE} />;
  if (reaction === 'happy' || mood === 'fan' || mood === 'arriving') return <path d="M47 70 q13 12 26 0 z" fill={FACE} stroke={FACE} strokeWidth="2" strokeLinejoin="round" />;
  if (reaction === 'shy') return <path d="M54 73 q6 4 12 0" {...stroke} />;
  if (mood === 'guarded') return <path d="M50 76 q10 -5 20 0" {...stroke} />;
  if (mood === 'jealous') return <path d="M49 74 q4 -3 8 0 q4 3 8 0 q4 -3 6 0" {...stroke} />;
  if (mood === 'bragger') return <path d="M49 72 q10 6 22 -3" {...stroke} />;
  if (mood === 'focused') return <path d="M53 74 h14" {...stroke} />;
  return <path d="M50 71 q10 8 20 0" {...stroke} />;
}

function Arms({ pose, reaction }: { pose: PetPose; reaction: PetReaction | null }) {
  const arm = { stroke: INK, strokeWidth: 4, strokeLinecap: 'round' as const, fill: 'none' };
  if (reaction === 'sulk') {
    return <path d="M36 108 L60 114 L84 108" {...arm} />;
  }
  if (reaction === 'tantrum') {
    return (
      <g>
        <path className="pet-fist-l" d="M34 106 L20 90" {...arm} />
        <path className="pet-fist-r" d="M86 106 L100 90" {...arm} />
      </g>
    );
  }
  const right =
    pose === 'wave' || reaction === 'happy' ? (
      <path className="pet-wave" d="M86 106 L100 92 L104 80" {...arm} />
    ) : pose === 'point' ? (
      <path d="M86 104 L104 98 L114 98" {...arm} />
    ) : (
      <path d="M86 106 L96 120" {...arm} />
    );
  return (
    <g>
      <path d={pose === 'point' ? 'M34 104 L16 98 L6 98' : 'M34 106 L24 120'} {...arm} />
      {right}
    </g>
  );
}

export function PetCharacter({
  mood,
  status = 'idle',
  reaction = null,
  pose = 'rest',
  alert = false,
  lane = null,
  track = false,
  className = '',
}: PetCharacterProps) {
  const reduced = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [blink, setBlink] = useState(false);
  const [talkOpen, setTalkOpen] = useState(false);

  // Blink every 4–7s. The only idle loop.
  useEffect(() => {
    if (reduced) return;
    let timer: number;
    const schedule = () => {
      timer = window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 130);
        schedule();
      }, 4000 + Math.random() * 3000);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [reduced]);

  // Mouth moves while the answer is being typed out, then settles.
  useEffect(() => {
    if (status !== 'talking' || reduced) return;
    const timer = window.setInterval(() => setTalkOpen((current) => !current), 150);
    return () => {
      window.clearInterval(timer);
      setTalkOpen(false);
    };
  }, [status, reduced]);

  // Eyes follow the pointer, written straight to CSS variables (no re-render).
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !track || reduced || window.matchMedia('(pointer: coarse)').matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = svg.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height * 0.45);
        const distance = Math.max(1, Math.hypot(dx, dy));
        const reach = Math.min(1, distance / 240);
        svg.style.setProperty('--pet-look-x', ((dx / distance) * reach).toFixed(2));
        svg.style.setProperty('--pet-look-y', ((dy / distance) * reach).toFixed(2));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [track, reduced]);

  const chest = lane === 'edition' ? ACCENT : lane === 'general' ? 'var(--muted)' : lane === 'record' ? INK : 'var(--border-notebook)';
  const screenEdge = reaction === 'tantrum' ? ACCENT : INK;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 132"
      className={`pet-svg overflow-visible ${className}`}
      data-reaction={reaction ?? undefined}
      data-status={status}
      aria-hidden="true"
    >
      {/* steam, zZ, blush sit outside the body */}
      {reaction === 'tantrum' ? (
        <g stroke={ACCENT} strokeWidth="3" strokeLinecap="round" fill="none">
          <path className="pet-steam" d="M18 18 q-4 -6 0 -12" />
          <path className="pet-steam" d="M102 18 q4 -6 0 -12" style={{ animationDelay: '200ms' }} />
          <path className="pet-steam" d="M28 10 q-3 -5 0 -9" style={{ animationDelay: '400ms' }} />
        </g>
      ) : null}
      {status === 'sleeping' ? (
        <g fill={INK} fontFamily="var(--font-martian), monospace" fontWeight="600">
          <text className="pet-z" x="96" y="18" fontSize="14">z</text>
          <text className="pet-z" x="106" y="6" fontSize="10" style={{ animationDelay: '600ms' }}>z</text>
        </g>
      ) : null}

      <g className="pet-body">
        {/* antenna */}
        <path d="M60 22 V9" stroke={INK} strokeWidth="3" />
        <circle
          cx="60"
          cy="7"
          r="5.5"
          fill={alert || status === 'thinking' ? ACCENT : FACE}
          stroke={INK}
          strokeWidth="2.5"
          className={status === 'thinking' ? 'pet-antenna-busy' : undefined}
        />

        {/* ears */}
        <rect x="6" y="46" width="9" height="24" fill={FACE} stroke={INK} strokeWidth="3" />
        <rect x="105" y="46" width="9" height="24" fill={FACE} stroke={INK} strokeWidth="3" />

        {/* head */}
        <rect x="14" y="22" width="92" height="72" rx="4" fill={FACE} stroke={INK} strokeWidth="3.5" />
        {/* screen */}
        <rect x="24" y="32" width="72" height="52" rx="2" fill={INK} stroke={screenEdge} strokeWidth="2" />

        <Brows mood={mood} reaction={reaction} status={status} />
        <Eyes mood={mood} status={status} reaction={reaction} blink={blink} />
        <Mouth mood={mood} status={status} reaction={reaction} talkOpen={talkOpen} />

        {(mood === 'fan' || reaction === 'shy') && reaction !== 'tantrum' ? (
          <g stroke={ACCENT} strokeWidth="2" strokeLinecap="round">
            <path d="M30 68 l4 -3 M34 70 l4 -3" />
            <path d="M82 68 l4 -3 M86 70 l4 -3" />
          </g>
        ) : null}

        {/* neck + body */}
        <rect x="52" y="94" width="16" height="5" fill={INK} />
        <rect x="34" y="99" width="52" height="22" rx="3" fill={FACE} stroke={INK} strokeWidth="3" />
        <rect x="55" y="105" width="10" height="10" fill={chest} stroke={INK} strokeWidth="1.5" />

        <Arms pose={pose} reaction={reaction} />

        {/* feet */}
        <rect x="40" y="121" width="14" height="7" fill={INK} />
        <rect x="66" y="121" width="14" height="7" fill={INK} />
      </g>
    </svg>
  );
}
