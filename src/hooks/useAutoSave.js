import { useState, useEffect } from 'react';
import { useActiveSessionId } from '@/lib/SessionContext';

/**
 * Persists state to localStorage, scoped to the active HubSpot Flow Session.
 * Each section's data is stored under `session:<id>:<key>` so switching sessions
 * automatically swaps the underlying data without touching section components.
 */
export function useAutoSave(key, initialValue) {
  const sessionId = useActiveSessionId();
  const scopedKey = sessionId ? `session:${sessionId}:${key}` : `unscoped:${key}`;

  const [state, setState] = useState(() => readKey(scopedKey, initialValue));

  // Re-load when the active session (and therefore the key) changes
  useEffect(() => {
    setState(readKey(scopedKey, initialValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopedKey]);

  // Persist on state change
  useEffect(() => {
    try {
      localStorage.setItem(scopedKey, JSON.stringify(state));
    } catch {
      /* storage full or unavailable — silently ignore */
    }
  }, [scopedKey, state]);

  return [state, setState];
}

function readKey(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}
