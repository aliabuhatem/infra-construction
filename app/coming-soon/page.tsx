import Image from "next/image";

const H = "var(--font-barlow-condensed), Arial Narrow, sans-serif";
const B = "var(--font-source-sans), Arial, sans-serif";

export const metadata = {
  title: "Coming Soon — INFRA Construction",
  description: "INFRA Construction website is under construction. We'll be back shortly.",
};

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0d1e28]">
      {/* Background image */}
      <Image
        src="/media/infrastructure-bani-mazar-bridge-egypt.jpeg"
        alt=""
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0d1e28]/85" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      {/* Top teal accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1F93A4]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo / brand */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-8 h-[2px] bg-[#1F93A4]" />
          <span
            className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.4em]"
            style={{ fontFamily: B }}
          >
            INFRA Construction for Contracting LLC
          </span>
          <div className="w-8 h-[2px] bg-[#1F93A4]" />
        </div>

        {/* Big headline */}
        <h1
          className="text-white uppercase leading-[0.88] mb-8"
          style={{
            fontFamily: H,
            fontSize: "clamp(72px, 16vw, 200px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Coming<br />Soon
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-16 bg-[#1F93A4]/40" />
          <div className="w-1.5 h-1.5 bg-[#1F93A4]" />
          <div className="h-[1px] w-16 bg-[#1F93A4]/40" />
        </div>

        {/* Subtitle */}
        <p
          className="text-white/50 text-[17px] leading-relaxed max-w-lg mx-auto mb-12"
          style={{ fontFamily: B }}
        >
          We are working hard to bring you our new website. Our team is available in the meantime — reach out directly.
        </p>

        {/* Contact CTA */}
        <a
          href="mailto:info@infraconstruction.com"
          className="inline-flex items-center gap-3 bg-[#1F93A4] text-white font-bold px-10 py-4 text-[13px] uppercase tracking-widest hover:bg-white hover:text-[#213B4D] transition-all duration-300"
          style={{ fontFamily: B }}
        >
          Contact Us <span>→</span>
        </a>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span
            className="text-white/20 text-[11px] tracking-wider"
            style={{ fontFamily: B }}
          >
            © {new Date().getFullYear()} INFRA Construction for Contracting LLC. All rights reserved.
          </span>
          <span className="text-white/15 text-[11px] tracking-wider" style={{ fontFamily: B }}>
            Est. 2000 · Abu Dhabi, UAE
          </span>
        </div>
      </div>
    </div>
  );
}
