'use client';

import React from 'react';
import { PetProvider } from '@/context/PetContext';
import { BackgroundAtmosphere } from './BackgroundAtmosphere';

function PaperRootContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <BackgroundAtmosphere />
      <div className="relative z-10 flex min-h-screen flex-col">
        {children}
      </div>
    </div>
  );
}

export function PaperRoot({ children }: { children: React.ReactNode }) {
  return (
    <PetProvider>
      <PaperRootContent>{children}</PaperRootContent>
    </PetProvider>
  );
}
