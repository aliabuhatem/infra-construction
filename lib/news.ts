/* ────────────────────────────────────────────────────────────────────────
   Ordering for the `news_<n>` sections.

   The news list, the article page and the home page's "Latest News" block all
   used to sort on the section number, which only matched publication order by
   coincidence — the moment an article was added or backdated from the admin
   panel it landed in the wrong place. They all sort through here instead.
──────────────────────────────────────────────────────────────────────────── */

/** Milliseconds for an article's `date`, or null when it can't be read.
    The stored values are free text from the admin panel ("Jun 2026", "MAy
    2026", "2026-06-01"); Date.parse handles all of those, case included. */
export function newsTime(date: string | undefined): number | null {
  const t = Date.parse((date || "").trim());
  return Number.isNaN(t) ? null : t;
}

const sectionNumber = (key: string) => parseInt(key.replace("news_", ""), 10) || 0;

/* ── Slugs ────────────────────────────────────────────────────────────────
   Every list that links to an article (the news page, the home page's Latest
   News block, the related strip) fell back to the section key when an article
   had no `slug` — but the article route only ever matched on `slug`, so an
   article created in the admin panel without one linked straight to a 404, and
   Next's prefetcher hammered it. Two articles sharing a slug had the same
   problem from the other end: `find` returned the first, so the second had no
   reachable URL at all.

   Both are solved the way lib/projects.ts solves them — one resolver every
   call site shares, and the section key accepted as an alias by the route. */

/** URL-safe form of a string. Matches lib/projects.ts's cleanSlug. */
const cleanSlug = (v: string | undefined) =>
  (v || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** The same articles with a guaranteed-unique, non-empty `slug`.

    An explicit `slug` field wins — that is what keeps a URL stable across a
    title rewrite — and anything without one falls back to its section key
    rather than to the title, because a news title is a whole sentence and
    would make an unusable URL. A slug already claimed by an earlier article
    also falls back to the section key, so the loser of a collision stays
    reachable instead of being shadowed.

    Slugs are assigned in section order regardless of the order handed in, so
    the article that wins a collision is the same on every page — the news list
    sorts by date, the article route by section number, and they must not
    disagree about which URL belongs to whom. */
export function withNewsSlugs<T extends { _key: string; slug?: string }>(
  items: T[]
): Array<T & { slug: string }> {
  const taken = new Set<string>();
  const assigned = new Map<string, string>();

  for (const n of [...items].sort((a, b) => sectionNumber(a._key) - sectionNumber(b._key))) {
    let slug = cleanSlug(n.slug) || n._key;
    if (taken.has(slug)) slug = n._key;
    taken.add(slug);
    assigned.set(n._key, slug);
  }

  return items.map((n) => ({ ...n, slug: assigned.get(n._key) as string }));
}

/** Newest first. Undated articles sort after every dated one — they are drafts
    that haven't been given a date yet — and among themselves by section number
    descending, so the most recently created draft still leads its group. */
export function compareNewsByNewest(
  a: { _key?: string; sectionKey?: string; date?: string },
  b: { _key?: string; sectionKey?: string; date?: string }
): number {
  const [ta, tb] = [newsTime(a.date), newsTime(b.date)];
  if (ta !== null && tb !== null && ta !== tb) return tb - ta;
  if (ta !== null && tb === null) return -1;
  if (ta === null && tb !== null) return 1;
  return sectionNumber(b._key || b.sectionKey || "") - sectionNumber(a._key || a.sectionKey || "");
}
