import Link from "next/link";
import Image from "next/image";
import ContentText from "../components/admin-panel/ContentText";
import MediaImage from "../components/admin-panel/MediaImage";
import { getContent, getSectionsByPrefix } from "../lib/getContent";
import { resolveServices, resolveSectors } from "../lib/expertise";
import ExpertiseCard from "../components/ExpertiseCard";
import OfficesMap from "../components/OfficesMap";
import { Reveal, Counter } from "../components/motion";

const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

export default async function HomePage() {
  const c = await getContent();
  const deleted = new Set(c._deletedSections || []);

  const latestNews = getSectionsByPrefix(c, "news_")
    .filter((n) => /^news_\d+$/.test(n._key))
    .slice(0, 3);

  const sectorItems = resolveSectors(c);
  const serviceItems = resolveServices(c);

  return (
    <div>
      {/* ── 1. HERO ────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[640px] flex flex-col justify-end overflow-hidden">
        <MediaImage
          category="home_hero"
          title="home_hero_background"
          fallbackSrc="/media/infrastructure-coastal-highway-taiz-yemen.jpeg"
          alt="INFRA Construction"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/90 via-[#213B4D]/65 to-[#213B4D]/20" />

        <div
          className="absolute top-[105px] right-6 lg:right-14 text-right z-10 hidden lg:block"
          style={{ fontFamily: B }}
        >
          <p className="text-white text-[9px] tracking-[0.35em] mb-1">
            <ContentText section="home_hero" name="locationsLabel" fallback="Operating In" />
          </p>
          <p className="text-white text-[10px] tracking-widest leading-loose">
            <ContentText section="home_hero" name="locationsList" fallback="UAE · Egypt · Yemen · Canada" />
          </p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pb-16 w-full text-shadow-legible">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-[#1F93A4]" />
              <span className="text-[#F2613C] text-[11px] font-bold tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="home_hero" name="eyebrow" fallback="EST. 1990. Abu Dhabi, UAE" />
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="text-white leading-[0.95] mb-0"
              style={{ fontFamily: B, fontSize: "clamp(30px, 6.5vw, 70px)", fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              <ContentText section="home_hero" name="headlineLine1" fallback="Building A" /><br />
              <span className="text-[#1F93A4]">
                <ContentText section="home_hero" name="headlineLine2" fallback="Better" />
              </span><br />
              <ContentText section="home_hero" name="headlineLine3" fallback="Tomorrow" />
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-7 pt-6 border-t border-white/15 max-w-2xl">
              <p className="text-white/90 text-[17px] leading-relaxed mb-7" style={{ fontFamily: B }}>
                <ContentText
                  section="home_hero"
                  name="subtitle"
                  fallback="World-Class Infrastructure, Buildings, Energy, and Industrial Projects Across the Middle East and Africa — Delivered Since 1990."
                />
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/sectors"
                  className="inline-flex items-center gap-2 rounded-md bg-[#1F93A4] text-white font-bold px-8 py-3.5 text-[12px] tracking-widest hover:bg-white hover:text-[#213B4D] transition-all duration-300"
                  style={{ fontFamily: B }}
                >
                  <ContentText section="home_hero" name="ctaPrimaryText" fallback="Our Sectors" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-md border border-white/40 text-white font-bold px-8 py-3.5 text-[12px] tracking-widest hover:border-white hover:bg-white/10 transition-all duration-300"
                  style={{ fontFamily: B }}
                >
                  <ContentText section="home_hero" name="ctaSecondaryText" fallback="Our Services" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. STATEMENT ──────────────────────────────────────────────── */}
      <section className="pt-24 pb-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="relative grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute bottom-0 right-0 leading-none hidden lg:block"
              style={{ fontFamily: B, fontSize: "300px", fontWeight: 700, color: "#213B4D", opacity: 0.03, lineHeight: 1 }}
            >
              1990
            </div>
            <Reveal className="lg:col-span-5 flex flex-col gap-4">
              <p className="text-[#F2613C] text-[11px] font-bold tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="home_statement" name="eyebrowLabel" fallback="Est. 1990" />
              </p>
              <div className="flex items-end leading-none">
                <Counter
                  value="75"
                  className="text-[#213B4D]"
                  style={{ fontFamily: B, fontSize: "clamp(100px, 14vw, 180px)", fontWeight: 700, lineHeight: 1 }}
                />
                <span style={{ fontFamily: B, fontSize: "clamp(100px, 14vw, 180px)", fontWeight: 700, color: "#1F93A4", lineHeight: 1 }}>
                  <ContentText section="home_statement" name="bigNumberSuffix" fallback="+" />
                </span>
              </div>
              <p className="text-[#213B4D]/70 text-[11px] font-bold tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="home_statement" name="bigNumberLabel" fallback="Projects Delivered" />
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7 flex flex-col gap-6 pt-2">
              <p
                className="text-[#213B4D] leading-[1.12]"
                style={{ fontFamily: B, fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 700, letterSpacing: "-0.01em" }}
              >
                <ContentText
                  section="home_statement"
                  name="heading"
                  fallback="Since 1990, INFRA Construction Has Delivered 75+ Projects Across the Middle East, Africa, and Beyond — From Highways and Dams to Power Plants and Industrial Facilities."
                />
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="border border-[#1F93A4] text-[#1F93A4] text-[10px] font-bold tracking-[0.25em] px-3 py-1.5" style={{ fontFamily: B }}>
                  <ContentText section="home_statement" name="cert1" fallback="ISO 9001" />
                </span>
                <span className="border border-[#1F93A4] text-[#1F93A4] text-[10px] font-bold tracking-[0.25em] px-3 py-1.5" style={{ fontFamily: B }}>
                  <ContentText section="home_statement" name="cert2" fallback="ISO 14001" />
                </span>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-[#213B4D] text-[12px] font-bold tracking-widest hover:text-[#1F93A4] transition-colors"
                  style={{ fontFamily: B }}
                >
                  <ContentText section="home_statement" name="linkText" fallback="Our Story" /> →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. OUR SECTORS ─────────────────────────────────────────────── */}
      <section className="bg-white pt-14 pb-20 border-t border-[#213B4D]/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-5">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-[2px] bg-[#1F93A4]" />
                  <p className="text-[#F2613C] text-[11px] font-bold tracking-[0.35em]" style={{ fontFamily: B }}>
                    <ContentText section="home_sectors_header" name="eyebrow" fallback="Our Sectors" />
                  </p>
                </div>
                <h2 className="text-[#213B4D] leading-tight" style={{ fontFamily: B, fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, letterSpacing: "-0.01em" }}>
                  <ContentText section="home_sectors_header" name="headingLine1" fallback="Sectors of" />{" "}
                  <span className="text-[#1F93A4]">
                    <ContentText section="home_sectors_header" name="headingLine2" fallback="Activity." />
                  </span>
                </h2>
              </div>
              <p className="text-[#5E5E5E] text-[15px] max-w-sm leading-relaxed" style={{ fontFamily: B }}>
                <ContentText section="home_sectors_header" name="subtitle" fallback="Seven core sectors of activity — from buildings and civil works to pipelines and water treatment." />
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex items-center justify-end mb-6">
              <Link href="/sectors" className="text-[#213B4D]/70 hover:text-[#1F93A4] text-[12px] font-bold tracking-widest flex items-center gap-2 transition-colors group" style={{ fontFamily: B }}>
                <ContentText section="home_sectors_header" name="link" fallback="All 7 Sectors" /> <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sectorItems.slice(0, 4).map((s, i) => (
              <ExpertiseCard key={s.slug} item={s} base="/sectors" index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. OUR SERVICES ────────────────────────────────────────────── */}
      <section className="bg-[#f6f8f9] pt-16 pb-24 border-t border-[#213B4D]/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-5">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-[2px] bg-[#1F93A4]" />
                  <p className="text-[#F2613C] text-[11px] font-bold tracking-[0.35em]" style={{ fontFamily: B }}>
                    <ContentText section="home_services_header" name="eyebrow" fallback="Our Services" />
                  </p>
                </div>
                <h2 className="text-[#213B4D] leading-tight" style={{ fontFamily: B, fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, letterSpacing: "-0.01em" }}>
                  <ContentText section="home_services_header" name="headingLine1" fallback="Services We" />{" "}
                  <span className="text-[#1F93A4]">
                    <ContentText section="home_services_header" name="headingLine2" fallback="Provide." />
                  </span>
                </h2>
              </div>
              <p className="text-[#5E5E5E] text-[15px] max-w-sm leading-relaxed" style={{ fontFamily: B }}>
                <ContentText section="home_services_header" name="subtitle" fallback="Fourteen integrated services spanning the full project lifecycle — engineering, procurement, construction, and management." />
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex items-center justify-end mb-6">
              <Link href="/services" className="text-[#213B4D]/70 hover:text-[#1F93A4] text-[12px] font-bold tracking-widest flex items-center gap-2 transition-colors group" style={{ fontFamily: B }}>
                <ContentText section="home_services_header" name="link" fallback="All 14 Services" /> <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {serviceItems.slice(0, 4).map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 0.05}>
                <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#213B4D]/10 bg-white p-4 shadow-[0_1px_2px_rgba(33,59,77,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_-24px_rgba(33,59,77,0.4)]">
                  <Link href={`/services/${s.slug}`} className="relative block h-40 overflow-hidden rounded-md">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <span className="absolute right-3 top-3 rounded bg-[#213B4D]/85 px-2 py-0.5 text-[11px] font-bold text-white" style={{ fontFamily: B }}>
                      {s.num}
                    </span>
                  </Link>
                  <Link href={`/services/${s.slug}`}>
                    <h5 className="mb-2 mt-5 text-[17px] font-bold leading-snug tracking-tight text-[#213B4D] transition-colors group-hover:text-[#1F93A4]" style={{ fontFamily: B }}>
                      {s.title}
                    </h5>
                  </Link>
                  <p className="mb-5 flex-1 text-[13px] leading-relaxed text-[#5E5E5E]" style={{ fontFamily: B }}>
                    {s.summary}
                  </p>
                  <Link
                    href={`/services/${s.slug}`}
                    className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-md border border-[#213B4D]/15 px-4 py-2.5 text-sm font-medium leading-5 text-[#213B4D] shadow-xs transition-colors hover:border-[#1F93A4] hover:bg-[#1F93A4] hover:text-white"
                    style={{ fontFamily: B }}
                  >
                    Read More
                    <svg className="ms-0.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PHILOSOPHY STRIP (rebalanced to light) ─────────────────── */}
      <section className="bg-[#f6f8f9] py-24 overflow-hidden border-y border-[#213B4D]/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
              <p className="text-[#F2613C] text-[11px] font-bold tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="home_philosophy" name="label" fallback="How We Operate" />
              </p>
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-[#213B4D] leading-[1.02] mb-6" style={{ fontFamily: B, fontSize: "clamp(34px, 6vw, 84px)", fontWeight: 700, letterSpacing: "-0.01em" }}>
              <ContentText section="home_philosophy" name="eyebrow" fallback="Our Operating Philosophy" />
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-[#5E5E5E] text-[17px] max-w-xl mx-auto leading-relaxed" style={{ fontFamily: B }}>
              <ContentText
                section="home_philosophy"
                name="description"
                fallback="All projects are managed to achieve the best goals of scope, time, cost, and quality — delivering exceptional results to every client, on every engagement."
              />
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 5. FEATURED PROJECTS ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-5">
              <div>
                <p className="text-[#F2613C] text-[11px] font-bold tracking-[0.35em] mb-3" style={{ fontFamily: B }}>
                  <ContentText section="home_featured_projects" name="eyebrow" fallback="Our Work" />
                </p>
                <h2 className="text-[#213B4D] leading-tight" style={{ fontFamily: B, fontSize: "clamp(32px, 4.5vw, 54px)", fontWeight: 700 }}>
                  <ContentText section="home_featured_projects" name="headingLine1" fallback="Projects Across" />{" "}
                  <ContentText section="home_featured_projects" name="headingLine2" fallback="Multiple Regions" />
                </h2>
              </div>
              <div className="flex flex-col gap-3 shrink-0 lg:items-end">
                <span className="text-[#213B4D]/70 text-[10px] font-bold tracking-[0.3em]" style={{ fontFamily: B }}>
                  Browse Projects By Sector
                </span>
                <div className="flex flex-wrap gap-2">
                  <Link href="/projects?category=infrastructure" className="rounded-md bg-[#213B4D] text-white border border-[#213B4D] hover:bg-[#1F93A4] hover:border-[#1F93A4] text-[12px] font-bold tracking-[0.1em] px-5 py-2.5 transition-colors" style={{ fontFamily: B }}>
                    Infrastructure
                  </Link>
                  <Link href="/projects?category=building" className="rounded-md bg-[#213B4D] text-white border border-[#213B4D] hover:bg-[#1F93A4] hover:border-[#1F93A4] text-[12px] font-bold tracking-[0.1em] px-5 py-2.5 transition-colors" style={{ fontFamily: B }}>
                    Building
                  </Link>
                  <Link href="/projects" className="rounded-md border border-[#213B4D]/15 text-[#213B4D] hover:border-[#1F93A4] hover:text-[#1F93A4] text-[12px] font-bold tracking-[0.1em] px-5 py-2.5 transition-colors" style={{ fontFamily: B }}>
                    All
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { key: "home_project_1", fallbackTitle: "Ministry of Foreign Affairs Building, Aden", fallbackCountry: "Yemen", fallbackType: "Building", fallbackImage: "/media/buildings-ministry-foreign-aden-yemen.jpeg" },
              { key: "home_project_2", fallbackTitle: "Assiut University Buildings", fallbackCountry: "Egypt", fallbackType: "Building", fallbackImage: "/media/buildings-general-facade.jpeg" },
              { key: "home_project_3", fallbackTitle: "Highway Expansion Project", fallbackCountry: "Yemen", fallbackType: "Transportation", fallbackImage: "/media/infrastructure-highway-expansion-mocha-yemen.jpeg" },
            ].filter((p) => !deleted.has(p.key)).map((p, i) => (
              <Reveal key={p.key} delay={i * 0.08}>
                <Link href="/projects" className="group relative flex flex-col h-full overflow-hidden rounded-lg border border-[#213B4D]/10 bg-white shadow-[0_1px_2px_rgba(33,59,77,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1F93A4] hover:shadow-[0_22px_46px_-24px_rgba(33,59,77,0.4)]">
                  <div className="relative h-60 overflow-hidden">
                    <MediaImage category={p.key} title={`${p.key}_image`} fallbackSrc={p.fallbackImage} alt={p.fallbackTitle} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 bg-[#213B4D]/25 group-hover:bg-[#213B4D]/10 transition-colors duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="rounded bg-[#1F93A4] text-white text-[11px] font-bold tracking-wider px-2.5 py-1" style={{ fontFamily: B }}>
                        <ContentText section={p.key} name="country" fallback={p.fallbackCountry} />
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[#1F93A4] text-[11px] font-bold tracking-widest mb-1" style={{ fontFamily: B }}>
                      <ContentText section={p.key} name="type" fallback={p.fallbackType} />
                    </p>
                    <h3 className="text-[#213B4D] font-bold text-lg group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                      <ContentText section={p.key} name="title" fallback={p.fallbackTitle} />
                    </h3>
                  </div>
                  <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1F93A4] transition-all duration-500 group-hover:w-full" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. ABOUT SPLIT ────────────────────────────────────────────── */}
      <section className="bg-white border-t border-[#213B4D]/6 relative overflow-hidden" style={{ minHeight: "620px" }}>
        <MediaImage
          category="home_about_split"
          title="home_about_split_background"
          fallbackSrc="/media/infrastructure-coastal-highway-taiz-yemen.jpeg"
          alt="INFRA Construction team"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1e28] via-[#0d1e28]/85 to-[#0d1e28]/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 py-20 flex flex-col justify-center text-shadow-legible" style={{ minHeight: "620px" }}>
          <div className="max-w-xl">
            <Reveal>
              <div className="flex items-center gap-8 mb-8">
                <div>
                  <Counter value="25" className="text-white leading-none block" style={{ fontFamily: B, fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700 }} />
                  <p className="text-white/70 text-[10px] tracking-[0.3em] mt-1" style={{ fontFamily: B }}>
                    <ContentText section="home_about_split" name="stat1Label" fallback="Years of Excellence" />
                  </p>
                </div>
                <div className="w-[1px] h-10 bg-white/15" />
                <div>
                  <Counter value="12" className="text-white leading-none block" style={{ fontFamily: B, fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700 }} />
                  <p className="text-white/70 text-[10px] tracking-[0.3em] mt-1" style={{ fontFamily: B }}>
                    <ContentText section="home_about_split" name="stat2Label" fallback="Countries of Operation" />
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[#F2613C] text-[11px] font-bold tracking-[0.35em] mb-4" style={{ fontFamily: B }}>
                <ContentText section="home_about_split" name="eyebrow" fallback="Who We Are" />
              </p>
              <h2 className="text-white leading-tight mb-6" style={{ fontFamily: B, fontSize: "clamp(20px, 3.5vw, 46px)", fontWeight: 700 }}>
                <ContentText section="home_about_split" name="heading" fallback="A Global Engineering & Construction Partner" />
              </h2>
              <p className="text-white/90 text-[17px] leading-relaxed mb-5" style={{ fontFamily: B }}>
                <ContentText section="home_about_split" name="paragraph1" fallback="Infra Construction is a contracting company that has carried out numerous and various projects since its establishment in 1990. Every task is executed through hard work, dedication, and optimal management of resources." />
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-8">
                {[
                  { name: "service1", fallback: "Construction Services" },
                  { name: "service2", fallback: "Project Management" },
                  { name: "service3", fallback: "Detailed Engineering" },
                  { name: "service4", fallback: "Procurement Management" },
                  { name: "service5", fallback: "Quantity Surveying" },
                  { name: "service6", fallback: "Operation & Maintenance" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-[13px] text-white/85 py-1.5 border-b border-white/10" style={{ fontFamily: B }}>
                    <span className="text-[#1F93A4] text-[10px]">▸</span>
                    <ContentText section="home_about_split" name={item.name} fallback={item.fallback} />
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-3 text-white font-bold text-[13px] tracking-widest hover:text-[#1F93A4] transition-colors group" style={{ fontFamily: B }}>
                <ContentText section="home_about_split" name="linkText" fallback="Discover Our Story" />
                <span className="group-hover:translate-x-1.5 transition-transform inline-block">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 7. LATEST NEWS ────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-[#213B4D]/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-5">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-[2px] bg-[#1F93A4]" />
                  <p className="text-[#F2613C] text-[11px] font-bold tracking-[0.35em]" style={{ fontFamily: B }}>
                    <ContentText section="home_news_header" name="eyebrow" fallback="Latest News" />
                  </p>
                </div>
                <h2 className="text-[#213B4D] leading-tight" style={{ fontFamily: B, fontSize: "clamp(32px, 4.5vw, 54px)", fontWeight: 700 }}>
                  <ContentText section="home_news_header" name="heading" fallback="News & Updates" />
                </h2>
              </div>
              <Link href="/news" className="text-[#213B4D]/80 hover:text-[#1F93A4] text-[13px] font-semibold tracking-widest flex items-center gap-2 transition-colors group shrink-0" style={{ fontFamily: B }}>
                <ContentText section="home_news_header" name="linkText" fallback="View All News" />
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-6">
            {latestNews.map((n, i) => (
              <Reveal key={n._key} delay={i * 0.08}>
                <Link href={`/news/${n.slug || n._key}`} className="group relative flex flex-col h-full overflow-hidden rounded-lg border border-[#213B4D]/10 bg-white shadow-[0_1px_2px_rgba(33,59,77,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1F93A4] hover:shadow-[0_22px_46px_-24px_rgba(33,59,77,0.4)]">
                  <div className="relative h-52 overflow-hidden">
                    <MediaImage category={n._key} title={`${n._key}_image`} fallbackSrc={n.image || ""} alt={n.title || ""} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 bg-[#213B4D]/25 group-hover:bg-[#213B4D]/10 transition-colors duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="rounded bg-[#1F93A4] text-white text-[10px] font-bold tracking-wider px-2.5 py-1" style={{ fontFamily: B }}>
                        <ContentText section={n._key} name="category" fallback={n.category || ""} />
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[#5E5E5E] text-[11px] tracking-widest mb-2" style={{ fontFamily: B }}>
                      <ContentText section={n._key} name="date" fallback={n.date || ""} />
                    </p>
                    <h3 className="text-[#213B4D] font-bold text-[15px] leading-snug group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                      <ContentText section={n._key} name="title" fallback={n.title || ""} />
                    </h3>
                  </div>
                  <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1F93A4] transition-all duration-500 group-hover:w-full" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. GLOBAL PRESENCE (rebalanced to light) ──────────────────── */}
      <section className="py-28 bg-[#f6f8f9] border-t border-[#213B4D]/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-10 mb-14 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-[2px] bg-[#1F93A4]" />
                  <p className="text-[#F2613C] text-[11px] font-bold tracking-[0.35em]" style={{ fontFamily: B }}>
                    <ContentText section="home_global" name="eyebrow" fallback="Where We Operate" />
                  </p>
                </div>
                <h2 className="text-[#213B4D] leading-tight" style={{ fontFamily: B, fontSize: "clamp(20px, 3.5vw, 48px)", fontWeight: 700, letterSpacing: "-0.01em" }}>
                  <ContentText section="home_global" name="heading" fallback="Global Reach" />
                </h2>
              </div>
              <p className="text-[#5E5E5E] text-[17px] leading-relaxed lg:pt-14" style={{ fontFamily: B }}>
                <ContentText section="home_global" name="description" fallback="Five regional offices across multiple regions, with 75+ completed projects across the Middle East, Africa, and beyond." />
              </p>
            </div>
          </Reveal>
          <OfficesMap
            offices={[
              { key: "home_office_1", city: "Abu Dhabi", country: "UAE", address: "Business Bay, Abu Dhabi, United Arab Emirates", lat: 24.45, lng: 54.38, nudgeX: -1.4, nudgeY: 1.4 },
              { key: "home_office_2", city: "Dubai", country: "UAE", address: "Business Bay, Dubai, United Arab Emirates", lat: 25.19, lng: 55.27, nudgeX: 1.4, nudgeY: -1.4 },
              { key: "home_office_3", city: "Cairo", country: "Egypt", address: "New Cairo, Cairo, Egypt", lat: 30.03, lng: 31.47 },
              { key: "home_office_4", city: "Aden", country: "Yemen", address: "Crater District, Aden, Republic of Yemen", lat: 12.78, lng: 45.03 },
              { key: "home_office_5", city: "Ontario", country: "Canada", address: "Ontario, Canada", lat: 43.65, lng: -79.38 },
            ].map((o) => ({
              city: c.content?.[o.key]?.city || o.city,
              country: c.content?.[o.key]?.country || o.country,
              address: c.content?.[o.key]?.address || o.address,
              lat: o.lat,
              lng: o.lng,
              nudgeX: o.nudgeX,
              nudgeY: o.nudgeY,
            }))}
          />
          <div className="mt-10">
            <Link href="/contact" className="inline-flex items-center gap-2 text-[#213B4D]/80 text-[12px] font-bold tracking-widest hover:text-[#1F93A4] transition-colors group" style={{ fontFamily: B }}>
              <ContentText section="home_global" name="linkText" fallback="Find Our Offices" />
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. CTA ────────────────────────────────────────────────────── */}
      <section className="relative py-16 overflow-hidden bg-[#1F93A4]">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-14 text-center">
          <Reveal>
            <p className="text-white/80 text-[11px] font-bold tracking-[0.45em] mb-4" style={{ fontFamily: B }}>
              <ContentText section="home_cta" name="eyebrow" fallback="Start Your Project" />
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-white leading-[0.95] mb-6" style={{ fontFamily: B, fontSize: "clamp(38px, 6vw, 72px)", fontWeight: 700, letterSpacing: "-0.01em" }}>
              <ContentText section="home_cta" name="headingLine1" fallback="Let's Build" /><br />
              <ContentText section="home_cta" name="headingLine2" fallback="Something" /><br />
              <ContentText section="home_cta" name="headingLine3" fallback="Great" />
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-white/90 text-[17px] mb-8 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: B }}>
              <ContentText section="home_cta" name="description" fallback="Partner with INFRA Construction for reliable solutions that deliver engineering precision, operational efficiency, and long-term performance." />
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 rounded-md bg-white text-[#213B4D] font-bold px-10 py-4 text-[13px] tracking-widest hover:bg-[#213B4D] hover:text-white transition-all duration-300" style={{ fontFamily: B }}>
              <ContentText section="home_cta" name="buttonText" fallback="Contact Our Team" />
              <span>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
