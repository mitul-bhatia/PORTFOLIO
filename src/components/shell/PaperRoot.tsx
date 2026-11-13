'use client';

import React from 'react';
import { PetProvider } from '@/context/PetContext';

export function PaperRoot({ children }: { children: React.ReactNode }) {
  return (
    <PetProvider>
      <div className="relative flex min-h-screen flex-col">{children}</div>
    </PetProvider>
  );
}
