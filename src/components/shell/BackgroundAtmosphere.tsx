'use client';

import { useBotMood } from '@/context/BotMoodContext';
import { PathField } from './PathField';

export function BackgroundAtmosphere() {
  const { lastSteerFeedback } = useBotMood();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Archival paper texture */}
      <div
        className="absolute inset-0 opacity-[0.42]"
        style={{
          backgroundImage: 'url(/assets/plates/paper-texture.png)',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Mood-Reactive PathField (07B) */}
      <PathField />

      {/* Sheet Framing Lines */}
      <div className="absolute inset-x-6 top-6 hidden border-t border-[var(--border-notebook)] opacity-50 xl:block" />
      <div className="absolute bottom-6 left-6 top-6 hidden border-l border-[var(--border-notebook)] opacity-50 xl:block" />

      {/* Telemetry Alert Toast - Native Hand-rolled CSS transition */}
      {lastSteerFeedback && (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 top-20 z-50 flex -translate-x-1/2 items-center gap-2.5 border border-[var(--ink)] bg-[var(--paper-soft)] px-4 py-2 font-mono text-[11px] font-medium tracking-[0.04em] text-[var(--ink)] shadow-notebook transition-all duration-200"
        >
          <span className="h-2 w-2 bg-[var(--accent)]" aria-hidden="true" />
          <span>{lastSteerFeedback}</span>
        </div>
      )}
    </div>
  );
}
