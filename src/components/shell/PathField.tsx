'use client';

import { useEffect, useState } from 'react';
import type { SiteMood } from '@/lib/moods';
import { usePrefersReducedMotion } from '@/lib/motion';

const MOODS: SiteMood[] = [
  'ambient',
  'focused',
  'charting',
  'arriving',
  'guarded',
  'jealous',
  'bragger',
  'fan',
];

const MOTIF_OPACITY: Record<SiteMood, number> = {
  ambient: 0.25,
  focused: 0.3,
  charting: 0.3,
  arriving: 0.3,
  guarded: 0.3,
  jealous: 0.25,
  bragger: 0.25,
  fan: 0.25,
};

function band(from: number, to: number, step: number) {
  const values: number[] = [];
  for (let value = from; value <= to; value += step) values.push(value);
  return values;
}

const MOTIFS: Record<SiteMood, Array<{ d: string; stroke: string; width: number }>> = {
  ambient: [
    {
      d: 'M1440 96 H1080 V240 H860 M1440 180 H1200 V360 H980 V440 H740',
      stroke: 'var(--border-notebook)',
      width: 1.2,
    },
    {
      d: 'M1440 320 H1120 V620 H890 M1440 480 H1260 V740 H1020',
      stroke: 'var(--border-notebook)',
      width: 1.2,
    },
  ],
  focused: [
    {
      d: band(1080, 1440, 24).map((x) => `M ${x} 0 V 900`).join(' '),
      stroke: 'var(--ink)',
      width: 0.6,
    },
    {
      d: band(48, 852, 24).map((y) => `M 1080 ${y} H 1440`).join(' '),
      stroke: 'var(--ink)',
      width: 0.6,
    },
  ],
  charting: [
    {
      d: band(0, 4, 1).map((index) => `M ${860 + index * 70} 40 L ${1440} ${620 - index * 80}`).join(' '),
      stroke: 'var(--ink)',
      width: 1,
    },
    {
      d: band(0, 3, 1).map((index) => `M 1440 ${80 + index * 90} L ${980 - index * 40} ${860}`).join(' '),
      stroke: 'var(--accent)',
      width: 0.8,
    },
  ],
  arriving: [
    {
      d: 'M760 80 L1370 820 M980 40 L1370 820 M1180 160 L1370 820',
      stroke: 'var(--accent)',
      width: 1.2,
    },
    {
      d: 'M1240 640 L1370 820 M1310 700 L1410 760 M1288 748 L1360 860',
      stroke: 'var(--ink)',
      width: 1,
    },
  ],
  guarded: [
    {
      d: 'M56 0 V900 M64 0 V900',
      stroke: 'var(--ink)',
      width: 1.1,
    },
    {
      d: 'M1376 0 V900 M1384 0 V900',
      stroke: 'var(--accent)',
      width: 1.1,
    },
  ],
  jealous: [
    {
      d: 'M980 180 H1240 M1020 188 H1260 M1100 340 H1360 M1140 348 H1380',
      stroke: 'var(--ink)',
      width: 1.3,
    },
    {
      d: 'M900 560 H1120 M940 568 H1160 M1080 720 H1320 M1120 728 H1340',
      stroke: 'var(--accent)',
      width: 1.1,
    },
  ],
  bragger: [
    {
      d: 'M1180 80 A 150 150 0 1 1 1179 80 M1180 40 A 190 190 0 1 1 1179 40',
      stroke: 'var(--accent)',
      width: 0.9,
    },
    {
      d: 'M1180 230 L1040 80 M1180 230 L1360 90 M1180 230 L1400 280 M1180 230 L1000 300',
      stroke: 'var(--ink)',
      width: 0.7,
    },
  ],
  fan: [
    {
      d: 'M960 260 Q 1120 180 1280 260 T 1440 240',
      stroke: 'var(--accent)',
      width: 1.4,
    },
    {
      d: 'M960 340 Q 1140 430 1320 330 T 1440 360',
      stroke: 'var(--ink)',
      width: 1.1,
    },
  ],
};

function DrawnPath({
  d,
  delay,
  reduced,
  stroke,
  strokeWidth,
}: {
  d: string;
  delay: number;
  reduced: boolean;
  stroke: string;
  strokeWidth: number;
}) {
  const [drawn, setDrawn] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const frame = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      pathLength={1}
      strokeDasharray="1"
      strokeDashoffset={reduced || drawn ? 0 : 1}
      style={{
        transition: reduced ? 'none' : 'stroke-dashoffset calc(var(--dur-3) * 2) var(--ease-out)',
        transitionDelay: reduced ? '0ms' : `${delay}ms`,
      }}
    />
  );
}

export function PathField({ quiet = false }: { quiet?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [mood, setMood] = useState<SiteMood>('ambient');

  useEffect(() => {
    const updateMood = () => {
      const raw = document.documentElement.dataset.mood as SiteMood | undefined;
      setMood(raw && MOODS.includes(raw) ? raw : 'ambient');
    };

    updateMood();
    const observer = new MutationObserver(updateMood);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mood'] });
    return () => observer.disconnect();
  }, []);

  const paths = MOTIFS[mood];

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${
        quiet
          ? 'opacity-40 [mask-image:linear-gradient(90deg,transparent_0%,transparent_36%,black_70%)]'
          : ''
      }`}
      aria-hidden="true"
      data-active-path-mood={mood}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: MOTIF_OPACITY[mood] }}
      >
        <g key={mood}>
          {paths.map((path, index) => (
            <DrawnPath
              key={`${mood}-${index}`}
              d={path.d}
              delay={index * 60}
              reduced={reduced}
              stroke={path.stroke}
              strokeWidth={path.width}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
