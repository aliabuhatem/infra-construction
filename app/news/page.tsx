import Image from "next/image";
import Link from "next/link";
import { newsItems } from "@/lib/news-data";

const H = "var(--font-barlow-condensed), Arial Narrow, sans-serif";
const B = "var(--font-source-sans), Arial, sans-serif";

export const metadata = {
  title: "News & Updates — INFRA Construction",
  description:
    "Project milestones, certifications, and company developments from across INFRA Construction's global operations.",
};

export default function NewsPage() {
  const [featured, ...rest] = newsItems;

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <Image
          src="/media/news-hero.jpg"
          alt="News & Updates"
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
              Latest Updates
            </p>
          </div>
          <h1
            className="text-white uppercase leading-[0.92] mb-5"
            style={{ fontFamily: H, fontSize: "clamp(52px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            News &<br />Updates
          </h1>
          <p className="text-white/60 text-[15px] max-w-xl leading-relaxed" style={{ fontFamily: B }}>
            Project milestones, partnerships, certifications, and company developments from across our global operations.
          </p>
        </div>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────────────────────── */}
      <div className="bg-[#0d1e28] border-b border-white/5">
        <div
          className="max-w-7xl mx-auto px-6 lg:px-14 py-3 flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase"
          style={{ fontFamily: B }}
        >
          <Link href="/" className="text-white/35 hover:text-[#1F93A4] transition-colors">Home</Link>
          <span className="text-white/20">›</span>
          <span className="text-[#1F93A4]">News</span>
        </div>
      </div>

      {/* ── LINKEDIN BANNER ───────────────────────────────────────────────── */}
      {/* Source note: all news content sourced from INFRA LinkedIn page */}
      <div className="bg-[#213B4D] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-3.5 flex items-center justify-between gap-4">
          <p className="text-white/50 text-[12px]" style={{ fontFamily: B }}>
            Follow us on LinkedIn for the latest updates and project news
          </p>
          <a
            href="https://www.linkedin.com/company/ic-gp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors shrink-0"
            style={{ fontFamily: B }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            INFRA on LinkedIn →
          </a>
        </div>
      </div>

      {/* ── FEATURED ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
            <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
              Featured Story
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-[1px] bg-[#213B4D]/8 overflow-hidden">
            <div className="relative h-64 lg:h-[420px] bg-[#0d1e28]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                quality={100}
                unoptimized
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/60 to-transparent" />
            </div>
            <div className="bg-white p-10 lg:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="bg-[#1F93A4] text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-[0.2em]"
                  style={{ fontFamily: B }}
                >
                  {featured.category}
                </span>
                <span className="text-[#5E5E5E] text-[12px]" style={{ fontFamily: B }}>{featured.date}</span>
              </div>
              <h2
                className="text-[#213B4D] leading-tight mb-5"
                style={{ fontFamily: H, fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 600, letterSpacing: "-0.01em" }}
              >
                {featured.title}
              </h2>
              <p className="text-[#5E5E5E] text-[14px] leading-relaxed mb-7" style={{ fontFamily: B }}>
                {featured.excerpt}
              </p>
              <Link
                href={`/news/${featured.slug}`}
                className="text-[#1F93A4] text-[12px] font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2 hover:gap-3 transition-all"
                style={{ fontFamily: B }}
              >
                Read Full Story <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWS GRID ─────────────────────────────────────────────────────── */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
            <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
              Recent Updates
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#213B4D]/8">
            {rest.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="group bg-white hover:bg-[#f4f6f8] transition-colors overflow-hidden block"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    quality={100}
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28]/20 to-transparent" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="bg-[#1F93A4]/12 text-[#1F93A4] text-[10px] font-bold px-2.5 py-1 uppercase tracking-[0.15em]"
                      style={{ fontFamily: B }}
                    >
                      {item.category}
                    </span>
                    <span className="text-[#5E5E5E] text-[11px]" style={{ fontFamily: B }}>{item.date}</span>
                  </div>
                  <div className="w-5 h-[2px] bg-[#1F93A4] mb-4 group-hover:w-8 transition-all duration-300" />
                  <h3
                    className="text-[#213B4D] font-bold text-[14px] leading-snug mb-3 group-hover:text-[#1F93A4] transition-colors"
                    style={{ fontFamily: B }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#5E5E5E] text-[13px] leading-relaxed line-clamp-3" style={{ fontFamily: B }}>
                    {item.excerpt}
                  </p>
                  <div
                    className="mt-5 text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                    style={{ fontFamily: B }}
                  >
                    Read More <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAY CONNECTED ────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d1e28]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
              <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                Stay Connected
              </p>
            </div>
            <h2
              className="text-white uppercase leading-tight"
              style={{ fontFamily: H, fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 600, letterSpacing: "-0.01em" }}
            >
              Follow Our Latest<br />Developments
            </h2>
            <p className="text-white/50 text-[15px] leading-relaxed mt-5" style={{ fontFamily: B }}>
              All INFRA Construction news and updates are sourced directly from our official LinkedIn page. Follow us to stay up to date with project milestones, new partnerships, certifications, and company news in real time.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end gap-4 flex-wrap">
            <a
              href="https://www.linkedin.com/company/ic-gp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#1F93A4] text-white font-bold px-10 py-4 text-[13px] uppercase tracking-widest hover:bg-white hover:text-[#213B4D] transition-all duration-300"
              style={{ fontFamily: B }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Follow on LinkedIn
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-[#1F93A4] text-[#1F93A4] font-bold px-10 py-4 text-[13px] uppercase tracking-widest hover:bg-[#1F93A4] hover:text-white transition-all duration-300"
              style={{ fontFamily: B }}
            >
              Get in Touch →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
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
            Work With Us
          </p>
          <h2
            className="text-white uppercase leading-[0.92] mb-6"
            style={{ fontFamily: H, fontSize: "clamp(44px, 8vw, 100px)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            Ready to Build<br />Something Great?
          </h2>
          <p className="text-white/65 text-[15px] mb-10 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: B }}>
            Reach out to our team and let us know how INFRA Construction can contribute to your next project.
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