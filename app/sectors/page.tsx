import Image from "next/image";
import Link from "next/link";
import ContentText from "@/components/admin-panel/ContentText";
import MediaImage from "@/components/admin-panel/MediaImage";

const H = "var(--font-barlow-condensed), Arial Narrow, sans-serif";
const B = "var(--font-source-sans), Arial, sans-serif";

const infraSubsectors = [
  { num: "01", slug: "water-utilities",            title: "Water",          short: "Water supply systems, treatment plants, and integrated utility networks.",   image: "/media/water-dam-construction-yemen.jpeg",                 sectionKey: "sectors_hub_sub_1" },
  { num: "02", slug: "water-utilities",            title: "Dams & Irrigation", short: "Dam construction, dike works, and large-scale irrigation infrastructure.", image: "/media/water-hassan-dam-project-yemen.jpeg",               sectionKey: "sectors_hub_sub_2" },
  { num: "03", slug: "infrastructure-civil-works", title: "Ports",          short: "Marine ports, quay walls, breakwaters, and harbour infrastructure.",          image: "/media/ports-hulaf-socotra-yemen.jpeg",                    sectionKey: "sectors_hub_sub_3" },
  { num: "04", slug: "infrastructure-civil-works", title: "Airports",       short: "Airfield works, runways, terminal facilities, and aviation infrastructure.",   image: "/media/airports-dhobab-airport-diagram.png",               sectionKey: "sectors_hub_sub_4" },
  { num: "05", slug: "infrastructure-civil-works", title: "Transportation", short: "Highways, bridges, flyovers, and large-scale road networks.",                  image: "/media/infrastructure-coastal-highway-taiz-yemen.jpeg",    sectionKey: "sectors_hub_sub_5" },
  { num: "06", slug: "industrial-oil-services",    title: "Oil",            short: "Oil & gas pipelines, plant construction, and industrial O&M services.",        image: "/media/industrial-floating-marine-pier-yemen.jpeg",        sectionKey: "sectors_hub_sub_6" },
  { num: "07", slug: "energy-power",               title: "Power",          short: "Power generation, transmission networks, and substation infrastructure.",      image: "/media/energy-power-plant-alhaswa-aden-yemen.jpeg",        sectionKey: "sectors_hub_sub_7" },
];

const activityAreas = [
  { label: "Buildings",                        href: "/sectors/buildings",               sectionKey: "sectors_hub_activity_1" },
  { label: "Infrastructure & Civil Works",     href: "/sectors/infrastructure-civil-works", sectionKey: "sectors_hub_activity_2" },
  { label: "Transportation, Roads & Bridges",  href: "/sectors/infrastructure-civil-works", sectionKey: "sectors_hub_activity_3" },
  { label: "Ports & Marine",                   href: "/sectors/infrastructure-civil-works", sectionKey: "sectors_hub_activity_4" },
  { label: "Airports",                          href: "/sectors/infrastructure-civil-works", sectionKey: "sectors_hub_activity_5" },
  { label: "Water Supply & Networks",          href: "/sectors/water-utilities",           sectionKey: "sectors_hub_activity_6" },
  { label: "Dams & Irrigation",               href: "/sectors/water-utilities",            sectionKey: "sectors_hub_activity_7" },
  { label: "Wastewater Treatment",            href: "/sectors/water-utilities",             sectionKey: "sectors_hub_activity_8" },
  { label: "Power Generation",               href: "/sectors/energy-power",                sectionKey: "sectors_hub_activity_9" },
  { label: "Power Transmission",             href: "/sectors/energy-power",                sectionKey: "sectors_hub_activity_10" },
  { label: "Oil & Gas Pipelines",            href: "/sectors/industrial-oil-services",      sectionKey: "sectors_hub_activity_11" },
  { label: "Industrial Plant Construction",  href: "/sectors/industrial-oil-services",      sectionKey: "sectors_hub_activity_12" },
];

const stats = [
  { value: "75+", label: "Projects Delivered", sectionKey: "sectors_hub_stat_1" },
  { value: "25+", label: "Years Operating",    sectionKey: "sectors_hub_stat_2" },
  { value: "12+", label: "Countries",          sectionKey: "sectors_hub_stat_3" },
  { value: "200+", label: "Professionals",     sectionKey: "sectors_hub_stat_4" },
];

export default function SectorsPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <MediaImage category="sectors_hub_hero" title="backgroundImage" fallbackSrc="/media/sectors hero section photo.png" alt="Our Sectors" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/96 via-[#213B4D]/30 to-[#213B4D]/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pb-16 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
            <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
              <ContentText section="sectors_hub_hero" name="eyebrow" fallback="Our Expertise" />
            </p>
          </div>
          <h1 className="text-white uppercase leading-[0.92] mb-5" style={{ fontFamily: H, fontSize: "clamp(52px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            <ContentText section="sectors_hub_hero" name="title" fallback="Our Sectors" />
          </h1>
          <p className="text-white/60 text-[17px] max-w-xl leading-relaxed" style={{ fontFamily: B }}>
            <ContentText section="sectors_hub_hero" name="subtitle" fallback="Two core sectors. One unified standard of delivery across every discipline and geography." />
          </p>
        </div>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────────────────────── */}
      <div className="bg-[#0d1e28] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-3 flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase" style={{ fontFamily: B }}>
          <Link href="/" className="text-white/35 hover:text-[#1F93A4] transition-colors">Home</Link>
          <span className="text-white/20">›</span>
          <span className="text-[#1F93A4]">Sectors</span>
        </div>
      </div>

      {/* ── INTRO ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-12 gap-14 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
              <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="sectors_hub_intro" name="eyebrow" fallback="Two Core Sectors" />
              </p>
            </div>
            <h2 className="text-[#213B4D] uppercase leading-tight" style={{ fontFamily: H, fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
              <ContentText section="sectors_hub_intro" name="title" fallback="Buildings & Infrastructure. Built to Last." />
            </h2>
            <p className="text-[#5E5E5E] text-[17px] leading-relaxed mt-6" style={{ fontFamily: B }}>
              <ContentText section="sectors_hub_intro" name="p1" fallback="INFRA Construction operates across two core sectors — Buildings and Infrastructure — bringing together multidisciplinary engineering expertise, strong project management, and proven operational capabilities." />
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-[1px] bg-[#213B4D]/8">
            {stats.map((s) => (
              <div key={s.sectionKey} className="bg-white p-6">
                <div className="text-[#213B4D] leading-none mb-1" style={{ fontFamily: H, fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 600 }}>
                  <ContentText section={s.sectionKey} name="value" fallback={s.value} />
                </div>
                <div className="text-[#5E5E5E] text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: B }}>
                  <ContentText section={s.sectionKey} name="label" fallback={s.label} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTORS — BUILDINGS ───────────────────────────────────────────── */}
      <section className="bg-[#0d1e28] pt-24 pb-3">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
              <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="sectors_hub_buildings" name="badgeLabel" fallback="Sector 01 · Standalone" />
              </p>
            </div>
          </div>

          <Link href="/sectors/buildings" className="group relative overflow-hidden block bg-[#0d1e28] hover:bg-[#1a3040] transition-colors">
            <div className="relative h-[340px] lg:h-[420px] overflow-hidden">
              <Image src="/media/buildings-social-housing-assiut-egypt.avif" alt="Buildings" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d1e28]/90 via-[#0d1e28]/50 to-transparent" />
              <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between lg:flex-row lg:items-end">
                <div className="flex-1">
                  <div className="w-8 h-[2px] bg-[#1F93A4] mb-5 group-hover:w-14 transition-all duration-300" />
                  <h2 className="text-white uppercase leading-tight mb-3 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: H, fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
                    <ContentText section="sectors_hub_buildings" name="title" fallback="Buildings" />
                  </h2>
                  <p className="text-white/55 text-[15px] leading-relaxed max-w-lg" style={{ fontFamily: B }}>
                    <ContentText section="sectors_hub_buildings" name="short" fallback="Architectural design, MEP engineering, and construction of residential, commercial, and institutional buildings — from concept to handover." />
                  </p>
                </div>
                <div className="mt-6 lg:mt-0 lg:ml-12 shrink-0">
                  <span className="text-[#1F93A4] text-[13px] font-bold uppercase tracking-[0.2em] flex items-center gap-2" style={{ fontFamily: B }}>
                    <ContentText section="sectors_hub_buildings" name="exploreText" fallback="Explore Buildings" /> <span className="group-hover:translate-x-1.5 transition-transform inline-block">→</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── SECTORS — INFRASTRUCTURE ──────────────────────────────────────── */}
      <section className="bg-[#0d1e28] pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
              <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="sectors_hub_infra" name="badgeLabel" fallback="Sector 02 · Infrastructure Umbrella" />
              </p>
            </div>
          </div>

          <Link href="/sectors/infrastructure" className="group relative overflow-hidden block bg-[#213B4D] hover:bg-[#1e3549] transition-colors mb-[1px]">
            <div className="relative h-[200px] overflow-hidden">
              <Image src="/media/infrastructure-aden-causeway-widening-yemen.jpeg" alt="Infrastructure" fill className="object-cover object-center opacity-40 group-hover:opacity-55 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#213B4D]/80 to-[#213B4D]/05" />
              <div className="absolute inset-0 p-8 lg:p-10 flex items-center justify-between">
                <div>
                  <h2 className="text-white uppercase leading-tight mb-2 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: H, fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
                    <ContentText section="sectors_hub_infra" name="title" fallback="Infrastructure" />
                  </h2>
                  <p className="text-white/50 text-[14px]" style={{ fontFamily: B }}>
                    <ContentText section="sectors_hub_infra" name="short" fallback="Civil works · Water · Energy · Industrial — an integrated sector umbrella" />
                  </p>
                </div>
                <span className="text-[#1F93A4] text-[13px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 shrink-0 ml-6" style={{ fontFamily: B }}>
                  <ContentText section="sectors_hub_infra" name="exploreText" fallback="Sector Overview" /> <span className="group-hover:translate-x-1.5 transition-transform inline-block">→</span>
                </span>
              </div>
            </div>
          </Link>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/">
            {infraSubsectors.map((s) => (
              <Link key={s.sectionKey} href={`/sectors/${s.slug}`} className="group relative overflow-hidden block bg-[#0d1e28] hover:bg-[#1a3040] transition-colors">
                <div className="relative h-44 overflow-hidden">
                  <Image src={s.image} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28]/90 via-[#0d1e28]/40 to-transparent" />
                  <div className="absolute top-4 left-4 text-[#1F93A4] leading-none" style={{ fontFamily: H, fontSize: "28px", fontWeight: 600 }}>
                    <ContentText section={s.sectionKey} name="num" fallback={s.num} />
                  </div>
                </div>
                <div className="p-6">
                  <div className="w-5 h-[2px] bg-[#1F93A4] mb-3 group-hover:w-9 transition-all duration-300" />
                  <h3 className="text-white font-bold text-[13px] mb-2 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                    <ContentText section={s.sectionKey} name="title" fallback={s.title} />
                  </h3>
                  <p className="text-white/40 text-[12px] leading-relaxed mb-4" style={{ fontFamily: B }}>
                    <ContentText section={s.sectionKey} name="short" fallback={s.short} />
                  </p>
                  <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-2" style={{ fontFamily: B }}>
                    Explore <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVITY AREAS ────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-12 gap-14 mb-14">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
                <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                  <ContentText section="sectors_hub_activities" name="eyebrow" fallback="Scope of Activities" />
                </p>
              </div>
              <h2 className="text-[#213B4D] uppercase leading-tight" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
                <ContentText section="sectors_hub_activities" name="title" fallback="Broad Sector Coverage" />
              </h2>
              <p className="text-[#5E5E5E] text-[17px] leading-relaxed mt-5" style={{ fontFamily: B }}>
                <ContentText section="sectors_hub_intro" name="p2" fallback="Our capabilities span the full spectrum of buildings and infrastructure disciplines — from civil earthworks to complex construction programmes." />
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[1px] bg-[#213B4D]/8">
            {activityAreas.map((area) => (
              <Link key={area.sectionKey} href={area.href} className="bg-white p-6 hover:bg-[#f4f6f8] transition-colors group block">
                <div className="w-5 h-[2px] bg-[#1F93A4] mb-4 group-hover:w-8 transition-all duration-300" />
                <span className="text-[#213B4D] text-[13px] font-semibold group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                  <ContentText section={area.sectionKey} name="label" fallback={area.label} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-[#1F93A4] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-14 text-center">
          <p className="text-white/50 text-[11px] font-bold uppercase tracking-[0.45em] mb-5" style={{ fontFamily: B }}>
            <ContentText section="sectors_hub_cta" name="eyebrow" fallback="Start a Conversation" />
          </p>
          <h2 className="text-white uppercase leading-[0.92] mb-6" style={{ fontFamily: H, fontSize: "clamp(44px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            <ContentText section="sectors_hub_cta" name="title" fallback="Have a Project in Mind?" />
          </h2>
          <p className="text-white/65 text-[17px] mb-10 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: B }}>
            <ContentText section="sectors_hub_cta" name="body" fallback="Our specialists are ready to discuss your requirements and tailor a solution for your specific needs." />
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-[#213B4D] font-bold px-10 py-4 text-[13px] uppercase tracking-widest hover:bg-[#213B4D] hover:text-white transition-all duration-300" style={{ fontFamily: B }}>
            <ContentText section="sectors_hub_cta" name="buttonText" fallback="Contact Our Team" /> <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
