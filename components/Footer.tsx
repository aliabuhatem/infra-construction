import Link from "next/link";
import ContentText from "@/components/admin-panel/ContentText";
import { getContent, getSectionsByPrefix } from "@/lib/getContent";
import { resolveServices, resolveSectors } from "@/lib/expertise";

const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

const nav = [
  { label: "About", href: "/about" },
  { label: "Sectors", href: "/sectors" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default async function Footer() {
  const c = await getContent();
  const email    = c.content?.footer?.email    || "info@ic-gp.com";
  const phone    = c.content?.footer?.phone    || "+20345680875";
  const linkedin = c.content?.footer?.linkedin || "https://www.linkedin.com/company/ic-gp/";
  const facebook = c.content?.footer?.facebook || "https://www.facebook.com/share/1DznurcqWH/";
  const offices  = getSectionsByPrefix(c, "about_office_");
  const sectorList  = resolveSectors(c);
  const serviceList = resolveServices(c);

  return (
    <footer className="bg-[#f6f8f9] text-[#213B4D] border-t border-[#213B4D]/10">
      {/* Top teal accent line */}
      <div className="h-1 bg-[#1F93A4]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-16 grid gap-10 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-4">
          <div className="mb-5">
            <span className="text-2xl font-bold tracking-wide">INFRA</span>
            <span className="text-2xl font-normal text-[#1F93A4]"> Construction</span>
          </div>
          <p className="text-[#5E5E5E] text-sm leading-relaxed mb-5 max-w-xs" style={{ fontFamily: B }}>
            <ContentText section="footer" name="tagline" fallback="A leading contracting company delivering world-class infrastructure, buildings, and industrial projects since 1990." />
          </p>
          <div className="flex gap-2 mb-6">
            {["ISO 9001", "ISO 14001"].map((cert) => (
              <span key={cert} className="text-[10px] tracking-widest border border-[#1F93A4]/40 text-[#1F93A4] px-2 py-1" style={{ fontFamily: B }}>
                {cert}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 border border-[#213B4D]/15 text-[#213B4D] flex items-center justify-center hover:bg-[#1F93A4] hover:border-[#1F93A4] hover:text-white transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 border border-[#213B4D]/15 text-[#213B4D] flex items-center justify-center hover:bg-[#1F93A4] hover:border-[#1F93A4] hover:text-white transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href={`mailto:${email}`} aria-label="Email" className="w-9 h-9 border border-[#213B4D]/15 text-[#213B4D] flex items-center justify-center hover:bg-[#1F93A4] hover:border-[#1F93A4] hover:text-white transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 13.065L.726 4.5h22.548L12 13.065zM12 15.435L.5 6.84V19.5h23V6.84l-11.5 8.595z"/></svg>
            </a>
          </div>
        </div>

        {/* Sectors */}
        <div className="md:col-span-2">
          <h4 className="text-[11px] tracking-[0.28em] text-[#1F93A4] mb-5 font-bold" style={{ fontFamily: B }}>Our Sectors</h4>
          <ul className="space-y-2.5">
            {sectorList.map((s) => (
              <li key={s.slug}>
                <Link href={`/sectors/${s.slug}`} className="text-[13px] text-[#213B4D]/80 hover:text-[#1F93A4] flex items-start gap-2 transition-colors" style={{ fontFamily: B }}>
                  <span className="text-[#1F93A4] mt-px">▸</span> {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="md:col-span-3">
          <h4 className="text-[11px] tracking-[0.28em] text-[#1F93A4] mb-5 font-bold" style={{ fontFamily: B }}>Our Services</h4>
          <ul className="grid grid-cols-1 gap-y-2.5">
            {serviceList.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-[13px] text-[#213B4D]/80 hover:text-[#1F93A4] flex items-start gap-2 transition-colors" style={{ fontFamily: B }}>
                  <span className="text-[#1F93A4] mt-px">▸</span> {s.title.replace(" Services", "").replace(" (BIM)", "")}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company + Contact */}
        <div className="md:col-span-3">
          <h4 className="text-[11px] tracking-[0.28em] text-[#1F93A4] mb-5 font-bold" style={{ fontFamily: B }}>Company</h4>
          <ul className="space-y-2.5 mb-6">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[13px] text-[#213B4D]/80 hover:text-[#1F93A4] flex items-center gap-2 transition-colors" style={{ fontFamily: B }}>
                  <span className="text-[#1F93A4]">▸</span> {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="space-y-2 pt-5 border-t border-[#213B4D]/10" style={{ fontFamily: B }}>
            {offices.length > 0 && (
              <p className="text-[11px] tracking-[0.2em] text-[#5E5E5E] mb-1">
                {offices.map((o) => o.city).filter(Boolean).join(" · ")}
              </p>
            )}
            <a href={`mailto:${email}`} className="block text-[13px] text-[#213B4D]/80 hover:text-[#1F93A4] transition-colors">✉ {email}</a>
            <a href={`tel:${phone}`} className="block text-[13px] text-[#213B4D]/80 hover:text-[#1F93A4] transition-colors">☎ {phone}</a>
          </div>
        </div>
      </div>

      {/* Bottom bar — the site's one remaining slim navy band */}
      <div className="bg-[#213B4D]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/75" style={{ fontFamily: B }}>
          <p>© {new Date().getFullYear()} INFRA Construction for Contracting LLC. All Rights Reserved.</p>
          <p>
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/ali-abu-hatem-93b13927b"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Eng. Ali Abuhatem
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
