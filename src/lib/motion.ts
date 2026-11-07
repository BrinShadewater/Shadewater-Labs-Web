import { createContext, useEffect, useState } from 'react';

const storageKey = 'shadewater-motion';
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

export const MotionContext = createContext<{
  paused: boolean;
  toggle: () => void;
} | null>(null);

export function useMotionPreference() {
  const [choice, setChoice] = useState<boolean | null>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === 'paused') return true;
      if (saved === 'running') return false;
    } catch {
      // The control still works for this visit when storage is unavailable.
    }
    return null;
  });
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia(reducedMotionQuery).matches);
  const paused = choice ?? systemReduced;

  useEffect(() => {
    const media = window.matchMedia(reducedMotionQuery);
    const sync = () => setSystemReduced(media.matches);
    media.addEventListener('change', sync);
    sync();
    return () => media.removeEventListener('change', sync);
  }, []);

  const toggle = () => {
    const next = !paused;
    setChoice(next);
    try {
      localStorage.setItem(storageKey, next ? 'paused' : 'running');
    } catch {
      // Keep the in-memory choice.
    }
  };

  return { paused, toggle };
}
