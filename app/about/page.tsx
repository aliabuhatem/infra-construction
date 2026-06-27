import Image from "next/image";
import Link from "next/link";
import ContentText from "@/components/admin-panel/ContentText";
import MediaImage from "@/components/admin-panel/MediaImage";

const H = "var(--font-barlow-condensed), Arial Narrow, sans-serif";
const B = "var(--font-source-sans), Arial, sans-serif";

const keyData = [
  { label: "Legal Status",      value: "Limited Liability Company",              section: "about_keydata_1" },
  { label: "Line of Business",  value: "Buildings & Infrastructure",             section: "about_keydata_2" },
  { label: "Capital",           value: "2 Million AED",                          section: "about_keydata_3" },
  { label: "Established",       value: "Year 2000",                              section: "about_keydata_4" },
  { label: "Head Office",       value: "Abu Dhabi, UAE",                         section: "about_keydata_5" },
  { label: "Int'l Clients",     value: "37+ Regional & International",           section: "about_keydata_6" },
  { label: "Core Employees",    value: "175+ Permanent Staff",                   section: "about_keydata_7" },
  { label: "Project Workforce", value: "1,000+ On-Site Workforce",              section: "about_keydata_8" },
  { label: "Certifications",    value: "ISO 9001 · ISO 14001 · OHSAS 18001",    section: "about_keydata_9" },
];

const offices = [
  { city: "Abu Dhabi", country: "UAE",    address: "Office 606, EREC Building, Zone 1, Al Danah",                            section: "about_office_1" },
  { city: "Dubai",     country: "UAE",    address: "Office 306, Bld 121, Al Manar Area",                                     section: "about_office_2" },
  { city: "Cairo",     country: "Egypt",  address: "Ground Floor, Villa 224C, Khaled Ibn Alwaleed St., 5th Settlement",     section: "about_office_3" },
  { city: "Aden",      country: "Yemen",  address: "Bldg. 1, Bader Roundabout, Khormaksar, P.O. Box 70116",                section: "about_office_4" },
  { city: "Ontario",   country: "Canada", address: "3280 Donald Mackay St, Oakville, L6M 5K2",                              section: "about_office_5" },
];

const services = [
  "Construction Services", "Infrastructure Projects", "Quantity Surveying",
  "Project Management", "Construction Supervision", "Procurement Management",
  "Risk Assessment & Management", "Value Engineering", "Claims Management",
  "Contract Administration", "Scope, Cost & Schedule Management",
  "Quality Assurance Management", "Detailed Engineering", "Operation & Maintenance",
];

const departments = [
  { title: "Administration",    items: ["Public Relations", "Human Resources", "Logistics", "Communication"],               section: "about_dept_1" },
  { title: "Financial",         items: ["Accounting", "Auditing", "Banking", "Budget", "Supply Chain"],                    section: "about_dept_2" },
  { title: "Business Dev.",     items: ["Business Development", "Bidding", "Planning"],                                     section: "about_dept_3" },
  { title: "Technical",         items: ["Buildings Section", "Infrastructure", "Construction Mgmt", "Document Control"],   section: "about_dept_4" },
  { title: "Legal & Contracts", items: ["Legal", "Contract", "Quantity Surveying"],                                        section: "about_dept_5" },
];

const leadership = [
  { role: "Chief Human Resources Officer", name: "Khaled Alariqee",   scope: "Strategic direction, corporate governance, and stakeholder relations across all global offices.",    image: "/media/KHALED ALARIQEE.png",           section: "about_leadership_2" },
  { role: "Central Business District",     name: "Adnan Gazaz",       scope: "Oversight of project delivery, resource allocation, and on-ground execution across all active sites.", image: "/media/Mr. Adnan Gazaz photo.png",     section: "about_leadership_3" },
  { role: "Chief Operating Officer",       name: "Osama Abo Ghanem",  scope: "Engineering standards, design review, quality assurance, and technical compliance.",                 image: "/media/OSAMA ABO GHANEM.png",          section: "about_leadership_4" },
  { role: "Chief Technology Officer",      name: "Nedal Mustafa",     scope: "Technology strategy, digital transformation, and innovation across all project operations.",          image: "/media/Nedal.png",                     section: "about_leadership_5" },
  { role: "Chief Commercial Officer",      name: "Mustafa Al Awlaqi", scope: "Market expansion, client acquisition, bidding strategy, and international partnership development.", image: "/media/Mr. Khaled Alariqee photo.png", section: "about_leadership_1" },
];

const mgmtSystems = [
  {
    code: "ISO 9001", section: "about_mgmtsys_1",
    title: "Quality Assurance & Control",
    desc: "INFRA is a premier provider of comprehensive QA/QC solutions — empowering clients to achieve and maintain the highest standards of quality.",
    items: ["ISO 9001:2015 — Quality Management", "Stringent inspection & testing protocols", "Statistical Process Control (SPC)", "Defect analysis & corrective action", "Continual improvement of management systems"],
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
  },
  {
    code: "ISO 14001", section: "about_mgmtsys_2",
    title: "Sustainability",
    desc: "INFRA supports the ten Principles of the UN Global Compact with respect to human rights, labour, environment, and anti-corruption.",
    items: ["UN Global Compact — 10 Principles", "Paris Climate Change Agreement", "United Nations 17 SDGs alignment", "Sustainable procurement practices", "Carbon footprint reduction initiatives"],
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M17 18h1" /><path d="M12 18h1" /><path d="M7 18h1" /></svg>,
  },
  {
    code: "OHSAS 18001", section: "about_mgmtsys_3",
    title: "Health, Safety & Environment",
    desc: "Our commitment to occupational health and safety ensures a safe working environment — we are committed to the target of 'zero harm.'",
    items: ["'Zero harm' HSE commitment", "Safe working environment management", "Environmental impact reduction", "ESHS — holistic approach to sustainability", "Regulatory & statutory compliance"],
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12.5l3 3 8-8" /><circle cx="12" cy="12" r="10" /></svg>,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[540px] flex items-end overflow-hidden">
        <Image src="/media/Abyan Coast Cornich-01.jpeg" alt="About INFRA Construction" fill className="object-cover object-center" priority quality={100} sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/100 via-[#213B4D]/60 to-[#213B4D]/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pb-16 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4]" />
            <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
              <ContentText section="about_hero" name="eyebrow" fallback="Who We Are" />
            </span>
          </div>
          <h1 className="text-white uppercase leading-[0.92] mb-5" style={{ fontFamily: H, fontSize: "clamp(44px, 6.5vw, 82px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            <ContentText section="about_hero" name="headlineLine1" fallback="About INFRA" /><br />
            <ContentText section="about_hero" name="headlineLine2" fallback="Construction" />
          </h1>
          <p className="text-white/55 text-[17px] max-w-md leading-relaxed" style={{ fontFamily: B }}>
            <ContentText section="about_hero" name="subtitle" fallback="25 years of engineering excellence across the Middle East, Africa, and beyond." />
          </p>
        </div>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────────────────── */}
      <div className="bg-[#0d1e28] border-b border-white/5">
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
              <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="about_story_full" name="eyebrow" fallback="Our Story" />
              </span>
            </div>
            <h2 className="text-[#213B4D] uppercase leading-tight mb-6" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>
              <ContentText section="about_story_full" name="title" fallback="A Legacy of Building the World" />
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
              <ContentText section="about_story_full" name="p1" fallback="Actualizing design and shop drawings is our main critical mission — implemented based on past experiences and the vast knowledge of our engineers." />
            </p>
            <p className="text-[#5E5E5E] text-[17px] leading-relaxed mb-4" style={{ fontFamily: B }}>
              <ContentText section="about_story_full" name="p2" fallback="Every task Infra Construction took up was executed through hard work and dedication from our team professionals." />
            </p>
            <p className="text-[#5E5E5E] text-[17px] leading-relaxed" style={{ fontFamily: B }}>
              <ContentText section="about_story_full" name="p3" fallback="Infra Construction represents the working arm providing professional services in the contracting niche." />
            </p>
          </div>

          <div className="relative h-[500px] lg:h-full min-h-[420px] overflow-hidden">
            <Image src="/media/infrastructure-aden-causeway-widening-yemen.jpeg" alt="INFRA Construction project site" fill priority quality={100} unoptimized sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex flex-wrap gap-3">
                {keyData.slice(0, 3).map((d) => (
                  <div key={d.label} className="bg-[#0d1e28]/80 backdrop-blur-sm px-4 py-2.5">
                    <div className="text-[#1F93A4] text-[9px] font-bold uppercase tracking-[0.25em] mb-0.5" style={{ fontFamily: B }}>
                      <ContentText section={d.section} name="label" fallback={d.label} />
                    </div>
                    <div className="text-white text-[12px] font-semibold" style={{ fontFamily: B }}>
                      <ContentText section={d.section} name="value" fallback={d.value} />
                    </div>
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
            &ldquo;<ContentText section="about_quote" name="text" fallback="We Do Not Only Aim To Meet Your Expectation, But To Exceed Them At Every Step." />&rdquo;
          </p>
        </div>
      </section>

      {/* ── MISSION / VISION / PHILOSOPHY ───────────────────────────── */}
      <section className="py-24 bg-[#0d1e28] relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none select-none absolute top-0 right-0 bottom-0 items-center hidden lg:flex" style={{ fontFamily: H, fontSize: "200px", fontWeight: 700, color: "#fff", opacity: 0.03, writingMode: "vertical-rl", lineHeight: 1, userSelect: "none" }}>
          INFRA
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
              <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="about_mvp" name="eyebrow" fallback="Our Foundation" />
              </span>
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
            </div>
            <h2 className="text-white uppercase leading-tight" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>
              <ContentText section="about_mvp" name="title" fallback="Mission, Vision & Philosophy" />
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-[1px] bg-white/5">
            <div className="lg:col-span-7 bg-[#0d1e28] p-12">
              <div className="text-[#1F93A4] mb-6">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
              </div>
              <h3 className="text-white uppercase mb-5" style={{ fontFamily: H, fontSize: "40px", fontWeight: 600 }}>
                <ContentText section="about_mvp" name="missionLabel" fallback="Mission" />
              </h3>
              <p className="text-white/70 text-[17px] leading-relaxed" style={{ fontFamily: B }}>
                <ContentText section="about_mvp" name="missionText" fallback="In order to meet our clients' high expectations, our diverse and highly qualified staff apply their teamwork skills optimizing end results with high international standards." />
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-[1px]">
              <div className="bg-[#152836] flex-1 p-9">
                <div className="text-[#1F93A4] mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                </div>
                <h3 className="text-white uppercase mb-4" style={{ fontFamily: H, fontSize: "28px", fontWeight: 600 }}>
                  <ContentText section="about_mvp" name="visionLabel" fallback="Vision" />
                </h3>
                <p className="text-white/55 text-[16px] leading-relaxed" style={{ fontFamily: B }}>
                  <ContentText section="about_mvp" name="visionText" fallback="With a focus on outstanding time, cost, and resources management, our company strives to assume a significant role in the construction of Mega projects across various domains." />
                </p>
              </div>
              <div className="bg-[#1a2f3d] flex-1 p-9">
                <div className="text-[#1F93A4] mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                </div>
                <h3 className="text-white uppercase mb-4" style={{ fontFamily: H, fontSize: "28px", fontWeight: 600 }}>
                  <ContentText section="about_mvp" name="philosophyLabel" fallback="Philosophy" />
                </h3>
                <p className="text-white/55 text-[16px] leading-relaxed" style={{ fontFamily: B }}>
                  <ContentText section="about_mvp" name="philosophyText" fallback="Infra Construction works to introduce excellent ways of management for a wide range of project types. All projects are managed to achieve the best goals of Scope, Time, Cost & Quality." />
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
                <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                  <ContentText section="about_scope_header" name="eyebrow" fallback="What We Do" />
                </span>
              </div>
              <h2 className="text-[#213B4D] uppercase leading-tight" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>
                <ContentText section="about_scope_header" name="title" fallback="Scope of Services" />
              </h2>
            </div>
            <div className="flex flex-col items-end">
              <span className="leading-none" style={{ fontFamily: H, fontSize: "100px", color: "#1F93A4", opacity: 0.12, lineHeight: 1 }}>14</span>
              <span className="text-[#5E5E5E] text-[11px] uppercase tracking-widest" style={{ fontFamily: B }}>Disciplines</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#FFFFFF]/8">
            {services.map((s, i) => (
              <div key={i} className="bg-white p-7 group hover:bg-[#213B4D] transition-colors relative overflow-hidden">
                <span aria-hidden="true" className="absolute top-2 right-7 pointer-events-none select-none leading-none" style={{ fontFamily: H, fontSize: "72px", fontWeight: 700, color: "#213B4D", opacity: 0.3, lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-6 h-[2px] bg-[#1F93A4] mb-4 group-hover:w-10 transition-all duration-300" />
                <p className="text-[#213B4D] font-bold text-[15px] group-hover:text-[#1F93A4] transition-colors relative" style={{ fontFamily: B }}>
                  <ContentText section={`about_service_${i + 1}`} name="title" fallback={s} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUTURE GOALS ────────────────────────────────────────────── */}
      <section className="py-28 bg-[#213B4D] relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none hidden lg:block">
          <Image src="/media/about-.sectionjpg.jpg" alt="" fill priority quality={100} sizes="(min-width:1024px) 100vw, 100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#213B4D] via-[#213B4D]/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
              <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="about_future_goals" name="eyebrow" fallback="Looking Ahead" />
              </span>
            </div>
            <h2 className="text-white uppercase leading-tight mb-6" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>
              <ContentText section="about_future_goals" name="title" fallback="Future Goals & Partnerships" />
            </h2>
            <p className="text-white/50 text-[17px] leading-relaxed mb-10" style={{ fontFamily: B }}>
              <ContentText section="about_future_goals" name="p1" fallback="INFRA Construction aims to build mutual interest with clients, developers, and project management units across the globe." />
            </p>
            <div>
              {(["goal_1","goal_2","goal_3","goal_4"] as const).map((key, i) => {
                const defaults = [
                  "Private investors and developers worldwide",
                  "Government authorities — ministries and local councils",
                  "International funding agencies (World Bank, Arab Fund, Kuwait Fund)",
                  "Long-term joint ventures with regional and international partners",
                ];
                return (
                  <div key={key} className="flex items-start gap-6 border-b border-white/10 py-6">
                    <span className="text-[#1F93A4] font-bold text-[13px] shrink-0 pt-0.5" style={{ fontFamily: B }}>0{i + 1}</span>
                    <span className="text-white/65 text-[17px] leading-relaxed" style={{ fontFamily: B }}>
                      <ContentText section="about_future_goals" name={key} fallback={defaults[i]} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── MANAGEMENT SYSTEMS ──────────────────────────────────────── */}
      <section className="py-24 bg-[#0d1e28] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4]" />
            <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>Our Standards</span>
          </div>
          <h2 className="text-white uppercase leading-tight mb-14" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>Management Systems</h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {mgmtSystems.map((sys) => (
              <div key={sys.code} className="bg-[#152836] border border-white/5 p-8 flex flex-col group hover:border-[#1F93A4]/30 transition-colors">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-[#1F93A4]">{sys.icon}</div>
                  <span className="text-[#1F93A4]/30 font-bold text-[11px] uppercase tracking-[0.2em] border border-[#1F93A4]/20 px-2.5 py-1 group-hover:border-[#1F93A4]/50 group-hover:text-[#1F93A4]/60 transition-colors" style={{ fontFamily: B }}>
                    <ContentText section={sys.section} name="code" fallback={sys.code} />
                  </span>
                </div>
                <h3 className="text-white font-bold text-[16px] mb-4 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                  <ContentText section={sys.section} name="title" fallback={sys.title} />
                </h3>
                <p className="text-white/45 text-[13px] leading-relaxed mb-6 flex-1" style={{ fontFamily: B }}>
                  <ContentText section={sys.section} name="desc" fallback={sys.desc} />
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

      {/* ── FOUNDER & CEO ────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-[#213B4D]/8 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4]" />
            <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
              <ContentText section="about_ceo" name="eyebrow" fallback="Founder & Chief Executive" />
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-0 bg-[#0d1e28]">
            <div className="lg:col-span-5 relative bg-[#0d1e28] min-h-[460px] lg:min-h-[600px] overflow-hidden">
              <MediaImage
                category="about_leadership_founder"
                title="about_leadership_founder_image"
                fallbackSrc="/media/FOUNDER OF HS GROUP - Mr. Hani Sahooly photo.png"
                alt="Mr. Hany El-Sahooly — Founder & CEO"
                className="object-cover object-top w-full h-full absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28] via-transparent to-transparent" />
              <div className="absolute top-6 left-6 bg-[#1F93A4] px-4 py-2">
                <div className="text-white text-[9px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: B }}>Since</div>
                <div className="text-white font-bold leading-none" style={{ fontFamily: H, fontSize: "28px" }}>2000</div>
              </div>
            </div>

            <div className="lg:col-span-7 p-10 lg:p-16 flex flex-col justify-center relative">
              <span aria-hidden="true" className="absolute top-6 right-10 leading-none select-none pointer-events-none" style={{ fontFamily: H, fontSize: "160px", color: "#1F93A4", opacity: 0.15, lineHeight: 1 }}>&ldquo;</span>
              <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.35em] mb-3" style={{ fontFamily: B }}>
                <ContentText section="about_leadership_founder" name="title" fallback="Founder & Chief Executive Officer" />
              </div>
              <h3 className="text-white uppercase leading-[0.95] mb-2" style={{ fontFamily: H, fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
                <ContentText section="about_leadership_founder" name="name" fallback="Mr. Hany El-Sahooly" />
              </h3>
              <div className="w-12 h-[2px] bg-[#1F93A4] mb-7 mt-4" />
              <p className="text-white/75 text-[17px] leading-relaxed mb-5" style={{ fontFamily: B }}>
                <ContentText section="about_leadership_founder" name="bio" fallback="As Founder and Chief Executive Officer of INFRA Construction, Mr. Hany El-Sahooly has led the company since its establishment in 2000." />
              </p>
              <p className="text-white/55 text-[15px] leading-relaxed mb-8" style={{ fontFamily: B }}>
                <ContentText section="about_leadership_founder" name="bio2" fallback="His vision drives every project we deliver — built on integrity, engineering excellence, and a commitment to exceeding client expectations at every step." />
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div>
                  <div className="text-white font-bold leading-none mb-1" style={{ fontFamily: H, fontSize: "34px" }}>
                    <ContentText section="about_ceo_bio" name="stat1Value" fallback="25+" />
                  </div>
                  <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: B }}>
                    <ContentText section="about_ceo_bio" name="stat1Label" fallback="Years of Leadership" />
                  </div>
                </div>
                <div>
                  <div className="text-white font-bold leading-none mb-1" style={{ fontFamily: H, fontSize: "34px" }}>
                    <ContentText section="about_ceo_bio" name="stat2Value" fallback="5" />
                  </div>
                  <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: B }}>
                    <ContentText section="about_ceo_bio" name="stat2Label" fallback="Global Offices" />
                  </div>
                </div>
                <div>
                  <div className="text-white font-bold leading-none mb-1" style={{ fontFamily: H, fontSize: "34px" }}>
                    <ContentText section="about_ceo_bio" name="stat3Value" fallback="1,000+" />
                  </div>
                  <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: B }}>
                    <ContentText section="about_ceo_bio" name="stat3Label" fallback="Workforce" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SENIOR LEADERSHIP ───────────────────────────────────────── */}
      <section className="py-24 bg-[#f4f6f8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4]" />
            <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>Executive Team</span>
          </div>
          <h2 className="text-[#213B4D] uppercase leading-tight mb-4" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>Senior Leadership</h2>
          <p className="text-[#5E5E5E] text-[17px] max-w-2xl mb-12" style={{ fontFamily: B }}>
            Working alongside our CEO, this team brings decades of combined expertise across construction, engineering, finance, and business development to every project we undertake.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white">
            {leadership.map((l, i) => (
              <div key={i} className="bg-white group hover:bg-white transition-colors relative overflow-hidden flex flex-col">
                <div className="relative w-full bg-[#0d1e28] overflow-hidden" style={{ height: "320px" }}>
                  <MediaImage
                    category={l.section}
                    title={`${l.section}_image`}
                    fallbackSrc={l.image}
                    alt={l.name}
                    className="object-contain object-center w-full h-full"
                  />
                </div>
                <div className="p-7 relative flex-1 flex flex-col">
                  <span aria-hidden="true" className="absolute top-4 right-5 pointer-events-none select-none leading-none" style={{ fontFamily: H, fontSize: "56px", fontWeight: 700, color: "#1F93A4", opacity: 0.12, lineHeight: 1 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-8 h-[2px] bg-[#1F93A4] mb-4 group-hover:w-12 transition-all duration-300" />
                  <div className="text-[#213B4D] font-bold text-[16px] mb-1 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: H, letterSpacing: "0.01em" }}>
                    <ContentText section={l.section} name="name" fallback={l.name} />
                  </div>
                  <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.25em] mb-3" style={{ fontFamily: B }}>
                    <ContentText section={l.section} name="title" fallback={l.role} />
                  </div>
                  <p className="text-[#5E5E5E] text-[12px] leading-relaxed" style={{ fontFamily: B }}>
                    <ContentText section={l.section} name="bio" fallback={l.scope} />
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
            <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
              <ContentText section="about_org_full" name="eyebrow" fallback="How We Work" />
            </span>
          </div>
          <h2 className="text-[#213B4D] uppercase leading-tight mb-4" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>
            <ContentText section="about_org_structure" name="title" fallback="Organizational Structure" />
          </h2>
          <p className="text-[#5E5E5E] text-[17px] max-w-2xl mb-10" style={{ fontFamily: B }}>
            <ContentText section="about_org_structure" name="description" fallback="Adaptable and expandable, our structure maintains horizontal relationships across all departments while growing to meet market demand." />
          </p>

          <div className="relative w-full overflow-hidden rounded-sm mb-12 border border-[#213B4D]/10">
            <MediaImage
              category="about_org_structure"
              title="about_org_structure_image"
              fallbackSrc="/media/company-org-structure-header.png"
              alt="INFRA Construction Organizational Structure"
              className="w-full h-auto object-contain bg-white"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-[1px] bg-[#213B4D]/10 border border-[#213B4D]/10">
            {departments.map((d) => (
              <div key={d.section} className="bg-white p-6">
                <h4 className="text-[#213B4D] font-bold text-[12px] uppercase tracking-wide mb-4 pb-3 border-b border-[#1F93A4]/30" style={{ fontFamily: B }}>
                  <ContentText section={d.section} name="title" fallback={d.title} />
                </h4>
                <ul className="space-y-2">
                  {d.items.map((item, j) => (
                    <li key={j} className="text-[#5E5E5E] text-[12px] flex items-center gap-2" style={{ fontFamily: B }}>
                      <span className="text-[#1F93A4] text-[8px]">◆</span>
                      {item}
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
              <h2 className="text-white uppercase leading-tight" style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600 }}>Our Global Offices</h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/0">
            {offices.map((o) => (
              <div key={o.section} className="bg-[#0d1e28] p-8 hover:bg-[#1a3040] transition-colors group">
                <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.3em] mb-2" style={{ fontFamily: B }}>
                  <ContentText section={o.section} name="country" fallback={o.country} />
                </div>
                <div className="text-white font-bold mb-2 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: H, fontSize: "26px" }}>
                  <ContentText section={o.section} name="city" fallback={o.city} />
                </div>
                <div className="text-white/35 text-[12px] leading-relaxed" style={{ fontFamily: B }}>
                  <ContentText section={o.section} name="address" fallback={o.address} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ────────────────────────────────────────────────────── */}
      <section className="bg-[#f4f6f8]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[480px]">
          <div className="relative h-72 lg:h-auto overflow-hidden img-zoom">
            <Image src="/media/industrial-floating-marine-pier-yemen.jpeg" alt="Our team" fill priority quality={100} unoptimized sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-[#213B4D]/25" />
          </div>
          <div className="px-10 lg:px-16 py-16 lg:py-20 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
              <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="about_team_roles" name="eyebrow" fallback="Our People" />
              </span>
            </div>
            <h2 className="text-[#213B4D] uppercase leading-tight mb-5" style={{ fontFamily: H, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600 }}>
              <ContentText section="about_team_roles" name="title" fallback="Dedicated Professionals" />
            </h2>
            <p className="text-[#5E5E5E] text-[17px] leading-relaxed mb-6" style={{ fontFamily: B }}>
              <ContentText section="about_team_roles" name="p1" fallback="Infra Construction believes that human resources are the most valuable stimulus for economic development." />
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-0 border-t border-[#213B4D]/10 mb-8">
              {["Engineers", "Technicians", "Inspectors", "Quantity Surveyors", "Project Managers", "Consultants"].map((role, i) => (
                <div key={i} className="flex items-center gap-2.5 py-2.5 border-b border-[#213B4D]/8 text-[13px] text-[#5E5E5E]" style={{ fontFamily: B }}>
                  <span className="text-[#1F93A4] text-[10px]">▸</span>
                  <ContentText section="about_team_roles" name={`role_${i + 1}`} fallback={role} />
                </div>
              ))}
            </div>

            <Link href="/careers" className="inline-flex items-center gap-3 text-[#213B4D] font-bold text-[13px] uppercase tracking-widest hover:text-[#1F93A4] transition-colors group" style={{ fontFamily: B }}>
              Join Our Team <span className="group-hover:translate-x-1.5 transition-transform inline-block">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-[#1F93A4] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-14 text-center">
          <p className="text-white/50 text-[11px] font-bold uppercase tracking-[0.45em] mb-5" style={{ fontFamily: B }}>
            <ContentText section="about_cta" name="eyebrow" fallback="Start Your Project" />
          </p>
          <h2 className="text-white uppercase leading-[0.92] mb-6" style={{ fontFamily: H, fontSize: "clamp(44px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}>
            <ContentText section="about_cta" name="title" fallback="LET'S BUILD TOGETHER" />
          </h2>
          <p className="text-white/65 text-[17px] mb-10 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: B }}>
            <ContentText section="about_cta" name="body" fallback="Connect with our team to discuss your next infrastructure, building, or industrial project." />
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-[#213B4D] font-bold px-10 py-4 text-[13px] uppercase tracking-widest hover:bg-[#213B4D] hover:text-white transition-all duration-300" style={{ fontFamily: B }}>
            <ContentText section="about_cta" name="buttonText" fallback="Contact Us" /> <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
