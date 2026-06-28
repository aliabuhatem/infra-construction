import Image from "next/image";
import Link from "next/link";
import ContentText from "../components/admin-panel/ContentText";
import MediaImage from "../components/admin-panel/MediaImage";
import { getContent } from "../lib/getContent";

/* ─── Component ─────────────────────────────────────────────────────────── */

export default async function HomePage() {
  const c = await getContent();
  const deleted = new Set(c._deletedSections || []);
  return (
    <>
      {/* ── 1. HERO ────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[640px] flex flex-col justify-end overflow-hidden">
        <MediaImage
          category="home_hero"
          title="home_hero_background"
          fallbackSrc="/media/infrastructure-coastal-highway-taiz-yemen.jpeg"
          alt="INFRA Construction"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/120 via-[#213B4D]/90 to-transparent" />

        {/* Locations strip — top right, well below navbar */}
        <div
          className="absolute top-[105px] right-6 lg:right-14 text-right z-10 hidden lg:block"
          style={{ fontFamily: "var(--font-source-sans), Arial, sans-serif" }}
        >
          <p className="text-white/35 text-[9px] uppercase tracking-[0.35em] mb-1">
            <ContentText section="home_hero" name="locationsLabel" fallback="Operating in" />
          </p>
          <p className="text-white/50 text-[10px] uppercase tracking-widest leading-loose">
            <ContentText section="home_hero" name="locationsList" fallback="UAE · Egypt · Yemen · Canada" />
          </p>
        </div>

        {/* Main content — sits at bottom */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pb-16 w-full">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-[#1F93A4]" />
            <span
              className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]"
              style={{ fontFamily: "var(--font-source-sans), Arial, sans-serif" }}
            >
              <ContentText section="home_hero" name="eyebrow" fallback="Est. 2000 · Abu Dhabi, UAE" />
            </span>
          </div>

          <h1
            className="text-white uppercase leading-[0.9] mb-0"
            style={{
              fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
              fontSize: "clamp(42px, 6.5vw, 92px)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            <ContentText section="home_hero" name="headlineLine1" fallback="BUILDING A" /><br />
            <span className="text-[#1F93A4]">
              <ContentText section="home_hero" name="headlineLine2" fallback="BETTER" />
            </span><br />
            <ContentText section="home_hero" name="headlineLine3" fallback="TOMORROW" />
          </h1>

          {/* Sub-section */}
          <div className="mt-7 pt-6 border-t border-white/15 max-w-2xl">
            <p
              className="text-white/70 text-[17px] leading-relaxed mb-7"
              style={{ fontFamily: "var(--font-source-sans), Arial, sans-serif" }}
            >
              <ContentText
                section="home_hero"
                name="subtitle"
                fallback="World-class infrastructure, buildings, energy, and industrial projects across the Middle East and Africa — delivered since 2000."
              />
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/sectors"
                className="inline-flex items-center gap-2 bg-[#1F93A4] text-white font-bold px-8 py-3.5 text-[12px] uppercase tracking-widest hover:bg-white hover:text-[#213B4D] transition-all duration-300"
                style={{ fontFamily: "var(--font-source-sans), Arial, sans-serif" }}
              >
                <ContentText section="home_hero" name="ctaPrimaryText" fallback="Our Sectors" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-white/40 text-white font-bold px-8 py-3.5 text-[12px] uppercase tracking-widest hover:border-white hover:bg-white/10 transition-all duration-300"
                style={{ fontFamily: "var(--font-source-sans), Arial, sans-serif" }}
              >
                <ContentText section="home_hero" name="ctaSecondaryText" fallback="About Us" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. STATEMENT ──────────────────────────────────────────────── */}
      <section className="pt-24 pb-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="relative grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute bottom-0 right-0 leading-none hidden lg:block"
              style={{
                fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
                fontSize: "300px",
                fontWeight: 700,
                color: "#213B4D",
                opacity: 0.03,
                lineHeight: 1,
              }}
            >
              2000
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4">
              <p
                className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]"
                style={{ fontFamily: "var(--font-source-sans), Arial, sans-serif" }}
              >
                <ContentText section="home_statement" name="eyebrowLabel" fallback="Est. 2000" />
              </p>
              <div className="flex items-end leading-none">
                <span
                  style={{
                    fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
                    fontSize: "clamp(100px, 14vw, 180px)",
                    fontWeight: 700,
                    color: "#213B4D",
                    lineHeight: 1,
                  }}
                >
                  <ContentText section="home_statement" name="bigNumber" fallback="75" />
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
                    fontSize: "clamp(100px, 14vw, 180px)",
                    fontWeight: 700,
                    color: "#1F93A4",
                    lineHeight: 1,
                  }}
                >
                  <ContentText section="home_statement" name="bigNumberSuffix" fallback="+" />
                </span>
              </div>
              <p
                className="text-[#213B4D]/40 text-[11px] font-bold uppercase tracking-[0.35em]"
                style={{ fontFamily: "var(--font-source-sans), Arial, sans-serif" }}
              >
                <ContentText section="home_statement" name="bigNumberLabel" fallback="Projects Delivered" />
              </p>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6 pt-2">
              <p
                className="text-[#213B4D] leading-[1.12]"
                style={{
                  fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
                  fontSize: "clamp(28px, 3.5vw, 46px)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                <ContentText
                  section="home_statement"
                  name="heading"
                  fallback="Since 2000, INFRA Construction has delivered 75+ projects across the Middle East, Africa, and beyond — from highways and dams to power plants and industrial facilities."
                />
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span
                  className="border border-[#1F93A4] text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1.5"
                  style={{ fontFamily: "var(--font-source-sans)" }}
                >
                  <ContentText section="home_statement" name="cert1" fallback="ISO 9001" />
                </span>
                <span
                  className="border border-[#1F93A4] text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1.5"
                  style={{ fontFamily: "var(--font-source-sans)" }}
                >
                  <ContentText section="home_statement" name="cert2" fallback="ISO 14001" />
                </span>
                <span
                  className="border border-[#1F93A4] text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1.5"
                  style={{ fontFamily: "var(--font-source-sans)" }}
                >
                  <ContentText section="home_statement" name="cert3" fallback="OHSAS 18001" />
                </span>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-[#213B4D] text-[12px] font-bold uppercase tracking-widest hover:text-[#1F93A4] transition-colors group"
                  style={{ fontFamily: "var(--font-source-sans)" }}
                >
                  <ContentText section="home_statement" name="linkText" fallback="Our Story" /> →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SECTORS ────────────────────────────────────────────────── */}
      <section className="bg-white pt-14 pb-24 border-t border-[#213B4D]/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-5">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[2px] bg-[#1F93A4]" />
                <p
                  className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]"
                  style={{ fontFamily: "var(--font-source-sans)" }}
                >
                  <ContentText section="home_sectors_header" name="eyebrow" fallback="Our Expertise" />
                </p>
              </div>
              <h2
                className="text-[#213B4D] uppercase leading-tight"
                style={{
                  fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
                  fontSize: "clamp(36px, 5vw, 60px)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                <ContentText section="home_sectors_header" name="headingLine1" fallback="Two Core Sectors." /><br />
                <ContentText section="home_sectors_header" name="headingLine2" fallback="One Global Partner." />
              </h2>
            </div>
            <Link
              href="/sectors"
              className="text-[#213B4D]/50 hover:text-[#1F93A4] text-[12px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors group shrink-0"
              style={{ fontFamily: "var(--font-source-sans)" }}
            >
              <ContentText section="home_sectors_header" name="linkText" fallback="View All Sectors" />
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Bento — 2 hero cards + 4 subsector cards */}

          {/* Row 1: Buildings | Infrastructure */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">

            {/* Buildings — standalone sector */}
            <Link
              href="/sectors/buildings"
              className="img-zoom group relative overflow-hidden block bg-[#0d1e28]"
              style={{ minHeight: "380px" }}
            >
              <MediaImage
                category="home_sector_buildings"
                title="home_sector_buildings_image"
                fallbackSrc="/media/buildings-social-housing-assiut-egypt.avif"
                alt="Buildings"
                className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-80 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#213B4D]/50 via-[#213B4D]/50 to-transparent" />

              <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-source-sans)" }}>
                    <ContentText section="home_sector_buildings" name="badgeLabel" fallback="01 · Standalone Sector" />
                  </p>
                </div>
                <div>
                  <div className="w-8 h-[2px] bg-[#1F93A4] mb-5 group-hover:w-14 transition-all duration-300" />
                  <h3 className="text-white uppercase leading-tight mb-3 group-hover:text-[#1F93A4] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 600 }}>
                    <ContentText section="home_sector_buildings" name="title" fallback="Buildings" />
                  </h3>
                  <p className="text-white/55 text-[15px] leading-relaxed mb-6 max-w-sm" style={{ fontFamily: "var(--font-source-sans)" }}>
                    <ContentText
                      section="home_sector_buildings"
                      name="short"
                      fallback="Residential, commercial, and institutional construction from concept to handover."
                    />
                  </p>
                  <span className="text-[#1F93A4] text-[12px] font-bold uppercase tracking-widest flex items-center gap-2" style={{ fontFamily: "var(--font-source-sans)" }}>
                    <ContentText section="home_sector_buildings" name="exploreText" fallback="Explore" />{" "}
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300 inline-block">→</span>
                  </span>
                </div>
              </div>
            </Link>

            {/* Infrastructure — umbrella sector */}
            <Link
              href="/sectors/infrastructure"
              className="img-zoom group relative overflow-hidden block bg-[#213B4D]"
              style={{ minHeight: "380px" }}
            >
              <MediaImage
                category="home_sector_infrastructure"
                title="home_sector_infrastructure_image"
                fallbackSrc="/media/infrastructure-aden-causeway-widening-yemen.jpeg"
                alt="Infrastructure"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-100 group-hover:opacity-65 transition-opacity duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#213B4D]/50 via-[#213B4D]/50 to-transparent" />
              <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-source-sans)" }}>
                    <ContentText section="home_sector_infrastructure" name="badgeLabel" fallback="02 · Umbrella Sector" />
                  </p>
                </div>
                <div>
                  <div className="w-8 h-[2px] bg-[#1F93A4] mb-5 group-hover:w-14 transition-all duration-300" />
                  <h3 className="text-white uppercase leading-tight mb-3 group-hover:text-[#1F93A4] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 600 }}>
                    <ContentText section="home_sector_infrastructure" name="title" fallback="Infrastructure" />
                  </h3>
                  <p className="text-white/55 text-[15px] leading-relaxed mb-6 max-w-sm" style={{ fontFamily: "var(--font-source-sans)" }}>
                    <ContentText
                      section="home_sector_infrastructure"
                      name="short"
                      fallback="Civil works, water systems, energy, and industrial projects across the Middle East and Africa."
                    />
                  </p>
                  <span className="text-[#1F93A4] text-[12px] font-bold uppercase tracking-widest flex items-center gap-2" style={{ fontFamily: "var(--font-source-sans)" }}>
                    <ContentText section="home_sector_infrastructure" name="exploreText" fallback="Explore" />{" "}
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300 inline-block">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* ── 5. PHILOSOPHY STRIP ───────────────────────────────────────── */}
      <section className="bg-[#213B4D] py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 text-center">
          <p
            className="text-white/30 text-[11px] font-bold uppercase tracking-[0.4em] mb-5"
            style={{ fontFamily: "var(--font-source-sans)" }}
          >
            <ContentText section="home_philosophy" name="eyebrow" fallback="Our Operating Philosophy" />
          </p>
          <h2
            className="text-white uppercase leading-none mb-6"
            style={{
              fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
              fontSize: "clamp(40px, 8vw, 110px)",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            <span className="text-white"><ContentText section="home_philosophy" name="word1" fallback="SCOPE" /></span>
            <span className="text-[#1F93A4] mx-4 text-[0.6em]">·</span>
            <span className="text-white"><ContentText section="home_philosophy" name="word2" fallback="TIME" /></span>
            <span className="text-[#1F93A4] mx-4 text-[0.6em]">·</span>
            <span className="text-white"><ContentText section="home_philosophy" name="word3" fallback="COST" /></span>
            <span className="text-[#1F93A4] mx-4 text-[0.6em]">·</span>
            <span className="text-white"><ContentText section="home_philosophy" name="word4" fallback="QUALITY" /></span>
          </h2>
          <p
            className="text-white/45 text-[17px] max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-source-sans)" }}
          >
            <ContentText
              section="home_philosophy"
              name="description"
              fallback="All projects are managed to achieve the best goals of scope, time, cost, and quality — delivering exceptional results to every client, on every engagement."
            />
          </p>
        </div>
      </section>

      {/* ── 6. FEATURED PROJECTS ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-5">
            <div>
              <p
                className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em] mb-3"
                style={{ fontFamily: "var(--font-source-sans)" }}
              >
                <ContentText section="home_featured_projects" name="eyebrow" fallback="Our Work" />
              </p>
              <h2
                className="text-[#213B4D] uppercase leading-tight"
                style={{
                  fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
                  fontSize: "clamp(32px, 4.5vw, 54px)",
                  fontWeight: 600,
                }}
              >
                <ContentText section="home_featured_projects" name="headingLine1" fallback="Projects Across" /><br />
                <ContentText section="home_featured_projects" name="headingLine2" fallback="Multiple Regions" />
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-[#213B4D]/60 hover:text-[#1F93A4] text-[13px] font-semibold uppercase tracking-widest flex items-center gap-2 transition-colors group shrink-0"
              style={{ fontFamily: "var(--font-source-sans)" }}
            >
              <ContentText section="home_featured_projects" name="linkText" fallback="View All Projects" />
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* 3-column project cards */}
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { key: "home_project_1", fallbackTitle: "Hassan Dam Project", fallbackCountry: "Yemen", fallbackType: "Water Infrastructure", fallbackImage: "/media/water-hassan-dam-project-yemen.jpeg" },
              { key: "home_project_2", fallbackTitle: "Stormwater Drainage System", fallbackCountry: "Yemen", fallbackType: "Civil Works", fallbackImage: "/media/infrastructure-stormwater-drainage-yemen.jpeg" },
              { key: "home_project_3", fallbackTitle: "Highway Expansion Project", fallbackCountry: "Yemen", fallbackType: "Transportation", fallbackImage: "/media/infrastructure-highway-expansion-mocha-yemen.jpeg" },
            ].filter((p) => !deleted.has(p.key)).map((p) => (
              <Link
                key={p.key}
                href="/projects"
                className="img-zoom group block overflow-hidden border border-[#213B4D]/8 hover:border-[#1F93A4] transition-colors duration-300"
              >
                <div className="relative h-60 overflow-hidden">
                  <MediaImage
                    category={p.key}
                    title={`${p.key}_image`}
                    fallbackSrc={p.fallbackImage}
                    alt={p.fallbackTitle}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#213B4D]/30 group-hover:bg-[#213B4D]/15 transition-colors duration-300" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="bg-[#1F93A4] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1"
                      style={{ fontFamily: "var(--font-source-sans)" }}
                    >
                      <ContentText section={p.key} name="country" fallback={p.fallbackCountry} />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p
                    className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-widest mb-1"
                    style={{ fontFamily: "var(--font-source-sans)" }}
                  >
                    <ContentText section={p.key} name="type" fallback={p.fallbackType} />
                  </p>
                  <h3
                    className="text-[#213B4D] font-bold text-lg group-hover:text-[#1F93A4] transition-colors"
                    style={{ fontFamily: "var(--font-source-sans)" }}
                  >
                    <ContentText section={p.key} name="title" fallback={p.fallbackTitle} />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. ABOUT SPLIT ────────────────────────────────────────────── */}
      <section className="bg-white border-t border-[#213B4D]/6 relative overflow-hidden" style={{ minHeight: "620px" }}>
        <MediaImage
          category="home_about_split"
          title="home_about_split_background"
          fallbackSrc="/media/infrastructure-coastal-highway-taiz-yemen.jpeg"
          alt="INFRA Construction team"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1e28]/105 via-[#0d1e28]/95 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 py-20 flex flex-col justify-center" style={{ minHeight: "620px" }}>
          <div className="max-w-xl">
            <div className="flex items-center gap-8 mb-8">
              <div>
                <p
                  className="text-white uppercase leading-none"
                  style={{
                    fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 700,
                  }}
                >
                  <ContentText section="home_about_split" name="stat1Value" fallback="25 Years" />
                </p>
                <p
                  className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-1"
                  style={{ fontFamily: "var(--font-source-sans)" }}
                >
                  <ContentText section="home_about_split" name="stat1Label" fallback="of Excellence" />
                </p>
              </div>
              <div className="w-[1px] h-10 bg-white/15" />
              <div>
                <p
                  className="text-white uppercase leading-none"
                  style={{
                    fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 700,
                  }}
                >
                  <ContentText section="home_about_split" name="stat2Value" fallback="12 Countries" />
                </p>
                <p
                  className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-1"
                  style={{ fontFamily: "var(--font-source-sans)" }}
                >
                  <ContentText section="home_about_split" name="stat2Label" fallback="of Operation" />
                </p>
              </div>
            </div>
            <p
              className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em] mb-4"
              style={{ fontFamily: "var(--font-source-sans)" }}
            >
              <ContentText section="home_about_split" name="eyebrow" fallback="Who We Are" />
            </p>
            <h2
              className="text-white uppercase leading-tight mb-6"
              style={{
                fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
                fontSize: "clamp(30px, 3.5vw, 46px)",
                fontWeight: 600,
              }}
            >
              <ContentText section="home_about_split" name="heading" fallback="A Global Engineering & Construction Partner" />
            </h2>
            <p
              className="text-white/65 text-[17px] leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-source-sans)" }}
            >
              <ContentText
                section="home_about_split"
                name="paragraph1"
                fallback="Infra Construction is a contracting company that has carried out numerous and various projects since its establishment in 2000. Every task is executed through hard work, dedication, and optimal management of resources."
              />
            </p>
            <p
              className="text-white/65 text-[17px] leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-source-sans)" }}
            >
              <ContentText
                section="home_about_split"
                name="paragraph2"
                fallback="We provide professional services in contracting — especially in the infrastructure field — executing according to international codes and project specifications, with offices across the UAE, Egypt, Yemen, Jordan, and Canada."
              />
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-8">
              {[
                { name: "service1", fallback: "Construction Services" },
                { name: "service2", fallback: "Project Management" },
                { name: "service3", fallback: "Detailed Engineering" },
                { name: "service4", fallback: "Procurement Management" },
                { name: "service5", fallback: "Quantity Surveying" },
                { name: "service6", fallback: "Operation & Maintenance" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-[13px] text-white/55 py-1.5 border-b border-white/10"
                  style={{ fontFamily: "var(--font-source-sans)" }}
                >
                  <span className="text-[#1F93A4] text-[10px]">▸</span>
                  <ContentText section="home_about_split" name={item.name} fallback={item.fallback} />
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-white font-bold text-[13px] uppercase tracking-widest hover:text-[#1F93A4] transition-colors group"
              style={{ fontFamily: "var(--font-source-sans)" }}
            >
              <ContentText section="home_about_split" name="linkText" fallback="Discover Our Story" />
              <span className="group-hover:translate-x-1.5 transition-transform inline-block">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ───────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-[#213B4D]/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-5">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-[2px] bg-[#1F93A4]" />
                <p
                  className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]"
                  style={{ fontFamily: "var(--font-source-sans)" }}
                >
                  <ContentText section="home_news_header" name="eyebrow" fallback="Latest News" />
                </p>
              </div>
              <h2
                className="text-[#213B4D] uppercase leading-tight"
                style={{
                  fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
                  fontSize: "clamp(32px, 4.5vw, 54px)",
                  fontWeight: 600,
                }}
              >
                <ContentText section="home_news_header" name="heading" fallback="News & Updates" />
              </h2>
            </div>
            <Link
              href="/news"
              className="text-[#213B4D]/60 hover:text-[#1F93A4] text-[13px] font-semibold uppercase tracking-widest flex items-center gap-2 transition-colors group shrink-0"
              style={{ fontFamily: "var(--font-source-sans)" }}
            >
              <ContentText section="home_news_header" name="linkText" fallback="View All News" />
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { key: "home_news_1", fallbackDate: "March 2025", fallbackCategory: "Projects", fallbackTitle: "INFRA Completes Major Water Infrastructure Project in Djibouti", fallbackImage: "/media/water-al-som-supply-hadramawt-yemen.jpeg" },
              { key: "home_news_2", fallbackDate: "January 2025", fallbackCategory: "Certifications", fallbackTitle: "INFRA Renews ISO 9001 and ISO 14001 Certifications for 2025", fallbackImage: "/media/company-brand-quote.jpeg" },
              { key: "home_news_3", fallbackDate: "November 2024", fallbackCategory: "Projects", fallbackTitle: "INFRA Delivers Dhobab Airport Strategic Infrastructure, Yemen", fallbackImage: "/media/airports-dhobab-airport-diagram.png" },
            ].filter((n) => !deleted.has(n.key)).map((n) => (
              <Link
                key={n.key}
                href="/news"
                className="img-zoom group block overflow-hidden border border-[#213B4D]/8 hover:border-[#1F93A4] transition-colors duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <MediaImage
                    category={n.key}
                    title={`${n.key}_image`}
                    fallbackSrc={n.fallbackImage}
                    alt={n.fallbackTitle}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#213B4D]/30 group-hover:bg-[#213B4D]/15 transition-colors duration-300" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="bg-[#1F93A4] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1"
                      style={{ fontFamily: "var(--font-source-sans)" }}
                    >
                      <ContentText section={n.key} name="category" fallback={n.fallbackCategory} />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p
                    className="text-[#5E5E5E] text-[11px] uppercase tracking-widest mb-2"
                    style={{ fontFamily: "var(--font-source-sans)" }}
                  >
                    <ContentText section={n.key} name="date" fallback={n.fallbackDate} />
                  </p>
                  <h3
                    className="text-[#213B4D] font-bold text-[15px] leading-snug group-hover:text-[#1F93A4] transition-colors"
                    style={{ fontFamily: "var(--font-source-sans)" }}
                  >
                    <ContentText section={n.key} name="title" fallback={n.fallbackTitle} />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. GLOBAL PRESENCE ────────────────────────────────────────── */}
      <section className="py-28 bg-[#0d1e28]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-10 mb-14 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[2px] bg-[#1F93A4]" />
                <p
                  className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]"
                  style={{ fontFamily: "var(--font-source-sans), Arial, sans-serif" }}
                >
                  <ContentText section="home_global" name="eyebrow" fallback="Where We Operate" />
                </p>
              </div>
              <h2
                className="text-white uppercase leading-tight"
                style={{
                  fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
                  fontSize: "clamp(30px, 3.5vw, 48px)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                <ContentText section="home_global" name="heading" fallback="Global Reach" />
              </h2>
            </div>
            <p
              className="text-white/45 text-[17px] leading-relaxed lg:pt-14"
              style={{ fontFamily: "var(--font-source-sans), Arial, sans-serif" }}
            >
              <ContentText
                section="home_global"
                name="description"
                fallback="Five regional offices across multiple regions, with 75+ completed projects across the Middle East, Africa, and beyond."
              />
            </p>
          </div>
          <div className="border-t border-white/10">
            {[
              { key: "home_office_1", fallbackNum: "01", fallbackCity: "Abu Dhabi", fallbackCountry: "UAE" },
              { key: "home_office_2", fallbackNum: "02", fallbackCity: "Dubai", fallbackCountry: "UAE" },
              { key: "home_office_3", fallbackNum: "03", fallbackCity: "Cairo", fallbackCountry: "Egypt" },
              { key: "home_office_4", fallbackNum: "04", fallbackCity: "Aden", fallbackCountry: "Yemen" },
              { key: "home_office_5", fallbackNum: "05", fallbackCity: "Ontario", fallbackCountry: "Canada" },
            ].map((o) => (
              <div
                key={o.key}
                className="group flex items-center border-b border-white/[0.08] py-5 hover:bg-white/[0.03] transition-colors -mx-6 lg:-mx-14 px-6 lg:px-14"
              >
                <span
                  className="text-[#1F93A4] text-[12px] font-bold tracking-widest w-10 shrink-0"
                  style={{ fontFamily: "var(--font-source-sans), Arial, sans-serif" }}
                >
                  <ContentText section={o.key} name="num" fallback={o.fallbackNum} />
                </span>
                <span
                  className="flex-1 text-white group-hover:text-[#1F93A4] transition-colors uppercase leading-none"
                  style={{
                    fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
                    fontSize: "clamp(22px, 2.8vw, 40px)",
                    fontWeight: 600,
                  }}
                >
                  <ContentText section={o.key} name="city" fallback={o.fallbackCity} />
                </span>
                <span
                  className="text-white/30 text-[12px] font-bold uppercase tracking-[0.25em] shrink-0"
                  style={{ fontFamily: "var(--font-source-sans), Arial, sans-serif" }}
                >
                  <ContentText section={o.key} name="country" fallback={o.fallbackCountry} />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-white/50 text-[12px] font-bold uppercase tracking-widest hover:text-[#1F93A4] transition-colors group"
              style={{ fontFamily: "var(--font-source-sans), Arial, sans-serif" }}
            >
              <ContentText section="home_global" name="linkText" fallback="Find Our Offices" />
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. CTA ────────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden bg-[#1F93A4]">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-14 text-center">
          <p
            className="text-white/50 text-[11px] font-bold uppercase tracking-[0.45em] mb-6"
            style={{ fontFamily: "var(--font-source-sans)" }}
          >
            <ContentText section="home_cta" name="eyebrow" fallback="Start Your Project" />
          </p>
          <h2
            className="text-white uppercase leading-[0.9] mb-8"
            style={{
              fontFamily: "var(--font-barlow-condensed), Arial Narrow, sans-serif",
              fontSize: "clamp(52px, 9vw, 120px)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            <ContentText section="home_cta" name="headingLine1" fallback="LET'S BUILD" /><br />
            <ContentText section="home_cta" name="headingLine2" fallback="SOMETHING" /><br />
            <ContentText section="home_cta" name="headingLine3" fallback="GREAT" />
          </h2>
          <p
            className="text-white/65 text-[17px] mb-10 max-w-lg mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-source-sans)" }}
          >
            <ContentText
              section="home_cta"
              name="description"
              fallback="Partner with INFRA Construction for reliable solutions that deliver engineering precision, operational efficiency, and long-term performance."
            />
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-[#213B4D] font-bold px-10 py-4 text-[13px] uppercase tracking-widest hover:bg-[#213B4D] hover:text-white transition-all duration-400"
            style={{ fontFamily: "var(--font-source-sans)" }}
          >
            <ContentText section="home_cta" name="buttonText" fallback="Contact Our Team" />
            <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}