/**
 * Single source of truth for every public route that renders admin-managed
 * content (text or images) via getContent().
 *
 * Pages in the App Router are statically rendered at build time. Because
 * getContent() reads the content store from the filesystem/GitHub (not through
 * a tracked fetch), Next.js cannot know the data changed — the only way a saved
 * edit appears on the live site is to revalidatePath() the exact route.
 *
 * IMPORTANT: every page that consumes content MUST be listed here, including the
 * sector sub-pages. If a route is missing, admin edits to that page (e.g. a
 * sector hero image or its project images) will save successfully but never show
 * up on the website until the next full rebuild.
 */
export const CONTENT_PATHS = [
  "/",
  "/about",
  "/sectors",
  "/services",
  "/projects",
  "/news",
  "/careers",
  "/contact",
  "/coming-soon",
];

/**
 * Revalidate every content-driven route plus all dynamic news article pages.
 * Pass Next.js's revalidatePath in (keeps this module free of next/* imports so
 * it can be unit-tested or reused anywhere).
 */
export function revalidateAllContent(revalidatePath) {
  for (const p of CONTENT_PATHS) {
    try { revalidatePath(p); } catch {}
  }
  // Dynamic news article routes (/news/<slug>)
  try { revalidatePath("/news/[slug]", "page"); } catch {}
  // Dynamic service & sector detail routes (/services/<slug>, /sectors/<slug>)
  try { revalidatePath("/services/[slug]", "page"); } catch {}
  try { revalidatePath("/sectors/[slug]", "page"); } catch {}
  // Root layout — also refreshes the shared Navbar/Footer content
  try { revalidatePath("/", "layout"); } catch {}
}
