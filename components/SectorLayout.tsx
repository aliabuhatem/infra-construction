import Image from "next/image";
import Link from "next/link";
import ContentText from "@/components/admin-panel/ContentText";

/* ── Types ─────────────────────────────────────────────────────────────── */

interface ServiceGroup { title: string; description?: string; items: string[] }
interface ProcessStep  { num: string; title: string; body: string }
interface Feature      { title: string; body: string }
interface FAQ          { q: string; a: string }

interface SectorLayoutProps {
  sectionKey?: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription?: string;
  heroImage: string;
  intro: string[];
  serviceGroups: ServiceGroup[];
  features: Feature[];
  process: ProcessStep[];
  whyUs: Feature[];
  industries: string[];
  faqs: FAQ[];
  ctaTitle: string;
  ctaBody: string;
}

/* ── Shared style helpers ──────────────────────────────────────────────── */

const H = "var(--font-barlow-condensed), Arial Narrow, sans-serif";
const B = "var(--font-source-sans), Arial, sans-serif";

/* ── Service card icons (cycling, engineering-themed SVG) ──────────────── */

const SERVICE_ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="9" x2="9" y2="21"/><line x1="13" y1="13" x2="17" y2="13"/><line x1="13" y1="17" x2="17" y2="17"/>
  </svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16v-2"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
  </svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 6l11-4 11 4M1 6l11 4M1 6v8l11 4M12 10v12M22 6l-10 4M22 6v8l-10 4"/>
  </svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>,
];

function Eyebrow({ text }: { text: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
      <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
        {text}
      </p>
    </div>
  );
}

function SectionHeading({ text, light = false, center = false }: { text: React.ReactNode; light?: boolean; center?: boolean }) {
  return (
    <h2
      className={`uppercase leading-tight ${light ? "text-white" : "text-[#213B4D]"} ${center ? "text-center" : ""}`}
      style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.01em" }}
    >
      {text}
    </h2>
  );
}

/* ── Component ─────────────────────────────────────────────────────────── */

export default function SectorLayout({
  sectionKey,
  eyebrow, heroTitle, heroSubtitle, heroDescription, heroImage,
  intro, serviceGroups, features, process, whyUs,
  industries, faqs, ctaTitle, ctaBody,
}: SectorLayoutProps) {
  const sk = sectionKey;

  const T = (section: string, name: string, fallback: string): React.ReactNode =>
    sk ? <ContentText section={section} name={name} fallback={fallback} /> : fallback;

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <Image
          src={heroImage}
          alt={heroTitle}
          fill
          className="object-cover object-center"
          priority
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/300 via-[#213B4D]/85 to-[#213B4D]/15" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pb-16 w-full">
          <Eyebrow text={T(sk || "", "eyebrow", eyebrow)} />
          <h1
            className="text-white uppercase leading-[0.92] mb-5"
            style={{ fontFamily: H, fontSize: "clamp(44px, 7.5vw, 90px)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            {T(sk || "", "heroTitle", heroTitle)}
          </h1>
          <p className="text-white/60 text-[15px] max-w-xl leading-relaxed" style={{ fontFamily: B }}>
            {T(sk || "", "heroSubtitle", heroSubtitle)}
          </p>
          {heroDescription && (
            <p className="text-white/40 text-[13px] max-w-lg leading-relaxed mt-3" style={{ fontFamily: B }}>
              {T(sk || "", "heroDescription", heroDescription)}
            </p>
          )}
        </div>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────────────────── */}
      <div className="bg-[#0d1e28] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-3 flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase" style={{ fontFamily: B }}>
          <Link href="/" className="text-white/35 hover:text-[#1F93A4] transition-colors">Home</Link>
          <span className="text-white/20">›</span>
          <Link href="/sectors" className="text-white/35 hover:text-[#1F93A4] transition-colors">Sectors</Link>
          <span className="text-white/20">›</span>
          <span className="text-[#1F93A4]">{heroTitle}</span>
        </div>
      </div>

      {/* ── INTRODUCTION ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-12 gap-14">
          {/* Intro text */}
          <div className="lg:col-span-7">
            <Eyebrow text="Overview" />
            <SectionHeading text="About This Service" />
            <div className="mt-6 space-y-4">
              {intro.map((para, i) => (
                <p key={i} className="text-[#5E5E5E] text-[15px] leading-relaxed" style={{ fontFamily: B }}>
                  {T(`${sk}_intro`, `p${i + 1}`, para)}
                </p>
              ))}
            </div>
          </div>

          {/* Key Features sidebar */}
          <div className="lg:col-span-5 bg-[#0d1e28] p-8 self-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-[2px] bg-[#1F93A4]" />
              <span className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                Key Features
              </span>
            </div>
            <ul className="space-y-5">
              {features.map((f, i) => (
                <li key={i} className="border-b border-white/8 pb-5 last:border-0 last:pb-0 flex gap-4">
                  <span className="text-[#1F93A4] text-[13px] font-bold shrink-0 mt-0.5" style={{ fontFamily: H }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="text-white text-[13px] font-bold mb-1" style={{ fontFamily: B }}>
                      {T(`${sk}_feature_${i + 1}`, "title", f.title)}
                    </div>
                    <div className="text-white/45 text-[12px] leading-relaxed" style={{ fontFamily: B }}>
                      {T(`${sk}_feature_${i + 1}`, "body", f.body)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d1e28] relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/2 pointer-events-none select-none">
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover object-center opacity-[0.07]"
            aria-hidden
            quality={100}
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1e28] via-[#0d1e28]/60 to-transparent" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-5">
            <div>
              <Eyebrow text="What We Provide" />
              <SectionHeading text="Our Services" light />
            </div>
            <p className="text-white/35 text-[13px] max-w-xs leading-relaxed hidden lg:block" style={{ fontFamily: B }}>
              Comprehensive capabilities across every phase of your project lifecycle.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5">
            {serviceGroups.map((sg, i) => (
              <div
                key={i}
                className="bg-[#0d1e28] p-8 hover:bg-[#152836] transition-all duration-300 group relative overflow-hidden"
              >
                <div
                  className="absolute -bottom-4 right-3 leading-none select-none pointer-events-none text-white/[0.04] group-hover:text-white/[0.07] transition-colors duration-300"
                  style={{ fontFamily: H, fontSize: "100px", fontWeight: 700 }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-8 h-8 text-[#1F93A4] mb-5 group-hover:scale-110 group-hover:text-[#25afc2] transition-all duration-300">
                  {SERVICE_ICONS[i % SERVICE_ICONS.length]}
                </div>
                <div className="w-6 h-[2px] bg-[#1F93A4] mb-4 group-hover:w-12 transition-all duration-300" />
                <h4 className="text-white font-bold text-[15px] mb-2 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                  {T(`${sk}_sg_${i + 1}`, "title", sg.title)}
                </h4>
                {sg.description && (
                  <p className="text-white/40 text-[12px] leading-relaxed mb-3" style={{ fontFamily: B }}>
                    {T(`${sk}_sg_${i + 1}`, "description", sg.description)}
                  </p>
                )}
                <ul className="space-y-2">
                  {sg.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-[13px] text-white/40 group-hover:text-white/60 transition-colors"
                      style={{ fontFamily: B }}
                    >
                      <span className="text-[#1F93A4] mt-0.5 text-[10px] shrink-0">▸</span>
                      {T(`${sk}_sg_${i + 1}`, `item_${j + 1}`, item)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-12 gap-14 mb-14">
            <div className="lg:col-span-4">
              <Eyebrow text="How We Work" />
              <SectionHeading text="Our Process" />
              <p className="text-[#5E5E5E] text-[15px] leading-relaxed mt-4" style={{ fontFamily: B }}>
                A structured, transparent approach to every engagement — from assessment through handover.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] border border-[#213B4D]/8">
            {process.map((step, i) => (
              <div key={i} className="p-8 border-r border-b border-[#213B4D]/8 last:border-r-0 hover:bg-[#f4f6f8] transition-colors group">
                <div className="text-[#1F93A4] leading-none mb-4" style={{ fontFamily: H, fontSize: "48px", fontWeight: 600 }}>
                  {step.num}
                </div>
                <h4 className="text-[#213B4D] font-bold text-[15px] mb-2" style={{ fontFamily: B }}>
                  {T(`${sk}_step_${i + 1}`, "title", step.title)}
                </h4>
                <p className="text-[#5E5E5E] text-[13px] leading-relaxed" style={{ fontFamily: B }}>
                  {T(`${sk}_step_${i + 1}`, "body", step.body)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────── */}
      <section className="py-24 bg-[#213B4D]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="text-center mb-14">
            <Eyebrow text="Our Advantages" />
            <SectionHeading text="Why Choose INFRA Construction" light center />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/5">
            {whyUs.map((w, i) => (
              <div key={i} className="bg-[#213B4D] p-7 hover:bg-[#1a2f3d] transition-colors group">
                <div className="w-6 h-[2px] bg-[#1F93A4] mb-5 group-hover:w-10 transition-all duration-300" />
                <h4 className="text-white font-bold text-[14px] mb-2" style={{ fontFamily: B }}>
                  {T(`${sk}_whyus_${i + 1}`, "title", w.title)}
                </h4>
                <p className="text-white/45 text-[12px] leading-relaxed" style={{ fontFamily: B }}>
                  {T(`${sk}_whyus_${i + 1}`, "body", w.body)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES + FAQS ─────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-2 gap-16">
          {/* Industries */}
          <div>
            <Eyebrow text="Who We Work With" />
            <SectionHeading text="Industries We Serve" />
            <div className="flex flex-wrap gap-2.5 mt-6">
              {industries.map((ind, i) => (
                <span
                  key={i}
                  className="border border-[#213B4D]/15 text-[#213B4D] text-[12px] font-semibold px-4 py-2 hover:border-[#1F93A4] hover:text-[#1F93A4] transition-colors"
                  style={{ fontFamily: B }}
                >
                  {T(`${sk}_industries`, `item_${i + 1}`, ind)}
                </span>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <Eyebrow text="Common Questions" />
            <SectionHeading text="FAQs" />
            <div className="mt-6 space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-[#213B4D]/10 p-6 hover:border-[#1F93A4] transition-colors">
                  <div className="text-[#213B4D] font-bold text-[14px] mb-2 flex items-start gap-2" style={{ fontFamily: B }}>
                    <span className="text-[#1F93A4] shrink-0">Q</span>
                    {T(`${sk}_faq_${i + 1}`, "q", faq.q)}
                  </div>
                  <div className="text-[#5E5E5E] text-[13px] leading-relaxed pl-5" style={{ fontFamily: B }}>
                    {T(`${sk}_faq_${i + 1}`, "a", faq.a)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-[#1F93A4] overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-14 text-center">
          <p className="text-white/50 text-[11px] font-bold uppercase tracking-[0.45em] mb-5" style={{ fontFamily: B }}>
            Start Your Project
          </p>
          <h2
            className="text-white uppercase leading-[0.92] mb-6"
            style={{ fontFamily: H, fontSize: "clamp(44px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            {T(sk || "", "ctaTitle", ctaTitle)}
          </h2>
          <p className="text-white/65 text-[15px] mb-10 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: B }}>
            {T(sk || "", "ctaBody", ctaBody)}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-[#213B4D] font-bold px-10 py-4 text-[13px] uppercase tracking-widest hover:bg-[#213B4D] hover:text-white transition-all duration-300"
            style={{ fontFamily: B }}
          >
            Contact Our Team <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
