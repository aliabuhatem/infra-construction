import Link from "next/link";
import Image from "next/image";
import type { Expertise } from "@/lib/expertise";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const H = "var(--font-myriad), system-ui, -apple-system, sans-serif";
const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

interface Props {
  item: Expertise;
  kind: "service" | "sector";
  related: Expertise[];
}

/* Rich, animated detail page shared by /services/[slug] and /sectors/[slug]. */

export default function ExpertiseDetail({ item, kind, related }: Props) {
  const base = kind === "service" ? "/services" : "/sectors";
  const hubLabel = kind === "service" ? "Services" : "Sectors";
  const kicker = kind === "service" ? "Our Services" : "Our Sectors";

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[62vh] items-end overflow-hidden pt-24">
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/95 via-[#0d1e28]/75 to-[#213B4D]/35" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-14 text-shadow-legible">
          <Reveal>
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-md bg-[#1F93A4] text-white text-[22px] font-bold shadow-lg shadow-[#1F93A4]/30" style={{ fontFamily: H }}>
                {item.num}
              </span>
              <span className="text-[13px] font-bold tracking-[0.35em] text-[#F2613C]" style={{ fontFamily: B }}>
                {kicker} · {item.num}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              className="mb-5 max-w-4xl leading-[1.02] text-white"
              style={{ fontFamily: H, fontSize: "clamp(38px, 6vw, 76px)", fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              {item.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-2xl text-[18px] leading-relaxed text-white/90" style={{ fontFamily: B }}>
              {item.summary}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────────────────────── */}
      <div className="border-b border-[#213B4D]/10 bg-[#f6f8f9]">
        <div
          className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-[12px] tracking-[0.1em] lg:px-14"
          style={{ fontFamily: B }}
        >
          <Link href="/" className="text-[#5E5E5E] transition-colors hover:text-[#1F93A4]">Home</Link>
          <span className="text-[#213B4D]/25">›</span>
          <Link href={base} className="text-[#5E5E5E] transition-colors hover:text-[#1F93A4]">{hubLabel}</Link>
          <span className="text-[#213B4D]/25">›</span>
          <span className="font-semibold text-[#1F93A4]">{item.title}</span>
        </div>
      </div>

      {/* ── OVERVIEW + CAPABILITIES ───────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-14">
          {/* Overview — hidden until the item has copy, so a newly added
              sector doesn't render a heading over nothing. */}
          {item.description.length > 0 && (
          <div className={item.capabilities.length > 0 ? "lg:col-span-7" : "lg:col-span-12"}>
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#1F93A4]" />
                <span className="text-[11px] font-bold tracking-[0.32em] text-[#1F93A4]" style={{ fontFamily: B }}>
                  Overview
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mb-6 leading-tight text-[#213B4D]"
                style={{ fontFamily: H, fontSize: "clamp(26px, 3.4vw, 42px)", fontWeight: 700, letterSpacing: "-0.01em" }}
              >
                What This {kind === "service" ? "Service" : "Sector"} Delivers
              </h2>
            </Reveal>
            <div className="space-y-5">
              {item.description.map((para, i) => (
                <Reveal key={i} delay={0.08 + i * 0.06}>
                  <p className="text-[16px] leading-relaxed text-[#5E5E5E]" style={{ fontFamily: B }}>
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          )}

          {/* Capabilities card — likewise hidden while the list is empty. */}
          {item.capabilities.length > 0 && (
          <div className={item.description.length > 0 ? "lg:col-span-5" : "lg:col-span-12"}>
            <Reveal direction="left">
              <div className="rounded-xl bg-[#0d1e28] p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-[2px] w-6 bg-[#1F93A4]" />
                  <span className="text-[11px] font-bold tracking-[0.32em] text-[#1F93A4]" style={{ fontFamily: B }}>
                    Capabilities
                  </span>
                </div>
                <Stagger className="space-y-3">
                  {item.capabilities.map((cap, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-center gap-3 border-b border-white/8 pb-3 last:border-0">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1F93A4]/15 text-[11px] font-bold text-[#1F93A4]" style={{ fontFamily: H }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[14px] text-white/85" style={{ fontFamily: B }}>{cap}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </div>
          )}
        </div>
      </section>

      {/* ── RELATED ───────────────────────────────────────────────────────── */}
      <section className="border-t border-[#213B4D]/8 bg-[#f6f8f9] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-14">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-5">
              <h2
                className="leading-tight text-[#213B4D]"
                style={{ fontFamily: H, fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700 }}
              >
                Explore More {hubLabel}
              </h2>
              <Link
                href={base}
                className="shrink-0 text-[12px] font-bold tracking-[0.15em] text-[#213B4D]/75 transition-colors hover:text-[#1F93A4]"
                style={{ fontFamily: B }}
              >
                View All {hubLabel} →
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.05}>
                <Link
                  href={`${base}/${r.slug}`}
                  className="group flex h-full items-start gap-3 rounded-lg border border-[#213B4D]/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#1F93A4] hover:shadow-lg"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#1F93A4]/10 text-[12px] font-bold text-[#1F93A4] transition-colors group-hover:bg-[#1F93A4] group-hover:text-white" style={{ fontFamily: H }}>
                    {r.num}
                  </span>
                  <span className="text-[13px] font-bold leading-snug text-[#213B4D] transition-colors group-hover:text-[#1F93A4]" style={{ fontFamily: B }}>
                    {r.title}
                  </span>
                </Link>
              </Reveal>
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
              style={{ fontFamily: H, fontSize: "clamp(34px, 6vw, 68px)", fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              Let's Discuss Your Project
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mb-9 max-w-lg text-[17px] leading-relaxed text-white/90" style={{ fontFamily: B }}>
              Our specialists are ready to tailor {item.title} to your specific requirements.
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
