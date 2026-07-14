import Image from "next/image";
import Link from "next/link";
import ContentText from "@/components/admin-panel/ContentText";
import MediaImage from "@/components/admin-panel/MediaImage";
import { getContent } from "@/lib/getContent";
import ProjectsPortfolio from "@/components/ProjectsPortfolio";
import { Reveal } from "@/components/motion";

const H = "var(--font-myriad), system-ui, -apple-system, sans-serif";
const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; country?: string }>;
}) {
  const c = await getContent();
  const deleted = new Set(c._deletedSections || []);

  // Read the optional ?category= / ?country= filters from the URL (set by the
  // home page links and reflected by the on-page filter buttons). Unknown values
  // fall back to showing everything.
  const sp = await searchParams;
  const rawCategory = sp?.category?.toLowerCase();
  const initialCategory =
    rawCategory === "infrastructure" || rawCategory === "building" ? rawCategory : "all";
  const initialCountry = sp?.country?.toLowerCase() || "all";

  const visibleProjects = Object.entries(c.content || {})
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
    }));
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <MediaImage category="projects_hero" title="backgroundImage" fallbackSrc="/media/project-hero.jpg" alt="Our Projects" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/95 via-[#213B4D]/72 to-[#213B4D]/42" />
        <Reveal className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pb-16 w-full text-shadow-legible">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
            <p className="text-[#1F93A4] text-[11px] font-bold  tracking-[0.35em]" style={{ fontFamily: B }}>
              <ContentText section="projects_hero" name="eyebrow" fallback="Our Work" />
            </p>
          </div>
          <h1 className="text-white  leading-[0.92] mb-5" style={{ fontFamily: H, fontSize: "clamp(52px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            <ContentText section="projects_hero" name="title" fallback="Projects" /><span style={{ color: "#F2613C" }}>.</span>
          </h1>
          <p className="text-white/85 text-[15px] max-w-xl leading-relaxed" style={{ fontFamily: B }}>
            <ContentText section="projects_hero" name="subtitle" fallback="Over 75 projects delivered across multiple regions — each one a testament to INFRA's commitment to quality." />
          </p>
        </Reveal>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────────────────────── */}
      <div className="bg-[#f6f8f9] border-b border-[#213B4D]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-3 flex items-center gap-2 text-[11px] tracking-[0.15em] " style={{ fontFamily: B }}>
          <Link href="/" className="text-[#5E5E5E] hover:text-[#1F93A4] transition-colors">Home</Link>
          <span className="text-[#213B4D]/25">›</span>
          <span className="text-[#1F93A4] font-semibold">Projects</span>
        </div>
      </div>

      {/* ── PROJECTS GRID ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <ProjectsPortfolio projects={visibleProjects} initialCategory={initialCategory} initialCountry={initialCountry} />
      </section>

      {/* ── STATEMENT ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#f6f8f9] border-y border-[#213B4D]/8">
        <Reveal className="max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-1 hidden lg:block">
            <div className="w-[2px] h-full min-h-[160px] bg-[#1F93A4] mx-auto" />
          </div>
          <div className="lg:col-span-8">
            <p className="text-[#213B4D] leading-tight" style={{ fontFamily: H, fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
              &ldquo;<ContentText section="projects_statement" name="text" fallback="Every project we deliver is a commitment to the communities, institutions, and nations that trust us with their most critical infrastructure." />&rdquo;
            </p>
          </div>
          <div className="lg:col-span-3 border-l border-[#213B4D]/12 pl-10 hidden lg:block">
            <div className="text-[#5E5E5E] text-[12px] font-semibold  tracking-[0.2em] mb-2" style={{ fontFamily: B }}>Est.</div>
            <div className="text-[#1F93A4] leading-none" style={{ fontFamily: H, fontSize: "72px", fontWeight: 600 }}>1990</div>
            <div className="text-[#5E5E5E] text-[12px] font-semibold  tracking-[0.2em] mt-2" style={{ fontFamily: B }}>Abu Dhabi, UAE</div>
          </div>
        </Reveal>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-[#1F93A4] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <Reveal className="relative z-10 max-w-4xl mx-auto px-6 lg:px-14 text-center">
          <p className="text-white/80 text-[11px] font-bold  tracking-[0.45em] mb-5" style={{ fontFamily: B }}>
            <ContentText section="projects_cta" name="eyebrow" fallback="Partner With Us" />
          </p>
          <h2 className="text-white  leading-[0.92] mb-6" style={{ fontFamily: H, fontSize: "clamp(44px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            <ContentText section="projects_cta" name="title" fallback="Start Your Project" />
          </h2>
          <p className="text-white/90 text-[15px] mb-10 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: B }}>
            <ContentText section="projects_cta" name="body" fallback="Partner with INFRA Construction for reliable project delivery across all infrastructure and building sectors." />
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 rounded-md bg-white text-[#213B4D] font-bold px-10 py-4 text-[13px]  tracking-widest hover:bg-[#213B4D] hover:text-white transition-all duration-300" style={{ fontFamily: B }}>
            <ContentText section="projects_cta" name="buttonText" fallback="Contact Our Team" /> <span>→</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
