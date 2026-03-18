import type { EnterpriseEvent } from './types';

const CACHE_KEY = 'spendx-enterprise-cache';

interface EnterpriseCachePayload {
  event: EnterpriseEvent;
  cachedAt: string;
}

export const enterpriseCache = {
  load(): EnterpriseCachePayload | null {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as EnterpriseCachePayload;
    } catch {
      return null;
    }
  },
  save(event: EnterpriseEvent) {
    if (typeof window === 'undefined') return;
    const payload: EnterpriseCachePayload = {
      event,
      cachedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  },
  async hydrateFromBoundary() {
    return this.load();
  },
};
