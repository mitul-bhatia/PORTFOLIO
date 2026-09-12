'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from 'react';

export type BotMood = 'jealous' | 'fan' | 'bragger';

interface BotMoodContextType {
  mood: BotMood;
  setMood: (mood: BotMood) => void;
  steerMood: (target: BotMood, feedback?: string) => void;
  isUnlocked: boolean;
  unlockSecret: () => void;
  lastSteerFeedback: string | null;
}

const BotMoodContext = createContext<BotMoodContextType | null>(null);

const STORAGE_KEY = 'archivist-mood';
const UNLOCKED_KEY = 'archivist-unlocked';

// External store event bus for reactive state
const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', callback);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', callback);
    }
  };
}

function getStoredMood(): BotMood {
  if (typeof window === 'undefined') return 'jealous';
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as BotMood | null;
    if (saved === 'fan' || saved === 'bragger' || saved === 'jealous') return saved;
    if (saved === ('happy' as string)) return 'fan';
  } catch {
    // noop
  }
  return 'jealous';
}

function getStoredUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(UNLOCKED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function BotMoodProvider({ children }: { children: React.ReactNode }) {
  const mood = useSyncExternalStore<BotMood>(subscribe, getStoredMood, () => 'jealous' as BotMood);
  const isUnlocked = useSyncExternalStore<boolean>(subscribe, getStoredUnlocked, () => false);

  const [lastSteerFeedback, setLastSteerFeedback] = useState<string | null>(null);

  // Sync HTML theme class with current mood
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-jealous', 'theme-fan', 'theme-bragger', 'theme-happy');
    root.classList.add(`theme-${mood}`);
    if (mood === 'fan' || mood === 'bragger') {
      root.classList.add('theme-happy');
    }
    root.setAttribute('data-bot-mood', mood);
  }, [mood]);

  const setMood = useCallback((newMood: BotMood) => {
    try {
      localStorage.setItem(STORAGE_KEY, newMood);
      if (newMood === 'fan' || newMood === 'bragger') {
        localStorage.setItem(UNLOCKED_KEY, 'true');
      }
      notify();
    } catch {
      // noop
    }
  }, []);

  const steerMood = useCallback(
    (target: BotMood, feedback?: string) => {
      setMood(target);
      if (feedback) {
        setLastSteerFeedback(feedback);
        const timer = setTimeout(() => setLastSteerFeedback(null), 3500);
        return () => clearTimeout(timer);
      }
    },
    [setMood]
  );

  const unlockSecret = useCallback(() => {
    try {
      localStorage.setItem(UNLOCKED_KEY, 'true');
      localStorage.setItem(STORAGE_KEY, 'fan');
      notify();
    } catch {
      // noop
    }
  }, []);

  return (
    <BotMoodContext.Provider
      value={{
        mood,
        setMood,
        steerMood,
        isUnlocked,
        unlockSecret,
        lastSteerFeedback,
      }}
    >
      {children}
    </BotMoodContext.Provider>
  );
}

export function useBotMood(): BotMoodContextType {
  const context = useContext(BotMoodContext);
  if (!context) {
    throw new Error('useBotMood must be used within a BotMoodProvider');
  }
  return context;
}
