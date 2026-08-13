/**
 * Coverage check for lib/admin/field-schema.js
 *
 * Run: node lib/admin/field-schema.check.mjs
 *
 * Proves the descriptor layer is safe to introduce, by asserting against the
 * real store rather than against invented fixtures:
 *   1. describeField() resolves every field instance without throwing.
 *   2. Unknown field names fall back to a plain text input (the zero-breakage
 *      guarantee — an unrecognised field must edit exactly as it does today).
 *   3. No field name that MediaImage.jsx resolves by guessing is left
 *      renameable, since renaming one breaks images silently.
 *   4. Fields marked hidden really are empty everywhere — we never withhold a
 *      control for a field that is carrying live content.
 *   5. Reports validation warnings against current content, so pre-existing
 *      dirty data is visible before any UI enforces anything.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  describeField,
  describeSection,
  validateField,
  FIELD_TYPES,
  LOCKED_IMAGE_FIELDS,
} from "./field-schema.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const store = JSON.parse(
  fs.readFileSync(path.join(root, "data", "site-content.json"), "utf8")
);
const content = store.content || {};

let failures = 0;
const fail = (msg) => { failures++; console.error("  FAIL " + msg); };
const ok   = (msg) => console.log("  ok   " + msg);

// ── 1. every field resolves, nothing throws ────────────────────────────────
let instances = 0;
const byType = {};
const unknownFallbacks = [];
for (const [sectionId, fields] of Object.entries(content)) {
  for (const [name, value] of Object.entries(fields || {})) {
    instances++;
    let d;
    try {
      d = describeField(sectionId, name, value);
    } catch (err) {
      fail(`describeField threw for ${sectionId}.${name}: ${err.message}`);
      continue;
    }
    if (!d || typeof d !== "object") { fail(`no descriptor for ${sectionId}.${name}`); continue; }
    if (!d.type)  fail(`descriptor for ${sectionId}.${name} has no type`);
    if (!d.label) fail(`descriptor for ${sectionId}.${name} has no label`);
    if (!Object.values(FIELD_TYPES).includes(d.type)) {
      fail(`${sectionId}.${name} resolved to unknown type "${d.type}"`);
    }
    byType[d.type] = (byType[d.type] || 0) + 1;
  }
}
console.log(`\nResolved ${instances} field instances across ${Object.keys(content).length} sections.`);
if (!failures) ok("every field instance produced a valid descriptor");

console.log("\nType distribution:");
Object.entries(byType).sort((a, b) => b[1] - a[1])
  .forEach(([t, n]) => console.log(`  ${String(n).padStart(5)}  ${t}`));

// ── 2. unknown names fall back to text ─────────────────────────────────────
const invented = [
  "someFieldNobodyHasEverAdded",
  "zzz_future_field",
  "randomThing123",
];
let fallbackOk = true;
for (const n of invented) {
  const d = describeField("totally_new_section", n, "");
  if (d.type !== FIELD_TYPES.TEXT) { fallbackOk = false; fail(`unknown field "${n}" resolved to ${d.type}, expected text`); }
}
if (fallbackOk) ok("unknown field names fall back to a plain text input");

// an unknown field on an *overridden* section must also stay text
const d0 = describeField("project_1", "brandNewProjectField", "");
if (d0.type !== FIELD_TYPES.TEXT) fail(`unknown field on an overridden section resolved to ${d0.type}`);
else ok("unknown fields on overridden sections stay text");

// ── 3. image field names are locked against rename ─────────────────────────
let lockOk = true;
for (const name of LOCKED_IMAGE_FIELDS) {
  const d = describeField("any_section", name, "");
  if (!d.locked) { lockOk = false; fail(`image field "${name}" is not marked locked`); }
}
if (lockOk) ok(`all ${LOCKED_IMAGE_FIELDS.size} MediaImage-resolved field names are rename-locked`);

// every actual image-valued field in the store must be locked
for (const [sectionId, fields] of Object.entries(content)) {
  for (const [name, value] of Object.entries(fields || {})) {
    const v = String(value ?? "").trim();
    if (!/^\/?(media|admin-uploads)\//.test(v)) continue;
    const d = describeField(sectionId, name, value);
    if (!d.locked) fail(`${sectionId}.${name} holds a media path but is not rename-locked`);
  }
}

// ── 4. hidden fields carry no live content ─────────────────────────────────
const hiddenNames = new Set();
for (const [sectionId, fields] of Object.entries(content)) {
  for (const [name, value] of Object.entries(fields || {})) {
    const d = describeField(sectionId, name, value);
    if (!d.hidden) continue;
    hiddenNames.add(name);
    if (String(value ?? "").trim()) {
      fail(`${sectionId}.${name} is marked hidden but holds content: ${JSON.stringify(String(value).slice(0, 60))}`);
    }
  }
}
if (hiddenNames.size) ok(`hidden fields (${[...hiddenNames].join(", ")}) are empty in every section`);

// ── 5. validation warnings against current content ─────────────────────────
const warnings = [];
for (const [sectionId, fields] of Object.entries(content)) {
  for (const [name, value] of Object.entries(fields || {})) {
    const d = describeField(sectionId, name, value);
    const msg = validateField(d, value);
    if (msg) warnings.push(`${sectionId}.${name}: ${msg}`);
  }
}
console.log(`\nValidation warnings on existing content: ${warnings.length}`);
warnings.slice(0, 25).forEach((w) => console.log("  ! " + w));
if (warnings.length > 25) console.log(`  … and ${warnings.length - 25} more`);
console.log("  (advisory only — validateField never blocks a save)");

// ── 6. ordering is stable and total ────────────────────────────────────────
const sample = Object.keys(content)[0];
const ordered = describeSection(sample, content[sample]);
if (ordered.length !== Object.keys(content[sample]).length) {
  fail("describeSection dropped fields");
} else {
  ok(`describeSection returns every field (checked on "${sample}")`);
}

console.log(
  failures
    ? `\nFAILED — ${failures} problem(s)\n`
    : "\nAll checks passed.\n"
);
process.exit(failures ? 1 : 0);
