/**
 * getContent — server-side helper for all pages
 * Reads from site-content.json (or GitHub in production).
 * Returns a typed content object with safe fallbacks.
 *
 * Usage in any Server Component:
 *   const c = await getContent();
 *   <h1>{c.home_hero.title}</h1>
 */

import { readContentStore } from "./admin/content-store";

export type ContentStore = {
  content: Record<string, Record<string, string>>;
  media: Array<{
    id: string;
    title: string;
    alt: string;
    category: string;
    url: string;
    source: string;
    createdAt: string;
  }>;
  _deletedSections: string[];
};

let cache: { data: ContentStore; ts: number } | null = null;
const CACHE_TTL = 0; // always fresh in dev; Next.js handles cache in prod

export async function getContent(): Promise<ContentStore> {
  // In dev, skip memory cache so every request is fresh
  if (process.env.NODE_ENV === "production" && cache && Date.now() - cache.ts < CACHE_TTL) {
    return cache.data;
  }
  try {
    const store = await readContentStore({ includeSiteMedia: false });
    const data = store as ContentStore;
    cache = { data, ts: Date.now() };
    return data;
  } catch {
    return { content: {}, media: [], _deletedSections: [] };
  }
}

/**
 * Helper: get a single field with fallback
 *   get(c, "home_hero", "title", "Default Title")
 */
export function get(
  store: ContentStore,
  section: string,
  field: string,
  fallback = ""
): string {
  return store?.content?.[section]?.[field] || fallback;
}

/**
 * Helper: get all fields of a section, merged with defaults
 */
export function section<T extends Record<string, string>>(
  store: ContentStore,
  sectionName: string,
  defaults: T
): T {
  const saved = store?.content?.[sectionName] || {};
  const result = { ...defaults } as Record<string, string>;
  for (const key of Object.keys(defaults)) {
    if (saved[key] !== undefined && saved[key] !== "") {
      result[key] = saved[key];
    }
  }
  return result as T;
}

/**
 * Helper: return all sections whose key starts with `prefix`, sorted numerically,
 * excluding any sections in `_deletedSections`.
 * Each returned entry has `_key` (the section key) plus all its fields.
 */
export function getSectionsByPrefix(
  store: ContentStore,
  prefix: string
): Array<Record<string, string> & { _key: string }> {
  const deleted = new Set(store._deletedSections || []);
  return Object.entries(store.content || {})
    .filter(([key]) => key.startsWith(prefix) && !deleted.has(key))
    .map(([key, fields]) => ({ _key: key, ...(fields as Record<string, string>) }))
    .sort((a, b) => {
      const suffA = a._key.slice(prefix.length);
      const suffB = b._key.slice(prefix.length);
      const numA = parseInt(suffA, 10);
      const numB = parseInt(suffB, 10);
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return suffA.localeCompare(suffB);
    });
}
