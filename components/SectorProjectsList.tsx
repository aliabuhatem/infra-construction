import { getContent } from "@/lib/getContent";
import ContentText from "@/components/admin-panel/ContentText";

const B = "var(--font-ibm-plex-sans), system-ui, -apple-system, sans-serif";

type SectorKey = "building" | "infrastructure";

// Match a project's free-form `sector` value, tolerating trailing spaces
// ("Infrastructure ") and singular/plural ("Building" / "Buildings").
function matchesSector(sector: string, target: SectorKey): boolean {
  const n = (sector || "").trim().toLowerCase();
  return target === "building" ? n.startsWith("build") : n.startsWith("infra");
}

/**
 * Renders the dark "Disciplines Covered"-style box, but populated with the
 * projects belonging to a given sector ("building" | "infrastructure"), as a
 * compact text list (title — country). Any project added through the admin
 * panel (a `project_<n>` section whose `sector` matches) appears here
 * automatically — no new section is created per project.
 *
 * It renders only the box <div> so callers can drop it into a grid column
 * (infrastructure intro) or wrap it in a standalone section (buildings).
 */
export default async function SectorProjectsList({
  sector,
  eyebrow = "Disciplines Covered",
  className = "",
}: {
  sector: SectorKey;
  eyebrow?: React.ReactNode;
  className?: string;
}) {
  const c = await getContent();
  const deleted = new Set(c._deletedSections || []);

  const projects = Object.entries(c.content || {})
    .filter(([k]) => /^project_\d+$/.test(k) && !deleted.has(k))
    .sort(([a], [b]) => parseInt(a.replace("project_", ""), 10) - parseInt(b.replace("project_", ""), 10))
    .map(([k, f]) => ({
      sectionKey: k,
      title:      f.title   || "",
      country:    f.country || "",
      sector:     f.sector  || "",
    }))
    .filter((p) => matchesSector(p.sector, sector));

  if (projects.length === 0) return null;

  return (
    <div className={`bg-[#0d1e28] p-8 self-start ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-5 h-[2px] bg-[#1F93A4]" />
        <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
          {eyebrow}
        </span>
      </div>
      <div className="space-y-0">
        {projects.map((p) => (
          <div
            key={p.sectionKey}
            className="flex items-start gap-2 text-white/55 text-[12px] py-2 border-b border-white/8 last:border-0"
            style={{ fontFamily: B }}
          >
            <span className="text-[#1F93A4] text-[8px] shrink-0 mt-1.5">▸</span>
            <span>
              <ContentText section={p.sectionKey} name="title" fallback={p.title} />
              {p.country && (
                <span className="text-white/30">
                  {" — "}
                  <ContentText section={p.sectionKey} name="country" fallback={p.country} />
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
