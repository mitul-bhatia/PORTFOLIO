'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { PET_NAME } from '@/content/pet';
import { usePet } from '@/context/PetContext';
import { signalPip } from '@/lib/pipSignal';
import { PetCharacter } from '@/components/pet/PetCharacter';

/**
 * The interchange every line leaves from. It shows Mitul; press it and it
 * flips to Pip, and the whole map switches to its robot state.
 */
export function HubPortrait({ className = '', hint = false }: { className?: string; hint?: boolean }) {
  const pet = usePet();
  const ref = useRef<HTMLButtonElement>(null);
  const [bot, setBot] = useState(false);
  const [touched, setTouched] = useState(false);

  const toggle = () => {
    const next = !bot;
    setBot(next);
    setTouched(true);
    const map = ref.current?.closest<HTMLElement>('.map-wrap');
    if (map) map.dataset.bot = next ? 'true' : 'false';
    signalPip(
      next
        ? { reaction: 'happy', say: `You found the switch. I'm ${PET_NAME}, his robot. Ask me anything.` }
        : { reaction: 'shy' },
    );
  };

  // The portrait leans a little toward the pointer.
  const onMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el || event.pointerType === 'touch') return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--tilt-x', `${(-y * 16).toFixed(1)}deg`);
    el.style.setProperty('--tilt-y', `${(x * 16).toFixed(1)}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty('--tilt-x', '0deg');
    ref.current?.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <button
      ref={ref}
      type="button"
      className={`hub ${className}`}
      data-face={bot ? 'bot' : 'me'}
      aria-pressed={bot}
      aria-label={`Switch the map to ${PET_NAME}, the portfolio robot`}
      onClick={toggle}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className="hub-pulse" aria-hidden="true" />
      <span className="hub-pulse hub-pulse-late" aria-hidden="true" />
      <span className="hub-orbit" aria-hidden="true" />
      <span className="hub-card" aria-hidden="true">
        <span className="hub-face hub-front">
          <Image src="/assets/profile.jpg" alt="" width={240} height={240} priority className="hub-photo" />
        </span>
        <span className="hub-face hub-back">
          <PetCharacter mood={pet.mood} reaction={bot ? 'happy' : null} track className="h-[78%] w-[78%]" />
        </span>
      </span>
      {hint ? (
        <span className="hub-hint t-sign" aria-hidden="true" data-quiet={touched && !bot ? 'true' : 'false'}>
          {bot ? 'Bring Mitul back' : touched ? 'Meet Pip again' : 'Press me'}
        </span>
      ) : null}
    </button>
  );
}
