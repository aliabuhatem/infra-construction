/**
 * Field descriptors for the admin panel.
 *
 * WHAT THIS IS
 * The content store is a flat bag of strings: content[sectionId][fieldName] is
 * always a String (sanitizeStore() coerces it). There is no database and no
 * schema, so the editor has nothing to tell it that `points` is a line-list,
 * that `image` must never be renamed, or that `date` is a free-text month-year.
 * This module is that missing layer — a description *about* the fields, kept
 * separate from the values themselves.
 *
 * ZERO-BREAKAGE CONTRACT
 *  - describeField() never throws and always returns a descriptor.
 *  - Any field it does not recognise resolves to a plain text input, which is
 *    exactly what the panel renders today. Adding a field to the store can
 *    therefore never regress the editor.
 *  - Descriptors change how a value is *edited*, never how it is stored. Every
 *    input still round-trips a String, so nothing downstream
 *    (getContent / ContentText / MediaImage / expertise.ts) observes a change.
 *  - No field is ever removed from the store here. `hidden` only withholds a
 *    control from the UI; the value stays in the JSON and keeps rendering.
 *
 * TYPES DELIBERATELY ABSENT
 *  - `bool`   — no boolean exists anywhere in the store (`published` is empty
 *               in every section), so there is nothing to toggle.
 *  - `date`   — `date` holds "March 2025" / "Jun 2026". A date-picker cannot
 *               represent a month-year and would force full ISO dates, changing
 *               what the live site prints. Use `monthYear` (text + validation).
 *  - `number` — every numeric-looking field is unsafe as a number input:
 *               `num` is "01"/"02" (a number input drops the leading zero),
 *               `value` is mostly prose, and stat values are "25 Years",
 *               "12 Countries", "ISO 9001". They stay text with a hint.
 */

/** Input kinds the editor knows how to render. */
export const FIELD_TYPES = Object.freeze({
  TEXT:      "text",      // single-line string
  TEXTAREA:  "textarea",  // free-form multi-line prose
  LINES:     "lines",     // newline-separated list — one line is one item
  LIST:      "list",      // comma OR newline separated (splitList in expertise.ts)
  IMAGE:     "image",     // media path or Blob URL, pickable from the library
  URL:       "url",
  EMAIL:     "email",
  TEL:       "tel",
  ENUM:      "enum",      // closed set — value must be one of `options`
  COMBOBOX:  "combobox",  // open set — free text with `options` as suggestions
  MONTHYEAR: "monthYear", // free-text "March 2025", validated not constrained
});

/**
 * Field names MediaImage.jsx resolves by *guessing* (its IMAGE_FIELD_NAMES
 * list). Renaming one of these silently breaks image resolution on the live
 * site with no error anywhere — the editor must refuse to rename them.
 */
export const LOCKED_IMAGE_FIELDS = Object.freeze(new Set([
  "image", "backgroundImage", "heroImage", "logo", "logoDark", "logoLight",
  "background", "bg", "photo", "src", "cover", "thumbnail",
]));

/**
 * Within-section field groups, in the order they should be presented:
 * primary identifiers, then the body, then media, then metadata, then links.
 */
export const FIELD_GROUPS = Object.freeze([
  { id: "identity", label: "Identity",  order: 1 },
  { id: "content",  label: "Content",   order: 2 },
  { id: "media",    label: "Media",     order: 3 },
  { id: "metadata", label: "Details",   order: 4 },
  { id: "links",    label: "Links",     order: 5 },
  { id: "other",    label: "Other",     order: 6 },
]);

const T = FIELD_TYPES;

/**
 * Defaults keyed by field name. ~30 names cover the great majority of the
 * 1,084 field instances in the store, because the same names repeat across
 * sections (title x132, image x82, description x49, eyebrow x42).
 *
 * `order` sorts fields inside their group; lower comes first.
 */
const FIELD_DEFAULTS = {
  // ── identity ────────────────────────────────────────────────────────────
  title:    { type: T.TEXT, group: "identity", order: 10, max: 160,
              label: "Title", help: "The main heading for this section." },
  eyebrow:  { type: T.TEXT, group: "identity", order: 20, max: 60,
              label: "Eyebrow", help: "Small label printed above the title." },
  subtitle: { type: T.TEXT, group: "identity", order: 30, max: 200, label: "Subtitle" },
  name:     { type: T.TEXT, group: "identity", order: 40, max: 160, label: "Name" },
  slug:     { type: T.TEXT, group: "identity", order: 50, max: 120, label: "URL slug",
              help: "Lower-case words joined by dashes. Changing this changes the page's URL.",
              pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
              patternHint: "Use lower-case letters, numbers and dashes only." },
  num:      { type: T.TEXT, group: "identity", order: 60, max: 4, label: "Display number",
              help: 'Positional label such as "01". Keep the leading zero — it is printed as typed.',
              pattern: /^\d{1,3}$/, patternHint: "Digits only, e.g. 01." },

  // ── content ─────────────────────────────────────────────────────────────
  h1:       { type: T.TEXT,     group: "content", order: 10, max: 200, label: "Heading 1" },
  h2:       { type: T.TEXT,     group: "content", order: 11, max: 200, label: "Heading 2" },
  h3:       { type: T.TEXT,     group: "content", order: 12, max: 200, label: "Heading 3" },
  h4:       { type: T.TEXT,     group: "content", order: 13, max: 200, label: "Heading 4" },
  headingLine2:  { type: T.TEXT, group: "content", order: 14, max: 200, label: "Heading line 2" },
  headlineLine3: { type: T.TEXT, group: "content", order: 15, max: 200, label: "Heading line 3",
                   hidden: true,
                   hiddenReason: "Empty in every section and not read by any page." },

  summary:  { type: T.TEXTAREA, group: "content", order: 20, max: 600, label: "Summary" },
  intro:    { type: T.TEXTAREA, group: "content", order: 21, max: 600, label: "Intro" },
  excerpt:  { type: T.TEXTAREA, group: "content", order: 22, max: 600, label: "Excerpt",
              help: "Short teaser shown on listing pages." },
  body:     { type: T.TEXTAREA, group: "content", order: 23, label: "Body" },

  p1:       { type: T.TEXTAREA, group: "content", order: 30, label: "Paragraph 1" },
  p2:       { type: T.TEXTAREA, group: "content", order: 31, label: "Paragraph 2" },
  p3:       { type: T.TEXTAREA, group: "content", order: 32, label: "Paragraph 3" },
  p4:       { type: T.TEXTAREA, group: "content", order: 33, label: "Paragraph 4" },

  missionText: { type: T.TEXTAREA, group: "content", order: 40, label: "Mission" },
  visionText:  { type: T.TEXTAREA, group: "content", order: 41, label: "Vision" },

  // Line-lists. The site splits these, so one line really is one rendered item.
  // Mirrors LINE_FIELD_HINTS in AdminPanel.jsx — phase 3 reads these instead of
  // keeping a second copy there.
  description:  { type: T.LINES, group: "content", order: 50, label: "Description",
                  lineRule: "One line = one paragraph.", noun: "paragraph", nounPlural: "paragraphs",
                  placeholder: "First paragraph…\nSecond paragraph…" },
  points:       { type: T.LINES, group: "content", order: 51, label: "Points",
                  lineRule: "One line = one highlighted point.", noun: "point", nounPlural: "points",
                  placeholder: "Dialysis Center in Hargeisa\nNew College of Nursing, Ajman - UAE" },
  projects:     { type: T.LINES, group: "content", order: 52, label: "Reference projects",
                  lineRule: "One line = one reference project.", noun: "project", nounPlural: "projects",
                  placeholder: "Berbera International Airport, Somaliland\nSalah Alden Airport, Aden — Yemen" },
  // splitList(), not splitLines() — commas separate items here as well.
  capabilities: { type: T.LIST,  group: "content", order: 53, label: "Capabilities",
                  lineRule: "One line or comma-separated entry = one capability.",
                  noun: "capability", nounPlural: "capabilities",
                  placeholder: "Healthcare Infrastructure\nEducational Facilities" },
  featuredProjects: { type: T.LINES, group: "content", order: 54, label: "Featured projects",
                  lineRule: "One project slug per line.", noun: "slug", nounPlural: "slugs",
                  help: "Project slugs, not titles — these must match /projects/<slug>.",
                  placeholder: "mohamed-v-university\nassiut-university-buildings" },

  // ── media ───────────────────────────────────────────────────────────────
  image:           { type: T.IMAGE, group: "media", order: 10, label: "Image", locked: true },
  backgroundImage: { type: T.IMAGE, group: "media", order: 11, label: "Background image", locked: true },
  heroImage:       { type: T.IMAGE, group: "media", order: 12, label: "Hero image", locked: true },
  logo:            { type: T.IMAGE, group: "media", order: 20, label: "Logo", locked: true },
  logoLight:       { type: T.IMAGE, group: "media", order: 21, label: "Logo (light)", locked: true },
  logoDark:        { type: T.IMAGE, group: "media", order: 22, label: "Logo (dark)", locked: true },

  // ── metadata ────────────────────────────────────────────────────────────
  date:     { type: T.MONTHYEAR, group: "metadata", order: 10, max: 40, label: "Date",
              help: 'Month and year, e.g. "March 2025".' },
  author:   { type: T.TEXT, group: "metadata", order: 11, max: 120, label: "Author" },
  location: { type: T.TEXT, group: "metadata", order: 12, max: 160, label: "Location" },
  city:     { type: T.TEXT, group: "metadata", order: 13, max: 120, label: "City" },
  address:  { type: T.TEXTAREA, group: "metadata", order: 14, max: 300, label: "Address" },
  country:  { type: T.COMBOBOX, group: "metadata", order: 15, max: 120, label: "Country",
              help: "Country only — put the city in the City field.",
              options: ["UAE", "Egypt", "Yemen", "Canada", "Somaliland", "Comoros",
                        "Mozambique", "Socotra", "Kuwait", "Jordan"] },
  value:    { type: T.TEXT, group: "metadata", order: 20, max: 200, label: "Value",
              help: "Free text — may be a number, a place, or a phrase." },
  bigNumber:  { type: T.TEXT, group: "metadata", order: 21, max: 20, label: "Big number" },
  stat1Value: { type: T.TEXT, group: "metadata", order: 22, max: 20, label: "Stat 1 value",
                help: 'May carry a unit, e.g. "25 Years".' },
  stat2Value: { type: T.TEXT, group: "metadata", order: 23, max: 20, label: "Stat 2 value" },
  stat4Value: { type: T.TEXT, group: "metadata", order: 24, max: 20, label: "Stat 4 value" },
  stat1Suffix: { type: T.TEXT, group: "metadata", order: 25, max: 20, label: "Stat 1 suffix",
                 hidden: true, hiddenReason: "Empty in every section and not read by any page." },
  stat2Suffix: { type: T.TEXT, group: "metadata", order: 26, max: 20, label: "Stat 2 suffix",
                 hidden: true, hiddenReason: "Empty in every section and not read by any page." },

  // ── links ───────────────────────────────────────────────────────────────
  email:    { type: T.EMAIL, group: "links", order: 10, max: 160, label: "Email" },
  phone:    { type: T.TEL,   group: "links", order: 11, max: 40,  label: "Phone" },
  whatsapp: { type: T.TEL,   group: "links", order: 12, max: 40,  label: "WhatsApp" },
  linkedin: { type: T.URL,   group: "links", order: 20, label: "LinkedIn" },
  facebook: { type: T.URL,   group: "links", order: 21, label: "Facebook" },
  instagram:{ type: T.URL,   group: "links", order: 22, label: "Instagram" },
  twitter:  { type: T.URL,   group: "links", order: 23, label: "X / Twitter" },
};

/**
 * Section-scoped overrides, applied before FIELD_DEFAULTS.
 *
 * These exist because the same field name genuinely means different things in
 * different sections — the audit found `role` is a job title under
 * about_leader_* but a contract role under project_*, and `scope` is an area of
 * responsibility in one and a works description in the other. A single global
 * default for those names would mislabel half the panel.
 *
 * Evaluated in order; the first matching entry wins.
 */
const SECTION_OVERRIDES = [
  {
    match: /^about_(ceo|leader)/,
    fields: {
      role:  { type: T.TEXT, group: "identity", order: 45, max: 120, label: "Job title",
               help: "Their position, e.g. Chief Executive Officer." },
      scope: { type: T.TEXT, group: "metadata", order: 16, max: 200, label: "Area of responsibility" },
    },
  },
  {
    match: /^(project_|home_project)/,
    fields: {
      role:   { type: T.ENUM, group: "metadata", order: 16, label: "Contract role",
                options: ["Main Contractor", "Subcontractor"],
                help: "INFRA's role on this project." },
      scope:  { type: T.TEXTAREA, group: "content", order: 24, label: "Scope of works" },
      status: { type: T.TEXT, group: "metadata", order: 17, max: 60, label: "Status",
                help: 'Free text, currently written as "Completed <Month> <Year>".' },
      type:   { type: T.COMBOBOX, group: "metadata", order: 18, max: 120, label: "Project type",
                help: "May list more than one, separated by commas.",
                options: ["Design and Build", "Earthworks", "Excavation / Earthworks",
                          "Refurbishment / Rehabilitation", "Infrastructure"] },
      sector: { type: T.ENUM, group: "metadata", order: 19, label: "Sector",
                options: ["Infrastructure", "Built Environment", "EPC", "Commercial", "All Sectors"] },
    },
  },
  {
    match: /^careers_opening/,
    fields: {
      type:   { type: T.COMBOBOX, group: "metadata", order: 18, max: 80, label: "Employment type",
                options: ["Full-time", "Part-time", "Contract", "Internship"] },
      sector: { type: T.ENUM, group: "metadata", order: 19, label: "Sector",
                options: ["Infrastructure", "Built Environment", "EPC", "Commercial", "All Sectors"] },
    },
  },
  {
    match: /^(news_|home_news)/,
    fields: {
      category: { type: T.ENUM, group: "metadata", order: 18, label: "Category",
                  options: ["Projects", "Certifications", "Business Development",
                            "Community", "Partnerships"] },
    },
  },
];

const IMAGE_VALUE_RE = /\.(jpe?g|png|webp|gif|avif|svg|bmp|tiff)(\?.*)?$/i;
const MEDIA_PATH_RE  = /^\/?(?:media|admin-uploads)\//;

/**
 * Last-resort inference from the value itself, for field names we have no
 * entry for. Only ever *widens* a plain text box into a more specific control;
 * anything unrecognised stays text.
 */
function sniffFromValue(value) {
  const v = String(value ?? "").trim();
  if (!v) return null;
  if (IMAGE_VALUE_RE.test(v) || MEDIA_PATH_RE.test(v)) return { type: T.IMAGE };
  if (/^https?:\/\//i.test(v))                         return { type: T.URL };
  if (/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(v))         return { type: T.EMAIL };
  if (v.includes("\n"))                                return { type: T.TEXTAREA };
  if (v.length > 140)                                  return { type: T.TEXTAREA };
  return null;
}

/** Humanise a raw field key for use when we have no explicit label. */
function humanise(name) {
  return String(name)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}

function overridesFor(sectionId, fieldName) {
  const id = String(sectionId || "");
  for (const entry of SECTION_OVERRIDES) {
    const hit = typeof entry.match === "string" ? id === entry.match : entry.match.test(id);
    if (hit && entry.fields[fieldName]) return entry.fields[fieldName];
  }
  return null;
}

/**
 * Describe one field.
 *
 * Resolution order: section override → name default → value sniffing → text.
 * Never throws; unknown fields always come back as a plain text input, which
 * is precisely what the panel renders today.
 *
 * @param {string} sectionId
 * @param {string} fieldName
 * @param {string} [value] current value, used only for last-resort inference
 * @returns {{name,type,label,group,order,locked,hidden,...}}
 */
export function describeField(sectionId, fieldName, value) {
  const name = String(fieldName ?? "");

  const resolved =
    overridesFor(sectionId, name) ||
    FIELD_DEFAULTS[name] ||
    sniffFromValue(value) ||
    { type: T.TEXT };

  const type = FIELD_TYPES[String(resolved.type).toUpperCase()] || resolved.type || T.TEXT;

  return {
    // identity
    name,
    section: String(sectionId ?? ""),
    // presentation
    type,
    label: resolved.label || humanise(name),
    help:  resolved.help || "",
    placeholder: resolved.placeholder || "",
    group: resolved.group || "other",
    order: typeof resolved.order === "number" ? resolved.order : 500,
    // constraints — advisory in the UI, never enforced on the stored string
    max:     resolved.max,
    pattern: resolved.pattern,
    patternHint: resolved.patternHint || "",
    options: resolved.options || null,
    // list semantics
    lineRule:   resolved.lineRule || "",
    noun:       resolved.noun || "item",
    nounPlural: resolved.nounPlural || "items",
    // safety flags
    locked: Boolean(resolved.locked) || LOCKED_IMAGE_FIELDS.has(name),
    hidden: Boolean(resolved.hidden),
    hiddenReason: resolved.hiddenReason || "",
  };
}

/**
 * Describe every field of a section, sorted for presentation:
 * group order first, then the field's own order, then alphabetically.
 * Hidden fields are returned too — the caller decides whether to render them,
 * so nothing silently disappears from the editor without an explicit choice.
 */
export function describeSection(sectionId, fields) {
  const groupRank = new Map(FIELD_GROUPS.map((g) => [g.id, g.order]));
  return Object.entries(fields || {})
    .map(([k, v]) => describeField(sectionId, k, v))
    .sort((a, b) =>
      (groupRank.get(a.group) ?? 99) - (groupRank.get(b.group) ?? 99) ||
      a.order - b.order ||
      a.name.localeCompare(b.name)
    );
}

/**
 * Advisory validation for a value about to be saved. Returns null when fine,
 * otherwise a human-readable message.
 *
 * This never blocks a save — the store has always accepted any string, and
 * refusing one now could strand existing content that predates the rule. It
 * exists so the editor can warn (the audit found "MAy 2026" sitting in a date
 * field, which no amount of UI polish would have caught).
 */
export function validateField(descriptor, value) {
  const d = descriptor || {};
  const v = String(value ?? "");
  const trimmed = v.trim();
  if (!trimmed) return null; // empty is always allowed

  if (d.max && v.length > d.max) {
    return `Longer than the usual ${d.max} characters (currently ${v.length}). It may wrap or clip on the site.`;
  }
  if (d.pattern instanceof RegExp && !d.pattern.test(trimmed)) {
    return d.patternHint || "This value does not match the expected format.";
  }
  if (d.type === T.EMAIL && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(trimmed)) {
    return "This does not look like an email address.";
  }
  if (d.type === T.URL && !/^https?:\/\//i.test(trimmed)) {
    return "Links should start with https://";
  }
  if (d.type === T.MONTHYEAR && !/^[A-Z][a-z]{2,8}\.?\s+\d{4}$/.test(trimmed)) {
    return 'Expected a month and year written like "March 2025".';
  }
  if (d.type === T.ENUM && Array.isArray(d.options) && !d.options.includes(trimmed)) {
    return `Unrecognised value. Expected one of: ${d.options.join(", ")}.`;
  }
  return null;
}
