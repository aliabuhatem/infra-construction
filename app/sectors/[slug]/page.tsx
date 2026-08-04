import { notFound, permanentRedirect } from "next/navigation";
import ExpertiseDetail from "@/components/ExpertiseDetail";
import { resolveBySlug, resolveSectors, redirectSlugFor, LEGACY_SECTOR_PATHS } from "@/lib/expertise";
import { getContent } from "@/lib/getContent";

// Sectors added in the admin panel *after* a build aren't in generateStaticParams,
// so they must be allowed to render on demand instead of 404ing.
export const dynamicParams = true;

export async function generateStaticParams() {
  const c = await getContent();
  return resolveSectors(c).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getContent();
  const item = resolveBySlug(c, "sector", slug);
  if (!item) return { title: "Sector Not Found | INFRA Construction" };
  return {
    title: `${item.title} | INFRA Construction`,
    description: item.summary,
  };
}

export default async function SectorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getContent();
  const item = resolveBySlug(c, "sector", slug);
  if (!item) {
    // A renamed sector keeps its old path working with a 308 to the new one.
    const moved = redirectSlugFor(c, "sector", slug);
    if (moved) permanentRedirect(`/sectors/${moved}`);
    // Sectors retired by the move to two pillars land on their subsector.
    const legacy = LEGACY_SECTOR_PATHS[slug];
    if (legacy) permanentRedirect(legacy);
    notFound();
  }

  const related = resolveSectors(c)
    .filter((s) => s.slug !== slug)
    .slice(0, 4);

  return <ExpertiseDetail item={item} kind="sector" related={related} />;
}
