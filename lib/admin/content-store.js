import fs from "fs/promises";
import path from "path";
import { put, head, del } from "@vercel/blob";
import { defaultContentStore } from "./default-content";

/**
 * Storage strategy (tried in order on write, read falls back in same order):
 *  1. GitHub  — if GITHUB_TOKEN + GITHUB_REPO env vars are set
 *  2. data/site-content.json — primary persistent storage (works on VPS / Railway / local)
 *  3. /tmp    — fallback for read-only filesystems (Vercel, etc.)
 *  4. defaults — last resort, never persisted
 */

const DATA_DIR      = path.join(process.cwd(), "data");
const DATA_FILE     = path.join(DATA_DIR, "site-content.json");
const TMP_DATA_FILE = "/tmp/infra-site-content.json";
const UPLOAD_DIR    = path.join(process.cwd(), "public", "admin-uploads");
const MEDIA_DIR     = path.join(process.cwd(), "public", "media");
const IMAGE_EXT     = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg", ".bmp", ".tiff"]);

// ── in-memory cache (survives within the same Node.js process) ───────────────
// TTL'd on purpose: serverless instances are reused across requests, so an
// unbounded cache lets a warm instance keep serving a store it read minutes ago
// while another instance serves fresh data — the admin panel and the live site
// then disagree about which images exist. Short enough to self-heal, long
// enough to still absorb GitHub's read-after-write lag right after a save.
const MEMORY_CACHE_TTL_MS = 10_000;
let memoryCache = null;
let memoryCacheAt = 0;

function setMemoryCache(store) {
  memoryCache   = store;
  memoryCacheAt = Date.now();
  return store;
}
function freshMemoryCache() {
  if (memoryCache && Date.now() - memoryCacheAt < MEMORY_CACHE_TTL_MS) return memoryCache;
  return null;
}

// ── github config ─────────────────────────────────────────────────────────────
function githubConfig() {
  return {
    token:       process.env.GITHUB_TOKEN,
    repo:        process.env.GITHUB_REPO,
    branch:      process.env.GITHUB_BRANCH || "main",
    contentPath: process.env.GITHUB_CONTENT_PATH || "data/site-content.json",
  };
}
function hasGithubConfig() {
  const c = githubConfig();
  return Boolean(c.token && c.repo);
}

// ── helpers ───────────────────────────────────────────────────────────────────
function cleanFileName(name) {
  return String(name || "image.png")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

function titleize(filename) {
  return filename
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function categorize(filename) {
  const n = filename.toLowerCase();
  if (n.includes("hero"))                                                        return "hero";
  if (n.startsWith("water") || n.includes("dam"))                               return "water";
  if (n.includes("airport"))                                                     return "airports";
  if (n.includes("port") || n.includes("marine"))                               return "ports-marine";
  if (n.includes("energy") || n.includes("power"))                              return "energy";
  if (n.includes("housing") || n.includes("ministry") || n.startsWith("buildings")) return "buildings";
  if (n.includes("highway") || n.includes("causeway") || n.startsWith("infrastructure")) return "infrastructure";
  if (n.includes("plant") || n.startsWith("industrial"))                        return "industrial";
  if (n.includes("hotel") || n.startsWith("fm"))                                return "facilities";
  if (n.includes("logo") || n.includes("favicon"))                              return "branding";
  if (n.includes("photo") || n.includes("user"))                                return "people";
  return "gallery";
}

/** Merge user-saved content with defaults at the FIELD level.
 *  - Sections in _deletedSections are excluded entirely.
 *  - For every other section: default fields are shown, user fields override them.
 *  - User-only sections (not in defaults) are kept as-is.
 *  This ensures newly added default fields (like `image`) always appear in the
 *  admin panel even when the section was previously saved without them. */
// Sections from the retired sector-page taxonomy. They are no longer rendered
// anywhere (replaced by the svc_/sct_ expertise system) — filter them out so
// the admin panel stays clean and organised.
const DEAD_SECTION_PREFIXES = ["sector_", "sectors_", "infra_hub"];
const isDeadSection = (k) => DEAD_SECTION_PREFIXES.some((p) => k.startsWith(p));

function mergeWithDefaults(saved) {
  const defaultContent  = defaultContentStore.content || {};
  const userContent     = saved?.content || {};
  const deletedSections = new Set(saved?._deletedSections || []);
  const merged          = {};

  for (const [k, defaultFields] of Object.entries(defaultContent)) {
    if (deletedSections.has(k) || isDeadSection(k)) continue;
    const userFields = userContent[k];
    // Field-level merge: spread defaults first, then user fields win
    merged[k] = userFields ? { ...defaultFields, ...userFields } : defaultFields;
  }
  // User sections that have no default counterpart
  for (const [k, v] of Object.entries(userContent)) {
    if (!merged[k] && !isDeadSection(k)) merged[k] = v;
  }

  return {
    content:          merged,
    media:            Array.isArray(saved?.media) ? saved.media : [],
    _deletedSections: [...deletedSections],
  };
}

// ── sanitize (preserves camelCase keys) ──────────────────────────────────────
export function sanitizeStore(input) {
  const content = {};
  for (const [sec, fields] of Object.entries(input?.content || {})) {
    const safeSec = String(sec).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80);
    if (!safeSec) continue;
    content[safeSec] = {};
    for (const [field, value] of Object.entries(fields || {})) {
      const safeField = String(field).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80);
      if (!safeField) continue;
      content[safeSec][safeField] = String(value ?? "").slice(0, 5000);
    }
  }
  const media = Array.isArray(input?.media)
    ? input.media.slice(0, 1000).map((m) => ({
        id:        String(m.id || Date.now()),
        title:     String(m.title || "Media").slice(0, 160),
        alt:       String(m.alt || m.title || "Media").slice(0, 200),
        category:  String(m.category || "gallery").slice(0, 60),
        url:       String(m.url || "").slice(0, 1000),
        source:    String(m.source || "upload").slice(0, 30),
        createdAt: String(m.createdAt || new Date().toISOString()),
      })).filter((m) => m.url)
    : [];
  const deletedSections = Array.isArray(input?._deletedSections)
    ? input._deletedSections
        .map((s) => String(s).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80))
        .filter(Boolean)
    : [];
  return { content, media, _deletedSections: deletedSections };
}

// ── data/site-content.json I/O (primary persistent storage) ──────────────────
async function readFromDataFile() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return mergeWithDefaults(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeToDataFile(store) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
    return true;
  } catch {
    return false;
  }
}

// ── /tmp I/O (fallback for read-only filesystems) ────────────────────────────
async function readFromTmp() {
  try {
    const raw = await fs.readFile(TMP_DATA_FILE, "utf8");
    return mergeWithDefaults(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeToTmp(store) {
  try {
    await fs.writeFile(TMP_DATA_FILE, JSON.stringify(store, null, 2), "utf8");
    return true;
  } catch {
    return false;
  }
}

// ── GitHub I/O ────────────────────────────────────────────────────────────────
async function githubRequest(url, options = {}) {
  const cfg = githubConfig();
  const res = await fetch(url, {
    ...options,
    headers: {
      Accept:                "application/vnd.github+json",
      Authorization:         `Bearer ${cfg.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });
  if (!res.ok && res.status !== 404) {
    const txt = await res.text();
    throw new Error(`GitHub ${res.status}: ${txt}`);
  }
  return res;
}

async function readFromGithub() {
  const cfg = githubConfig();
  const url = `https://api.github.com/repos/${cfg.repo}/contents/${cfg.contentPath}?ref=${cfg.branch}`;
  const res = await githubRequest(url);
  if (res.status === 404) return mergeWithDefaults(defaultContentStore);
  const data = await res.json();
  return mergeWithDefaults(
    JSON.parse(Buffer.from(data.content || "", "base64").toString("utf8"))
  );
}

async function writeToGithub(store, message) {
  const cfg    = githubConfig();
  const shaRes = await githubRequest(
    `https://api.github.com/repos/${cfg.repo}/contents/${cfg.contentPath}?ref=${cfg.branch}`
  );
  const sha = shaRes.status === 404 ? undefined : (await shaRes.json()).sha;
  const res = await githubRequest(
    `https://api.github.com/repos/${cfg.repo}/contents/${cfg.contentPath}`,
    {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        message: message || "Update website content",
        content: Buffer.from(JSON.stringify(store, null, 2)).toString("base64"),
        branch:  cfg.branch,
        ...(sha ? { sha } : {}),
      }),
    }
  );
  if (!res.ok) throw new Error("GitHub write failed");
}

// ── media scan (always fresh, never cached) ───────────────────────────────────
async function scanLocalMedia() {
  const items = [];
  async function walk(dir, prefix) {
    let entries;
    try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.name.startsWith(".")) continue;
      const full = path.join(dir, e.name);
      const url  = `${prefix}/${e.name}`;
      if (e.isDirectory()) { await walk(full, url); continue; }
      const ext = path.extname(e.name).toLowerCase();
      if (!IMAGE_EXT.has(ext)) continue;
      items.push({
        id:        `local-${Buffer.from(url).toString("base64url")}`,
        title:     titleize(e.name),
        alt:       titleize(e.name),
        category:  categorize(e.name),
        url,
        source:    "site",
        createdAt: new Date(0).toISOString(),
      });
    }
  }
  await walk(MEDIA_DIR,  "/media");
  await walk(UPLOAD_DIR, "/admin-uploads");
  return items;
}

async function withSiteMedia(store) {
  const scanned = await scanLocalMedia();
  const seen    = new Set();
  const merged  = [];
  // user-uploaded items take precedence; site items fill in gaps
  for (const m of [...(store.media || []), ...scanned]) {
    if (!m?.url || seen.has(m.url)) continue;
    seen.add(m.url);
    merged.push(m);
  }
  return { ...store, media: merged };
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function readContentStore({ includeSiteMedia = true } = {}) {
  let base;

  const cached = freshMemoryCache();

  if (hasGithubConfig()) {
    // Use the in-process cache while it is fresh (it is refreshed by
    // writeContentStore after every write). This absorbs the read-after-write
    // race where GitHub's API may return the previous file content on an
    // immediate GET following a PUT, without pinning stale data forever.
    base = cached ?? setMemoryCache(await readFromGithub());
  } else if (cached) {
    base = cached;
  } else {
    // Try persistent file first, then /tmp fallback, then shipped defaults
    base = setMemoryCache(
      (await readFromDataFile()) ??
        (await readFromTmp()) ??
        mergeWithDefaults(defaultContentStore)
    );
  }

  return includeSiteMedia ? withSiteMedia(base) : base;
}

export async function writeContentStore(store, message) {
  // Strip auto-scanned site media before persisting — they are always re-scanned
  const userMedia = (store.media || []).filter((m) => m.source !== "site");
  const clean     = sanitizeStore({ ...store, media: userMedia });

  if (hasGithubConfig()) {
    await writeToGithub(clean, message);
  } else {
    // Try data/site-content.json first (persistent); fall back to /tmp
    const wroteToFile = await writeToDataFile(clean);
    if (!wroteToFile) {
      await writeToTmp(clean);
    }
  }
  // Always update in-process cache so the next readContentStore() call (including
  // the one in the POST handler) sees the just-written data rather than re-reading
  // from disk or GitHub (which can return stale content on rapid read-after-write).
  setMemoryCache(mergeWithDefaults(clean));
  return true;
}

// Uploaded files land in /media/ with a timestamp prefix so they can be
// distinguished from shipped assets (e.g. 1750000000000-my-image.jpg).
const UPLOADED_FILE_RE = /^\d{13}-/;

// @vercel/blob accepts EITHER a static read-write token OR OIDC credentials
// (VERCEL_OIDC_TOKEN, injected automatically into Vercel functions) paired with
// BLOB_STORE_ID. This project's store is connected via OIDC, so it has
// BLOB_STORE_ID but no BLOB_READ_WRITE_TOKEN — gating on the token alone made
// this return false in production, silently sending every upload into the
// local-disk fallback below and failing on the read-only filesystem.
export function hasBlobConfig() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

/**
 * Persist an uploaded image and return a URL that is servable IMMEDIATELY.
 *
 * Uploaded binaries must never be committed to the repo or written into
 * public/. public/ is baked into the build output, so a file added at runtime
 * is not servable by the deployment that is already running — it only appears
 * after the next build finishes. That is exactly what made every uploaded
 * image render as a broken icon: the media record went live instantly while
 * the bytes stayed invisible until a redeploy (and the CDN then cached the
 * 404). It also grew public/media to 95MB inside the git repo.
 *
 * Vercel Blob returns a CDN URL that is live the moment put() resolves.
 * Local dev (no BLOB_READ_WRITE_TOKEN) keeps writing to public/media, which is
 * fine there because `next dev` serves public/ from disk on every request.
 *
 * Always returns a URL whose bytes have been read back and verified, so a
 * caller can never record a media item that points at nothing.
 */
export async function uploadMediaFile(originalName, buffer, contentType = "application/octet-stream") {
  const fileName = `${Date.now()}-${cleanFileName(originalName)}`;

  if (hasBlobConfig()) {
    let uploaded;
    try {
      uploaded = await put(`media/${fileName}`, buffer, {
        access:          "public",
        contentType,
        addRandomSuffix: false,
        allowOverwrite:  true,
      });
    } catch (err) {
      throw new Error(`Blob upload failed: ${err?.message || err}`);
    }
    if (!uploaded?.url) throw new Error("Blob upload returned no URL.");

    // Read it back before anyone records it. A silent partial write would
    // otherwise be discovered only as a broken image on the live site.
    let meta;
    try {
      meta = await head(uploaded.url);
    } catch (err) {
      throw new Error(`Upload could not be read back from Blob storage: ${err?.message || err}`);
    }
    if (meta?.size !== buffer.length) {
      throw new Error(
        `Upload size mismatch: sent ${buffer.length} bytes, storage reports ${meta?.size ?? "unknown"}.`
      );
    }
    return uploaded.url;
  }

  // ── local dev fallback ──────────────────────────────────────────────────
  const diskPath = path.join(MEDIA_DIR, fileName);
  await fs.mkdir(MEDIA_DIR, { recursive: true });
  try {
    await fs.writeFile(diskPath, buffer);
  } catch (err) {
    throw new Error(
      `Could not write ${fileName} to public/media (${err?.code || err?.message}). ` +
      `On a read-only host set BLOB_READ_WRITE_TOKEN, or BLOB_STORE_ID with OIDC ` +
      `enabled, so uploads go to Vercel Blob.`
    );
  }
  const stat = await fs.stat(diskPath).catch(() => null);
  if (!stat || stat.size !== buffer.length) {
    throw new Error(
      `Upload did not persist: wrote ${buffer.length} bytes, found ${stat?.size ?? "no file"} on disk.`
    );
  }
  return `/media/${fileName}`;
}

export async function deleteUploadedMedia(url) {
  // Vercel Blob objects are absolute URLs on the blob CDN.
  if (/^https?:\/\//i.test(url || "")) {
    if (!hasBlobConfig()) return false;
    try { await del(url); return true; } catch { return false; }
  }
  // Support both /media/ (new uploads) and /admin-uploads/ (legacy uploads)
  if (url?.startsWith("/media/")) {
    const fileName = url.replace(/^\/media\//, "");
    if (!fileName || fileName.includes("..") || fileName.includes("/")) return false;
    // Safety: only delete timestamp-prefixed files we uploaded; never touch shipped assets
    if (!UPLOADED_FILE_RE.test(fileName)) return false;
    try { await fs.unlink(path.join(MEDIA_DIR, fileName)); } catch {}
    return true;
  }
  if (url?.startsWith("/admin-uploads/")) {
    const fileName = url.replace(/^\/admin-uploads\//, "");
    if (!fileName || fileName.includes("..") || fileName.includes("/")) return false;
    try { await fs.unlink(path.join(UPLOAD_DIR, fileName)); } catch {}
    return true;
  }
  return false;
}
