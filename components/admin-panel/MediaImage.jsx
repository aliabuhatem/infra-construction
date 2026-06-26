"use client";

import { useContentStore } from "./ContentProvider";

const IMAGE_URL_RE = /\.(jpe?g|png|webp|gif|avif|svg|bmp|tiff)(\?.*)?$/i;

function isImageUrl(val) {
  return typeof val === "string" && val.trim() !== "" && IMAGE_URL_RE.test(val.trim());
}

// Common field names the admin panel may use for images inside a content section
const IMAGE_FIELD_NAMES = [
  "image", "backgroundImage", "background", "bg",
  "photo", "src", "logo", "cover", "thumbnail", "url",
];

/**
 * Renders a site image whose source is controlled by the admin panel.
 *
 * Lookup priority:
 *   1. store.content[category] — checks hint derived from title, then common field names
 *   2. store.media[]           — title match, then category match
 *   3. fallbackSrc             — static asset shipped with the project
 */
export default function MediaImage({
  category   = "gallery",
  title      = "",
  fallbackSrc = "",
  alt        = "",
  className  = "",
}) {
  const { store, loading } = useContentStore();

  let src         = fallbackSrc;
  let resolvedAlt = alt;

  if (!loading) {
    const contentSection = store?.content?.[category] || {};
    const mediaList      = store?.media || [];

    // ── 1. Check content store ──────────────────────────────────────────────
    // Derive a field hint from the title prop:
    //   title="home_hero_background" + category="home_hero" → hint="background"
    //   title="about_hero_image"     + category="about_hero"→ hint="image"
    const categoryPrefix = category.replace(/[-]/g, "_");
    const titleHint = title
      ? title.replace(new RegExp(`^${categoryPrefix}_?`), "")
      : "";

    const fieldsToTry = [
      titleHint,          // exact hint first (often "image", "background", etc.)
      ...IMAGE_FIELD_NAMES,
    ].filter((f) => f && f.length > 0);

    // Deduplicate while preserving order
    const seen = new Set();
    for (const field of fieldsToTry) {
      if (seen.has(field)) continue;
      seen.add(field);
      const val = contentSection[field];
      if (isImageUrl(val)) {
        src = val;
        break;
      }
    }

    // ── 2. Fall back to media library ───────────────────────────────────────
    if (src === fallbackSrc) {
      const found = title
        ? mediaList.find((m) => m.title === title)
        : mediaList.find((m) => m.category === category);
      if (found?.url) {
        src         = found.url;
        resolvedAlt = found.alt || found.title || alt;
      }
    }
  }

  if (!src) return null;

  return <img src={src} alt={resolvedAlt || "Website media"} className={className} />;
}
