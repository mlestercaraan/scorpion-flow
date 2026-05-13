import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as store from './sessionStore';

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [sessions, setSessions] = useState(() => store.getSessions());
  const [activeId, setActiveIdState] = useState(() => store.getActiveSessionId());

  // Bootstrap on first mount: migrate legacy or create an empty session
  useEffect(() => {
    if (sessions.length === 0) {
      const migrated = store.migrateLegacyIfNeeded();
      if (migrated) {
        setSessions([migrated]);
        setActiveIdState(migrated.id);
      } else {
        const seeded = store.seedScorpionIfEmpty();
        if (seeded) {
          setSessions([seeded]);
          setActiveIdState(seeded.id);
        } else {
          const fresh = store.createSession({ name: '' });
          store.setActiveSessionId(fresh.id);
          setSessions([fresh]);
          setActiveIdState(fresh.id);
        }
      }
    } else if (!activeId || !sessions.find((s) => s.id === activeId)) {
      const fallback = sessions[0].id;
      store.setActiveSessionId(fallback);
      setActiveIdState(fallback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = useCallback(() => {
    setSessions(store.getSessions());
  }, []);

  const setActive = useCallback((id) => {
    store.setActiveSessionId(id);
    setActiveIdState(id);
  }, []);

  const create = useCallback((client = {}) => {
    const s = store.createSession(client);
    refresh();
    setActive(s.id);
    return s;
  }, [refresh, setActive]);

  const update = useCallback((id, patch) => {
    const s = store.updateSession(id, patch);
    refresh();
    return s;
  }, [refresh]);

  const remove = useCallback((id) => {
    store.deleteSession(id);
    refresh();
    setActiveIdState(store.getActiveSessionId());
  }, [refresh]);

  const session = sessions.find((s) => s.id === activeId) || null;

  return (
    <SessionContext.Provider
      value={{
        sessions,
        session,
        sessionId: activeId,
        setActive,
        create,
        update,
        remove,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside <SessionProvider>');
  return ctx;
}

export function useActiveSessionId() {
  const ctx = useContext(SessionContext);
  return ctx?.sessionId || null;
}

export function useActiveClient() {
  const { session } = useSession();
  return session?.client || null;
}
