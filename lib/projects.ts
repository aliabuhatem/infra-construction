/* ────────────────────────────────────────────────────────────────────────
   Projects catalogue — turns the admin store's `project_<n>` sections into
   typed, routable projects.

   The portfolio grid (/projects) and the detail page (/projects/[slug]) both
   read from here, so a card and the page it opens can never disagree about a
   project's URL. Unlike services and sectors there are no built-in defaults:
   every project lives in the content store and is created from the admin panel.
──────────────────────────────────────────────────────────────────────────── */

export interface Project {
  /** Admin section key ("project_7"). ContentText/MediaImage bind to this, so
      it must survive into the detail page for inline editing to work. */
  sectionKey: string;
  slug: string;               // URL segment — see projectSlug()
  title: string;
  country: string;
  sector: string;
  type: string;
  description: string;
  image: string;

  /* Optional long-form fields. None of the projects carry these yet; the detail
     page renders whatever is present and silently omits the rest, so a project
     can be enriched from the admin panel without a code change. Mirrors the
     `p1…pN` / `h1…hN` convention already used by the news articles. */
  client?: string;
  /* Tender-document facts. `role` is INFRA's own position on the contract
     (Main Contractor / Subcontractor); `principalContractor` names the party
     above it, so it only appears on subcontracted work. */
  role?: string;
  principalContractor?: string;
  year?: string;
  value?: string;
  duration?: string;
  status?: string;
  scope?: string;
  paragraphs: string[];       // p1…p6
  highlights: string[];       // h1…h6
}

type Fields = Record<string, string>;
type StoreLike = {
  content?: Record<string, Fields>;
  _deletedSections?: string[];
} | null | undefined;

const PROJECT_KEY = /^project_\d+$/;
const keyIndex = (key: string) => parseInt(key.replace("project_", ""), 10);

/** URL-safe form of a string: "Al-Attiyat Al-Bahariya Wastewater" →
    "al-attiyat-al-bahariya-wastewater". Matches lib/expertise.ts's cleanSlug. */
const cleanSlug = (v: string | undefined) =>
  (v || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** A project's URL segment. An explicit `slug` field wins — that is the escape
    hatch for keeping a URL stable across a title rename, the same way news
    items pin theirs — then the slugified title, then the section key as a last
    resort so a project with no usable title is still reachable. */
export const projectSlug = (f: Fields, sectionKey: string) =>
  cleanSlug(f.slug) || cleanSlug(f.title) || sectionKey;

/** Every live project, in section order, with slugs guaranteed unique.
    Two projects sharing a title would otherwise collide onto one URL and the
    second would be unreachable, so a collision falls back to the section key. */
export function resolveProjects(store: StoreLike): Project[] {
  const deleted = new Set(store?._deletedSections || []);
  const taken = new Set<string>();

  return Object.entries(store?.content || {})
    .filter(([k]) => PROJECT_KEY.test(k) && !deleted.has(k))
    .sort(([a], [b]) => keyIndex(a) - keyIndex(b))
    .map(([sectionKey, f]) => {
      let slug = projectSlug(f, sectionKey);
      if (taken.has(slug)) slug = sectionKey;
      taken.add(slug);

      const optional = (name: string) => f[name]?.trim() || undefined;
      const series = (prefix: string, n: number) =>
        Array.from({ length: n }, (_, i) => f[`${prefix}${i + 1}`])
          .map((v) => (v || "").trim())
          .filter(Boolean);

      return {
        sectionKey,
        slug,
        title:       f.title       || "",
        country:     f.country     || "",
        sector:      f.sector      || "",
        type:        f.type        || "",
        description: f.description || "",
        image:       f.image       || "",
        client:   optional("client"),
        role:                optional("role"),
        principalContractor: optional("principalContractor"),
        year:     optional("year"),
        value:    optional("value"),
        duration: optional("duration"),
        status:   optional("status"),
        scope:    optional("scope"),
        paragraphs: series("p", 6),
        highlights: series("h", 6),
      };
    });
}

/* ── Categories & countries ───────────────────────────────────────────────
   Shared by the portfolio filter and the project strip at the foot of each
   sector page, so a project can never be "Infrastructure" in one place and
   uncategorised in the other. */

export type ProjectCategory = "infrastructure" | "building";

/** Map a project's free-form `sector` value onto a filter category. Handles the
    inconsistencies in the data: trailing spaces ("Infrastructure "),
    singular/plural ("Building" / "Buildings"), and shorthand ("Built"). */
export function categoryOf(sector: string): ProjectCategory | "other" {
  const n = (sector || "").trim().toLowerCase();
  if (n.startsWith("infra")) return "infrastructure";
  if (n.startsWith("build") || n.startsWith("built")) return "building";
  return "other";
}

/** Normalise messy country values ("Cairo, Egypt", "Socotra - Yemen",
    " Somaliland") onto a single canonical country name so the filter stays
    clean. Emirates spellings all collapse onto "UAE". */
export function countryOf(raw: string): string {
  const n = (raw || "").toLowerCase();
  if (n.includes("yemen")) return "Yemen";
  if (n.includes("egypt") || n.includes("cairo")) return "Egypt";
  if (n.includes("somaliland")) return "Somaliland";
  if (n.includes("indonesia")) return "Indonesia";
  if (n.includes("uae") || n.includes("emirat") || n.includes("dubai") || n.includes("abu dhabi"))
    return "UAE";
  const trimmed = (raw || "").trim();
  return trimmed || "Other";
}

/** The first `limit` projects in a category, in store order.
    Order is the admin panel's — the same "whatever is listed first" rule the
    home page's Our Work block follows — so the strip on a sector page is
    curated by reordering projects in the panel, not by a code change. */
export const projectsInCategory = (
  all: Project[],
  category: ProjectCategory,
  limit = 3
): Project[] => all.filter((p) => categoryOf(p.sector) === category).slice(0, limit);

/** The project category a sector page shows work from. The two pillars are
    "infrastructure" and "built-environment"; anything else has no strip. */
export function categoryForSector(sectorSlug: string): ProjectCategory | null {
  const n = (sectorSlug || "").toLowerCase();
  if (n.startsWith("infra")) return "infrastructure";
  if (n.startsWith("built") || n.startsWith("build")) return "building";
  return null;
}

/** Look up one project. The section key is accepted alongside the slug so a
    link built before a title was renamed still resolves instead of 404ing. */
export const getProjectBySlug = (store: StoreLike, slug: string): Project | undefined =>
  resolveProjects(store).find((p) => p.slug === slug || p.sectionKey === slug);

/** Up to `limit` other projects, preferring the same sector so the suggestions
    under a project page stay relevant. */
export function relatedProjects(all: Project[], current: Project, limit = 3): Project[] {
  const others = all.filter((p) => p.sectionKey !== current.sectionKey);
  const sameSector = (p: Project) =>
    p.sector.trim().toLowerCase() === current.sector.trim().toLowerCase();
  return [...others.filter(sameSector), ...others.filter((p) => !sameSector(p))].slice(0, limit);
}
