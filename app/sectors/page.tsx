import ExpertiseHub from "@/components/ExpertiseHub";
import { resolveSectors } from "@/lib/expertise";
import { getContent, get } from "@/lib/getContent";

export const metadata = {
  title: "Our Sectors | INFRA Construction",
  description:
    "INFRA Construction operates across two pillars — Built Environment and Infrastructure — covering healthcare, education, residential and commercial buildings, water, dams, ports, airports, roads, and power.",
};

const HUB = "sct_hub";

export default async function SectorsPage() {
  const c = await getContent();
  const g = (name: string, fb: string) => get(c, HUB, name, fb);

  return (
    <ExpertiseHub
      kind="sector"
      items={resolveSectors(c)}
      eyebrow={g("eyebrow", "Our Sectors")}
      title={g("title", "Our Sectors")}
      subtitle={g("subtitle", "Our operational model is structured around two main pillars: Built Environment and Infrastructure.")}
      intro={g("intro", "INFRA Construction has a strong presence in the Middle East, East Africa, and East Asia. Built Environment covers high-complexity building structures, public architecture, and commercial facilities, while Infrastructure handles heavy civil engineering, utility networks, marine works, and energy transportation systems.")}
      heroImage={g("heroImage", "/media/sectors hero section photo.webp")}
      ctaTitle={g("ctaTitle", "Have a Project in Mind?")}
      ctaBody={g("ctaBody", "Partner with INFRA Construction for engineering precision and dependable delivery.")}
      stats={[
        { value: g("stat1Value", "2"), label: g("stat1Label", "Core Pillars") },
        { value: g("stat2Value", "75+"), label: g("stat2Label", "Projects Delivered") },
        { value: g("stat3Value", "12+"), label: g("stat3Label", "Countries") },
        { value: g("stat4Value", "2"), label: g("stat4Label", "Continents") },
      ]}
    />
  );
}
