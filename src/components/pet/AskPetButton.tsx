'use client';

import { usePet } from '@/context/PetContext';
import type { NotebookLane } from '@/lib/petTypes';

export function AskPetButton({
  prompt,
  lane,
  send = false,
  children,
  className = '',
}: {
  prompt: string;
  lane?: NotebookLane;
  /** Ask straight away instead of leaving the question in the input. */
  send?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const { prefill, ask, setOpen } = usePet();
  const onClick = () => {
    if (!send) return prefill(prompt, lane);
    setOpen(true);
    ask(prompt, { lane });
  };
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
