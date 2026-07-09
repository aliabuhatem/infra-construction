import { notFound } from "next/navigation";
import ExpertiseDetail from "@/components/ExpertiseDetail";
import { sectors, getSector, resolveExpertise } from "@/lib/expertise";
import { getContent } from "@/lib/getContent";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getSector(slug);
  if (!item) return { title: "Sector Not Found | INFRA Construction" };
  return {
    title: `${item.title} | INFRA Construction`,
    description: item.summary,
  };
}

export default async function SectorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const base = getSector(slug);
  if (!base) notFound();

  const c = await getContent();
  const item = resolveExpertise(c, "sector", base);
  const related = sectors
    .filter((s) => s.slug !== slug)
    .slice(0, 4)
    .map((s) => resolveExpertise(c, "sector", s));

  return <ExpertiseDetail item={item} kind="sector" related={related} />;
}
