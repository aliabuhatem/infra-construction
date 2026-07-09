"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import ContentText from "@/components/admin-panel/ContentText";
import { services, sectors } from "@/lib/expertise";

const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

const preLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const postLinks = [
  { label: "Projects", href: "/projects" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
];

type MenuKey = "sectors" | "services" | null;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobilePanel, setMobilePanel] = useState<MenuKey>(null);
  const pathname = usePathname();
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open menu on route change
  useEffect(() => { setMenu(null); setOpen(false); }, [pathname]);

  // Light (white) header when scrolled, a menu is open, or the mobile drawer is open
  const light = scrolled || open || menu !== null;

  const openMenu = (k: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(k);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setMenu(null), 160);
  };
  const closeAll = () => { setMenu(null); setOpen(false); };

  const linkColor = light ? "text-[#213B4D]/80 hover:text-[#213B4D]" : "text-white/85 hover:text-white";
  const navLinkClass =
    `${linkColor} text-[13px] font-semibold tracking-[0.04em] transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#1F93A4] after:transition-all after:duration-300 hover:after:w-full`;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: light ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: light ? "blur(10px)" : "none",
        boxShadow: light ? "0 1px 0 rgba(33,59,77,0.08), 0 8px 30px -18px rgba(33,59,77,0.35)" : "none",
      }}
    >
      <div className="h-[3px] bg-[#1F93A4]" />

      <nav className="max-w-7xl mx-auto px-6 lg:px-14 flex items-center justify-between h-[88px]">

        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/media/infra-logo.png"
            alt="INFRA Construction"
            width={180}
            height={100}
            className="object-contain h-[58px] w-auto block transition-all duration-500"
            style={{ filter: light ? "none" : "brightness(0) invert(1)" }}
            priority
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {preLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={navLinkClass} style={{ fontFamily: B }}>
                {link.label}
              </Link>
            </li>
          ))}

          {/* Sectors + Services mega menus */}
          {([
            { key: "sectors" as const, label: "Sectors", base: "/sectors", items: sectors, cols: "grid-cols-2", width: "w-[560px]" },
            { key: "services" as const, label: "Services", base: "/services", items: services, cols: "grid-cols-2", width: "w-[640px]" },
          ]).map((m) => (
            <li key={m.key} className="relative" onMouseEnter={() => openMenu(m.key)} onMouseLeave={scheduleClose}>
              <button
                className={`flex items-center gap-1.5 ${linkColor} text-[13px] font-semibold tracking-[0.04em] transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-[#1F93A4] after:transition-all after:duration-300 ${menu === m.key ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
                style={{ fontFamily: B }}
                aria-expanded={menu === m.key}
              >
                {m.label}
                <svg width="9" height="5" viewBox="0 0 9 5" fill="none" className={`mt-px transition-transform duration-300 ${menu === m.key ? "rotate-180" : ""}`}>
                  <path d="M1 1L4.5 4.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-5 ${m.width} max-w-[92vw] bg-white border border-[#213B4D]/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 ${menu === m.key ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                onMouseEnter={() => openMenu(m.key)}
                onMouseLeave={scheduleClose}
              >
                <div className={`grid ${m.cols} gap-1 p-3`}>
                  {m.items.map((it) => (
                    <Link
                      key={it.slug}
                      href={`${m.base}/${it.slug}`}
                      onClick={closeAll}
                      className="group flex items-start gap-3 rounded-lg p-3 hover:bg-[#f4f6f8] transition-colors"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#1F93A4]/10 text-[11px] font-bold text-[#1F93A4] transition-colors group-hover:bg-[#1F93A4] group-hover:text-white" style={{ fontFamily: B }}>
                        {it.num}
                      </span>
                      <span className="text-[12.5px] font-semibold leading-snug text-[#213B4D] group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B }}>
                        {it.title}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-[#213B4D]/8 px-5 py-3 bg-[#f6f8f9]">
                  <Link href={m.base} onClick={closeAll} className="text-[11px] font-bold tracking-[0.15em] text-[#1F93A4] hover:text-[#213B4D] transition-colors" style={{ fontFamily: B }}>
                    View All {m.label} →
                  </Link>
                </div>
              </div>
            </li>
          ))}

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
          className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#1F93A4] text-white text-[13px] font-bold tracking-wider hover:bg-[#213B4D] transition-all duration-300"
          style={{ fontFamily: B }}
        >
          <ContentText section="navbar" name="ctaText" fallback="Contact Us" />
        </Link>

        <button
          className={`lg:hidden flex flex-col gap-[5px] p-2 ${light ? "text-[#213B4D]" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block h-[2px] w-6 bg-current origin-center transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-[2px] w-6 bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block h-[2px] w-6 bg-current origin-center transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className="lg:hidden overflow-hidden transition-all duration-300" style={{ maxHeight: open ? "80vh" : "0px" }}>
        <div className="bg-white border-t border-[#213B4D]/10 px-6 pt-4 pb-6 space-y-1 overflow-y-auto" style={{ maxHeight: "80vh" }}>
          {preLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className="block text-[#213B4D]/85 hover:text-[#1F93A4] py-3 text-sm font-semibold tracking-wide transition-colors border-b border-[#213B4D]/6"
              style={{ fontFamily: B }}>
              {link.label}
            </Link>
          ))}

          {([
            { key: "sectors" as const, label: "Sectors", base: "/sectors", items: sectors },
            { key: "services" as const, label: "Services", base: "/services", items: services },
          ]).map((m) => (
            <div key={m.key} className="border-b border-[#213B4D]/6">
              <button
                className="w-full flex items-center justify-between text-[#213B4D]/85 hover:text-[#1F93A4] py-3 text-sm font-semibold tracking-wide transition-colors"
                style={{ fontFamily: B }}
                onClick={() => setMobilePanel(mobilePanel === m.key ? null : m.key)}
              >
                {m.label}
                <svg width="9" height="5" viewBox="0 0 9 5" fill="none" className={`transition-transform duration-300 ${mobilePanel === m.key ? "rotate-180" : ""}`}>
                  <path d="M1 1L4.5 4.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: mobilePanel === m.key ? "600px" : "0px" }}>
                <div className="pb-3 pl-1 space-y-0.5">
                  <Link href={m.base} onClick={() => setOpen(false)} className="block text-[#1F93A4] hover:text-[#213B4D] py-2 text-[11px] font-bold tracking-widest transition-colors" style={{ fontFamily: B }}>
                    All {m.label} →
                  </Link>
                  {m.items.map((it) => (
                    <Link key={it.slug} href={`${m.base}/${it.slug}`} onClick={() => setOpen(false)}
                      className="flex items-center gap-2 text-[#213B4D]/75 hover:text-[#1F93A4] py-2 text-[12.5px] transition-colors"
                      style={{ fontFamily: B }}>
                      <span className="text-[#1F93A4] text-[11px] font-bold w-5 shrink-0">{it.num}</span>
                      {it.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {postLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className="block text-[#213B4D]/85 hover:text-[#1F93A4] py-3 text-sm font-semibold tracking-wide transition-colors border-b border-[#213B4D]/6"
              style={{ fontFamily: B }}>
              {link.label}
            </Link>
          ))}

          <Link href="/contact" onClick={() => setOpen(false)}
            className="block mt-4 text-center rounded-md bg-[#1F93A4] text-white py-3 text-sm font-bold tracking-widest hover:bg-[#213B4D] transition-all duration-300"
            style={{ fontFamily: B }}>
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
