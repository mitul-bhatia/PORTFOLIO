'use client';

import { useSyncExternalStore } from 'react';

const EVENT = 'motion:change';

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

function isPaused() {
  return document.documentElement.dataset.motion === 'off';
}

/** Pauses every looping animation on the site. The choice is remembered on this device. */
export function MotionToggle({ withLabel = false, className = '' }: { withLabel?: boolean; className?: string }) {
  const paused = useSyncExternalStore(subscribe, isPaused, () => false);

  const toggle = () => {
    const next = !paused;
    if (next) document.documentElement.dataset.motion = 'off';
    else delete document.documentElement.dataset.motion;
    try {
      window.localStorage.setItem('motion', next ? 'off' : 'on');
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label="Pause moving elements"
      title={paused ? 'Motion is paused' : 'Pause moving elements'}
      className={`motion-toggle ${className}`}
    >
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {paused ? <path d="M7 4.5v15l13-7.5z" /> : <path d="M6 4.5h4.5v15H6zM13.5 4.5H18v15h-4.5z" />}
      </svg>
      {withLabel ? <span>{paused ? 'Motion paused' : 'Pause motion'}</span> : null}
    </button>
  );
}
