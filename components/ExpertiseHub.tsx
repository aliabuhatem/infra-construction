import Link from "next/link";
import Image from "next/image";
import type { Expertise } from "@/lib/expertise";
import ExpertiseCard from "@/components/ExpertiseCard";
import { Reveal, Counter } from "@/components/motion";

const H = "var(--font-myriad), system-ui, -apple-system, sans-serif";
const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

interface Stat { value: string; label: string }

interface Props {
  kind: "service" | "sector";
  items: Expertise[];
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  heroImage: string;
  stats: Stat[];
  ctaTitle?: string;
  ctaBody?: string;
}

/* Shared hub (index) page for the 14 Services and 7 Sectors. */

export default function ExpertiseHub({
  kind, items, eyebrow, title, subtitle, intro, heroImage, stats,
  ctaTitle = "Have a Project in Mind?",
  ctaBody = "Partner with INFRA Construction for engineering precision and dependable delivery.",
}: Props) {
  const base = kind === "service" ? "/services" : "/sectors";
  const label = kind === "service" ? "Services" : "Sectors";

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[58vh] items-end overflow-hidden pt-24">
        <Image src={heroImage} alt={title} fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/95 via-[#0d1e28]/70 to-[#213B4D]/30" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-14 text-shadow-legible">
          <Reveal>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#1F93A4]" />
              <span className="text-[12px] font-bold tracking-[0.35em] text-[#F2613C]" style={{ fontFamily: B }}>
                {eyebrow}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              className="mb-5 leading-[0.98] text-white"
              style={{ fontFamily: H, fontSize: "clamp(46px, 8vw, 96px)", fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-2xl text-[18px] leading-relaxed text-white/90" style={{ fontFamily: B }}>
              {subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── INTRO + STATS ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-end gap-12 px-6 lg:grid-cols-12 lg:px-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[19px] leading-relaxed text-[#213B4D]" style={{ fontFamily: B }}>
                {intro}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-[1px] overflow-hidden rounded-lg bg-[#213B4D]/8">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06}>
                  <div className="h-full bg-white p-6">
                    <Counter
                      value={s.value}
                      className="mb-1 block leading-none text-[#1F93A4]"
                      style={{ fontFamily: H, fontSize: "clamp(34px, 4vw, 50px)", fontWeight: 700 }}
                    />
                    <span className="text-[11px] font-semibold tracking-[0.18em] text-[#5E5E5E]" style={{ fontFamily: B }}>
                      {s.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CARDS GRID ────────────────────────────────────────────────────── */}
      <section className="border-t border-[#213B4D]/8 bg-[#f6f8f9] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <Reveal>
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2
                className="leading-tight text-[#213B4D]"
                style={{ fontFamily: H, fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700, letterSpacing: "-0.01em" }}
              >
                All {items.length} {label}
              </h2>
              <p className="max-w-sm text-[14px] leading-relaxed text-[#5E5E5E]" style={{ fontFamily: B }}>
                Select any {kind} to explore its full scope, capabilities, and how we deliver it.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, i) => (
              <ExpertiseCard key={item.slug} item={item} base={base} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1F93A4] py-24">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "22px 22px" }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-14">
          <Reveal>
            <h2
              className="mb-6 leading-[1.02] text-white"
              style={{ fontFamily: H, fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              {ctaTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mb-9 max-w-lg text-[17px] leading-relaxed text-white/90" style={{ fontFamily: B }}>
              {ctaBody}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-md bg-white px-10 py-4 text-[13px] font-bold tracking-[0.12em] text-[#213B4D] transition-all duration-300 hover:bg-[#0d1e28] hover:text-white"
              style={{ fontFamily: B }}
            >
              Contact Our Team <span>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
