import ExpertiseHub from "@/components/ExpertiseHub";
import { resolveSectors } from "@/lib/expertise";
import { getContent, get } from "@/lib/getContent";

export const metadata = {
  title: "Our Sectors | INFRA Construction",
  description:
    "The 7 sectors of activity INFRA Construction delivers across the Middle East, East Africa, and East Asia — buildings, networks, civil works, transport, water, dams, and pipelines.",
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
      subtitle={g("subtitle", "A rich history of executing projects across a diverse range of sectors — demonstrating our versatility and technical depth across two continents.")}
      intro={g("intro", "INFRA Construction has a strong presence in the Middle East, East Africa, and East Asia. We apply our comprehensive services across seven core sectors of activity, delivering robust and sustainable outcomes in each.")}
      heroImage={g("heroImage", "/media/sectors hero section photo.webp")}
      ctaTitle={g("ctaTitle", "Have a Project in Mind?")}
      ctaBody={g("ctaBody", "Partner with INFRA Construction for engineering precision and dependable delivery.")}
      stats={[
        { value: g("stat1Value", "7"), label: g("stat1Label", "Sectors of Activity") },
        { value: g("stat2Value", "75+"), label: g("stat2Label", "Projects Delivered") },
        { value: g("stat3Value", "12+"), label: g("stat3Label", "Countries") },
        { value: g("stat4Value", "2"), label: g("stat4Label", "Continents") },
      ]}
    />
  );
}
