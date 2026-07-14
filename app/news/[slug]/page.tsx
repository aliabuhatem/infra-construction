import Link from "next/link";
import { notFound } from "next/navigation";
import ContentText from "@/components/admin-panel/ContentText";
import MediaImage from "@/components/admin-panel/MediaImage";
import { readContentStore } from "@/lib/admin/content-store";
import { Reveal } from "@/components/motion";

const H = "var(--font-myriad), system-ui, -apple-system, sans-serif";
const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

type Fields = Record<string, string>;
type Store = { content: Record<string, Fields>; _deletedSections?: string[] };
type NewsItem = { _key: string } & Fields;

function getNewsItems(store: Store): NewsItem[] {
  const deleted = new Set(store._deletedSections || []);
  return Object.entries(store.content || {})
    .filter(([k]) => /^news_\d+$/.test(k) && !deleted.has(k))
    .sort(([a], [b]) => parseInt(a.replace("news_", ""), 10) - parseInt(b.replace("news_", ""), 10))
    .map(([k, f]) => ({ _key: k, ...f } as NewsItem));
}

export async function generateStaticParams() {
  try {
    const store = (await readContentStore({ includeSiteMedia: false })) as Store;
    return getNewsItems(store)
      .filter((n) => n.slug)
      .map((n) => ({ slug: n.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const store = (await readContentStore({ includeSiteMedia: false })) as Store;
    const item = getNewsItems(store).find((n) => n.slug === slug);
    if (!item) return { title: "Article — INFRA Construction" };
    return {
      title: `${item.title || slug} — INFRA Construction`,
      description: item.excerpt || "",
      openGraph: {
        title: item.title || "",
        description: item.excerpt || "",
        images: item.image ? [item.image] : [],
        type: "article",
      },
    };
  } catch {
    return { title: "Article — INFRA Construction" };
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const store = (await readContentStore({ includeSiteMedia: false })) as Store;
  const allItems = getNewsItems(store);
  const item = allItems.find((n) => n.slug === slug);
  if (!item) notFound();

  const related = allItems.filter((n) => n.slug !== slug).slice(0, 3);
  const paragraphs = [1, 2, 3, 4, 5].map((n) => item[`p${n}`]).filter(Boolean);
  const highlights = [1, 2, 3, 4].map((n) => item[`h${n}`]).filter(Boolean);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden bg-[#0d1e28]">
        <MediaImage
          category={item._key}
          title={`${item._key}_image`}
          fallbackSrc={item.image || ""}
          alt={item.title || ""}
          className="absolute inset-0 object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28] via-[#0d1e28]/70 to-[#0d1e28]/20" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-14 pb-16 w-full">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="bg-[#1F93A4] text-white text-[10px] font-bold px-3 py-1.5  tracking-[0.2em]"
              style={{ fontFamily: B }}
            >
              <ContentText section={item._key} name="category" fallback={item.category || ""} />
            </span>
            <span className="text-white/85 text-[12px]" style={{ fontFamily: B }}>
              <ContentText section={item._key} name="date" fallback={item.date || ""} />
            </span>
            {item.location && (
              <>
                <span className="text-white/60">·</span>
                <span className="text-white/85 text-[12px]" style={{ fontFamily: B }}>
                  <ContentText section={item._key} name="location" fallback={item.location} />
                </span>
              </>
            )}
          </div>
          <h1
            className="text-white  leading-[0.95]"
            style={{ fontFamily: H, fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            <ContentText section={item._key} name="title" fallback={item.title || ""} />
          </h1>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="bg-[#f6f8f9] border-b border-[#213B4D]/10">
        <div
          className="max-w-5xl mx-auto px-6 lg:px-14 py-3 flex items-center gap-2 text-[11px] tracking-[0.15em] "
          style={{ fontFamily: B }}
        >
          <Link href="/" className="text-[#5E5E5E] hover:text-[#1F93A4] transition-colors">Home</Link>
          <span className="text-[#213B4D]/25">›</span>
          <Link href="/news" className="text-[#5E5E5E] hover:text-[#1F93A4] transition-colors">News</Link>
          <span className="text-[#213B4D]/25">›</span>
          <span className="text-[#1F93A4] font-semibold truncate max-w-[60vw]">{item.title}</span>
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
              <span>
                By{" "}
                <span className="text-[#213B4D] font-semibold">
                  <ContentText section={item._key} name="author" fallback={item.author} />
                </span>
              </span>
            )}
            <span>
              <ContentText section={item._key} name="date" fallback={item.date || ""} />
            </span>
            {item.readTime && (
              <span>
                <ContentText section={item._key} name="readTime" fallback={item.readTime} />
              </span>
            )}
          </div>

          <p className="text-[#213B4D] text-[19px] leading-relaxed font-semibold mb-10" style={{ fontFamily: B }}>
            <ContentText section={item._key} name="excerpt" fallback={item.excerpt || ""} />
          </p>

          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[#3a3a3a] text-[16px] leading-[1.85]" style={{ fontFamily: B }}>
                <ContentText section={item._key} name={`p${i + 1}`} fallback={p} />
              </p>
            ))}
          </div>

          {highlights.length > 0 && (
            <div className="mt-14 bg-[#f4f6f8] border-l-4 border-[#1F93A4] p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
                <p className="text-[#1F93A4] text-[11px] font-bold  tracking-[0.35em]" style={{ fontFamily: B }}>
                  Project Highlights
                </p>
              </div>
              <ul className="space-y-3">
                {highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[#213B4D] text-[15px] leading-relaxed"
                    style={{ fontFamily: B }}
                  >
                    <span className="text-[#1F93A4] font-bold mt-[2px]">▸</span>
                    <ContentText section={item._key} name={`h${i + 1}`} fallback={h} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-[#213B4D]/10">
            <Link
              href="/news"
              className="text-[#1F93A4] text-[12px] font-bold  tracking-[0.2em] inline-flex items-center gap-2 hover:gap-3 transition-all"
              style={{ fontFamily: B }}
            >
              <span>←</span> Back to All News
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="pb-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-14">
            <Reveal className="flex items-center gap-3 mb-10">
              <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
              <p className="text-[#1F93A4] text-[11px] font-bold  tracking-[0.35em]" style={{ fontFamily: B }}>
                More Updates
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r._key}
                  href={`/news/${r.slug || r._key}`}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-[#213B4D]/10 bg-white shadow-[0_1px_2px_rgba(33,59,77,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1F93A4] hover:shadow-[0_22px_46px_-24px_rgba(33,59,77,0.4)]"
                >
                  <div className="relative h-40 overflow-hidden">
                    <MediaImage
                      category={r._key}
                      title={`${r._key}_image`}
                      fallbackSrc={r.image || ""}
                      alt={r.title || ""}
                      className="object-cover w-full h-full group-hover:scale-[1.06] transition-transform duration-[900ms] ease-out"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="bg-[#1F93A4]/12 text-[#1F93A4] text-[10px] font-bold px-2.5 py-1  tracking-[0.15em]"
                        style={{ fontFamily: B }}
                      >
                        <ContentText section={r._key} name="category" fallback={r.category || ""} />
                      </span>
                      <span className="text-[#5E5E5E] text-[11px]" style={{ fontFamily: B }}>
                        <ContentText section={r._key} name="date" fallback={r.date || ""} />
                      </span>
                    </div>
                    <h3
                      className="text-[#213B4D] font-bold text-[14px] leading-snug group-hover:text-[#1F93A4] transition-colors"
                      style={{ fontFamily: B }}
                    >
                      <ContentText section={r._key} name="title" fallback={r.title || ""} />
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
