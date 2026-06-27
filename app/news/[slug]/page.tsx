import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { newsItems, getNewsBySlug } from "@/lib/news-data";
import ContentText from "@/components/admin-panel/ContentText";
import MediaImage from "@/components/admin-panel/MediaImage";

const H = "var(--font-barlow-condensed), Arial Narrow, sans-serif";
const B = "var(--font-source-sans), Arial, sans-serif";

export function generateStaticParams() {
  return newsItems.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: "Article — INFRA Construction" };
  return {
    title: `${item.title} — INFRA Construction`,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [item.image],
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const related = newsItems.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden bg-[#0d1e28]">
        <MediaImage
          category={item.sectionKey}
          title={`${item.sectionKey}_image`}
          fallbackSrc={item.image}
          alt={item.title}
          className="absolute inset-0 object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28] via-[#0d1e28]/70 to-[#0d1e28]/20" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-14 pb-16 w-full">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="bg-[#1F93A4] text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-[0.2em]"
              style={{ fontFamily: B }}
            >
              <ContentText section={item.sectionKey} name="category" fallback={item.category} />
            </span>
            <span className="text-white/60 text-[12px]" style={{ fontFamily: B }}>
              <ContentText section={item.sectionKey} name="date" fallback={item.date} />
            </span>
            {item.location && (
              <>
                <span className="text-white/30">·</span>
                <span className="text-white/60 text-[12px]" style={{ fontFamily: B }}>
                  <ContentText section={item.sectionKey} name="location" fallback={item.location} />
                </span>
              </>
            )}
          </div>
          <h1
            className="text-white uppercase leading-[0.95]"
            style={{ fontFamily: H, fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            <ContentText section={item.sectionKey} name="title" fallback={item.title} />
          </h1>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="bg-[#0d1e28] border-b border-white/5">
        <div
          className="max-w-5xl mx-auto px-6 lg:px-14 py-3 flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase"
          style={{ fontFamily: B }}
        >
          <Link href="/" className="text-white/35 hover:text-[#1F93A4] transition-colors">Home</Link>
          <span className="text-white/20">›</span>
          <Link href="/news" className="text-white/35 hover:text-[#1F93A4] transition-colors">News</Link>
          <span className="text-white/20">›</span>
          <span className="text-[#1F93A4] truncate max-w-[60vw]">{item.title}</span>
        </div>
      </div>

      {/* ARTICLE */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-0">
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-12 pb-6 border-b border-[#213B4D]/10 text-[12px] text-[#5E5E5E]"
            style={{ fontFamily: B }}
          >
            {item.author && (
              <span>By <span className="text-[#213B4D] font-semibold">{item.author}</span></span>
            )}
            <span>{item.date}</span>
            {item.readTime && <span>{item.readTime}</span>}
          </div>

          <p className="text-[#213B4D] text-[19px] leading-relaxed font-semibold mb-10" style={{ fontFamily: B }}>
            <ContentText section={item.sectionKey} name="excerpt" fallback={item.excerpt} />
          </p>

          <div className="space-y-6">
            {item.content.map((p, i) => (
              <p key={i} className="text-[#3a3a3a] text-[16px] leading-[1.85]" style={{ fontFamily: B }}>
                <ContentText section={item.sectionKey} name={`p${i + 1}`} fallback={p} />
              </p>
            ))}
          </div>

          {item.highlights && item.highlights.length > 0 && (
            <div className="mt-14 bg-[#f4f6f8] border-l-4 border-[#1F93A4] p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
                <p
                  className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]"
                  style={{ fontFamily: B }}
                >
                  Project Highlights
                </p>
              </div>
              <ul className="space-y-3">
                {item.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[#213B4D] text-[15px] leading-relaxed"
                    style={{ fontFamily: B }}
                  >
                    <span className="text-[#1F93A4] font-bold mt-[2px]">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-[#213B4D]/10">
            <Link
              href="/news"
              className="text-[#1F93A4] text-[12px] font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2 hover:gap-3 transition-all"
              style={{ fontFamily: B }}
            >
              <span>←</span> Back to All News
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
            <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
              More Updates
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#213B4D]/8">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/news/${r.slug}`}
                className="group bg-white hover:bg-[#f4f6f8] transition-colors block"
              >
                <div className="relative h-40 overflow-hidden">
                  <MediaImage
                    category={r.sectionKey}
                    title={`${r.sectionKey}_image`}
                    fallbackSrc={r.image}
                    alt={r.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="bg-[#1F93A4]/12 text-[#1F93A4] text-[10px] font-bold px-2.5 py-1 uppercase tracking-[0.15em]"
                      style={{ fontFamily: B }}
                    >
                      <ContentText section={r.sectionKey} name="category" fallback={r.category} />
                    </span>
                    <span className="text-[#5E5E5E] text-[11px]" style={{ fontFamily: B }}>
                      <ContentText section={r.sectionKey} name="date" fallback={r.date} />
                    </span>
                  </div>
                  <h3
                    className="text-[#213B4D] font-bold text-[14px] leading-snug group-hover:text-[#1F93A4] transition-colors"
                    style={{ fontFamily: B }}
                  >
                    <ContentText section={r.sectionKey} name="title" fallback={r.title} />
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
