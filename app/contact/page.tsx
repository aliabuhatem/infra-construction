"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ContentText from "@/components/admin-panel/ContentText";

const H = "var(--font-barlow-condensed), Arial Narrow, sans-serif";
const B = "var(--font-source-sans), Arial, sans-serif";

// Contact details (same as first code)
const CONTACT = {
  email: "info@ic-gp.com",
  phone: "+20345680875",
  phoneDisplay: "+20 345680875",
  facebook: "https://www.facebook.com/share/1DznurcqWH/",
  linkedin: "https://www.linkedin.com/company/ic-gp/",
};

const offices = [
  { city: "Abu Dhabi", country: "UAE",    address: "Office 606, EREC Building, Zone 1, Al Danah, Abu Dhabi, UAE",                            license: "CN-2347468", section: "contact_office_1" },
  { city: "Dubai",     country: "UAE",    address: "Office 306, Bld 121, Al Manar Area, Dubai, UAE",                                         license: "1019817",   section: "contact_office_2" },
  { city: "Cairo",     country: "Egypt",  address: "224 Khalid Ibn Al Waleed, South of the Academy, Fifth Settlement, Cairo, Egypt",          license: "162505",    section: "contact_office_3" },
  { city: "Aden",      country: "Yemen",  address: "Bldg. 1, Bader Roundabout, P.O. Box 70116, Khormaksar, Aden, Yemen",                    license: "2769",      section: "contact_office_4" },
  { city: "Ontario",   country: "Canada", address: "3280 Donald Mackay Street, Oakville, Ontario",                                           license: "57582091",  section: "contact_office_5" },
];

export default function ContactPage() {
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
          src="/media/contact us hero section photo.png"
          alt="Contact Us"
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
              <ContentText section="contact_hero" name="eyebrow" fallback="Get in Touch" />
            </p>
          </div>
          <h1
            className="text-white uppercase leading-[0.92] mb-5"
            style={{ fontFamily: H, fontSize: "clamp(52px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            <ContentText section="contact_hero" name="title" fallback="Contact Us" />
          </h1>
          <p className="text-white/60 text-[15px] max-w-xl leading-relaxed" style={{ fontFamily: B }}>
            <ContentText section="contact_hero" name="subtitle" fallback="Reach out to our team across five global offices — we are ready to discuss your project requirements." />
          </p>
        </div>
      </section>

      {/* ── BREADCRUMB (second code) ── */}
      <div className="bg-[#0d1e28] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-3 flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase" style={{ fontFamily: B }}>
          <Link href="/" className="text-white/35 hover:text-[#1F93A4] transition-colors">Home</Link>
          <span className="text-white/20">›</span>
          <span className="text-[#1F93A4]">Contact</span>
        </div>
      </div>

      {/* ── FORM + OFFICES (form replaced with functional version from first code) ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-2 gap-16">
          {/* Functional Form */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
              <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="contact_form" name="eyebrow" fallback="Send a Message" />
              </p>
            </div>
            <h2
              className="text-[#213B4D] uppercase leading-tight mb-10"
              style={{ fontFamily: H, fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, letterSpacing: "-0.01em" }}
            >
              <ContentText section="contact_form" name="title" fallback="Let's Discuss Your Project" />
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#213B4D] text-[10px] font-bold uppercase tracking-[0.25em] mb-2" style={{ fontFamily: B }}>
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
                  <label className="block text-[#213B4D] text-[10px] font-bold uppercase tracking-[0.25em] mb-2" style={{ fontFamily: B }}>
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
                <label className="block text-[#213B4D] text-[10px] font-bold uppercase tracking-[0.25em] mb-2" style={{ fontFamily: B }}>
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
                <label className="block text-[#213B4D] text-[10px] font-bold uppercase tracking-[0.25em] mb-2" style={{ fontFamily: B }}>
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
                <label className="block text-[#213B4D] text-[10px] font-bold uppercase tracking-[0.25em] mb-2" style={{ fontFamily: B }}>
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
                <label className="block text-[#213B4D] text-[10px] font-bold uppercase tracking-[0.25em] mb-2" style={{ fontFamily: B }}>
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
                className="w-full bg-[#213B4D] text-white font-bold py-4 text-[13px] uppercase tracking-widest hover:bg-[#1F93A4] transition-colors duration-300"
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
              <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                <ContentText section="contact_offices" name="eyebrow" fallback="Global Offices" />
              </p>
            </div>
            <h2
              className="text-[#213B4D] uppercase leading-tight mb-10"
              style={{ fontFamily: H, fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, letterSpacing: "-0.01em" }}
            >
              <ContentText section="contact_offices" name="title" fallback="Find Us Worldwide" />
            </h2>
            <div className="space-y-[1px] bg-[#213B4D]/8">
              {offices.map((o) => (
                <div
                  key={o.section}
                  className="bg-white hover:bg-[#f4f6f8] transition-colors px-6 py-5 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="text-[#213B4D] font-bold text-[15px] group-hover:text-[#1F93A4] transition-colors"
                      style={{ fontFamily: B }}
                    >
                      <ContentText section={o.section} name="city" fallback={o.city} />
                    </div>
                    <span
                      className="text-[#1F93A4] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#1F93A4]/30 px-2 py-0.5"
                      style={{ fontFamily: B }}
                    >
                      <ContentText section={o.section} name="country" fallback={o.country} />
                    </span>
                  </div>
                  <div className="text-[#5E5E5E] text-[12px] leading-relaxed" style={{ fontFamily: B }}>
                    <ContentText section={o.section} name="address" fallback={o.address} />
                  </div>
                  <div className="text-[#5E5E5E]/60 text-[11px] mt-1.5 uppercase tracking-wider" style={{ fontFamily: B }}>
                    Lic. <ContentText section={o.section} name="license" fallback={o.license} />
                  </div>
                </div>
              ))}
            </div>

            {/* ISO Badges */}
            <div className="mt-8 bg-[#0d1e28] p-6 flex gap-5 items-center flex-wrap">
              <div className="flex items-center gap-3 mb-2 w-full">
                <div className="w-4 h-[2px] bg-[#1F93A4]" />
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: B }}>
                  Certifications
                </span>
              </div>
              {["ISO 9001:2015 — Quality Management", "ISO 14001:2015 — Environmental Management"].map((cert) => (
                <div key={cert} className="border border-[#1F93A4]/30 px-4 py-3">
                  <div className="text-[#1F93A4] text-[11px] font-bold" style={{ fontFamily: B }}>{cert}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFICES MAP SECTION (unchanged from second code) ── */}
      <section className="py-24 bg-[#213B4D]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
              <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                Global Presence
              </p>
              <div className="w-6 h-[2px] bg-[#1F93A4]" />
            </div>
            <h2
              className="text-white uppercase"
              style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 600, letterSpacing: "-0.01em" }}
            >
              <ContentText section="contact_offices" name="subtitle" fallback="Operating Across 5 Countries" />
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[1px] bg-white/5">
            {offices.map((o) => (
              <div key={o.section} className="bg-[#213B4D] hover:bg-[#1a2f3d] transition-colors p-6 group text-center">
                <div
                  className="text-[#1F93A4] text-[9px] font-bold uppercase tracking-[0.3em] mb-2"
                  style={{ fontFamily: B }}
                >
                  <ContentText section={o.section} name="country" fallback={o.country} />
                </div>
                <div
                  className="text-white text-[15px] font-semibold group-hover:text-[#1F93A4] transition-colors"
                  style={{ fontFamily: B }}
                >
                  <ContentText section={o.section} name="city" fallback={o.city} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (unchanged except email link updated to CONTACT.email) ── */}
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
            <ContentText section="contact_cta" name="eyebrow" fallback="Let's Start" />
          </p>
          <h2
            className="text-white uppercase leading-[0.92] mb-6"
            style={{ fontFamily: H, fontSize: "clamp(44px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            <ContentText section="contact_cta" name="title" fallback="Your Vision, Our Expertise" />
          </h2>
          <p className="text-white/65 text-[15px] mb-10 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: B }}>
            <ContentText section="contact_cta" name="body" fallback="Whether it is a megaproject or a targeted engineering service, INFRA Construction is ready to deliver." />
          </p>
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-3 bg-white text-[#213B4D] font-bold px-10 py-4 text-[13px] uppercase tracking-widest hover:bg-[#213B4D] hover:text-white transition-all duration-300"
            style={{ fontFamily: B }}
          >
            <ContentText section="contact_cta" name="buttonText" fallback="Email Us Directly" /> <span>→</span>
          </a>
        </div>
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
              className="absolute top-4 right-4 text-[#213B4D]/50 hover:text-[#213B4D] text-2xl leading-none"
            >
              ×
            </button>

            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-px bg-[#1F93A4]" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#1F93A4]" style={{ fontFamily: B }}>
                Choose Channel
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#213B4D] mb-2" style={{ fontFamily: H }}>
              How would you like to send it?
            </h3>
            <p className="text-sm text-[#213B4D]/60 mb-6" style={{ fontFamily: B }}>
              Pick any channel below — your message details will be sent along.
            </p>

            <div className="space-y-3">
              <a
                href={`mailto:${CONTACT.email}?subject=${buildSubject()}&body=${buildBody()}`}
                className="flex items-center justify-between border border-[#213B4D]/15 px-5 py-4 hover:border-[#1F93A4] hover:bg-[#F5F5F0] transition"
                style={{ fontFamily: B }}
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#1F93A4]/10 text-[#1F93A4] flex items-center justify-center">✉</span>
                  <span>
                    <span className="block text-[#213B4D] font-semibold text-sm">Email</span>
                    <span className="block text-xs text-[#213B4D]/60">{CONTACT.email}</span>
                  </span>
                </span>
                <span className="text-[#213B4D]/40">→</span>
              </a>

              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center justify-between border border-[#213B4D]/15 px-5 py-4 hover:border-[#1F93A4] hover:bg-[#F5F5F0] transition"
                style={{ fontFamily: B }}
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#1F93A4]/10 text-[#1F93A4] flex items-center justify-center">☎</span>
                  <span>
                    <span className="block text-[#213B4D] font-semibold text-sm">Call Us</span>
                    <span className="block text-xs text-[#213B4D]/60">{CONTACT.phoneDisplay}</span>
                  </span>
                </span>
                <span className="text-[#213B4D]/40">→</span>
              </a>

              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-[#213B4D]/15 px-5 py-4 hover:border-[#1F93A4] hover:bg-[#F5F5F0] transition"
                style={{ fontFamily: B }}
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#1F93A4]/10 text-[#1F93A4] flex items-center justify-center">f</span>
                  <span>
                    <span className="block text-[#213B4D] font-semibold text-sm">Facebook</span>
                    <span className="block text-xs text-[#213B4D]/60">Message us on Facebook</span>
                  </span>
                </span>
                <span className="text-[#213B4D]/40">→</span>
              </a>

              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-[#213B4D]/15 px-5 py-4 hover:border-[#1F93A4] hover:bg-[#F5F5F0] transition"
                style={{ fontFamily: B }}
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#1F93A4]/10 text-[#1F93A4] flex items-center justify-center">in</span>
                  <span>
                    <span className="block text-[#213B4D] font-semibold text-sm">LinkedIn</span>
                    <span className="block text-xs text-[#213B4D]/60">Connect on LinkedIn</span>
                  </span>
                </span>
                <span className="text-[#213B4D]/40">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}