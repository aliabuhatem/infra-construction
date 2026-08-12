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
