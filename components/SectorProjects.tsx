import { getContent } from "@/lib/getContent";
import ContentText from "@/components/admin-panel/ContentText";
import MediaImage from "@/components/admin-panel/MediaImage";

const H = "var(--font-myriad), system-ui, -apple-system, sans-serif";
const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

type SectorKey = "building" | "infrastructure";

// Match a project's free-form `sector` value, tolerating trailing spaces
// ("Infrastructure ") and singular/plural ("Building" / "Buildings").
function matchesSector(sector: string, target: SectorKey): boolean {
  const n = (sector || "").trim().toLowerCase();
  return target === "building" ? n.startsWith("build") : n.startsWith("infra");
}

/**
 * Renders a grid of all projects belonging to a given sector
 * ("building" or "infrastructure"), styled like the main Projects portfolio.
 * Drop into any sector page to showcase that sector's project record.
 */
export default async function SectorProjects({
  sector,
  eyebrow = "Our Work",
  title,
  dark = false,
}: {
  sector: SectorKey;
  eyebrow?: string;
  title?: string;
  dark?: boolean;
}) {
  const c = await getContent();
  const deleted = new Set(c._deletedSections || []);

  const projects = Object.entries(c.content || {})
    .filter(([k]) => /^project_\d+$/.test(k) && !deleted.has(k))
    .sort(([a], [b]) => parseInt(a.replace("project_", ""), 10) - parseInt(b.replace("project_", ""), 10))
    .map(([k, f]) => ({
      sectionKey:  k,
      title:       f.title       || "",
      country:     f.country     || "",
      sector:      f.sector      || "",
      type:        f.type        || "",
      description: f.description || "",
      image:       f.image       || "",
    }))
    .filter((p) => matchesSector(p.sector, sector));

  if (projects.length === 0) return null;

  const headingText = title || (sector === "building" ? "Our Building Projects" : "Our Infrastructure Projects");

  return (
    <section className={`py-24 ${dark ? "bg-[#0d1e28]" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
            <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
              {eyebrow}
            </p>
          </div>
          <h2
            className={`uppercase leading-tight ${dark ? "text-white" : "text-[#213B4D]"}`}
            style={{ fontFamily: H, fontSize: "clamp(20px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            {headingText}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#213B4D]/8">
          {projects.map((p) => (
            <div key={p.sectionKey} className="group bg-white hover:bg-[#f4f6f8] transition-colors overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <MediaImage
                  category={p.sectionKey}
                  title={`${p.sectionKey}_image`}
                  fallbackSrc={p.image}
                  alt={p.title}
                  className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28]/70 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#1F93A4] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider" style={{ fontFamily: B }}>
                    <ContentText section={p.sectionKey} name="country" fallback={p.country} />
                  </span>
                  <span className="bg-[#0d1e28]/80 text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider" style={{ fontFamily: B }}>
                    <ContentText section={p.sectionKey} name="type" fallback={p.type} />
                  </span>
                </div>
              </div>
              <div className="p-7">
                <div className="w-5 h-[2px] bg-[#1F93A4] mb-4 group-hover:w-8 transition-all duration-300" />
                <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ fontFamily: B }}>
                  <ContentText section={p.sectionKey} name="sector" fallback={p.sector} />
                </div>
                <h3 className="text-[#213B4D] font-bold text-[15px] mb-3 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                  <ContentText section={p.sectionKey} name="title" fallback={p.title} />
                </h3>
                <p className="text-[#5E5E5E] text-[13px] leading-relaxed" style={{ fontFamily: B }}>
                  <ContentText section={p.sectionKey} name="description" fallback={p.description} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
