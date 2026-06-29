import Link from "next/link";
import ContentText from "@/components/admin-panel/ContentText";
import { getContent, getSectionsByPrefix } from "@/lib/getContent";

const B = "var(--font-ibm-plex-sans), system-ui, -apple-system, sans-serif";

const sectors = [
  { label: "Buildings", href: "/sectors/buildings" },
  { label: "Infrastructure", href: "/sectors/infrastructure" },
];

const nav = [
  { label: "About", href: "/about" },
  { label: "Sectors", href: "/sectors" },
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

  return (
    <footer className="bg-[#213B4D] text-white">
      {/* Top teal accent line */}
      <div className="h-1 bg-[#4FC3B7]" />

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="mb-5">
            <span className="text-2xl font-bold tracking-wide">INFRA</span>
            <span className="text-2xl font-normal text-[#4FC3B7]">CONSTRUCTION</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-5" style={{ fontFamily: B }}>
            <ContentText section="footer" name="tagline" fallback="A leading contracting company delivering world-class infrastructure, buildings, and industrial projects since 2000." />
          </p>
          <div className="flex gap-2 mb-5">
            {["ISO 9001", "ISO 14001"].map((cert) => (
              <span key={cert} className="text-[10px] uppercase tracking-widest border border-[#4FC3B7]/40 text-[#4FC3B7] px-2 py-1" style={{ fontFamily: B }}>
                {cert}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:bg-[#4FC3B7] hover:border-[#4FC3B7] transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:bg-[#4FC3B7] hover:border-[#4FC3B7] transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href={`mailto:${email}`} aria-label="Email" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:bg-[#4FC3B7] hover:border-[#4FC3B7] transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 13.065L.726 4.5h22.548L12 13.065zM12 15.435L.5 6.84V19.5h23V6.84l-11.5 8.595z"/></svg>
            </a>
          </div>
        </div>

        {/* Sectors */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.3em] text-[#4FC3B7] mb-5" style={{ fontFamily: B }}>Our Sectors</h4>
          <ul className="space-y-2">
            {sectors.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-sm text-white/70 hover:text-[#4FC3B7] flex items-center gap-2" style={{ fontFamily: B }}>
                  <span className="text-[#4FC3B7]">▸</span> {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.3em] text-[#4FC3B7] mb-5" style={{ fontFamily: B }}>Company</h4>
          <ul className="space-y-2">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-[#4FC3B7] flex items-center gap-2" style={{ fontFamily: B }}>
                  <span className="text-[#4FC3B7]">▸</span> {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Offices + Contact */}
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.3em] text-[#4FC3B7] mb-5" style={{ fontFamily: B }}>Global Offices</h4>
          <ul className="space-y-2 mb-5">
            {offices.map((o) => (
              <li key={o._key} className="text-sm" style={{ fontFamily: B }}>
                <span className="text-white">{o.city}</span>
                <span className="text-white/40 ml-2 text-xs">{o.country}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-2 pt-4 border-t border-white/10" style={{ fontFamily: B }}>
            <a href={`mailto:${email}`} className="block text-sm text-white/70 hover:text-[#4FC3B7]">
              ✉ {email}
            </a>
            <a href={`tel:${phone}`} className="block text-sm text-white/70 hover:text-[#4FC3B7]">
              ☎ {phone}
            </a>
            <Link href="/contact" className="inline-block text-[11px] uppercase tracking-widest text-[#4FC3B7] hover:text-white mt-2">
              Contact Us →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/50" style={{ fontFamily: B }}>
          <p>© {new Date().getFullYear()} INFRA Construction for Contracting LLC. All rights reserved.</p>
          <p>Est. 2000 · Abu Dhabi, UAE</p>
        </div>
      </div>
    </footer>
  );
}
