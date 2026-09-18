'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { classifyPromptMood, MOOD_DETAILS, SiteMood } from '@/lib/moodClassifier';

export type BotMood = SiteMood;

interface BotMoodContextType {
  mood: SiteMood;
  setMood: (mood: SiteMood, reason?: string) => void;
  inferFromPrompt: (prompt: string) => SiteMood;
  decayToAmbient: () => void;
  lastSteerFeedback: string | null;
  steerReason: string | null;
}

const BotMoodContext = createContext<BotMoodContextType | null>(null);

export function BotMoodProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMoodState] = useState<SiteMood>('ambient');
  const [lastSteerFeedback, setLastSteerFeedback] = useState<string | null>(null);
  const [steerReason, setSteerReason] = useState<string | null>(MOOD_DETAILS.ambient.defaultReason);
  const decayTimerRef = useRef<number | null>(null);

  // Sync to document.documentElement.dataset.mood so PathField & CSS can read it cleanly
  useEffect(() => {
    document.documentElement.dataset.mood = mood;
  }, [mood]);

  const clearDecayTimer = useCallback(() => {
    if (decayTimerRef.current !== null) {
      window.clearTimeout(decayTimerRef.current);
      decayTimerRef.current = null;
    }
  }, []);

  const decayToAmbient = useCallback(() => {
    clearDecayTimer();
    setMoodState('ambient');
    setSteerReason(MOOD_DETAILS.ambient.defaultReason);
  }, [clearDecayTimer]);

  const scheduleDecay = useCallback(() => {
    clearDecayTimer();
    // 07B spec: decay to Ambient after 8s
    decayTimerRef.current = window.setTimeout(() => {
      decayToAmbient();
    }, 8000);
  }, [clearDecayTimer, decayToAmbient]);

  const setMood = useCallback(
    (nextMood: SiteMood, reason?: string) => {
      setMoodState(nextMood);
      const activeReason = reason || MOOD_DETAILS[nextMood].defaultReason;
      setSteerReason(activeReason);

      if (nextMood !== 'ambient') {
        scheduleDecay();
      } else {
        clearDecayTimer();
      }
    },
    [clearDecayTimer, scheduleDecay],
  );

  const inferFromPrompt = useCallback(
    (prompt: string): SiteMood => {
      const result = classifyPromptMood(prompt, mood);
      setMood(result.mood, result.reason);

      if (result.mood !== 'ambient') {
        setLastSteerFeedback(`Mood: ${result.label.toUpperCase()} · ${result.reason}`);
        window.setTimeout(() => setLastSteerFeedback(null), 3000);
      }
      return result.mood;
    },
    [mood, setMood],
  );

  useEffect(() => {
    return () => clearDecayTimer();
  }, [clearDecayTimer]);

  return (
    <BotMoodContext.Provider
      value={{
        mood,
        setMood,
        inferFromPrompt,
        decayToAmbient,
        lastSteerFeedback,
        steerReason,
      }}
    >
      {children}
    </BotMoodContext.Provider>
  );
}

export function useBotMood(): BotMoodContextType {
  const context = useContext(BotMoodContext);
  if (!context) throw new Error('useBotMood must be used within a BotMoodProvider');
  return context;
}
