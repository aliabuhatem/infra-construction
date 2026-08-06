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
  const subsectors = item.subsectors ?? [];
  const rail: { label: string; href?: string }[] =
    subsectors.length > 0
      ? subsectors.map((s) => ({ label: s.title, href: `#${s.slug}` }))
      : item.capabilities.map((c) => ({ label: c }));
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

          {/* Capabilities card — likewise hidden while the list is empty. When
              the item has subsectors this doubles as a jump list into the
              sections below, rather than repeating their titles inertly. */}
          {rail.length > 0 && (
          <div className={item.description.length > 0 ? "lg:col-span-5" : "lg:col-span-12"}>
            <Reveal direction="left">
              <div className="rounded-xl bg-[#0d1e28] p-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-[2px] w-6 bg-[#1F93A4]" />
                  <span className="text-[11px] font-bold tracking-[0.32em] text-[#1F93A4]" style={{ fontFamily: B }}>
                    {subsectors.length > 0 ? "In This Sector" : "Capabilities"}
                  </span>
                </div>
                <Stagger className="space-y-3">
                  {rail.map((row, i) => {
                    const body = (
                      <>
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1F93A4]/15 text-[11px] font-bold text-[#1F93A4]" style={{ fontFamily: H }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[14px] text-white/85" style={{ fontFamily: B }}>{row.label}</span>
                      </>
                    );
                    const cls = "flex items-center gap-3 border-b border-white/8 pb-3 last:border-0";
                    return (
                      <StaggerItem key={i}>
                        {row.href ? (
                          <a href={row.href} className={`${cls} group transition-colors hover:text-white`}>
                            {body}
                          </a>
                        ) : (
                          <div className={cls}>{body}</div>
                        )}
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </div>
            </Reveal>
          </div>
          )}
        </div>
      </section>

      {/* ── SUBSECTORS ────────────────────────────────────────────────────── */}
      {subsectors.length > 0 && (
        <section className="border-t border-[#213B4D]/8 bg-[#f6f8f9] py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-14">
            <Reveal>
              <div className="mb-14 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#1F93A4]" />
                <span className="text-[11px] font-bold tracking-[0.32em] text-[#1F93A4]" style={{ fontFamily: B }}>
                  What We Deliver
                </span>
              </div>
            </Reveal>

            <div className="space-y-20">
              {subsectors.map((sub, i) => (
                /* scroll-mt clears the fixed header when the navbar links
                   straight to one of these anchors. */
<div key={sub.slug} id={sub.slug} className="scroll-mt-32">
                  <div className="grid gap-10 lg:grid-cols-12">
                    <Reveal
                      direction={i % 2 === 0 ? "right" : "left"}
                      className={`h-full lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                    >
                      <div className="relative h-full min-h-[18rem] w-full overflow-hidden rounded-xl">
                        <Image
                          src={sub.image}
                          alt={sub.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28]/45 to-transparent" />
                        <span
                          className="absolute left-5 top-4 text-[30px] font-bold leading-none text-white/90"
                          style={{ fontFamily: H }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </Reveal>

            <div className={`flex flex-col justify-center lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                      <Reveal>
                        <h3
                          className="mb-5 leading-tight text-[#213B4D]"
                          style={{ fontFamily: H, fontSize: "clamp(22px, 2.6vw, 32px)", fontWeight: 700, letterSpacing: "-0.01em" }}
                        >
                          {sub.title}
                        </h3>
                      </Reveal>
                      <div className="space-y-4">
                        {sub.description.map((para, p) => (
                          <Reveal key={p} delay={0.05 + p * 0.05}>
                            <p className="text-[15.5px] leading-relaxed text-[#5E5E5E]" style={{ fontFamily: B }}>
                              {para}
                            </p>
                          </Reveal>
                        ))}
                      </div>

                      {sub.points.length > 0 && (
                        <Stagger className="mt-6 space-y-4">
                          {sub.points.map((point, p) => {
                            // "Label: detail" — the lead-in reads as a heading.
                            const at = point.indexOf(":");
                            const label = at > 0 ? point.slice(0, at) : "";
                            const rest = at > 0 ? point.slice(at + 1).trim() : point;
                            return (
                              <StaggerItem key={p}>
                                <div className="flex gap-3.5">
                                  <span className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#1F93A4]" />
                                  <p className="text-[15px] leading-relaxed text-[#5E5E5E]" style={{ fontFamily: B }}>
                                    {label && (
                                      <span className="font-bold text-[#213B4D]">{label}: </span>
                                    )}
                                    {rest}
                                  </p>
                                </div>
                              </StaggerItem>
                            );
                          })}
                        </Stagger>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
