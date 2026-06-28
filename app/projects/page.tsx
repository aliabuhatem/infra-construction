import Image from "next/image";
import Link from "next/link";
import ContentText from "@/components/admin-panel/ContentText";
import MediaImage from "@/components/admin-panel/MediaImage";
import { getContent } from "@/lib/getContent";

const H = "var(--font-barlow-condensed), Arial Narrow, sans-serif";
const B = "var(--font-source-sans), Arial, sans-serif";

const projects = [
  { title: "Dhobab Airport — Coastal Defense",        country: "Yemen",     sector: "Infrastructure & Civil Works", type: "Aviation",             description: "Development of Dhobab Airport serving strategic coastal defense requirements — airfield works and runway infrastructure.", image: "/media/airports-dhobab-airport-yemen.jpeg",                 sectionKey: "project_1"  },
  { title: "Al Riyan Airport Rehabilitation",          country: "Yemen",     sector: "Infrastructure & Civil Works", type: "Aviation",             description: "Rehabilitation and expansion of Al Riyan Airport — airfield works, terminal facilities, and runway improvements.",          image: "/media/airports-al-riyan-airport-yemen.jpeg",               sectionKey: "project_2"  },
  { title: "Private Residential Complex",              country: "UAE",       sector: "Buildings",                    type: "Residential",          description: "Multi-storey private residential complex delivering high-quality apartments to international architectural standards.",        image: "/media/buildings-residential-complex-dubai.jpeg",           sectionKey: "project_3"  },
  { title: "Marine Breakwater Project",                country: "Yemen",     sector: "Infrastructure & Civil Works", type: "Marine Works",         description: "Design and construction of marine breakwater structures to protect coastal facilities and port operations.",                  image: "/media/ports-marine-breakwater-yemen.jpeg",                 sectionKey: "project_4"  },
  { title: "Oil Project Management",                   country: "Yemen",     sector: "Industrial & Oil Services",    type: "Project Management",   description: "Comprehensive project management and engineering support services for oil infrastructure at Belhaf, Yemen.",                 image: "/media/industrial-oil-project-belhaf-yemen.png",            sectionKey: "project_5"  },
  { title: "Hulaf Port Development",                   country: "Yemen",     sector: "Infrastructure & Civil Works", type: "Marine Works",         description: "Development of Hulaf Port facilities on Socotra Island, including quay walls and berthing structures.",                       image: "/media/ports-hulaf-socotra-yemen.jpeg",                     sectionKey: "project_6"  },
  { title: "Ministry of Foreign Affairs Building",     country: "Yemen",     sector: "Buildings",                    type: "Government",           description: "Construction of the Ministry of Foreign Affairs headquarters in Aden — structural works, MEP systems, and finishing.",        image: "/media/buildings-ministry-foreign-aden-yemen.jpeg",         sectionKey: "project_7"  },
  { title: "Sheik Khalifah Housing Project",           country: "Yemen",     sector: "Buildings",                    type: "Residential",          description: "Large-scale public housing development delivering residential units to international standards.",                              image: "/media/buildings-sheik-khalifah-housing-mukala-yemen.jpeg", sectionKey: "project_8"  },
  { title: "16 Low Cost Housing Units, Jakarta",       country: "Indonesia", sector: "Buildings",                    type: "Residential",          description: "Full design-and-build delivery of sixteen affordable residential units in Jakarta, Indonesia.",                              image: "/media/fm-hotel-moroni-comoros.jpeg",                       sectionKey: "project_9"  },
  { title: "Assiut Plateau Axis",                      country: "Egypt",     sector: "Infrastructure & Civil Works", type: "Transportation",       description: "Construction of the Assiut Plateau Axis — a major road infrastructure link improving connectivity in the region.",            image: "/media/infrastructure-assiut-plateau-axis-egypt.jpeg",      sectionKey: "project_10" },
  { title: "Al-Atiyat Wastewater Treatment Plant",    country: "Egypt",     sector: "Water & Utilities",            type: "Wastewater",           description: "Civil works and material supply for the Al-Atiyat Marine Wastewater Treatment Plant at Ibnawb, Egypt.",                      image: "/media/water-al-atiyat-wastewater-treatment-egypt.jpeg",    sectionKey: "project_11" },
  { title: "Hassan Dam Project",                       country: "Yemen",     sector: "Water & Utilities",            type: "Dam Construction",     description: "Construction of major dam and dike infrastructure for water retention, flood control, and irrigation.",                       image: "/media/water-dam-construction-yemen.jpeg",                  sectionKey: "project_12" },
  { title: "Al-Som Water Supply System",               country: "Yemen",     sector: "Water & Utilities",            type: "Utility Infrastructure",description: "Integrated water supply network including transmission pipelines, distribution systems, and pumping stations.",               image: "/media/water-al-som-supply-hadramawt-yemen.jpeg",           sectionKey: "project_13" },
  { title: "Floating Marine Pier",                     country: "Yemen",     sector: "Infrastructure & Civil Works", type: "Marine Works",         description: "Procurement and construction of a floating marine pier — structural works, mooring systems, and marine access.",               image: "/media/ports-floating-marine-pier-yemen.jpeg",              sectionKey: "project_14" },
  { title: "Aden Port Master Plan Study",              country: "Yemen",     sector: "Infrastructure & Civil Works", type: "Marine Works",         description: "Port traffic study and master plan for Aden — comprehensive analysis of port capacity and infrastructure.",                    image: "/media/ports-aden-master-plan-port-study.png",              sectionKey: "project_15" },
  { title: "Power Plant Piping & Mechanical Works",   country: "Yemen",     sector: "Energy & Power",               type: "Industrial",           description: "Mechanical and piping installation works at Alhaswa Power Station in Aden — piping erection and commissioning.",              image: "/media/energy-power-plant-alhaswa-aden-yemen.jpeg",         sectionKey: "project_16" },
  { title: "Power Plant Operations & Maintenance",     country: "Yemen",     sector: "Energy & Power",               type: "O&M Services",         description: "Operation and maintenance services for power generation facilities in Aden and Taiz.",                                         image: "/media/energy-power-plant-maintenance-taiz-yemen.jpeg",     sectionKey: "project_17" },
  { title: "Marine Breakwater Works",                  country: "Yemen",     sector: "Infrastructure & Civil Works", type: "Marine Works",         description: "Coastal protection and marine breakwater construction providing critical wave attenuation and harbour protection.",             image: "/media/ports-marine-breakwater-yemen.jpeg",                 sectionKey: "project_18" },
  { title: "Aden Causeway Widening",                   country: "Yemen",     sector: "Infrastructure",               type: "Transportation",       description: "Widening and rehabilitation of the Aden Causeway to improve traffic capacity and structural integrity.",                        image: "/media/infrastructure-aden-causeway-widening-yemen.jpeg",   sectionKey: "project_19" },
  { title: "Bani Mazar Bridge",                        country: "Egypt",     sector: "Infrastructure & Civil Works", type: "Transportation",       description: "Construction of the Bani Mazar Bridge — reinforced concrete bridge structure delivering safe river crossing.",                 image: "/media/infrastructure-bani-mazar-bridge-egypt.jpeg",        sectionKey: "project_20" },
  { title: "Highway Expansion Project",                country: "Yemen",     sector: "Infrastructure & Civil Works", type: "Transportation",       description: "Comprehensive highway expansion and rehabilitation including earthworks, pavement, drainage, and road safety.",                image: "/media/infrastructure-highway-expansion-mocha-yemen.jpeg",  sectionKey: "project_21" },
  { title: "Basra Wastewater Treatment Plant",         country: "Egypt",     sector: "Water & Utilities",            type: "Wastewater",           description: "Labour and material supply for Basra Wastewater Treatment Plant — civil works and infrastructure for plant operations.",       image: "/media/water-basra-wastewater-treatment-egypt.jpeg",        sectionKey: "project_22" },
  { title: "Stormwater Drainage Network",              country: "Yemen",     sector: "Infrastructure",               type: "Civil Works",          description: "Large-scale stormwater drainage system to mitigate flooding and improve urban infrastructure resilience.",                   image: "/media/infrastructure-stormwater-drainage-yemen.jpeg",      sectionKey: "project_23" },
  { title: "Aswan University Buildings",               country: "Egypt",     sector: "Buildings",                    type: "Civil Works",          description: "Civil work and material supply for University Buildings, Aswan, Egypt.",                                                       image: "/media/buildings-social-housing-assiut-egypt.avif",         sectionKey: "project_24" },
];

export default async function ProjectsPage() {
  const c = await getContent();
  const deleted = new Set(c._deletedSections || []);
  const visibleProjects = projects.filter((p) => !deleted.has(p.sectionKey));
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <MediaImage category="projects_hero" title="backgroundImage" fallbackSrc="/media/project-hero.jpg" alt="Our Projects" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/90 via-[#213B4D]/50 to-[#213B4D]/7" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pb-16 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
            <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
              <ContentText section="projects_hero" name="eyebrow" fallback="Our Work" />
            </p>
          </div>
          <h1 className="text-white uppercase leading-[0.92] mb-5" style={{ fontFamily: H, fontSize: "clamp(52px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            <ContentText section="projects_hero" name="title" fallback="Projects" />
          </h1>
          <p className="text-white/60 text-[15px] max-w-xl leading-relaxed" style={{ fontFamily: B }}>
            <ContentText section="projects_hero" name="subtitle" fallback="Over 75 projects delivered across multiple regions — each one a testament to INFRA's commitment to quality." />
          </p>
        </div>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────────────────────── */}
      <div className="bg-[#0d1e28] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-3 flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase" style={{ fontFamily: B }}>
          <Link href="/" className="text-white/35 hover:text-[#1F93A4] transition-colors">Home</Link>
          <span className="text-white/20">›</span>
          <span className="text-[#1F93A4]">Projects</span>
        </div>
      </div>

      {/* ── PROJECTS GRID ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-12 gap-14 mb-14">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
                <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                  <ContentText section="projects_header" name="eyebrow" fallback="Portfolio" />
                </p>
              </div>
              <h2 className="text-[#213B4D] uppercase leading-tight" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
                <ContentText section="projects_header" name="title" fallback="75+ Projects Delivered Across Multiple Regions" />
              </h2>
              <p className="text-[#5E5E5E] text-[15px] leading-relaxed mt-4" style={{ fontFamily: B }}>
                <ContentText section="projects_header" name="subtitle" fallback="Since 2000, INFRA Construction has accomplished projects in various fields of specialisation across the Middle East, Africa, and beyond." />
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#213B4D]/8">
            {visibleProjects.map((p, i) => (
              <div key={i} className="group bg-white hover:bg-[#f4f6f8] transition-colors overflow-hidden">
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

      {/* ── STATEMENT ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#213B4D]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-1 hidden lg:block">
            <div className="w-[2px] h-full min-h-[160px] bg-[#1F93A4] mx-auto" />
          </div>
          <div className="lg:col-span-8">
            <p className="text-white leading-tight" style={{ fontFamily: H, fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
              &ldquo;<ContentText section="projects_statement" name="text" fallback="Every project we deliver is a commitment to the communities, institutions, and nations that trust us with their most critical infrastructure." />&rdquo;
            </p>
          </div>
          <div className="lg:col-span-3 border-l border-white/10 pl-10 hidden lg:block">
            <div className="text-white/40 text-[12px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ fontFamily: B }}>Est.</div>
            <div className="text-[#1F93A4] leading-none" style={{ fontFamily: H, fontSize: "72px", fontWeight: 600 }}>2000</div>
            <div className="text-white/40 text-[12px] font-semibold uppercase tracking-[0.2em] mt-2" style={{ fontFamily: B }}>Abu Dhabi, UAE</div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-[#1F93A4] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-14 text-center">
          <p className="text-white/50 text-[11px] font-bold uppercase tracking-[0.45em] mb-5" style={{ fontFamily: B }}>
            <ContentText section="projects_cta" name="eyebrow" fallback="Partner With Us" />
          </p>
          <h2 className="text-white uppercase leading-[0.92] mb-6" style={{ fontFamily: H, fontSize: "clamp(44px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            <ContentText section="projects_cta" name="title" fallback="Start Your Project" />
          </h2>
          <p className="text-white/65 text-[15px] mb-10 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: B }}>
            <ContentText section="projects_cta" name="body" fallback="Partner with INFRA Construction for reliable project delivery across all infrastructure and building sectors." />
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-[#213B4D] font-bold px-10 py-4 text-[13px] uppercase tracking-widest hover:bg-[#213B4D] hover:text-white transition-all duration-300" style={{ fontFamily: B }}>
            <ContentText section="projects_cta" name="buttonText" fallback="Contact Our Team" /> <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
