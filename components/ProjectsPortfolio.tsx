"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ContentText from "@/components/admin-panel/ContentText";
import MediaImage from "@/components/admin-panel/MediaImage";
import { categoryOf, countryOf, interleaveBySubSector } from "@/lib/projects";

const H = "var(--font-myriad), system-ui, -apple-system, sans-serif";
const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

/* The sector and country filter bars are switched off: with barely a dozen
   published projects the chips filtered a grid that already fits on one screen.
   The filters are expected back once the portfolio grows, so nothing below is
   deleted — the chips, the state, the ?category=/?country= URL sync and the
   filtering itself all stay wired up. Flip this to true to bring them back.
   Typed as boolean (not the literal `false`) so both branches keep being
   type-checked while it is off. */
const SHOW_PROJECT_FILTERS: boolean = false;

/* Desktop column count of the grid below (lg:grid-cols-3). Drives the
   sub-sector interleave, so a change here and in the grid classes go together. */
const GRID_COLUMNS = 3;

export interface PortfolioProject {
  sectionKey: string;
  slug: string;
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
  /* The key stays "building" — it is the ?category= value the home page links
     use — while the visible label follows the sector's name. */
  { key: "building", label: "Built Environment" },
];

// Countries that stay on the filter bar whether or not a project currently
// carries them — a market we operate in is worth showing before the first
// project for it is published. Everything else is derived from the data.
const ALWAYS_LISTED_COUNTRIES = ["UAE"];

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
    for (const label of ALWAYS_LISTED_COUNTRIES) map.set(label.toLowerCase(), label);
    return Array.from(map, ([key, label]) => ({ key, label })).sort((a, b) =>
      a.label.localeCompare(b.label)
    );
  }, [projects]);
  const countryKeys = countryOptions.map((o) => o.key);

  const [activeCategory, setActiveCategory] = useState<CategoryKey>(initialCategory);
  const [activeCountry, setActiveCountry] = useState<string>(
    countryKeys.includes(initialCountry) ? initialCountry : "all"
  );

  // Filtered, then dealt out so neighbouring cards in a row carry different
  // sub-sector badges. The interleave is deterministic, so the order the server
  // renders is the order the client hydrates.
  const filtered = useMemo(
    () =>
      interleaveBySubSector(
        projects.filter(
          (p) =>
            (activeCategory === "all" || categoryOf(p.sector) === activeCategory) &&
            (activeCountry === "all" || countryOf(p.country).toLowerCase() === activeCountry)
        ),
        GRID_COLUMNS
      ),
    [projects, activeCategory, activeCountry]
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
      {/* Header: heading on the left, category filter on the right. With the
          filters off the country row below no longer supplies the gap down to
          the grid, so the header carries it instead. */}
      <div
        className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 ${
          SHOW_PROJECT_FILTERS ? "mb-8" : "mb-12 pb-8 border-b border-[#213B4D]/8"
        }`}
      >
        <div className="lg:max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
            <p className="text-[#F2613C] text-[11px] font-bold  tracking-[0.35em]" style={{ fontFamily: B }}>
              <ContentText section="projects_header" name="eyebrow" fallback="Portfolio" />
            </p>
          </div>
          <h2 className="text-[#213B4D]  leading-tight" style={{ fontFamily: H, fontSize: "clamp(20px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            <ContentText section="projects_header" name="title" fallback="75+ Projects Delivered Across Multiple Regions" />
          </h2>
          <p className="text-[#5E5E5E] text-[15px] leading-relaxed mt-4" style={{ fontFamily: B }}>
            <ContentText section="projects_header" name="subtitle" fallback="Since 2000, INFRA Construction has accomplished projects in various fields of specialisation across the Middle East, Africa, and beyond." />
          </p>
        </div>

        {SHOW_PROJECT_FILTERS && (
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
        )}
      </div>

      {/* Country filter row */}
      {SHOW_PROJECT_FILTERS && (
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
      )}

      {filtered.length === 0 ? (
        <p className="text-[#5E5E5E] text-[15px] py-12 text-center" style={{ fontFamily: B }}>
          No projects match the selected filters.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Link
              key={p.sectionKey}
              href={`/projects/${p.slug}`}
              aria-label={`View project details: ${p.title}`}
              className="card-base group relative overflow-hidden rounded-lg border border-[#213B4D]/10 bg-white shadow-[0_1px_2px_rgba(33,59,77,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1F93A4] hover:shadow-[0_22px_46px_-24px_rgba(33,59,77,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F93A4]"
            >
              <div className="relative h-52 shrink-0 overflow-hidden">
                <MediaImage
                  category={p.sectionKey}
                  title={`${p.sectionKey}_image`}
                  fallbackSrc={p.image}
                  alt={p.title}
                  className="object-cover object-center w-full h-full group-hover:scale-[1.06] transition-transform duration-[900ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28]/70 to-transparent" />
                {/* The teal country pill that used to sit first here is off —
                    the country stays on the model and on the detail page, only
                    the badge is gone — so the sub-sector badge inherits the
                    same top-left offset. */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#0d1e28]/80 text-white text-[10px] font-bold px-2.5 py-1  tracking-wider" style={{ fontFamily: B }}>
                    <ContentText section={p.sectionKey} name="type" fallback={p.type} />
                  </span>
                </div>
              </div>
              <div className="card-body p-7">
                <div className="w-5 h-[2px] bg-[#1F93A4] mb-4 group-hover:w-8 transition-all duration-300" />
                <div className="text-[#1F93A4] text-sm font-medium uppercase tracking-[0.08em] mb-2" style={{ fontFamily: B }}>
                  <ContentText section={p.sectionKey} name="sector" fallback={p.sector} />
                </div>
                {/* lineHeight is set inline because .card-title (globals.css,
                    unlayered) outranks Tailwind's layered leading-* utility. */}
                <h3 className="card-title text-[#213B4D] font-bold text-[17px] lg:text-[18px] mb-3 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B, lineHeight: 1.35 }}>
                  <ContentText section={p.sectionKey} name="title" fallback={p.title} />
                </h3>
                <p className="text-[#5E5E5E] text-[13px] leading-relaxed" style={{ fontFamily: B }}>
                  <ContentText section={p.sectionKey} name="description" fallback={p.description} />
                </p>
                <span
                  className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#1F93A4]"
                  style={{ fontFamily: B }}
                >
                  View Details
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </span>
              </div>
              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1F93A4] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
