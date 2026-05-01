type CacheEntry<T> = {
  updatedAt: number;
  data: T;
};

const CACHE_PREFIX = "opunabo_swr:";
const memoryCache = new Map<string, CacheEntry<unknown>>();

function storageKey(key: string): string {
  return `${CACHE_PREFIX}${key}`;
}

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getCachedEntry<T>(key: string, persistToStorage = true): CacheEntry<T> | null {
  const fromMemory = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (fromMemory) {
    return fromMemory;
  }

  if (!persistToStorage || !canUseStorage()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(storageKey(key));
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CacheEntry<T>;
    if (!parsed || typeof parsed.updatedAt !== "number") return null;

    memoryCache.set(key, parsed as CacheEntry<unknown>);
    return parsed;
  } catch {
    return null;
  }
}

export function setCachedEntry<T>(
  key: string,
  data: T,
  persistToStorage = true
): CacheEntry<T> {
  const entry: CacheEntry<T> = {
    updatedAt: Date.now(),
    data,
  };

  memoryCache.set(key, entry as CacheEntry<unknown>);

  if (persistToStorage && canUseStorage()) {
    try {
      window.localStorage.setItem(storageKey(key), JSON.stringify(entry));
    } catch {
      // Ignore storage quota and serialization failures.
    }
  }

  return entry;
}

export function isCacheStale(
  entry: { updatedAt: number } | null,
  staleTimeMs = 120000
): boolean {
  if (!entry) return true;
  return Date.now() - entry.updatedAt > staleTimeMs;
}

export function formatCacheAge(updatedAt?: number | null): string {
  if (!updatedAt) return "no cache";

  const ageMs = Date.now() - updatedAt;
  if (ageMs < 10000) return "just now";

  const sec = Math.floor(ageMs / 1000);
  if (sec < 60) return `${sec}s ago`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;

  const hrs = Math.floor(min / 60);
  return `${hrs}h ago`;
}

export type { CacheEntry };
