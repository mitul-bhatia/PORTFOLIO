import type { SiteMood } from '@/lib/moodClassifier';

const SIZE_CLASSES = {
  xs: 'h-5 w-5',
  sm: 'h-7 w-7',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
} as const;

export function MoodFace({
  mood,
  size = 'md',
  isSpeaking = false,
  isListening = false,
  className = '',
}: {
  mood: SiteMood;
  size?: keyof typeof SIZE_CLASSES;
  isSpeaking?: boolean;
  isListening?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 72 72"
      className={`${SIZE_CLASSES[size]} shrink-0 overflow-visible transition-all duration-300 ${
        isListening ? 'rotate-[2deg] scale-105 text-[var(--accent)]' : ''
      } ${className}`}
      fill="none"
      aria-hidden="true"
    >
      {/* Precision Instrument Outer Crosshairs */}
      <path
        d="M36 2v8M36 62v8M2 36h8M62 36h8M10 10l5 5M57 57l5 5M62 10l-5 5M15 57l-5 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
        opacity="0.75"
      />

      {/* Main Square Enclosure - Brutalist 0px frame */}
      <rect
        x="13"
        y="13"
        width="46"
        height="46"
        stroke="currentColor"
        strokeWidth="1.8"
        className="transition-colors duration-300"
      />

      {/* Internal Reticle Corner Marks */}
      <path
        d="M17 21v-4h4 M51 17h4v4 M55 51v4h-4 M21 55h-4v-4"
        stroke="var(--accent)"
        strokeWidth="1.2"
        opacity="0.85"
      />

      {/* CRT Sweeping Scanline */}
      <line
        x1="14"
        y1="16"
        x2="58"
        y2="16"
        stroke="var(--accent)"
        strokeWidth="0.8"
        strokeDasharray="3 1"
        className="animate-crt-scan"
        opacity="0.5"
      />

      {/* --- MOOD: AMBIENT (Calm, resting baseline, gentle breathing, periodic eye glance & blinks) --- */}
      {mood === 'ambient' && (
        <g className="animate-bot-breathe transition-all duration-300 opacity-90">
          <g className="animate-bot-blink">
            <g className="animate-bot-glance">
              <circle cx="27" cy="33" r="2.8" fill="currentColor" />
              <circle cx="45" cy="33" r="2.8" fill="currentColor" />
            </g>
          </g>
          <path
            d={isSpeaking ? 'M28 45h16' : 'M28 44c2 2 5 3 8 3s6-1 8-3'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            className={isSpeaking ? 'animate-bot-talk' : 'transition-all duration-300'}
          />
        </g>
      )}

      {/* --- MOOD: FOCUSED (Technical circuit doing work, active antenna pulse, laser gaze) --- */}
      {mood === 'focused' && (
        <g className="animate-bot-breathe transition-all duration-300">
          <rect x="34" y="17" width="4" height="4" fill="var(--accent)" className="animate-antenna-spark" />
          <path d="M21 24l9-1 M51 24l-9-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
          <g className="animate-bot-blink">
            <g className="animate-bot-glance">
              <rect x="23" y="30" width="7" height="4.5" fill="currentColor" />
              <rect x="42" y="30" width="7" height="4.5" fill="currentColor" />
              <rect x="25" y="31" width="2" height="2" fill="var(--paper)" />
              <rect x="44" y="31" width="2" height="2" fill="var(--paper)" />
            </g>
          </g>
          <path
            d="M24 45h24"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="square"
            className={isSpeaking ? 'animate-bot-talk' : ''}
          />
        </g>
      )}

      {/* --- MOOD: CHARTING (Architectural lineage, compass drafting eyes, measurement calipers) --- */}
      {mood === 'charting' && (
        <g className="animate-bot-breathe transition-all duration-300">
          <path d="M20 25l8 4 M52 25l-8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
          <g className="animate-bot-blink">
            <g className="animate-bot-glance">
              <circle cx="26" cy="34" r="3.2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="26" cy="34" r="1.2" fill="currentColor" />
              <circle cx="46" cy="34" r="3.2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="46" cy="34" r="1.2" fill="currentColor" />
            </g>
          </g>
          <g className={isSpeaking ? 'animate-bot-talk' : ''}>
            <path d="M25 46h22" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
            <path d="M25 44v4 M36 44v4 M47 44v4" stroke="var(--accent)" strokeWidth="1.4" />
          </g>
        </g>
      )}

      {/* --- MOOD: ARRIVING (Convergent chevron antennas, wide receptive gaze, welcoming smile) --- */}
      {mood === 'arriving' && (
        <g className="animate-bot-breathe transition-all duration-300">
          <path d="M19 21l6 4 M53 21l-6 4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="square" className="animate-antenna-spark" />
          <g className="animate-bot-blink">
            <g className="animate-bot-glance">
              <rect x="23" y="29" width="6" height="6" fill="currentColor" />
              <rect x="43" y="29" width="6" height="6" fill="currentColor" />
              <rect x="24" y="30" width="2" height="2" fill="var(--paper)" />
              <rect x="44" y="30" width="2" height="2" fill="var(--paper)" />
            </g>
          </g>
          <path
            d="M24 42c3 5 8.5 7 12 7s9-2 12-7"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="square"
            className={isSpeaking ? 'animate-bot-talk' : ''}
          />
          <circle cx="20" cy="39" r="1.6" fill="var(--accent)" />
          <circle cx="52" cy="39" r="1.6" fill="var(--accent)" />
        </g>
      )}

      {/* --- MOOD: GUARDED (Defensive perimeter, low visor brow, shielded barrier) --- */}
      {mood === 'guarded' && (
        <g className="animate-bot-breathe transition-all duration-300">
          <path d="M21 28h10 M41 28h10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
          <g className="animate-bot-blink">
            <rect x="24" y="33" width="6" height="2.5" fill="currentColor" />
            <rect x="42" y="33" width="6" height="2.5" fill="currentColor" />
          </g>
          <g className={isSpeaking ? 'animate-bot-talk' : ''}>
            <path d="M25 46h22" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
            <path d="M25 43v6 M47 43v6" stroke="var(--accent)" strokeWidth="1.8" />
          </g>
        </g>
      )}

      {/* --- MOOD: JEALOUS (Playful rivalry, cynical raised brow with twitch, squinted smirk) --- */}
      {mood === 'jealous' && (
        <g className="animate-bot-breathe transition-all duration-300">
          {/* Raised cynical left brow with periodic micro-twitch */}
          <path d="M21 24l8-3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" className="animate-brow-twitch" />
          <path d="M43 27h9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
          <g className="animate-bot-blink">
            {/* Open skeptical eye with glancing pupil */}
            <circle cx="26" cy="32" r="3.2" fill="currentColor" />
            <circle cx="25" cy="31" r="1" fill="var(--paper)" />
            {/* Squinted cynical right eye */}
            <rect x="43" y="32" width="8" height="2.5" fill="currentColor" />
          </g>
          {/* Cynical diagonal smirk */}
          <path
            d="M26 47l18-4"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="square"
            className={isSpeaking ? 'animate-bot-talk' : ''}
          />
          <rect x="45" y="41" width="3" height="3" fill="var(--accent)" />
        </g>
      )}

      {/* --- MOOD: BRAGGER (Achievement flex, cocky wink, rotating star glint badge) --- */}
      {mood === 'bragger' && (
        <g className="animate-bot-breathe transition-all duration-300">
          {/* Confident arched double brows */}
          <path d="M21 25l8-2 M43 23l8 2" stroke="var(--accent)" strokeWidth="2" strokeLinecap="square" />
          <g className="animate-bot-blink">
            {/* Open confident left eye with micro-glance */}
            <rect x="23" y="29" width="7" height="6" fill="currentColor" />
            <rect x="25" y="30" width="2" height="2" fill="var(--paper)" />
            {/* Winking smirk right eye */}
            <path d="M43 33l7-3" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
          </g>
          {/* Cocky wide smirk */}
          <path
            d="M26 45l14 3 6-5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="square"
            className={isSpeaking ? 'animate-bot-talk' : ''}
          />
          {/* Top swagger star with glint animation */}
          <g className="animate-star-glint">
            <polygon points="36,17 38,21 42,22 39,25 40,29 36,27 32,29 33,25 30,22 34,21" fill="var(--accent)" />
          </g>
        </g>
      )}

      {/* --- MOOD: FAN (Warm hype, star-sparkle eyes, blushing cheek nodes, wide beam smile) --- */}
      {mood === 'fan' && (
        <g className="animate-bot-breathe transition-all duration-300">
          {/* Sparking antennae */}
          <path d="M22 19l4 4 M50 19l-4 4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="square" className="animate-antenna-spark" />
          {/* Star-sparkle eyes */}
          <g className="animate-bot-blink">
            <g className="animate-bot-glance">
              <polygon points="26,29 27,32 30,33 27,34 26,37 25,34 22,33 25,32" fill="currentColor" />
              <polygon points="46,29 47,32 50,33 47,34 46,37 45,34 42,33 45,32" fill="currentColor" />
            </g>
          </g>
          {/* Beaming smile */}
          <path
            d="M24 43c3 6 8 8 12 8s9-2 12-8"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="square"
            className={isSpeaking ? 'animate-bot-talk' : ''}
          />
          {/* Blushing cheek nodes */}
          <circle cx="19" cy="42" r="2" fill="var(--accent)" className="animate-antenna-spark" />
          <circle cx="53" cy="42" r="2" fill="var(--accent)" className="animate-antenna-spark" />
        </g>
      )}
    </svg>
  );
}
