import { useState, useEffect } from 'react';

/**
 * Persists state to localStorage automatically.
 * @param {string} key - unique storage key
 * @param {*} initialValue - default value if nothing is saved yet
 */
export function useAutoSave(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // storage full or unavailable — silently ignore
    }
  }, [key, state]);

  return [state, setState];
}