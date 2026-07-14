"use client";

import { useMemo, useState } from "react";
import ContentText from "@/components/admin-panel/ContentText";
import MediaImage from "@/components/admin-panel/MediaImage";

const H = "var(--font-myriad), system-ui, -apple-system, sans-serif";
const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

export interface PortfolioProject {
  sectionKey: string;
  title: string;
  country: string;
  sector: string;
  type: string;
  description: string;
  image: string;
}

type CategoryKey = "all" | "infrastructure" | "building";

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "infrastructure", label: "Infrastructure" },
  { key: "building", label: "Building" },
];

// Map a project's free-form `sector` value onto a filter category.
// Handles inconsistencies in the data such as trailing spaces
// ("Infrastructure ") and singular/plural ("Building" / "Buildings").
function categoryOf(sector: string): CategoryKey | "other" {
  const n = (sector || "").trim().toLowerCase();
  if (n.startsWith("infra")) return "infrastructure";
  if (n.startsWith("build")) return "building";
  return "other";
}

// Normalise messy country values ("Cairo, Egypt", "Socotra - Yemen",
// " Somaliland") onto a single canonical country name so the filter stays clean.
function countryOf(raw: string): string {
  const n = (raw || "").toLowerCase();
  if (n.includes("yemen")) return "Yemen";
  if (n.includes("egypt") || n.includes("cairo")) return "Egypt";
  if (n.includes("somaliland")) return "Somaliland";
  if (n.includes("indonesia")) return "Indonesia";
  const trimmed = (raw || "").trim();
  return trimmed || "Other";
}

// Update the address bar to reflect the active filters without a full
// navigation, so the view stays shareable / bookmarkable.
function syncUrl(category: CategoryKey, country: string) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams();
  if (category !== "all") params.set("category", category);
  if (country !== "all") params.set("country", country);
  const qs = params.toString();
  window.history.replaceState(null, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
}

export default function ProjectsPortfolio({
  projects,
  initialCategory = "all",
  initialCountry = "all",
}: {
  projects: PortfolioProject[];
  initialCategory?: CategoryKey;
  initialCountry?: string;
}) {
  // Distinct, normalised country options derived from the data.
  const countryOptions = useMemo(() => {
    const map = new Map<string, string>(); // key (lowercase) -> label
    for (const p of projects) {
      const label = countryOf(p.country);
      map.set(label.toLowerCase(), label);
    }
    return Array.from(map, ([key, label]) => ({ key, label })).sort((a, b) =>
      a.label.localeCompare(b.label)
    );
  }, [projects]);
  const countryKeys = countryOptions.map((o) => o.key);

  const [activeCategory, setActiveCategory] = useState<CategoryKey>(initialCategory);
  const [activeCountry, setActiveCountry] = useState<string>(
    countryKeys.includes(initialCountry) ? initialCountry : "all"
  );

  const filtered = projects.filter(
    (p) =>
      (activeCategory === "all" || categoryOf(p.sector) === activeCategory) &&
      (activeCountry === "all" || countryOf(p.country).toLowerCase() === activeCountry)
  );

  const selectCategory = (key: CategoryKey) => {
    setActiveCategory(key);
    syncUrl(key, activeCountry);
  };
  const selectCountry = (key: string) => {
    setActiveCountry(key);
    syncUrl(activeCategory, key);
  };

  const chipBase =
    "px-5 py-2.5 text-[11px] font-bold  tracking-[0.2em] border transition-colors";
  const chipOn = "bg-[#1F93A4] text-white border-[#1F93A4]";
  const chipOff =
    "border-[#213B4D]/15 text-[#213B4D] hover:border-[#1F93A4] hover:text-[#1F93A4]";

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-14">
      {/* Header: heading on the left, category filter on the right */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-8">
        <div className="lg:max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
            <p className="text-[#1F93A4] text-[11px] font-bold  tracking-[0.35em]" style={{ fontFamily: B }}>
              <ContentText section="projects_header" name="eyebrow" fallback="Portfolio" />
            </p>
          </div>
          <h2 className="text-[#213B4D]  leading-tight" style={{ fontFamily: H, fontSize: "clamp(20px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            <ContentText section="projects_header" name="title" fallback="75+ Projects Delivered Across Multiple Regions" />
          </h2>
          <p className="text-[#5E5E5E] text-[15px] leading-relaxed mt-4" style={{ fontFamily: B }}>
            <ContentText section="projects_header" name="subtitle" fallback="Since 1990, INFRA Construction has accomplished projects in various fields of specialisation across the Middle East, Africa, and beyond." />
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0" role="group" aria-label="Filter projects by category">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => selectCategory(c.key)}
              aria-pressed={activeCategory === c.key}
              className={`${chipBase} ${activeCategory === c.key ? chipOn : chipOff}`}
              style={{ fontFamily: B }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Country filter row */}
      <div className="flex flex-wrap items-center gap-2 mb-12 pb-8 border-b border-[#213B4D]/8" role="group" aria-label="Filter projects by country">
        <span className="text-[#213B4D]/75 text-[10px] font-bold  tracking-[0.25em] mr-1" style={{ fontFamily: B }}>
          Country
        </span>
        <button
          type="button"
          onClick={() => selectCountry("all")}
          aria-pressed={activeCountry === "all"}
          className={`${chipBase} ${activeCountry === "all" ? chipOn : chipOff}`}
          style={{ fontFamily: B }}
        >
          All
        </button>
        {countryOptions.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => selectCountry(c.key)}
            aria-pressed={activeCountry === c.key}
            className={`${chipBase} ${activeCountry === c.key ? chipOn : chipOff}`}
            style={{ fontFamily: B }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-[#5E5E5E] text-[15px] py-12 text-center" style={{ fontFamily: B }}>
          No projects match the selected filters.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div key={p.sectionKey} className="group relative flex flex-col overflow-hidden rounded-lg border border-[#213B4D]/10 bg-white shadow-[0_1px_2px_rgba(33,59,77,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1F93A4] hover:shadow-[0_22px_46px_-24px_rgba(33,59,77,0.4)]">
              <div className="relative h-52 overflow-hidden">
                <MediaImage
                  category={p.sectionKey}
                  title={`${p.sectionKey}_image`}
                  fallbackSrc={p.image}
                  alt={p.title}
                  className="object-cover object-center w-full h-full group-hover:scale-[1.06] transition-transform duration-[900ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28]/70 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#1F93A4] text-white text-[10px] font-bold px-2.5 py-1  tracking-wider" style={{ fontFamily: B }}>
                    <ContentText section={p.sectionKey} name="country" fallback={p.country} />
                  </span>
                  <span className="bg-[#0d1e28]/80 text-white text-[10px] font-bold px-2.5 py-1  tracking-wider" style={{ fontFamily: B }}>
                    <ContentText section={p.sectionKey} name="type" fallback={p.type} />
                  </span>
                </div>
              </div>
              <div className="p-7">
                <div className="w-5 h-[2px] bg-[#1F93A4] mb-4 group-hover:w-8 transition-all duration-300" />
                <div className="text-[#1F93A4] text-[10px] font-bold  tracking-[0.2em] mb-2" style={{ fontFamily: B }}>
                  <ContentText section={p.sectionKey} name="sector" fallback={p.sector} />
                </div>
                <h3 className="text-[#213B4D] font-bold text-[15px] mb-3 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                  <ContentText section={p.sectionKey} name="title" fallback={p.title} />
                </h3>
                <p className="text-[#5E5E5E] text-[13px] leading-relaxed" style={{ fontFamily: B }}>
                  <ContentText section={p.sectionKey} name="description" fallback={p.description} />
                </p>
              </div>
              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1F93A4] transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
