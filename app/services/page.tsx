import ExpertiseHub from "@/components/ExpertiseHub";
import { resolveServices } from "@/lib/expertise";
import { getContent, get } from "@/lib/getContent";

export const metadata = {
  title: "Our Services | INFRA Construction",
  description:
    "The 14 integrated services INFRA Construction offers across the project lifecycle — from detailed engineering and procurement to construction, O&M, and BIM.",
};

const HUB = "svc_hub";

export default async function ServicesPage() {
  const c = await getContent();
  const g = (name: string, fb: string) => get(c, HUB, name, fb);

  return (
    <ExpertiseHub
      kind="service"
      items={resolveServices(c)}
      eyebrow={g("eyebrow", "Our Expertise")}
      title={g("title", "Our Services")}
      subtitle={g("subtitle", "A full spectrum of services covering the entire project lifecycle — from initial design and procurement through construction, maintenance, and facility management.")}
      intro={g("intro", "INFRA Construction is a comprehensive contracting and project-management firm offering integrated solutions that ensure project success. Our commitment to international standards, quality, and safety drives every one of the 14 services we deliver.")}
      heroImage={g("heroImage", "/media/company-team-photo.jpeg")}
      ctaTitle={g("ctaTitle", "Have a Project in Mind?")}
      ctaBody={g("ctaBody", "Partner with INFRA Construction for engineering precision and dependable delivery.")}
      stats={[
        { value: g("stat1Value", "14"), label: g("stat1Label", "Integrated Services") },
        { value: g("stat2Value", "275+"), label: g("stat2Label", "Professionals") },
        { value: g("stat3Value", "25+"), label: g("stat3Label", "Years Delivering") },
        { value: g("stat4Value", "ISO 9001"), label: g("stat4Label", "Quality Standard") },
      ]}
    />
  );
}
