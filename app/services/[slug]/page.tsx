import { notFound } from "next/navigation";
import ExpertiseDetail from "@/components/ExpertiseDetail";
import { resolveBySlug, resolveServices } from "@/lib/expertise";
import { getContent } from "@/lib/getContent";

// Services added in the admin panel *after* a build aren't in generateStaticParams,
// so they must be allowed to render on demand instead of 404ing.
export const dynamicParams = true;

export async function generateStaticParams() {
  const c = await getContent();
  return resolveServices(c).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getContent();
  const item = resolveBySlug(c, "service", slug);
  if (!item) return { title: "Service Not Found | INFRA Construction" };
  return {
    title: `${item.title} | INFRA Construction`,
    description: item.summary,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getContent();
  const item = resolveBySlug(c, "service", slug);
  if (!item) notFound();

  const related = resolveServices(c)
    .filter((s) => s.slug !== slug)
    .slice(0, 4);

  return <ExpertiseDetail item={item} kind="service" related={related} />;
}
