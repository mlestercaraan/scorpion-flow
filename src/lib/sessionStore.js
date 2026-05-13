// localStorage-backed CRUD for HubSpot Flow sessions.
// Pure functions, no React.

import { SCORPION_CLIENT, SCORPION_SECTIONS } from './scorpionSeed';

const SESSIONS_KEY = 'hfs:sessions';
const ACTIVE_KEY = 'hfs:active';

const EMPTY_CLIENT = {
  name: '',
  industry: '',
  hubspotPortalId: '',
  hubspotPlan: '',
  hubspotHubs: [],
  ownerName: '',
  ownerRole: '',
  successCriteria: '',
  notes: '',
};

const newId = () =>
  (Date.now().toString(36) + Math.random().toString(36).slice(2, 8)).toLowerCase();

const safeRead = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const safeWrite = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / unavailable — silently ignore */
  }
};

export function getSessions() {
  const list = safeRead(SESSIONS_KEY, []);
  return Array.isArray(list) ? list : [];
}

function writeSessions(list) {
  safeWrite(SESSIONS_KEY, list);
}

export function getActiveSessionId() {
  try {
    return localStorage.getItem(ACTIVE_KEY) || null;
  } catch {
    return null;
  }
}

export function setActiveSessionId(id) {
  try {
    if (id) localStorage.setItem(ACTIVE_KEY, id);
    else localStorage.removeItem(ACTIVE_KEY);
  } catch {
    /* ignore */
  }
}

export function getSession(id) {
  return getSessions().find((s) => s.id === id) || null;
}

export function getActiveSession() {
  const id = getActiveSessionId();
  return id ? getSession(id) : null;
}

export function createSession(client = {}) {
  const now = new Date().toISOString();
  const session = {
    id: newId(),
    client: { ...EMPTY_CLIENT, ...client },
    createdAt: now,
    updatedAt: now,
  };
  writeSessions([...getSessions(), session]);
  return session;
}

export function updateSession(id, patch) {
  const list = getSessions();
  const idx = list.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  const next = {
    ...list[idx],
    ...patch,
    client: patch.client ? { ...list[idx].client, ...patch.client } : list[idx].client,
    updatedAt: new Date().toISOString(),
  };
  list[idx] = next;
  writeSessions(list);
  return next;
}

export function deleteSession(id) {
  const list = getSessions().filter((s) => s.id !== id);
  writeSessions(list);
  if (getActiveSessionId() === id) {
    setActiveSessionId(list[0]?.id || null);
  }
  // also clean up scoped section data
  try {
    const prefix = `session:${id}:`;
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) localStorage.removeItem(key);
    }
  } catch {
    /* ignore */
  }
}

// One-time migration: if legacy un-scoped blueprint_* keys exist and no sessions yet,
// bootstrap a "Royer Networks" session and move keys into its scope.
const LEGACY_KEYS = [
  'blueprint_icp',
  'blueprint_lead_sources',
  'blueprint_pipeline_lead-pipeline',
  'blueprint_pipeline_deal-pipeline',
  'blueprint_custom_workflows',
  'blueprint_build_priorities',
  'blueprint_resources',
  'blueprint_decisions',
];

export function migrateLegacyIfNeeded() {
  if (getSessions().length > 0) return null;
  const hasLegacy = LEGACY_KEYS.some((k) => {
    try {
      return localStorage.getItem(k) !== null;
    } catch {
      return false;
    }
  });
  if (!hasLegacy) return null;

  const session = createSession({
    name: 'Royer Networks',
    industry: 'Financial Services (Advisors, RIAs, CPAs, Wealth Managers)',
    hubspotPortalId: '245123419',
    notes: 'Migrated from the original Royer × Serendipity blueprint deck.',
  });

  LEGACY_KEYS.forEach((key) => {
    try {
      const value = localStorage.getItem(key);
      if (value !== null) {
        localStorage.setItem(`session:${session.id}:${key}`, value);
        localStorage.removeItem(key);
      }
    } catch {
      /* ignore */
    }
  });

  setActiveSessionId(session.id);
  return session;
}

export const HUBSPOT_PLANS = ['Free', 'Starter', 'Professional', 'Enterprise'];

export const HUBSPOT_HUBS = ['Marketing', 'Sales', 'Service', 'Content', 'Operations', 'Commerce'];

// First-visit seed: drop in the Scorpion demo session pre-populated across every tab
// so a brand-new browser landing on the live URL sees a ready-to-present app.
export function seedScorpionIfEmpty() {
  if (getSessions().length > 0) return null;
  const session = createSession(SCORPION_CLIENT);
  for (const [key, value] of Object.entries(SCORPION_SECTIONS)) {
    safeWrite(`session:${session.id}:${key}`, value);
  }
  setActiveSessionId(session.id);
  return session;
}
