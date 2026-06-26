"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const B = "var(--font-source-sans), Arial, sans-serif";

const preLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const postLinks = [
  { label: "Projects", href: "/projects" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
];

// Revised per client doc — 7 infrastructure subsectors
const infraSubsectors = [
  { label: "Water",             href: "/sectors/water-utilities" },
  { label: "Dams & Irrigation", href: "/sectors/water-utilities" },
  { label: "Ports",             href: "/sectors/infrastructure-civil-works" },
  { label: "Airports",          href: "/sectors/infrastructure-civil-works" },
  { label: "Transportation",    href: "/sectors/infrastructure-civil-works" },
  { label: "Oil",               href: "/sectors/industrial-oil-services" },
  { label: "Power",             href: "/sectors/energy-power" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    //if (!isHome) { setScrolled(true); return; }
    const onScroll = () => setScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const solid = scrolled || open || sectorsOpen;

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSectorsOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setSectorsOpen(false), 150);
  };

  const closeAll = () => {
    setSectorsOpen(false);
    setOpen(false);
  };

  const navLinkClass =
    "text-white/85 hover:text-white text-[13px] font-semibold tracking-[0.12em] uppercase transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#1F93A4] after:transition-all after:duration-300 hover:after:w-full";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ background: solid ? "#213B4D" : "transparent" }}
    >
      <div className="h-[3px] bg-[#1F93A4]" />

      <nav className="max-w-7xl mx-auto px-6 lg:px-14 flex items-center justify-between h-[96px]">

        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/media/infra-logo-transparent.png"
            alt="INFRA Construction"
            width={180}
            height={100}
            className="object-contain h-[82px] w-auto block"
            style={{ filter: "brightness(0) invert(1)" }}
            priority
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-9">
          {preLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={navLinkClass} style={{ fontFamily: B }}>
                {link.label}
              </Link>
            </li>
          ))}

          <li
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-1.5 text-white/85 hover:text-white text-[13px] font-semibold tracking-[0.12em] uppercase transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[#1F93A4] after:transition-all after:duration-300 ${sectorsOpen ? "text-white after:w-full" : "after:w-0 hover:after:w-full"}`}
              style={{ fontFamily: B }}
              aria-expanded={sectorsOpen}
            >
              Sectors
              <svg
                width="9" height="5" viewBox="0 0 9 5" fill="none"
                className={`mt-px transition-transform duration-300 ${sectorsOpen ? "rotate-180" : ""}`}
              >
                <path d="M1 1L4.5 4.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-[22px] w-[520px] bg-[#1a2f3d] border border-white/10 shadow-2xl transition-all duration-200 ${sectorsOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
              onMouseEnter={openDropdown}
              onMouseLeave={scheduleClose}
            >
              <div className="grid grid-cols-2 divide-x divide-white/10">

                <Link
                  href="/sectors/buildings"
                  className="group p-7 hover:bg-[#213B4D] transition-colors block"
                  onClick={closeAll}
                >
                  <p className="text-[#1F93A4] text-[9px] font-bold uppercase tracking-[0.3em] mb-5" style={{ fontFamily: B }}>
                    Standalone Sector
                  </p>
                  <div className="w-5 h-[2px] bg-[#1F93A4] mb-3 group-hover:w-9 transition-all duration-200" />
                  <p className="text-white font-bold text-[16px] uppercase mb-1.5 group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                    Buildings
                  </p>
                  <p className="text-white/35 text-[11px] leading-relaxed" style={{ fontFamily: B }}>
                    Residential, commercial & institutional construction
                  </p>
                </Link>

                <div className="p-7">
                  <Link
                    href="/sectors/infrastructure"
                    className="group block mb-5"
                    onClick={closeAll}
                  >
                    <p className="text-[#1F93A4] text-[9px] font-bold uppercase tracking-[0.3em] mb-5" style={{ fontFamily: B }}>
                      Umbrella Sector
                    </p>
                    <div className="w-5 h-[2px] bg-[#1F93A4] mb-3 group-hover:w-9 transition-all duration-200" />
                    <p className="text-white font-bold text-[16px] uppercase group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                      Infrastructure
                    </p>
                  </Link>
                  <div className="border-t border-white/10 pt-4 space-y-2.5">
                    {infraSubsectors.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="flex items-center gap-2 text-white/45 hover:text-[#1F93A4] text-[11px] uppercase tracking-[0.08em] transition-colors group"
                        style={{ fontFamily: B }}
                        onClick={closeAll}
                      >
                        <span className="text-[#1F93A4] text-[8px] shrink-0 group-hover:translate-x-0.5 transition-transform">▸</span>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 px-7 py-3">
                <Link
                  href="/sectors"
                  className="text-white/30 hover:text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
                  style={{ fontFamily: B }}
                  onClick={closeAll}
                >
                  View All Sectors Overview →
                </Link>
              </div>
            </div>
          </li>

          {postLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={navLinkClass} style={{ fontFamily: B }}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 bg-[#1F93A4] text-white text-[13px] font-bold tracking-wider uppercase hover:bg-white hover:text-[#213B4D] transition-all duration-300"
          style={{ fontFamily: B }}
        >
          Contact Us
        </Link>

        <button
          className="lg:hidden text-white flex flex-col gap-[5px] p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block h-[2px] w-6 bg-white origin-center transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-[2px] w-6 bg-white transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block h-[2px] w-6 bg-white origin-center transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "640px" : "0px" }}
      >
        <div className="bg-[#213B4D] border-t border-white/10 px-6 pt-4 pb-6 space-y-1">
          {preLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-white/80 hover:text-white py-3 text-sm font-semibold uppercase tracking-widest transition-colors border-b border-white/5"
              style={{ fontFamily: B }}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-b border-white/5">
            <button
              className="w-full flex items-center justify-between text-white/80 hover:text-white py-3 text-sm font-semibold uppercase tracking-widest transition-colors"
              style={{ fontFamily: B }}
              onClick={() => setMobileSectorsOpen(!mobileSectorsOpen)}
            >
              Sectors
              <svg width="9" height="5" viewBox="0 0 9 5" fill="none" className={`transition-transform duration-300 ${mobileSectorsOpen ? "rotate-180" : ""}`}>
                <path d="M1 1L4.5 4.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: mobileSectorsOpen ? "440px" : "0px" }}
            >
              <div className="pb-3 pl-3 space-y-1">
                <Link href="/sectors" onClick={() => setOpen(false)} className="block text-white/40 hover:text-[#1F93A4] py-1.5 text-[10px] uppercase tracking-widest transition-colors" style={{ fontFamily: B }}>
                  All Sectors Overview
                </Link>
                <Link href="/sectors/buildings" onClick={() => setOpen(false)} className="block text-white/70 hover:text-[#1F93A4] py-2 text-[12px] font-semibold uppercase tracking-wide transition-colors" style={{ fontFamily: B }}>
                  Buildings
                </Link>
                <div>
                  <Link href="/sectors/infrastructure" onClick={() => setOpen(false)} className="block text-white/70 hover:text-[#1F93A4] py-2 text-[12px] font-semibold uppercase tracking-wide transition-colors" style={{ fontFamily: B }}>
                    Infrastructure
                  </Link>
                  <div className="pl-3 space-y-0.5">
                    {infraSubsectors.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-1.5 text-white/40 hover:text-[#1F93A4] py-1.5 text-[10px] uppercase tracking-wide transition-colors"
                        style={{ fontFamily: B }}
                      >
                        <span className="text-[#1F93A4] text-[8px]">▸</span>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {postLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-white/80 hover:text-white py-3 text-sm font-semibold uppercase tracking-widest transition-colors border-b border-white/5 last:border-0"
              style={{ fontFamily: B }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block mt-4 text-center bg-[#1F93A4] text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#213B4D] transition-all duration-300"
            style={{ fontFamily: B }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
