import Link from "next/link";
import Image from "next/image";
import type { Expertise } from "@/lib/expertise";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import WorkProjectCard, { type WorkProject } from "@/components/WorkProjectCard";
import { imageSize } from "@/lib/image-size";

const H = "var(--font-myriad), system-ui, -apple-system, sans-serif";
const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

interface Props {
  item: Expertise;
  kind: "service" | "sector";
  related: Expertise[];
  /* Work delivered in this sector, picked by the caller. Empty on service
     pages, which have no category of their own to select against. */
  projects?: WorkProject[];
}

/* Rich, animated detail page shared by /services/[slug] and /sectors/[slug]. */

export default function ExpertiseDetail({ item, kind, related, projects = [] }: Props) {
  const subsectors = item.subsectors ?? [];
  /* The rail is two different things wearing one layout: a table of contents
     on a sector page, an inert capability list on a service page. Only the
     first is interactive, so the styling below keys off this rather than
     giving static text link affordances it can't honour. */
  const isNav = subsectors.length > 0;
  const rail: { label: string; href?: string }[] = isNav
    ? subsectors.map((s) => ({ label: s.title, href: `#${s.slug}` }))
    : item.capabilities.map((c) => ({ label: c }));
  /* The rail runs as two side-by-side columns filled top-to-bottom (1–3 left,
     4–6 right), which is what keeps the box wide rather than tall. Below four
     rows a split would leave two lonely columns, so short rails stay single. */
  /* The hero band mirrors its photo's proportions. 16/9 is the stand-in when
     the file can't be measured (missing, or a format the reader doesn't cover)
     — the same shape the heroes had before, so nothing regresses. */
  const heroDims = imageSize(item.image);
  const heroRatio = heroDims ? `${heroDims.width} / ${heroDims.height}` : "16 / 9";
  const railTwoCol = rail.length >= 4;
  const railRows = Math.ceil(rail.length / 2);
  const base = kind === "service" ? "/services" : "/sectors";
  const hubLabel = kind === "service" ? "Services" : "Sectors";
  const kicker = kind === "service" ? "Our Services" : "Our Sectors";

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      {/* The band takes the photo's own aspect ratio, so `object-cover` has
          nothing left to trim — the previous fixed `min-h-[62vh]` cut roughly
          half the height off any image that wasn't extremely wide.

          Image and copy are stacked in one grid cell rather than the copy being
          absolutely positioned: the row is then as tall as whichever is taller,
          so on a narrow screen — where a landscape photo is only a couple of
          hundred pixels tall — the text extends the section over the navy
          background instead of overflowing a fixed box. */}
      {/* grid-cols-1 rather than a bare `grid`: it lays the column out as
          minmax(0,1fr), so the copy's own max-width can't stretch the column
          past the viewport on a narrow screen. */}
      <section className="relative grid grid-cols-1 overflow-hidden bg-[#0d1e28]">
        <div
          className="col-start-1 row-start-1 relative w-full"
          style={{ aspectRatio: heroRatio }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1e28]/95 via-[#0d1e28]/75 to-[#213B4D]/35" />
        </div>
        <div className="col-start-1 row-start-1 z-10 mx-auto flex w-full max-w-7xl flex-col justify-end px-6 pt-28 pb-16 lg:px-14 text-shadow-legible">
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
          /* The copy column yields the wider half to the quote box beside it:
             the box carries two columns of rows and needs the room, while the
             paragraphs read better at a narrower measure anyway. Keyed off
             `rail` rather than `capabilities` so a sector whose rows come from
             its subsectors still gets the split. */
          <div className={rail.length > 0 ? "lg:col-span-5" : "lg:col-span-12"}>
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
          <div className={item.description.length > 0 ? "lg:col-span-7" : "lg:col-span-12"}>
            {/* Pinned only when the rows actually go somewhere: on a sector
                page this is a table of contents and earns its keep by staying
                in view while the subsectors scroll past. `top-32` matches the
                `scroll-mt-32` on the anchors, so the card clears the fixed
                header by exactly as much as its targets do.

                The sticky lives on the Reveal itself, not on a wrapper inside
                it: sticky needs a containing block taller than the element,
                and only this grid column gets stretched to the row height. */}
            <Reveal direction="left" className={isNav ? "lg:sticky lg:top-32" : undefined}>
              {/* Pull-quote treatment: the teal spine down the left edge and the
                  oversized glyph behind the header turn what was a plain list
                  card into a callout, without introducing a colour the page
                  doesn't already use. */}
              <div className="relative overflow-hidden rounded-2xl border-l-[3px] border-[#1F93A4] bg-[#0d1e28] p-7 shadow-[0_28px_60px_-32px_rgba(13,30,40,0.9)] ring-1 ring-white/10 sm:p-9">
                {/* Depth without a second colour — one soft teal bloom off the
                    corner, under the content. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#1F93A4]/25 blur-3xl"
                />
                {/* Watermark quote mark. `leading-none` puts the glyph's ink in
                    roughly the top third of its own box, so the offsets here are
                    what lands it behind the label rather than above the card's
                    clipped top edge. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-4 left-2 select-none text-[160px] leading-none text-[#1F93A4]/20"
                  style={{ fontFamily: H }}
                >
                  &ldquo;
                </span>

                <div className="relative mb-6 flex items-center gap-3">
                  <span className="h-[2px] w-6 bg-[#1F93A4]" />
                  <span className="text-[11px] font-bold tracking-[0.32em] text-[#1F93A4]" style={{ fontFamily: B }}>
                    {isNav ? "In This Sector" : "Capabilities"}
                  </span>
                  {/* Same count treatment as the Reference Projects card, so
                      both index blocks on the page read as one family. */}
                  <span className="ml-auto text-[11px] font-bold text-white/30" style={{ fontFamily: H }}>
                    {String(rail.length).padStart(2, "0")}
                  </span>
                </div>

                {/* One list, two columns: `grid-flow-col` over an explicit row
                    count fills the left column before starting the right, so
                    reading order still matches the numbering. The row count is
                    derived from the list length, which Tailwind can't express
                    as a static class — hence the inline `gridTemplateRows`. It
                    is inert until the `sm:grid` kicks in, so the stacked mobile
                    layout is unaffected. */}
                <Stagger
                  as="ul"
                  className={`relative flex list-none flex-col p-0${
                    railTwoCol ? " sm:grid sm:grid-flow-col sm:gap-x-8" : ""
                  }`}
                  style={railTwoCol ? { gridTemplateRows: `repeat(${railRows}, auto)` } : undefined}
                >
                  {rail.map((row, i) => {
                    /* Squared badge rather than the old filled circle: it
                       echoes the `num` chip in the hero, and a column of six
                       circles read as a stack of blobs. */
                    const index = (
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-[11px] font-bold text-[#1F93A4] ring-1 ring-white/10${
                          isNav ? " transition-colors duration-300 group-hover:bg-[#1F93A4] group-hover:text-white group-hover:ring-[#1F93A4]" : ""
                        }`}
                        style={{ fontFamily: H }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    );
                    const label = (
                      <span
                        className={`text-[14px] leading-snug text-white/85${
                          isNav ? " transition-colors duration-300 group-hover:text-white" : ""
                        }`}
                        style={{ fontFamily: B }}
                      >
                        {row.label}
                      </span>
                    );
                    return (
                      /* Symmetric py + the divider on the <li>: the old
                         `space-y-3` with `pb-3` left each rule 12px under its
                         own row but 12px clear of the next, so it read as
                         attached to the wrong item.

                         `last:border-0` alone would leave a rule dangling under
                         the foot of the left column, so the bottom row of each
                         column drops its divider explicitly. */
                      <StaggerItem
                        as="li"
                        key={i}
                        className={
                          i === rail.length - 1
                            ? undefined
                            : railTwoCol && i === railRows - 1
                              ? "border-b border-white/10 sm:border-0"
                              : "border-b border-white/10"
                        }
                      >
                        {row.href ? (
                          <a href={row.href} className="group flex items-center gap-3.5 py-3.5">
                            {index}
                            {label}
                            {/* Reserved space (ml-auto + pl-2) so the arrow
                                arriving on hover never reflows the label. */}
                            <span
                              aria-hidden
                              className="ml-auto -translate-x-1 pl-2 text-[13px] text-[#1F93A4] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                            >
                              →
                            </span>
                          </a>
                        ) : (
                          <div className="flex items-center gap-3.5 py-3.5">
                            {index}
                            {label}
                          </div>
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
      {/* pb is lighter than pt because the last block carries its own bottom
          padding-block, as every block does. */}
      {subsectors.length > 0 && (
        <section className="border-t border-[#213B4D]/8 bg-[#f6f8f9] pt-24 pb-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-14">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#1F93A4]" />
                <span className="text-[11px] font-bold tracking-[0.32em] text-[#1F93A4]" style={{ fontFamily: B }}>
                  What We Deliver
                </span>
              </div>
            </Reveal>

            {/* Every block shares one vertical rhythm (--subsector-block-gap)
                and one image box (--subsector-media-ratio), both set in
                globals.css, so no block's proportions depend on its own photo
                or on how much copy it carries. */}
            <div>
              {subsectors.map((sub, i) => (
                /* scroll-mt clears the fixed header when the navbar links
                   straight to one of these anchors. */
                <div key={sub.slug} id={sub.slug} className="subsector-block scroll-mt-32">
                  {/* items-center keeps the shorter column centred against the
                      taller one, so light copy doesn't strand at the top. */}
                  <div className="grid items-center gap-10 lg:grid-cols-12">
                    <Reveal
                      direction={i % 2 === 0 ? "right" : "left"}
                      className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                    >
                      <div className="subsector-media rounded-xl">
                        <Image
                          src={sub.image}
                          alt={sub.title}
                          fill
                          className="object-cover object-center"
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

                    <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                      {/* One Reveal for the whole copy column: a per-paragraph
                          wrapper made each line its own animated block, which is
                          what opened the oversized gaps between them. */}
                      <Reveal>
                        <h3
                          className="mb-4 leading-tight text-[#213B4D]"
                          style={{ fontFamily: H, fontSize: "clamp(22px, 2.6vw, 32px)", fontWeight: 700, letterSpacing: "-0.01em" }}
                        >
                          {sub.title}
                        </h3>
                        {/* Tailwind's preflight already zeroes <p> margins, so
                            space-y-3 alone sets the rhythm — an explicit m-0
                            here would beat it and run the paragraphs together. */}
                        <div className="space-y-3">
                          {sub.description.map((para, p) => (
                            <p key={p} className="text-[15.5px] leading-[1.6] text-[#5E5E5E]" style={{ fontFamily: B }}>
                              {para}
                            </p>
                          ))}
                        </div>
                      </Reveal>

                      {sub.points.length > 0 && (
                        <Stagger as="ul" className="mt-5 list-none space-y-3 p-0">
                          {sub.points.map((point, p) => {
                            /* Each line of the admin "points" field is one
                               highlighted bullet. Three shapes occur in the
                               copy, so all three have to read as deliberate:
                                 "Label: detail" → bold lead-in + body detail
                                 a bare list item → emphasised whole
                                 a longer bare sentence → body weight, so a
                                 paragraph-length line doesn't shout.
                               The label cap stops a colon mid-sentence from
                               bolding half the line. */
                            const at = point.indexOf(":");
                            const hasLabel = at > 0 && at <= 60 && point.length > at + 1;
                            const label = hasLabel ? point.slice(0, at) : "";
                            const rest = hasLabel ? point.slice(at + 1).trim() : point;
                            const emphasise = !hasLabel && rest.length <= 80;
                            return (
                              <StaggerItem
                                as="li"
                                key={p}
                                /* Same size + leading as the paragraphs above,
                                   so every line in the block sits on one
                                   24.8px rhythm. */
                                className="flex gap-3.5 text-[15.5px] leading-[1.6] text-[#5E5E5E]"
                              >
                                {/* Nudged onto the first line's optical centre:
                                    (1.6 × 15.5px − 6px) / 2 ≈ 9px. */}
                                <span className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#1F93A4]" />
                                <span
                                  style={{ fontFamily: B }}
                                  className={emphasise ? "font-semibold text-[#213B4D]" : undefined}
                                >
                                  {label && (
                                    <span className="font-bold text-[#213B4D]">{label}: </span>
                                  )}
                                  {rest}
                                </span>
                              </StaggerItem>
                            );
                          })}
                        </Stagger>
                      )}
                    </div>
                  </div>

                  {/* Reference projects — full width beneath the row rather than
                      inside the copy column: the longest lists run to ten
                      entries, which would tower over the paired photo and break
                      the alternating rhythm every other block depends on. */}
                  {(sub.projects?.length ?? 0) > 0 && (
                    <Reveal>
                      <div className="mt-8 rounded-xl border border-[#213B4D]/10 bg-white p-6 sm:p-7">
                        <div className="mb-5 flex items-center gap-3">
                          <span className="h-[2px] w-6 bg-[#F2613C]" />
                          <span
                            className="text-[11px] font-bold tracking-[0.28em] text-[#213B4D]"
                            style={{ fontFamily: B }}
                          >
                            Reference Projects
                          </span>
                          <span
                            className="text-[11px] font-bold text-[#213B4D]/35"
                            style={{ fontFamily: H }}
                          >
                            {String(sub.projects!.length).padStart(2, "0")}
                          </span>
                        </div>
                        {/* Names wrap to two or three lines at narrow widths, so
                            the columns are balanced by the grid rather than by
                            an even split of the list. */}
                        <Stagger as="ul" className="subsector-projects list-none p-0">
                          {sub.projects!.map((project, p) => (
                            <StaggerItem
                              as="li"
                              key={p}
                              className="flex gap-3 border-b border-[#213B4D]/8 py-2.5 text-[14.5px] leading-[1.55] text-[#213B4D]"
                            >
                              {/* Same optical-centre nudge as the bullets
                                  above: (1.55 × 14.5px − 7px) / 2 ≈ 8px. */}
                              <span
                                className="mt-[8px] h-[7px] w-[7px] shrink-0 rotate-45 bg-[#1F93A4]/60"
                                aria-hidden
                              />
                              <span style={{ fontFamily: B }}>{project}</span>
                            </StaggerItem>
                          ))}
                        </Stagger>
                      </div>
                    </Reveal>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PROJECTS ──────────────────────────────────────────────────────── */}
      {/* Same eyebrow, heading rhythm and card as the home page's Our Work
          block, and the same selection rule (the first entries in the admin
          panel's order), so the strip reads as that section scoped to one
          sector rather than a second, competing project treatment. */}
      {projects.length > 0 && (
        <section className="border-t border-[#213B4D]/8 bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-14">
            <Reveal>
              <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="mb-3 text-[11px] font-bold tracking-[0.35em] text-[#F2613C]" style={{ fontFamily: B }}>
                    Our Work
                  </p>
                  <h2
                    className="leading-tight text-[#213B4D]"
                    style={{ fontFamily: H, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.01em" }}
                  >
                    {item.title} Projects
                  </h2>
                </div>
                <Link
                  href="/projects"
                  className="group flex shrink-0 items-center gap-2 text-[12px] font-bold tracking-widest text-[#213B4D]/70 transition-colors hover:text-[#1F93A4]"
                  style={{ fontFamily: B }}
                >
                  View All Featured Projects{" "}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              {projects.map((p, i) => (
                <Reveal key={p.sectionKey} delay={i * 0.08} className="h-full">
                  <WorkProjectCard project={p} />
                </Reveal>
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
