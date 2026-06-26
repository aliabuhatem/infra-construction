import Image from "next/image";
import Link from "next/link";

const H = "var(--font-barlow-condensed), Arial Narrow, sans-serif";
const B = "var(--font-source-sans), Arial, sans-serif";

const keyData = [
  { label: "Legal Status",      value: "Limited Liability Company" },
  { label: "Line of Business",  value: "Buildings & Infrastructure" },
  { label: "Capital",           value: "2 Million AED" },
  { label: "Established",       value: "Year 2000" },
  { label: "Head Office",       value: "Abu Dhabi, UAE" },
  { label: "Int'l Clients",     value: "37+ Regional & International" },
  { label: "Core Employees",    value: "175+ Permanent Staff" },
  { label: "Project Workforce", value: "1,000+ On-Site Workforce" },
  { label: "Certifications",    value: "ISO 9001 · ISO 14001 · OHSAS 18001" },
];

const offices = [
  { city: "Abu Dhabi", country: "UAE",    address: "Office 606, EREC Building, Zone 1, Al Danah" },
  { city: "Dubai",     country: "UAE",    address: "Office 306, Bld 121, Al Manar Area" },
  { city: "Cairo",     country: "Egypt",  address: "Ground Floor, Villa 224C, Khaled Ibn Alwaleed St., 5th Settlement" },
  { city: "Aden",      country: "Yemen",  address: "Bldg. 1, Bader Roundabout, Khormaksar, P.O. Box 70116" },
  { city: "Ontario",   country: "Canada", address: "3280 Donald Mackay St, Oakville, L6M 5K2" },
];

const services = [
  "Construction Services", "Infrastructure Projects", "Quantity Surveying",
  "Project Management", "Construction Supervision", "Procurement Management",
  "Risk Assessment & Management", "Value Engineering", "Claims Management",
  "Contract Administration", "Scope, Cost & Schedule Management",
  "Quality Assurance Management", "Detailed Engineering", "Operation & Maintenance",
];

const departments = [
  { title: "Administration",    items: ["Public Relations", "Human Resources", "Logistics", "Communication"] },
  { title: "Financial",         items: ["Accounting", "Auditing", "Banking", "Budget", "Supply Chain"] },
  { title: "Business Dev.",     items: ["Business Development", "Bidding", "Planning"] },
  { title: "Technical",         items: ["Buildings Section", "Infrastructure", "Construction Mgmt", "Document Control"] },
  { title: "Legal & Contracts", items: ["Legal", "Contract", "Quantity Surveying"] },
];

// CEO featured separately below — kept out of this grid
const leadership = [
  {
    role: "Chief Human Resources Officer",
    name: "Khaled Alariqee",
    scope: "Strategic direction, corporate governance, and stakeholder relations across all global offices.",
    image: "/media/KHALED ALARIQEE.png",
  },
  {
    role: "Central Business District",
    name: "Adnan Gazaz",
    scope: "Oversight of project delivery, resource allocation, and on-ground execution across all active sites.",
    image: "/media/Mr. Adnan Gazaz photo.png",
  },
  {
    role: "Chief Operating Officer",
    name: "Osama Abo Ghanem",
    scope: "Engineering standards, design review, quality assurance, and technical compliance.",
    image: "/media/OSAMA ABO GHANEM.png",
  },
  {
    role: "Chief Technology Officer",
    name: "Nedal Mustafa",
    scope: "Technology strategy, digital transformation, and innovation across all project operations.",
    image: "/media/Nedal.png",
  },
  {
    role: "Chief Commercial Officer",
    name: "Mustafa Al Awlaqi",
    scope: "Market expansion, client acquisition, bidding strategy, and international partnership development.",
    image: "/media/Mr. Khaled Alariqee photo.png",
  },
];

const ceo = {
  role: "Founder & Chief Executive Officer",
  name: "Mr. Hany El-Sahooly",
  image: "/media/FOUNDER OF HS GROUP - Mr. Hani Sahooly photo.png",
};

const mgmtSystems = [
  {
    code: "ISO 9001",
    title: "Quality Assurance & Control",
    desc: "INFRA is a premier provider of comprehensive QA/QC solutions — empowering clients to achieve and maintain the highest standards of quality. All works are revised and checked by international professionals.",
    items: [
      "ISO 9001:2015 — Quality Management",
      "Stringent inspection & testing protocols",
      "Statistical Process Control (SPC)",
      "Defect analysis & corrective action",
      "Continual improvement of management systems",
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    code: "ISO 14001",
    title: "Sustainability",
    desc: "INFRA supports the ten Principles of the UN Global Compact with respect to human rights, labour, environment, and anti-corruption. We are committed advocates of the global sustainability agenda.",
    items: [
      "UN Global Compact — 10 Principles",
      "Paris Climate Change Agreement",
      "United Nations 17 SDGs alignment",
      "Sustainable procurement practices",
      "Carbon footprint reduction initiatives",
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M17 18h1" /><path d="M12 18h1" /><path d="M7 18h1" />
      </svg>
    ),
  },
  {
    code: "OHSAS 18001",
    title: "Health, Safety & Environment",
    desc: "Our commitment to occupational health and safety ensures a safe working environment — we are committed to the target of \"zero harm.\" Protecting the environment is a fundamental pillar of our business strategy.",
    items: [
      "'Zero harm' HSE commitment",
      "Safe working environment management",
      "Environmental impact reduction",
      "ESHS — holistic approach to sustainability",
      "Regulatory & statutory compliance",
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 12.5l3 3 8-8" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[540px] flex items-end overflow-hidden">
        <Image
          src="/media/Abyan Coast Cornich-01.jpeg"
          alt="About INFRA Construction"
          fill
          className="object-cover object-center"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/100 via-[#213B4D]/60 to-[#213B4D]/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pb-16 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4]" />
            <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>Who We Are</span>
          </div>
          <h1 className="text-white uppercase leading-[0.92] mb-5" style={{ fontFamily: H, fontSize: "clamp(44px, 6.5vw, 82px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            About INFRA<br />Construction
          </h1>
          <p className="text-white/55 text-[17px] max-w-md leading-relaxed" style={{ fontFamily: B }}>
            25 years of engineering excellence across the Middle East, Africa, and beyond.
          </p>
        </div>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────────────────── */}
      <div className="-[#0d1e28] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-3 flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase" style={{ fontFamily: B }}>
          <Link href="/" className="text-white/35 hover:text-[#1F93A4] transition-colors">Home</Link>
          <span className="text-white/20">›</span>
          <span className="text-[#1F93A4]">About</span>
        </div>
      </div>

      {/* ── COMPANY STORY ───────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
              <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>Our Story</span>
            </div>
            <h2 className="text-[#213B4D] uppercase leading-tight mb-6" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>
              A Legacy of Building the World
            </h2>
            <div className="inline-flex items-center gap-4 bg-[#0d1e28] px-6 py-4 mb-8">
              <div>
                <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.3em] mb-0.5" style={{ fontFamily: B }}>Founded</div>
                <div className="text-white font-bold" style={{ fontFamily: H, fontSize: "32px", letterSpacing: "-0.01em" }}>Est. 2000</div>
              </div>
              <div className="w-[1px] h-10 bg-white/15" />
              <div>
                <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.3em] mb-0.5" style={{ fontFamily: B }}>Headquarters</div>
                <div className="text-white text-[15px] font-semibold" style={{ fontFamily: B }}>Abu Dhabi, UAE</div>
              </div>
            </div>
            <p className="text-[#5E5E5E] text-[17px] leading-relaxed mb-4" style={{ fontFamily: B }}>
              Actualizing design and shop drawings is our main critical mission — implemented based on past experiences and the vast knowledge of our engineers. Infra Construction is a contracting company that has carried out numerous and various projects since its establishment in 2000.
            </p>
            <p className="text-[#5E5E5E] text-[17px] leading-relaxed mb-4" style={{ fontFamily: B }}>
              Every task Infra Construction took up was executed through hard work and dedication from our team professionals. Possessing all the needed resources is a crucial factor in achieving any project successfully — however, the factor that delivers outstanding results is managing these resources optimally.
            </p>
            <p className="text-[#5E5E5E] text-[17px] leading-relaxed" style={{ fontFamily: B }}>
              Infra Construction represents the working arm providing professional services in the contracting niche — especially in the infrastructure field — executing according to international codes and project specifications across the UAE, Egypt, Yemen, and Canada.
            </p>
          </div>

          <div className="relative h-[500px] lg:h-full min-h-[420px] overflow-hidden">
            <Image
              src="/media/infrastructure-aden-causeway-widening-yemen.jpeg"
              alt="INFRA Construction project site"
              fill
              priority
              quality={100}
              unoptimized
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex flex-wrap gap-3">
                {keyData.slice(0, 3).map((d) => (
                  <div key={d.label} className="bg-[#0d1e28]/80 backdrop-blur-sm px-4 py-2.5">
                    <div className="text-[#1F93A4] text-[9px] font-bold uppercase tracking-[0.25em] mb-0.5" style={{ fontFamily: B }}>{d.label}</div>
                    <div className="text-white text-[12px] font-semibold" style={{ fontFamily: B }}>{d.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND QUOTE ─────────────────────────────────────────────── */}
      <section className="py-16 bg-[#213B4D] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 text-center">
          <p className="text-white uppercase leading-tight" style={{ fontFamily: H, fontSize: "clamp(22px, 3.5vw, 40px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            &ldquo;We Do Not Only Aim To Meet Your Expectation,
            <br />But To Exceed Them At Every Step.&rdquo;
          </p>
        </div>
      </section>

      {/* ── MISSION / VISION / PHILOSOPHY ───────────────────────────── */}
      <section className="py-24 bg-[#0d1e28] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-0 right-0 bottom-0 items-center hidden lg:flex"
          style={{ fontFamily: H, fontSize: "200px", fontWeight: 700, color: "#fff", opacity: 0.03, writingMode: "vertical-rl", lineHeight: 1, userSelect: "none" }}
        >
          INFRA
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
              <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>Our Foundation</span>
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
            </div>
            <h2 className="text-white uppercase leading-tight" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>
              Mission, Vision &amp; Philosophy
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-[1px] bg-white/5">
            <div className="lg:col-span-7 bg-[#0d1e28] p-12">
              <div className="text-[#1F93A4] mb-6">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 className="text-white uppercase mb-5" style={{ fontFamily: H, fontSize: "40px", fontWeight: 600 }}>Mission</h3>
              <p className="text-white/70 text-[17px] leading-relaxed" style={{ fontFamily: B }}>
                In order to meet our clients&apos; high expectations, our diverse and highly qualified staff apply their teamwork skills optimizing end results with high international standards. We are devoted to understanding every client&apos;s needs and continually developing the techniques and procedures of construction.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-[1px]">
              <div className="bg-[#152836] flex-1 p-9">
                <div className="text-[#1F93A4] mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-white uppercase mb-4" style={{ fontFamily: H, fontSize: "28px", fontWeight: 600 }}>Vision</h3>
                <p className="text-white/55 text-[16px] leading-relaxed" style={{ fontFamily: B }}>
                  With a focus on outstanding time, cost, and resources management, our company strives to assume a significant role in the construction of Mega projects across various domains. By adhering to the best practices in project and construction management, we consistently deliver exceptional results.
                </p>
              </div>
              <div className="bg-[#1a2f3d] flex-1 p-9">
                <div className="text-[#1F93A4] mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2 2 7l10 5 10-5-10-5Z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="text-white uppercase mb-4" style={{ fontFamily: H, fontSize: "28px", fontWeight: 600 }}>Philosophy</h3>
                <p className="text-white/55 text-[16px] leading-relaxed" style={{ fontFamily: B }}>
                  Infra Construction works to introduce excellent ways of management for a wide range of project types. All projects are managed to achieve the best goals of Scope, Time, Cost &amp; Quality — on time, within budget, and to the highest quality standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCOPE OF SERVICES ───────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-[#213B4D]/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[2px] bg-[#1F93A4]" />
                <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>What We Do</span>
              </div>
              <h2 className="text-[#213B4D] uppercase leading-tight" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>
                Scope of Services
              </h2>
            </div>
            <div className="flex flex-col items-end">
              <span className="leading-none" style={{ fontFamily: H, fontSize: "100px", color: "#1F93A4", opacity: 0.12, lineHeight: 1 }}>
                14
              </span>
              <span className="text-[#5E5E5E] text-[11px] uppercase tracking-widest" style={{ fontFamily: B }}>Disciplines</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#FFFFFF]/8">
            {services.map((s, i) => (
              <div key={s} className="bg-white p-7 group hover:bg-[#213B4D] transition-colors relative overflow-hidden">
                <span
                  aria-hidden="true"
                  className="absolute top-2 right-7 pointer-events-none select-none leading-none"
                  style={{ fontFamily: H, fontSize: "72px", fontWeight: 700, color: "#213B4D", opacity: 0.3, lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-6 h-[2px] bg-[#1F93A4] mb-4 group-hover:w-10 transition-all duration-300" />
                <p className="text-[#213B4D] font-bold text-[15px] group-hover:text-[#1F93A4] transition-colors relative" style={{ fontFamily: B }}>
                  {s}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUTURE GOALS ────────────────────────────────────────────── */}
      <section className="py-28 bg-[#213B4D] relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none hidden lg:block">
          <Image
            src="/media/about-.sectionjpg.jpg"
            alt=""
            fill
            priority
            quality={100}
            sizes="(min-width:1024px) 100vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#213B4D] via-[#213B4D]/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
              <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>Looking Ahead</span>
            </div>
            <h2 className="text-white uppercase leading-tight mb-6" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>
              Future Goals &amp; Partnerships
            </h2>
            <p className="text-white/50 text-[17px] leading-relaxed mb-10" style={{ fontFamily: B }}>
              INFRA Construction aims to build mutual interest with clients, developers, and project management units across the globe.
            </p>
            <div>
              {[
                "Private investors and developers worldwide",
                "Government authorities — ministries and local councils",
                "International funding agencies (World Bank, Arab Fund, Kuwait Fund)",
                "Long-term joint ventures with regional and international partners",
              ].map((goal, i) => (
                <div key={goal} className="flex items-start gap-6 border-b border-white/10 py-6">
                  <span className="text-[#1F93A4] font-bold text-[13px] shrink-0 pt-0.5" style={{ fontFamily: B }}>
                    0{i + 1}
                  </span>
                  <span className="text-white/65 text-[17px] leading-relaxed" style={{ fontFamily: B }}>{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MANAGEMENT SYSTEMS ──────────────────────────────────────── */}
      <section className="py-24 bg-[#0d1e28] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4]" />
            <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>Our Standards</span>
          </div>
          <h2 className="text-white uppercase leading-tight mb-14" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>
            Management Systems
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {mgmtSystems.map((sys) => (
              <div key={sys.code} className="bg-[#152836] border border-white/5 p-8 flex flex-col group hover:border-[#1F93A4]/30 transition-colors">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-[#1F93A4]">{sys.icon}</div>
                  <span
                    className="text-[#1F93A4]/30 font-bold text-[11px] uppercase tracking-[0.2em] border border-[#1F93A4]/20 px-2.5 py-1 group-hover:border-[#1F93A4]/50 group-hover:text-[#1F93A4]/60 transition-colors"
                    style={{ fontFamily: B }}
                  >
                    {sys.code}
                  </span>
                </div>
                <h3 className="text-white font-bold text-[16px] mb-4 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                  {sys.title}
                </h3>
                <p className="text-white/45 text-[13px] leading-relaxed mb-6 flex-1" style={{ fontFamily: B }}>
                  {sys.desc}
                </p>
                <div className="border-t border-white/8 pt-5 space-y-2.5">
                  {sys.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="text-[#1F93A4] text-[8px] mt-1 shrink-0">▸</span>
                      <span className="text-white/50 text-[12px]" style={{ fontFamily: B }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER & CEO (Featured Separately) ─────────────────────── */}
      <section className="py-24 bg-white border-t border-[#213B4D]/8 relative overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4]" />
            <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
              Founder &amp; Chief Executive
            </span>
          </div>
          

          <div className="grid lg:grid-cols-12 gap-0 bg-[#0d1e28]">
            <div className="lg:col-span-5 relative bg-[#0d1e28] min-h-[460px] lg:min-h-[600px] overflow-hidden">
              <Image
                src={ceo.image}
                alt={`${ceo.name} — ${ceo.role}`}
                fill
                quality={100}
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28] via-transparent to-transparent" />
              <div className="absolute top-6 left-6 bg-[#1F93A4] px-4 py-2">
                <div className="text-white text-[9px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: B }}>Since</div>
                <div className="text-white font-bold leading-none" style={{ fontFamily: H, fontSize: "28px" }}>2000</div>
              </div>
            </div>

            <div className="lg:col-span-7 p-10 lg:p-16 flex flex-col justify-center relative">
              <span
                aria-hidden="true"
                className="absolute top-6 right-10 leading-none select-none pointer-events-none"
                style={{ fontFamily: H, fontSize: "160px", color: "#1F93A4", opacity: 0.15, lineHeight: 1 }}
              >
                ”
              </span>

              <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.35em] mb-3" style={{ fontFamily: B }}>
                Chief Executive Officer
              </div>
              <h3 className="text-white uppercase leading-[0.95] mb-2" style={{ fontFamily: H, fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
                {ceo.name}
              </h3>
              <div className="w-12 h-[2px] bg-[#1F93A4] mb-7 mt-4" />

              <p className="text-white/75 text-[17px] leading-relaxed mb-5" style={{ fontFamily: B }}>
                As Founder and Chief Executive Officer of INFRA Construction, Mr. Hany El-Sahooly has led the company since its establishment in 2000 — shaping it into a trusted name in buildings, infrastructure, and industrial construction across the Middle East, Africa, and North America.
              </p>
              <p className="text-white/55 text-[15px] leading-relaxed mb-8" style={{ fontFamily: B }}>
                His vision drives every project we deliver — built on integrity, engineering excellence, and a commitment to exceeding client expectations at every step.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div>
                  <div className="text-white font-bold leading-none mb-1" style={{ fontFamily: H, fontSize: "34px" }}>25+</div>
                  <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: B }}>Years of Leadership</div>
                </div>
                <div>
                  <div className="text-white font-bold leading-none mb-1" style={{ fontFamily: H, fontSize: "34px" }}>5</div>
                  <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: B }}>Global Offices</div>
                </div>
                <div>
                  <div className="text-white font-bold leading-none mb-1" style={{ fontFamily: H, fontSize: "34px" }}>1,000+</div>
                  <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: B }}>Workforce</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SENIOR LEADERSHIP (Excluding CEO) ───────────────────────── */}
      <section className="py-24 bg-[#f4f6f8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4]" />
            <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>Executive Team</span>
          </div>
          <h2 className="text-[#213B4D] uppercase leading-tight mb-4" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>
            Senior Leadership
          </h2>
          <p className="text-[#5E5E5E] text-[17px] max-w-2xl mb-12" style={{ fontFamily: B }}>
            Working alongside our CEO, this team brings decades of combined expertise across construction, engineering, finance, and business development to every project we undertake.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white">
            {leadership.map((l, i) => (
              <div key={l.role} className="bg-white group hover:bg-white transition-colors relative overflow-hidden flex flex-col">
                <div className="relative w-full bg-[#0d1e28] overflow-hidden" style={{ height: "320px" }}>
                  <Image
                    src={l.image}
                    alt={l.name}
                    fill
                    quality={100}
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-contain object-center group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0d1e28]/40 to-transparent" />
                </div>

                <div className="p-7 relative flex-1 flex flex-col">
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-5 pointer-events-none select-none leading-none"
                    style={{ fontFamily: H, fontSize: "56px", fontWeight: 700, color: "#1F93A4", opacity: 0.12, lineHeight: 1 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-8 h-[2px] bg-[#1F93A4] mb-4 group-hover:w-12 transition-all duration-300" />
                  <div className="text-[#213B4D] font-bold text-[16px] mb-1 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: H, letterSpacing: "0.01em" }}>
                    {l.name}
                  </div>
                  <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.25em] mb-3" style={{ fontFamily: B }}>
                    {l.role}
                  </div>
                  <p className="text-[#5E5E5E] text-[12px] leading-relaxed" style={{ fontFamily: B }}>
                    {l.scope}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORGANIZATIONAL STRUCTURE ─────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4]" />
            <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>How We Work</span>
          </div>
          <h2 className="text-[#213B4D] uppercase leading-tight mb-4" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>
            Organizational Structure
          </h2>
          <p className="text-[#5E5E5E] text-[17px] max-w-2xl mb-10" style={{ fontFamily: B }}>
            Adaptable and expandable, our structure maintains horizontal relationships across all departments while growing to meet market demand.
          </p>

          <div className="relative w-full overflow-hidden rounded-sm mb-12 border border-[#213B4D]/10">
            <Image
              src="/media/company-org-structure-header.png"
              alt="INFRA Construction Organizational Structure"
              width={898}
              height={462}
              quality={100}
              sizes="100vw"
              className="w-full h-auto object-contain bg-white"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-[1px] bg-[#213B4D]/10 border border-[#213B4D]/10">
            {departments.map((d) => (
              <div key={d.title} className="bg-white p-6">
                <h4 className="text-[#213B4D] font-bold text-[12px] uppercase tracking-wide mb-4 pb-3 border-b border-[#1F93A4]/30" style={{ fontFamily: B }}>{d.title}</h4>
                <ul className="space-y-2">
                  {d.items.map((item) => (
                    <li key={item} className="text-[#5E5E5E] text-[12px] flex items-center gap-2" style={{ fontFamily: B }}>
                      <span className="text-[#1F93A4] text-[8px]">◆</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL OFFICES ───────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d1e28]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-5">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[2px] bg-[#1F93A4]" />
                <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>Where We Are</span>
              </div>
              <h2 className="text-white uppercase leading-tight" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>
                Our Global Offices
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/0">
            {offices.map((o) => (
              <div key={o.city} className="bg-[#0d1e28] p-8 hover:bg-[#1a3040] transition-colors group">
                <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.3em] mb-2" style={{ fontFamily: B }}>{o.country}</div>
                <div className="text-white font-bold mb-2 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: H, fontSize: "26px" }}>{o.city}</div>
                <div className="text-white/35 text-[12px] leading-relaxed" style={{ fontFamily: B }}>{o.address}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ────────────────────────────────────────────────────── */}
      <section className="bg-[#f4f6f8]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[480px]">
          <div className="relative h-72 lg:h-auto overflow-hidden img-zoom">
            <Image
              src="/media/industrial-floating-marine-pier-yemen.jpeg"
              alt="Our team"
              fill
              priority
              quality={100}
              unoptimized
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#213B4D]/25" />
          </div>
          <div className="px-10 lg:px-16 py-16 lg:py-20 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
              <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>Our People</span>
            </div>
            <h2 className="text-[#213B4D] uppercase leading-tight mb-5" style={{ fontFamily: H, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600 }}>
              Dedicated Professionals
            </h2>
            <p className="text-[#5E5E5E] text-[17px] leading-relaxed mb-6" style={{ fontFamily: B }}>
              Infra Construction believes that human resources are the most valuable stimulus for economic development. Our hiring policy embraces employees who combine both creativity and technical mastery of their tools.
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-0 border-t border-[#213B4D]/10 mb-8">
              {["Engineers", "Technicians", "Inspectors", "Quantity Surveyors", "Project Managers", "Consultants"].map((role) => (
                <div key={role} className="flex items-center gap-2.5 py-2.5 border-b border-[#213B4D]/8 text-[13px] text-[#5E5E5E]" style={{ fontFamily: B }}>
                  <span className="text-[#1F93A4] text-[10px]">▸</span>{role}
                </div>
              ))}
            </div>

            <Link
              href="/careers"
              className="inline-flex items-center gap-3 text-[#213B4D] font-bold text-[13px] uppercase tracking-widest hover:text-[#1F93A4] transition-colors group"
              style={{ fontFamily: B }}
            >
              Join Our Team <span className="group-hover:translate-x-1.5 transition-transform inline-block">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-[#1F93A4] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-14 text-center">
          <p className="text-white/50 text-[11px] font-bold uppercase tracking-[0.45em] mb-5" style={{ fontFamily: B }}>Start Your Project</p>
          <h2 className="text-white uppercase leading-[0.92] mb-6" style={{ fontFamily: H, fontSize: "clamp(44px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            LET&apos;S BUILD<br />TOGETHER
          </h2>
          <p className="text-white/65 text-[17px] mb-10 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: B }}>
            Connect with our team to discuss your next infrastructure, building, or industrial project.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-[#213B4D] font-bold px-10 py-4 text-[13px] uppercase tracking-widest hover:bg-[#213B4D] hover:text-white transition-all duration-300" style={{ fontFamily: B }}>
            Contact Us <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
