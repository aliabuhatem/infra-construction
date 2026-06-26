import Image from "next/image";
import Link from "next/link";

const H = "var(--font-barlow-condensed), Arial Narrow, sans-serif";
const B = "var(--font-source-sans), Arial, sans-serif";

const openings = [
  { title: "Senior Civil Engineer", location: "Abu Dhabi, UAE", type: "Full-Time", sector: "Infrastructure" },
  { title: "Project Manager – Infrastructure", location: "Dubai, UAE", type: "Full-Time", sector: "Project Management" },
  { title: "Electrical Engineer", location: "Cairo, Egypt", type: "Full-Time", sector: "Energy & Power" },
  { title: "Quantity Surveyor", location: "Amman, Jordan", type: "Full-Time", sector: "Commercial" },
  { title: "MEP Engineer", location: "Abu Dhabi, UAE", type: "Full-Time", sector: "Buildings" },
  { title: "BIM Coordinator", location: "Dubai, UAE", type: "Full-Time", sector: "Engineering" },
  { title: "HSE Officer", location: "Multiple Locations", type: "Full-Time", sector: "HSSE" },
  { title: "Procurement Specialist", location: "Dubai, UAE", type: "Full-Time", sector: "Procurement" },
];

const benefits = [
  { title: "Competitive Compensation", body: "Attractive salary packages aligned with industry standards and your experience level." },
  { title: "International Exposure", body: "Work on diverse projects across the Middle East, Africa, and beyond." },
  { title: "Career Development", body: "Continuous learning, training, and growth opportunities within a dynamic organisation." },
  { title: "Diverse Culture", body: "A multicultural and inclusive work environment that values every team member." },
  { title: "Technical Resources", body: "Access to advanced tools, software, and technical resources to support your work." },
  { title: "Stability & Growth", body: "Join a company with 25 years of consistent growth and an expanding global footprint." },
];

const benefitIcons = [
  // 01 - Competitive Compensation
  <svg className="w-6 h-6 text-[#1F93A4] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v2m0 8v2M9.5 9.5a2.5 2.5 0 015 0c0 1.5-1.5 2-2.5 2.5S9.5 15 9.5 16.5a2.5 2.5 0 005 0"/>
  </svg>,
  // 02 - International Exposure
  <svg className="w-6 h-6 text-[#1F93A4] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>,
  // 03 - Career Development
  <svg className="w-6 h-6 text-[#1F93A4] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>,
  // 04 - Diverse Culture
  <svg className="w-6 h-6 text-[#1F93A4] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>,
  // 05 - Technical Resources
  <svg className="w-6 h-6 text-[#1F93A4] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>,
  // 06 - Stability & Growth
  <svg className="w-6 h-6 text-[#1F93A4] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>,
];

export default function CareersPage() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[540px] flex items-end overflow-hidden">
        <Image
          src="/media/careers hero section photo.png"
          alt="Careers at INFRA"
          fill
          priority
          quality={100}
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/96 via-[#213B4D]/70 to-[#213B4D]/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pb-16 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
            <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
              Join Our Team
            </p>
          </div>
          <h1
            className="text-white uppercase leading-[0.92] mb-5"
            style={{ fontFamily: H, fontSize: "clamp(44px, 6.5vw, 82px)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            Build Your Career<br />With INFRA
          </h1>
          <p className="text-white/60 text-[17px] max-w-xl leading-relaxed" style={{ fontFamily: B }}>
            Join a team of 175+ core employees and 1,000+ project workforce delivering world-class infrastructure projects across the Middle East, Africa, and beyond.
          </p>
        </div>
      </section>

      {/* ── BREADCRUMB ──────────────────────────────────────────────────── */}
      <div className="bg-[#0d1e28] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-3 flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase" style={{ fontFamily: B }}>
          <Link href="/" className="text-white/35 hover:text-[#1F93A4] transition-colors">Home</Link>
          <span className="text-white/20">›</span>
          <span className="text-[#1F93A4]">Careers</span>
        </div>
      </div>

      {/* ── WHY INFRA ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
                <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                  Why INFRA
                </p>
              </div>
              <h2
                className="text-[#213B4D] uppercase leading-tight"
                style={{ fontFamily: H, fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 600, letterSpacing: "-0.01em" }}
              >
                Why Work<br />With Us
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-[#5E5E5E] text-[17px] leading-relaxed" style={{ fontFamily: B }}>
                INFRA Construction believes that human resources are the most valuable stimulus for economic development. We invest in people who combine creativity with technical mastery.
              </p>
            </div>
          </div>

          {/* Cards grid — all 6 identical style */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, i) => (
              <div
                key={benefit.title}
                className="group relative overflow-hidden border border-[#213B4D]/10 p-8 hover:border-[#1F93A4] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 bg-white"
              >
                {/* Teal number watermark — same on ALL 6 cards */}
                <div
                  className="absolute -top-3 right-6 text-[#213B4D]/[0.3] leading-none select-none pointer-events-none"
                  style={{ fontFamily: H, fontSize: "90px", fontWeight: 700 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="w-12 h-12 bg-[#1F93A4]/10 group-hover:bg-[#1F93A4] flex items-center justify-center mb-6 transition-colors duration-300">
                  {benefitIcons[i]}
                </div>

                <h3 className="text-[#213B4D] font-bold text-[16px] mb-3 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                  {benefit.title}
                </h3>
                <p className="text-[#5E5E5E] text-[14px] leading-relaxed" style={{ fontFamily: B }}>
                  {benefit.body}
                </p>

                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1F93A4] group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMPOWERING TALENT ───────────────────────────────────────────── */}
      <section className="bg-[#0d1e28] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-[1px] items-stretch">
            <div className="relative min-h-[480px]">
              <Image
                src="/media/water-dam-construction-yemen.jpeg"
                alt="Work with INFRA"
                fill
  priority
  quality={100}
  unoptimized
  sizes="100vw"
  className="object-cover object-center"
/>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d1e28]/30 to-transparent" />
            </div>
            <div className="py-20 px-10 lg:px-16 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
                <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                  Our People
                </p>
              </div>
              <h2
                className="text-white uppercase leading-tight mb-6"
                style={{ fontFamily: H, fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, letterSpacing: "-0.01em" }}
              >
                Empowering Talent Across Borders
              </h2>
              <p className="text-white/55 text-[16px] leading-relaxed mb-4" style={{ fontFamily: B }}>
                IC employees do their tasks in a spirit that is self-motivated through willpower, confidence, and open perspective — seeing every project as a new challenge that will be part of our final scene.
              </p>
              <p className="text-white/55 text-[16px] leading-relaxed mb-8" style={{ fontFamily: B }}>
                We operate in multicultural environments across the Middle East and Africa, offering professionals the chance to grow across borders and disciplines.
              </p>
              <div className="grid grid-cols-2 gap-[1px] bg-white/5">
                {["Engineers", "Project Managers", "Technicians", "Consultants", "Inspectors", "Specialists"].map((role) => (
                  <div key={role} className="bg-[#0d1e28] px-4 py-3 flex items-center gap-2 hover:bg-[#1a3040] transition-colors group">
                    <span className="text-[#1F93A4] text-[10px]">▸</span>
                    <span className="text-white/55 text-[13px] group-hover:text-white transition-colors" style={{ fontFamily: B }}>
                      {role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OPENINGS ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid lg:grid-cols-12 gap-14 mb-14">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
                <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                  Open Positions
                </p>
              </div>
              <h2
                className="text-[#213B4D] uppercase leading-tight"
                style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 600, letterSpacing: "-0.01em" }}
              >
                Current Openings
              </h2>
            </div>
          </div>

          <div className="space-y-[1px] bg-[#213B4D]/8">
            {openings.map((job) => (
              <div
                key={job.title}
                className="bg-white hover:bg-[#f4f6f8] transition-colors px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group"
              >
                <div>
                  <div className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.25em] mb-2" style={{ fontFamily: B }}>
                    {job.sector}
                  </div>
                  <h3 className="text-[#213B4D] font-bold text-[15px] group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-5 mt-2" style={{ fontFamily: B }}>
                    <span className="text-[#5E5E5E] text-[12px]">{job.location}</span>
                    <span className="border border-[#213B4D]/20 text-[#213B4D] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                      {job.type}
                    </span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 border border-[#213B4D] text-[#213B4D] font-bold text-[12px] uppercase tracking-widest px-6 py-3 hover:bg-[#213B4D] hover:text-white transition-all duration-300"
                  style={{ fontFamily: B }}
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
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
            Open Application
          </p>
          <h2
            className="text-white uppercase leading-[0.92] mb-6"
            style={{ fontFamily: H, fontSize: "clamp(44px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            Don&apos;t See<br />Your Role?
          </h2>
          <p className="text-white/65 text-[15px] mb-10 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: B }}>
            We are always looking for talented professionals to join our growing team. Send us your CV and let us know how you can contribute.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-[#213B4D] font-bold px-10 py-4 text-[13px] uppercase tracking-widest hover:bg-[#213B4D] hover:text-white transition-all duration-300"
            style={{ fontFamily: B }}
          >
            Send Your CV <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}