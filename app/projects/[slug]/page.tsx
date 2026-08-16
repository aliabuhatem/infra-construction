import Link from "next/link";
import { notFound } from "next/navigation";
import ContentText from "@/components/admin-panel/ContentText";
import MediaImage from "@/components/admin-panel/MediaImage";
import { getContent } from "@/lib/getContent";
import { resolveProjects, getProjectBySlug, relatedProjects, type Project } from "@/lib/projects";
import { Reveal } from "@/components/motion";

const H = "var(--font-myriad), system-ui, -apple-system, sans-serif";
const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

export async function generateStaticParams() {
  try {
    const c = await getContent();
    return resolveProjects(c).map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const c = await getContent();
    const p = getProjectBySlug(c, slug);
    if (!p) return { title: "Project — INFRA Construction" };
    return {
      title: `${p.title || slug} — INFRA Construction`,
      description: p.description || "",
      openGraph: {
        title: p.title || "",
        description: p.description || "",
        images: p.image ? [p.image] : [],
        type: "article",
      },
    };
  } catch {
    return { title: "Project — INFRA Construction" };
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getContent();
  const project = getProjectBySlug(c, slug);
  if (!project) notFound();

  const related = relatedProjects(resolveProjects(c), project);

  /* "At a glance" rows. Country/sector/type are on every project; the rest are
     optional admin fields, so only the ones that were filled in get a row. */
  const facts: { label: string; name: string; value: string }[] = [
    { label: "Country",  name: "country",  value: project.country },
    { label: "Sector",   name: "sector",   value: project.sector },
    { label: "Type",     name: "type",     value: project.type },
    { label: "Client",   name: "client",   value: project.client || "" },
    { label: "Role",     name: "role",     value: project.role || "" },
    { label: "Principal Contractor", name: "principalContractor", value: project.principalContractor || "" },
    { label: "Year",     name: "year",     value: project.year || "" },
    { label: "Duration", name: "duration", value: project.duration || "" },
    { label: "Value",    name: "value",    value: project.value || "" },
    { label: "Status",   name: "status",   value: project.status || "" },
  ].filter((f) => f.value.trim() !== "");

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden bg-[#0d1e28]">
        <MediaImage
          category={project.sectionKey}
          title={`${project.sectionKey}_image`}
          fallbackSrc={project.image}
          alt={project.title}
          className="absolute inset-0 object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28] via-[#0d1e28]/70 to-[#0d1e28]/20" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-14 pb-16 w-full text-shadow-legible">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {project.country && (
              <span className="bg-[#1F93A4] text-white text-[10px] font-bold px-3 py-1.5 tracking-[0.2em]" style={{ fontFamily: B }}>
                <ContentText section={project.sectionKey} name="country" fallback={project.country} />
              </span>
            )}
            {project.type && (
              <span className="bg-white/15 text-white text-[10px] font-bold px-3 py-1.5 tracking-[0.2em]" style={{ fontFamily: B }}>
                <ContentText section={project.sectionKey} name="type" fallback={project.type} />
              </span>
            )}
            {project.sector && (
              <span className="text-white/85 text-[12px]" style={{ fontFamily: B }}>
                <ContentText section={project.sectionKey} name="sector" fallback={project.sector} />
              </span>
            )}
          </div>
          <h1
            className="text-white leading-[0.95]"
            style={{ fontFamily: H, fontSize: "clamp(34px, 6vw, 72px)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            <ContentText section={project.sectionKey} name="title" fallback={project.title} />
          </h1>
        </div>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────────────────────── */}
      <div className="bg-[#f6f8f9] border-b border-[#213B4D]/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-14 py-3 flex items-center gap-2 text-[11px] tracking-[0.15em]" style={{ fontFamily: B }}>
          <Link href="/" className="text-[#5E5E5E] hover:text-[#1F93A4] transition-colors">Home</Link>
          <span className="text-[#213B4D]/25">›</span>
          <Link href="/projects" className="text-[#5E5E5E] hover:text-[#1F93A4] transition-colors">Featured Projects</Link>
          <span className="text-[#213B4D]/25">›</span>
          <span className="text-[#1F93A4] font-semibold truncate max-w-[60vw]">{project.title}</span>
        </div>
      </div>

      {/* ── OVERVIEW + FACTS ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-14 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
              <p className="text-[#F2613C] text-[11px] font-bold tracking-[0.35em]" style={{ fontFamily: B }}>
                Overview
              </p>
            </div>

            <p className="text-[#213B4D] text-[19px] leading-relaxed font-semibold mb-8" style={{ fontFamily: B }}>
              <ContentText section={project.sectionKey} name="description" fallback={project.description} />
            </p>

            {project.scope && (
              <p className="text-[#3a3a3a] text-[16px] leading-[1.85] mb-6" style={{ fontFamily: B }}>
                <ContentText section={project.sectionKey} name="scope" fallback={project.scope} />
              </p>
            )}

            <div className="space-y-6">
              {project.paragraphs.map((p, i) => (
                <p key={i} className="text-[#3a3a3a] text-[16px] leading-[1.85]" style={{ fontFamily: B }}>
                  <ContentText section={project.sectionKey} name={`p${i + 1}`} fallback={p} />
                </p>
              ))}
            </div>

            {project.highlights.length > 0 && (
              <div className="mt-12 bg-[#f4f6f8] border-l-4 border-[#1F93A4] p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
                  <p className="text-[#F2613C] text-[11px] font-bold tracking-[0.35em]" style={{ fontFamily: B }}>
                    Project Highlights
                  </p>
                </div>
                <ul className="space-y-3">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-[#213B4D] text-[15px] leading-relaxed" style={{ fontFamily: B }}>
                      <span className="text-[#1F93A4] font-bold mt-[2px]">▸</span>
                      <ContentText section={project.sectionKey} name={`h${i + 1}`} fallback={h} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Facts panel */}
          <aside className="lg:col-span-5">
            <div className="border border-[#213B4D]/10 rounded-lg p-8 bg-[#f6f8f9]">
              <p className="text-[#213B4D] text-[11px] font-bold tracking-[0.25em] mb-6" style={{ fontFamily: B }}>
                AT A GLANCE
              </p>
              <dl className="space-y-4">
                {facts.map((f) => (
                  <div key={f.label} className="flex flex-col gap-1 pb-4 border-b border-[#213B4D]/8 last:border-0 last:pb-0">
                    <dt className="text-[#5E5E5E] text-[10px] font-bold tracking-[0.2em]" style={{ fontFamily: B }}>
                      {f.label.toUpperCase()}
                    </dt>
                    <dd className="text-[#213B4D] text-[14px] font-semibold" style={{ fontFamily: B }}>
                      <ContentText section={project.sectionKey} name={f.name} fallback={f.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <Link
              href="/contact"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#F2613C] text-white text-[12px] font-bold tracking-[0.15em] px-6 py-4 hover:bg-[#d64b26] transition-colors"
              style={{ fontFamily: B }}
            >
              Discuss a Similar Project <span>→</span>
            </Link>
          </aside>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-14 mt-16 pt-8 border-t border-[#213B4D]/10">
          <Link
            href="/projects"
            className="text-[#1F93A4] text-[12px] font-bold tracking-[0.2em] inline-flex items-center gap-2 hover:gap-3 transition-all"
            style={{ fontFamily: B }}
          >
            <span>←</span> Back to Featured Projects
          </Link>
        </div>
      </section>

      {/* ── RELATED ───────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="pb-24 pt-16 bg-[#f6f8f9] border-t border-[#213B4D]/8">
          <div className="max-w-7xl mx-auto px-6 lg:px-14">
            <Reveal className="flex items-center gap-3 mb-10">
              <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
              <p className="text-[#F2613C] text-[11px] font-bold tracking-[0.35em]" style={{ fontFamily: B }}>
                More Projects
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r: Project) => (
                <Link
                  key={r.sectionKey}
                  href={`/projects/${r.slug}`}
                  className="card-base group relative overflow-hidden rounded-lg border border-[#213B4D]/10 bg-white shadow-[0_1px_2px_rgba(33,59,77,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1F93A4] hover:shadow-[0_22px_46px_-24px_rgba(33,59,77,0.4)]"
                >
                  <div className="relative h-40 shrink-0 overflow-hidden">
                    <MediaImage
                      category={r.sectionKey}
                      title={`${r.sectionKey}_image`}
                      fallbackSrc={r.image}
                      alt={r.title}
                      className="object-cover object-center w-full h-full group-hover:scale-[1.06] transition-transform duration-[900ms] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28]/70 to-transparent" />
                  </div>
                  <div className="card-body p-6">
                    {/* Sector, not country — the same label the portfolio grid
                        card carries, so the two read as one card family. The
                        country is still on the project and still listed in "At
                        a glance" above. */}
                    <div className="text-[#1F93A4] text-sm font-medium uppercase tracking-[0.08em] mb-2" style={{ fontFamily: B }}>
                      <ContentText section={r.sectionKey} name="sector" fallback={r.sector} />
                    </div>
                    {/* lineHeight inline: .card-title (globals.css) is unlayered
                        and outranks Tailwind's leading-* utility. */}
                    <h3 className="card-title text-[#213B4D] font-bold text-[17px] lg:text-[18px] group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B, lineHeight: 1.35 }}>
                      <ContentText section={r.sectionKey} name="title" fallback={r.title} />
                    </h3>
                  </div>
                  <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1F93A4] transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
