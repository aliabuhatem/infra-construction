"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ContentText from "@/components/admin-panel/ContentText";
import { useContentStore } from "@/components/admin-panel/ContentProvider";
import type { ContentStore } from "@/lib/getContent";
import { Reveal } from "@/components/motion";

const H = "var(--font-myriad), system-ui, -apple-system, sans-serif";
const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

export default function ContactPage() {
  const { store: rawStore } = useContentStore();
  const store = rawStore as ContentStore | null;
  const email    = store?.content?.footer?.email    || "info@ic-gp.com";
  const phone    = store?.content?.footer?.phone    || "+20345680875";
  const facebook = store?.content?.footer?.facebook || "https://www.facebook.com/share/1DznurcqWH/";
  const linkedin = store?.content?.footer?.linkedin || "https://www.linkedin.com/company/ic-gp/";
  const deleted  = new Set(store?._deletedSections || []);
  const offices  = Object.entries((store?.content || {}) as Record<string, Record<string, string>>)
    .filter(([k]) => /^contact_office_\d+$/.test(k) && !deleted.has(k))
    .sort(([a], [b]) => parseInt(a.replace("contact_office_", ""), 10) - parseInt(b.replace("contact_office_", ""), 10))
    .map(([k, f]) => ({ _key: k, city: f.city || "", country: f.country || "", address: f.address || "", license: f.license || "" }));

  const [showOptions, setShowOptions] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    subject: "Project Inquiry",
    message: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buildBody = () => {
    return encodeURIComponent(
      `Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nCompany: ${form.company}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`
    );
  };

  const buildSubject = () => encodeURIComponent(form.subject || "Inquiry from website");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOptions(true);
  };

  return (
    <>
      {/* ── HERO (second code) ── */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <Image
          src="/media/contact us hero section photo.webp"
          alt="Contact Us"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/95 via-[#213B4D]/75 to-[#213B4D]/45" />
        <Reveal className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 pb-16 w-full text-shadow-legible">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
            <p className="text-[#F2613C] text-[11px] font-bold  tracking-[0.35em]" style={{ fontFamily: B }}>
              <ContentText section="contact_hero" name="eyebrow" fallback="Get in Touch" />
            </p>
          </div>
          <h1
            className="text-white  leading-[0.92] mb-5"
            style={{ fontFamily: H, fontSize: "clamp(52px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            <ContentText section="contact_hero" name="title" fallback="Contact Us" />
          </h1>
          <p className="text-white/85 text-[15px] max-w-xl leading-relaxed" style={{ fontFamily: B }}>
            <ContentText section="contact_hero" name="subtitle" fallback="Reach out to our team across five global offices — we are ready to discuss your project requirements." />
          </p>
        </Reveal>
      </section>

      {/* ── BREADCRUMB (second code) ── */}
      <div className="bg-[#f6f8f9] border-b border-[#213B4D]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-3 flex items-center gap-2 text-[11px] tracking-[0.15em] " style={{ fontFamily: B }}>
          <Link href="/" className="text-[#5E5E5E] hover:text-[#1F93A4] transition-colors">Home</Link>
          <span className="text-[#213B4D]/25">›</span>
          <span className="text-[#1F93A4] font-semibold">Contact</span>
        </div>
      </div>

      {/* ── FORM + OFFICES (form replaced with functional version from first code) ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-2 gap-16">
          {/* Functional Form */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
              <p className="text-[#F2613C] text-[11px] font-bold  tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="contact_form" name="eyebrow" fallback="Send a Message" />
              </p>
            </div>
            <h2
              className="text-[#213B4D]  leading-tight mb-10"
              style={{ fontFamily: H, fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, letterSpacing: "-0.01em" }}
            >
              <ContentText section="contact_form" name="title" fallback="Let's Discuss Your Project" />
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#213B4D] text-[10px] font-bold  tracking-[0.25em] mb-2" style={{ fontFamily: B }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={form.firstName}
                    onChange={onChange}
                    className="w-full border border-[#213B4D]/20 px-4 py-3.5 text-[14px] text-[#213B4D] placeholder-[#5E5E5E]/40 focus:outline-none focus:border-[#1F93A4] transition-colors"
                    placeholder="John"
                    style={{ fontFamily: B }}
                  />
                </div>
                <div>
                  <label className="block text-[#213B4D] text-[10px] font-bold  tracking-[0.25em] mb-2" style={{ fontFamily: B }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={form.lastName}
                    onChange={onChange}
                    className="w-full border border-[#213B4D]/20 px-4 py-3.5 text-[14px] text-[#213B4D] placeholder-[#5E5E5E]/40 focus:outline-none focus:border-[#1F93A4] transition-colors"
                    placeholder="Smith"
                    style={{ fontFamily: B }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#213B4D] text-[10px] font-bold  tracking-[0.25em] mb-2" style={{ fontFamily: B }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  className="w-full border border-[#213B4D]/20 px-4 py-3.5 text-[14px] text-[#213B4D] placeholder-[#5E5E5E]/40 focus:outline-none focus:border-[#1F93A4] transition-colors"
                  placeholder="john@company.com"
                  style={{ fontFamily: B }}
                />
              </div>
              <div>
                <label className="block text-[#213B4D] text-[10px] font-bold  tracking-[0.25em] mb-2" style={{ fontFamily: B }}>
                  Company / Organisation
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  className="w-full border border-[#213B4D]/20 px-4 py-3.5 text-[14px] text-[#213B4D] placeholder-[#5E5E5E]/40 focus:outline-none focus:border-[#1F93A4] transition-colors"
                  placeholder="Your Company"
                  style={{ fontFamily: B }}
                />
              </div>
              <div>
                <label className="block text-[#213B4D] text-[10px] font-bold  tracking-[0.25em] mb-2" style={{ fontFamily: B }}>
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  className="w-full border border-[#213B4D]/20 px-4 py-3.5 text-[14px] text-[#213B4D] focus:outline-none focus:border-[#1F93A4] transition-colors bg-white"
                  style={{ fontFamily: B }}
                >
                  <option>Project Inquiry</option>
                  <option>Partnership Opportunities</option>
                  <option>Career Inquiry</option>
                  <option>General Information</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[#213B4D] text-[10px] font-bold  tracking-[0.25em] mb-2" style={{ fontFamily: B }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  className="w-full border border-[#213B4D]/20 px-4 py-3.5 text-[14px] text-[#213B4D] placeholder-[#5E5E5E]/40 focus:outline-none focus:border-[#1F93A4] transition-colors resize-none"
                  placeholder="Tell us about your project or inquiry..."
                  style={{ fontFamily: B }}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#F2613C] text-white font-bold py-4 text-[13px]  tracking-widest hover:bg-[#d64b26] transition-colors duration-300"
                style={{ fontFamily: B }}
              >
                Send Message →
              </button>
            </form>
          </div>

          {/* Offices (unchanged from second code) */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
              <p className="text-[#F2613C] text-[11px] font-bold  tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="contact_offices" name="eyebrow" fallback="Global Offices" />
              </p>
            </div>
            <h2
              className="text-[#213B4D]  leading-tight mb-10"
              style={{ fontFamily: H, fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, letterSpacing: "-0.01em" }}
            >
              <ContentText section="contact_offices" name="title" fallback="Find Us Worldwide" />
            </h2>
            <div className="space-y-[1px] bg-[#213B4D]/8">
              {offices.map((o) => (
                <div
                  key={o._key}
                  className="bg-white hover:bg-[#f4f6f8] transition-colors px-6 py-5 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="text-[#213B4D] font-bold text-[15px] group-hover:text-[#1F93A4] transition-colors"
                      style={{ fontFamily: B }}
                    >
                      <ContentText section={o._key} name="city" fallback={o.city} />
                    </div>
                    <span
                      className="text-[#1F93A4] text-[10px] font-bold  tracking-[0.2em] border border-[#1F93A4]/30 px-2 py-0.5"
                      style={{ fontFamily: B }}
                    >
                      <ContentText section={o._key} name="country" fallback={o.country} />
                    </span>
                  </div>
                  <div className="text-[#5E5E5E] text-[12px] leading-relaxed" style={{ fontFamily: B }}>
                    <ContentText section={o._key} name="address" fallback={o.address} />
                  </div>
                  <div className="text-[#5E5E5E]/60 text-[11px] mt-1.5  tracking-wider" style={{ fontFamily: B }}>
                    Lic. <ContentText section={o._key} name="license" fallback={o.license} />
                  </div>
                </div>
              ))}
            </div>

            {/* ISO Badges */}
            <div className="mt-8 bg-[#f6f8f9] border border-[#213B4D]/10 rounded-lg p-6 flex gap-5 items-center flex-wrap">
              <div className="flex items-center gap-3 mb-2 w-full">
                <div className="w-4 h-[2px] bg-[#1F93A4]" />
                <span className="text-[#5E5E5E] text-[10px] font-bold  tracking-[0.3em]" style={{ fontFamily: B }}>
                  Certifications
                </span>
              </div>
              {["ISO 9001:2015 — Quality Management", "ISO 14001:2015 — Environmental Management"].map((cert) => (
                <div key={cert} className="border border-[#1F93A4]/30 bg-white px-4 py-3">
                  <div className="text-[#1F93A4] text-[11px] font-bold" style={{ fontFamily: B }}>{cert}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFICES MAP SECTION (unchanged from second code) ── */}
      <section className="py-24 bg-[#f6f8f9] border-y border-[#213B4D]/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Reveal className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
              <p className="text-[#F2613C] text-[11px] font-bold  tracking-[0.35em]" style={{ fontFamily: B }}>
                Global Presence
              </p>
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
            </div>
            <h2
              className="text-[#213B4D] "
              style={{ fontFamily: H, fontSize: "clamp(20px, 4vw, 52px)", fontWeight: 600, letterSpacing: "-0.01em" }}
            >
              <ContentText section="contact_offices" name="subtitle" fallback="Operating Across 5 Countries" />
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[1px] bg-[#213B4D]/8">
            {offices.map((o) => (
              <div key={o._key} className="bg-white hover:bg-[#eef1f3] transition-colors p-6 group text-center">
                <div
                  className="text-[#1F93A4] text-[9px] font-bold  tracking-[0.3em] mb-2"
                  style={{ fontFamily: B }}
                >
                  <ContentText section={o._key} name="country" fallback={o.country} />
                </div>
                <div
                  className="text-[#213B4D] text-[15px] font-semibold group-hover:text-[#1F93A4] transition-colors"
                  style={{ fontFamily: B }}
                >
                  <ContentText section={o._key} name="city" fallback={o.city} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (unchanged except email link updated to email) ── */}
      <section className="relative py-28 bg-[#1F93A4] overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <Reveal className="relative z-10 max-w-4xl mx-auto px-6 lg:px-14 text-center">
          <p className="text-white/80 text-[11px] font-bold  tracking-[0.45em] mb-5" style={{ fontFamily: B }}>
            <ContentText section="contact_cta" name="eyebrow" fallback="Let's Start" />
          </p>
          <h2
            className="text-white  leading-[0.92] mb-6"
            style={{ fontFamily: H, fontSize: "clamp(44px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            <ContentText section="contact_cta" name="title" fallback="Your Vision, Our Expertise" />
          </h2>
          <p className="text-white/90 text-[15px] mb-10 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: B }}>
            <ContentText section="contact_cta" name="body" fallback="Whether it is a megaproject or a targeted engineering service, INFRA Construction is ready to deliver." />
          </p>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-3 rounded-md bg-white text-[#213B4D] font-bold px-10 py-4 text-[13px]  tracking-widest hover:bg-[#213B4D] hover:text-white transition-all duration-300"
            style={{ fontFamily: B }}
          >
            <ContentText section="contact_cta" name="buttonText" fallback="Email Us Directly" /> <span>→</span>
          </a>
        </Reveal>
      </section>

      {/* ── MODAL (from first code) ── */}
      {showOptions && (
        <div
          onClick={() => setShowOptions(false)}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-md w-full p-8 relative"
          >
            <button
              onClick={() => setShowOptions(false)}
              className="absolute top-4 right-4 text-[#213B4D]/75 hover:text-[#213B4D] text-2xl leading-none"
            >
              ×
            </button>

            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-px bg-[#1F93A4]" />
              <span className="text-[11px]  tracking-[0.3em] text-[#1F93A4]" style={{ fontFamily: B }}>
                Choose Channel
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#213B4D] mb-2" style={{ fontFamily: H }}>
              How would you like to send it?
            </h3>
            <p className="text-sm text-[#213B4D]/80 mb-6" style={{ fontFamily: B }}>
              Pick any channel below — your message details will be sent along.
            </p>

            <div className="space-y-3">
              <a
                href={`mailto:${email}?subject=${buildSubject()}&body=${buildBody()}`}
                className="flex items-center justify-between border border-[#213B4D]/15 px-5 py-4 hover:border-[#1F93A4] hover:bg-[#F5F5F0] transition"
                style={{ fontFamily: B }}
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#1F93A4]/10 text-[#1F93A4] flex items-center justify-center">✉</span>
                  <span>
                    <span className="block text-[#213B4D] font-semibold text-sm">Email</span>
                    <span className="block text-xs text-[#213B4D]/80">{email}</span>
                  </span>
                </span>
                <span className="text-[#213B4D]/70">→</span>
              </a>

              <a
                href={`tel:${phone}`}
                className="flex items-center justify-between border border-[#213B4D]/15 px-5 py-4 hover:border-[#1F93A4] hover:bg-[#F5F5F0] transition"
                style={{ fontFamily: B }}
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#1F93A4]/10 text-[#1F93A4] flex items-center justify-center">☎</span>
                  <span>
                    <span className="block text-[#213B4D] font-semibold text-sm">Call Us</span>
                    <span className="block text-xs text-[#213B4D]/80">{phone}</span>
                  </span>
                </span>
                <span className="text-[#213B4D]/70">→</span>
              </a>

              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-[#213B4D]/15 px-5 py-4 hover:border-[#1F93A4] hover:bg-[#F5F5F0] transition"
                style={{ fontFamily: B }}
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#1F93A4]/10 text-[#1F93A4] flex items-center justify-center">f</span>
                  <span>
                    <span className="block text-[#213B4D] font-semibold text-sm">Facebook</span>
                    <span className="block text-xs text-[#213B4D]/80">Message us on Facebook</span>
                  </span>
                </span>
                <span className="text-[#213B4D]/70">→</span>
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-[#213B4D]/15 px-5 py-4 hover:border-[#1F93A4] hover:bg-[#F5F5F0] transition"
                style={{ fontFamily: B }}
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#1F93A4]/10 text-[#1F93A4] flex items-center justify-center">in</span>
                  <span>
                    <span className="block text-[#213B4D] font-semibold text-sm">LinkedIn</span>
                    <span className="block text-xs text-[#213B4D]/80">Connect on LinkedIn</span>
                  </span>
                </span>
                <span className="text-[#213B4D]/70">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}