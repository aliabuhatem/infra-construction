import { notFound } from "next/navigation";
import ExpertiseDetail from "@/components/ExpertiseDetail";
import { services, getService, resolveExpertise } from "@/lib/expertise";
import { getContent } from "@/lib/getContent";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getService(slug);
  if (!item) return { title: "Service Not Found | INFRA Construction" };
  return {
    title: `${item.title} | INFRA Construction`,
    description: item.summary,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const base = getService(slug);
  if (!base) notFound();

  const c = await getContent();
  const item = resolveExpertise(c, "service", base);
  const related = services
    .filter((s) => s.slug !== slug)
    .slice(0, 4)
    .map((s) => resolveExpertise(c, "service", s));

  return <ExpertiseDetail item={item} kind="service" related={related} />;
}
