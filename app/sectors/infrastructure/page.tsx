import Image from "next/image";
import Link from "next/link";
import ContentText from "@/components/admin-panel/ContentText";
import MediaImage from "@/components/admin-panel/MediaImage";

const H = "var(--font-ibm-plex-sans), system-ui, -apple-system, sans-serif";
const B = "var(--font-ibm-plex-sans), system-ui, -apple-system, sans-serif";

const subsectors = [
  { num: "01", title: "Water",          short: "Water supply systems, treatment plants, and integrated utility networks built for longevity.",                    href: "/sectors/water-utilities",            image: "/media/water-dam-construction-yemen.jpeg",              disciplines: ["Water Supply Networks", "Wastewater Treatment", "Desalination", "Utility Networks"],               sectionKey: "infra_hub_sub_1" },
  { num: "02", title: "Dams & Irrigation", short: "Dam construction, dike works, and large-scale irrigation infrastructure across arid regions.",               href: "/sectors/water-utilities",            image: "/media/water-hassan-dam-project-yemen.jpeg",            disciplines: ["Dam Construction", "Dikes", "Irrigation Networks", "Flood Control"],                              sectionKey: "infra_hub_sub_2" },
  { num: "03", title: "Ports",          short: "Marine ports, quay walls, breakwaters, and harbour infrastructure delivered to international standards.",         href: "/sectors/infrastructure-civil-works", image: "/media/ports-hulaf-socotra-yemen.jpeg",                 disciplines: ["Quay Walls", "Breakwaters", "Marine Structures", "Port Master Planning"],                         sectionKey: "infra_hub_sub_3" },
  { num: "04", title: "Airports",       short: "Airfield works, runways, terminal facilities, and aviation infrastructure for civil and strategic use.",          href: "/sectors/infrastructure-civil-works", image: "/media/airports-dhobab-airport-diagram.png",            disciplines: ["Runways", "Airfield Works", "Terminal Facilities", "Aviation Infrastructure"],                    sectionKey: "infra_hub_sub_4" },
  { num: "05", title: "Transportation", short: "Highways, bridges, flyovers, and large-scale road networks delivered with proven civil engineering expertise.",   href: "/sectors/infrastructure-civil-works", image: "/media/infrastructure-coastal-highway-taiz-yemen.jpeg", disciplines: ["Highways & Roads", "Bridges & Flyovers", "Causeways", "Road Rehabilitation"],                     sectionKey: "infra_hub_sub_5" },
  { num: "06", title: "Oil",            short: "Oil & gas pipelines, plant construction, and comprehensive industrial operations support.",                       href: "/sectors/industrial-oil-services",    image: "/media/industrial-floating-marine-pier-yemen.jpeg",     disciplines: ["Oil & Gas Pipelines", "Plant Construction", "Industrial O&M", "Marine Pipelines"],                sectionKey: "infra_hub_sub_6" },
  { num: "07", title: "Power",          short: "Power generation, transmission networks, substations, and renewable energy infrastructure.",                      href: "/sectors/energy-power",               image: "/media/energy-power-plant-alhaswa-aden-yemen.jpeg",     disciplines: ["Power Plants", "Transmission Lines", "Substations", "Renewable Energy"],                          sectionKey: "infra_hub_sub_7" },
];

const disciplines = [
  { title: "Water Supply Networks",           sectionKey: "infra_hub_disc_1" },
  { title: "Wastewater Treatment",            sectionKey: "infra_hub_disc_2" },
  { title: "Dams & Irrigation",               sectionKey: "infra_hub_disc_3" },
  { title: "Ports & Marine Structures",        sectionKey: "infra_hub_disc_4" },
  { title: "Airports & Runways",              sectionKey: "infra_hub_disc_5" },
  { title: "Transportation & Roads",           sectionKey: "infra_hub_disc_6" },
  { title: "Bridges & Flyovers",              sectionKey: "infra_hub_disc_7" },
  { title: "Oil & Gas Pipelines",             sectionKey: "infra_hub_disc_8" },
  { title: "Industrial Plants",               sectionKey: "infra_hub_disc_9" },
  { title: "Power Generation",               sectionKey: "infra_hub_disc_10" },
  { title: "Power Transmission & Distribution", sectionKey: "infra_hub_disc_11" },
  { title: "Earthworks & Grading",            sectionKey: "infra_hub_disc_12" },
];

export default function InfrastructurePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <MediaImage category="infra_hub_hero" title="backgroundImage" fallbackSrc="/media/infrastructure-aden-causeway-widening-yemen.jpeg" alt="Infrastructure" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/96 via-[#213B4D]/70 to-[#213B4D]/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pb-16 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
            <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
              <ContentText section="infra_hub_hero" name="eyebrow" fallback="Core Sector" />
            </p>
          </div>
          <h1 className="text-white uppercase leading-[0.92] mb-5" style={{ fontFamily: H, fontSize: "clamp(44px, 7.5vw, 90px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            <ContentText section="infra_hub_hero" name="title" fallback="Infrastructure" />
          </h1>
          <p className="text-white/60 text-[15px] max-w-xl leading-relaxed" style={{ fontFamily: B }}>
            <ContentText section="infra_hub_hero" name="subtitle" fallback="Civil works, water systems, energy, and industrial projects — delivered across the Middle East and Africa since 2000." />
          </p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="bg-[#0d1e28] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-3 flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase" style={{ fontFamily: B }}>
          <Link href="/" className="text-white/35 hover:text-[#1F93A4] transition-colors">Home</Link>
          <span className="text-white/20">›</span>
          <Link href="/sectors" className="text-white/35 hover:text-[#1F93A4] transition-colors">Sectors</Link>
          <span className="text-white/20">›</span>
          <span className="text-[#1F93A4]">Infrastructure</span>
        </div>
      </div>

      {/* INTRO */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
              <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="infra_hub_intro" name="eyebrow" fallback="Overview" />
              </p>
            </div>
            <h2 className="text-[#213B4D] uppercase leading-tight mb-6" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
              <ContentText section="infra_hub_intro" name="title" fallback="Comprehensive Infrastructure Delivery" />
            </h2>
            <p className="text-[#5E5E5E] text-[15px] leading-relaxed mb-4" style={{ fontFamily: B }}>
              <ContentText section="infra_hub_intro" name="p1" fallback="INFRA Construction's Infrastructure sector encompasses all major civil, utility, energy, and industrial disciplines. From highway construction and dam engineering to power generation and oil services, our integrated teams deliver complex infrastructure projects to international standards." />
            </p>
            <p className="text-[#5E5E5E] text-[15px] leading-relaxed" style={{ fontFamily: B }}>
              <ContentText section="infra_hub_intro" name="p2" fallback="Operating across the Middle East and Africa since 2000, we bring proven technical expertise, ISO-certified quality management, and deep regional experience to every infrastructure engagement." />
            </p>
          </div>
          <div className="lg:col-span-5 bg-[#0d1e28] p-8 self-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-[2px] bg-[#1F93A4]" />
              <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="infra_hub_disciplines" name="eyebrow" fallback="Disciplines Covered" />
              </span>
            </div>
            <div className="space-y-0">
              {disciplines.map((d) => (
                <div key={d.sectionKey} className="flex items-center gap-2 text-white/55 text-[12px] py-2 border-b border-white/8 last:border-0" style={{ fontFamily: B }}>
                  <span className="text-[#1F93A4] text-[8px] shrink-0">▸</span>
                  <ContentText section={d.sectionKey} name="title" fallback={d.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUBSECTORS */}
      <section className="py-24 bg-[#0d1e28]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
              <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="infra_hub_disciplines" name="eyebrow" fallback="Subsectors" />
              </p>
            </div>
            <h2 className="text-white uppercase leading-tight" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
              <ContentText section="infra_hub_disciplines" name="title" fallback="Seven Core Disciplines" />
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-[1px] bg-white/0">
            {subsectors.map((s, i) => {
              const isLast = i === subsectors.length - 1;
              return (
                <Link key={s.sectionKey} href={s.href} className="group relative overflow-hidden block bg-[#0d1e28] hover:bg-[#1a3040] transition-colors">
                  <div className={`relative ${isLast ? "h-72" : "h-56"} overflow-hidden`}>
                    <Image src={s.image} alt={s.title} fill quality={95} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28]/90 via-[#0d1e28]/40 to-transparent" />
                    <div className="absolute top-5 left-5 text-[#1F93A4] leading-none" style={{ fontFamily: H, fontSize: "36px", fontWeight: 600 }}>
                      <ContentText section={s.sectionKey} name="num" fallback={s.num} />
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="w-6 h-[2px] bg-[#1F93A4] mb-4 group-hover:w-10 transition-all duration-300" />
                    <h3 className="text-white font-bold text-[15px] mb-3 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                      <ContentText section={s.sectionKey} name="title" fallback={s.title} />
                    </h3>
                    <p className="text-white/45 text-[13px] leading-relaxed mb-4" style={{ fontFamily: B }}>
                      <ContentText section={s.sectionKey} name="short" fallback={s.short} />
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {s.disciplines.map((d) => (
                        <span key={d} className="text-white/30 text-[10px] border border-white/10 px-2 py-0.5" style={{ fontFamily: B }}>{d}</span>
                      ))}
                    </div>
                    <span className="text-[#1F93A4] text-[12px] font-bold uppercase tracking-[0.2em] flex items-center gap-2" style={{ fontFamily: B }}>
                      Explore <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 bg-[#1F93A4] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-14 text-center">
          <p className="text-white/50 text-[11px] font-bold uppercase tracking-[0.45em] mb-5" style={{ fontFamily: B }}>
            <ContentText section="infra_hub_cta" name="eyebrow" fallback="Start Your Project" />
          </p>
          <h2 className="text-white uppercase leading-[0.92] mb-6" style={{ fontFamily: H, fontSize: "clamp(44px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            <ContentText section="infra_hub_cta" name="title" fallback="Have an Infrastructure Challenge?" />
          </h2>
          <p className="text-white/65 text-[15px] mb-10 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: B }}>
            <ContentText section="infra_hub_cta" name="body" fallback="Our specialists are ready to discuss your requirements and design a tailored infrastructure solution for your specific needs." />
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-[#213B4D] font-bold px-10 py-4 text-[13px] uppercase tracking-widest hover:bg-[#213B4D] hover:text-white transition-all duration-300" style={{ fontFamily: B }}>
            <ContentText section="infra_hub_cta" name="buttonText" fallback="Contact Our Team" /> <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
