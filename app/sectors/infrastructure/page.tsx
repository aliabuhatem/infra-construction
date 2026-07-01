import SectorLayout from "@/components/SectorLayout";
import SectorProjectsList from "@/components/SectorProjectsList";

export const metadata = {
  title: "Infrastructure & Civil Works | INFRA Construction",
  description: "Comprehensive infrastructure and civil works — highways, bridges, airports, ports, marine works, water systems, dams, energy, and industrial projects delivered to international standards.",
};

const H = "var(--font-myriad), system-ui, -apple-system, sans-serif";
const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

export default function InfrastructurePage() {
  return (
    <SectorLayout
      sectionKey="sector_infrastructure"
      eyebrow="Core Sector"
      heroTitle="Infrastructure"
      heroSubtitle="Civil works, water systems, energy, and industrial projects — delivered across the Middle East and Africa since 2000."
      heroDescription="INFRA Construction delivers complex civil and infrastructure projects — from highways, bridges, and airports to ports, dams, power, and industrial works — engineered and built to international standards."
      heroImage="/media/infrastructure-coastal-highway-taiz-yemen.jpeg"
      intro={[
        "INFRA Construction's Infrastructure sector encompasses all major civil, utility, energy, and industrial disciplines. From highway construction and dam engineering to power generation and oil services, our integrated teams deliver complex infrastructure projects to international standards.",
        "Operating across the Middle East and Africa since 2000, we bring proven technical expertise, ISO-certified quality management, and deep regional experience to every infrastructure engagement — executing each project according to international codes and exacting specifications.",
        "Our infrastructure division combines civil engineering, marine works, water systems, transportation, energy, and industrial capabilities under one coordinated team — providing clients with a complete delivery solution from feasibility and design through construction and commissioning.",
        "Backed by abundant plant, equipment, and a skilled multidisciplinary workforce, INFRA Construction has the resources and flexibility to execute large-scale infrastructure works safely and on schedule, even in challenging and remote locations.",
      ]}
      serviceGroups={[
        {
          title: "Water Supply & Utilities",
          description: "INFRA Construction delivers complete water and utility infrastructure — from transmission and distribution networks to treatment and storage systems built for longevity.",
          items: [
            "Water supply networks",
            "Wastewater treatment plants",
            "Desalination infrastructure",
            "Reservoirs and storage tanks",
            "Pumping stations",
            "Utility distribution networks",
            "Pipeline transmission systems",
            "Stormwater and drainage",
          ],
        },
        {
          title: "Dams & Irrigation",
          description: "We construct dams, dikes, and large-scale irrigation infrastructure across arid regions — providing water retention, flood control, and agricultural supply.",
          items: [
            "Dam construction",
            "Dikes and embankments",
            "Barrages and weirs",
            "Irrigation networks",
            "Flood control systems",
            "Water retention structures",
            "Canal and channel works",
            "Earth and rockfill works",
          ],
        },
        {
          title: "Ports & Marine Works",
          description: "Our marine teams deliver ports, quay walls, breakwaters, and harbour infrastructure to international standards for civil and strategic use.",
          items: [
            "Quay walls and berths",
            "Breakwaters and seawalls",
            "Jetties and floating piers",
            "Marine structures",
            "Coastal protection works",
            "Port master planning",
            "Dredging and reclamation",
            "Mooring and berthing systems",
          ],
        },
        {
          title: "Airports & Aviation",
          description: "INFRA Construction executes airfield works, runways, and aviation infrastructure for both civil and strategic aviation requirements.",
          items: [
            "Runway construction",
            "Taxiways and aprons",
            "Airfield ground works",
            "Terminal facilities",
            "Aviation infrastructure",
            "Airfield drainage",
            "Pavement and surfacing",
            "Lighting and navigation civil works",
          ],
        },
        {
          title: "Roads, Bridges & Transportation",
          description: "We deliver highways, bridges, and large-scale road networks with proven civil engineering expertise — from earthworks to final surfacing.",
          items: [
            "Highways and road networks",
            "Bridges and flyovers",
            "Causeways and widening",
            "Road rehabilitation",
            "Earthworks and grading",
            "Pavement and asphalt works",
            "Drainage and culverts",
            "Road safety infrastructure",
          ],
        },
        {
          title: "Energy, Power & Industrial",
          description: "Our teams build power generation, transmission, and industrial infrastructure — including oil & gas works, pipelines, and long-term plant operations support.",
          items: [
            "Power plants and stations",
            "Transmission lines and substations",
            "Oil & gas pipelines",
            "Plant piping and mechanical works",
            "Industrial plant construction",
            "Concrete mix plants",
            "Plant operations & maintenance",
            "Renewable energy infrastructure",
          ],
        },
      ]}
      features={[
        { title: "Civil Engineering Expertise", body: "Proven technical depth across highways, bridges, marine works, water, energy, and industrial disciplines built over two decades of delivery." },
        { title: "Multidisciplinary Delivery", body: "Civil, structural, marine, mechanical, and electrical capabilities coordinated under one integrated infrastructure team." },
        { title: "Abundant Plant & Equipment", body: "Access to a vast fleet of heavy plant, machinery, and a skilled workforce to execute large-scale civil works at pace." },
        { title: "Remote Location Capability", body: "Demonstrated experience delivering infrastructure in challenging and remote environments without compromising quality or safety." },
        { title: "International Standards", body: "Every project executed according to international codes and specifications under ISO-certified quality management systems." },
        { title: "Regional Presence", body: "Established offices across the UAE, Egypt, Yemen, and Canada providing responsive local support across key markets." },
        { title: "Proven Since 2000", body: "A consistent track record of delivering complex infrastructure projects on time and to specification across the Middle East and Africa." },
        { title: "HSE Commitment", body: "A 'zero harm' safety culture embedded across all infrastructure sites through strict HSE protocols and regular training." },
      ]}
      process={[
        { num: "01", title: "Assessment & Survey", body: "We evaluate site conditions, ground data, hydrology, and project requirements to establish a sound engineering basis for delivery." },
        { num: "02", title: "Engineering & Design", body: "Our engineers prepare detailed civil, structural, and systems designs aligned with international codes and project specifications." },
        { num: "03", title: "Procurement", body: "We source and procure all materials, plant, and subcontracted works to quality, cost, and schedule requirements." },
        { num: "04", title: "Construction & Execution", body: "Experienced site teams execute earthworks, civil, structural, marine, and MEP works with rigorous quality and safety management." },
        { num: "05", title: "Quality & Testing", body: "Continuous inspection, materials testing, and compliance verification are carried out throughout the construction process." },
        { num: "06", title: "Commissioning & Handover", body: "We complete testing, commissioning, documentation, and formal handover with full as-built records and ongoing support." },
      ]}
      whyUs={[
        { title: "Proven Infrastructure Record", body: "Successfully delivered highways, bridges, airports, ports, dams, and power projects across multiple countries." },
        { title: "Integrated Civil Capability", body: "In-house civil, marine, structural, and MEP teams delivering seamless coordination across complex infrastructure works." },
        { title: "International Quality Standards", body: "ISO 9001 certified quality management with stringent inspection and testing protocols across all civil works." },
        { title: "Skilled Multidisciplinary Workforce", body: "Civil engineers, marine specialists, surveyors, project managers, and construction crews working as one cohesive team." },
        { title: "Strong Regional Presence", body: "Established offices across the UAE, Egypt, Yemen, and Canada providing responsive local support across key markets." },
        { title: "HSE Commitment", body: "A 'zero harm' safety culture embedded across all infrastructure sites through strict HSE protocols and regular safety training." },
        { title: "Flexible Delivery Models", body: "Adaptable project structures including design-build, construction management, and full EPC delivery to suit client requirements." },
        { title: "Heavy Plant Resources", body: "Owned fleet of plant and equipment enabling self-performed earthworks and civil construction at scale and on schedule." },
      ]}
      industries={[
        "Government & Public Sector",
        "Transportation Authorities",
        "Water & Utility Authorities",
        "Energy & Power",
        "Oil & Gas",
        "Ports & Maritime",
        "Aviation & Airports",
        "Municipalities",
        "Defense & Strategic",
        "International Development",
      ]}
      faqs={[
        { q: "What infrastructure disciplines does INFRA Construction deliver?", a: "We deliver highways, bridges, airports, ports and marine works, water systems, dams and irrigation, energy and power, and industrial infrastructure across the Middle East and Africa." },
        { q: "Do you self-perform civil and earthworks?", a: "Yes. INFRA Construction owns an extensive fleet of plant and equipment and self-performs earthworks, civil, and structural construction at scale." },
        { q: "Can you work in remote or challenging locations?", a: "Absolutely. We have a proven track record delivering infrastructure projects in challenging and remote environments without compromising quality or safety." },
        { q: "Can you manage the full project lifecycle?", a: "Yes. We provide complete delivery from assessment and engineering through procurement, construction, testing, and commissioning." },
        { q: "Are your infrastructure projects compliant with international standards?", a: "Yes. All projects are executed according to international engineering codes and specifications under our ISO 9001 certified quality management system." },
      ]}
      ctaTitle="Have an Infrastructure Challenge?"
      ctaBody="Partner with INFRA Construction for complex civil and infrastructure projects — combining engineering expertise, heavy resources, and reliable delivery to international standards."
      projectsSlot={
        /* Mirrors the buildings page exactly — lists infrastructure projects in
           the dark "Disciplines Covered" box. Projects added via the admin panel
           (sector "Infrastructure…") appear here automatically. */
        <section className="py-24 bg-white border-t border-[#213B4D]/8">
          <div className="max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[2px] bg-[#1F93A4] shrink-0" />
                <p className="text-[#1F93A4] text-[11px] font-bold uppercase tracking-[0.35em]" style={{ fontFamily: B }}>
                  Our Work
                </p>
              </div>
              <h2
                className="text-[#213B4D] uppercase leading-tight mb-6"
                style={{ fontFamily: H, fontSize: "clamp(20px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.01em" }}
              >
                Infrastructure Projects
              </h2>
              <p className="text-[#5E5E5E] text-[16px] leading-relaxed" style={{ fontFamily: B }}>
                A selection of infrastructure and civil works projects delivered across the Middle East, Africa, and beyond.
              </p>
            </div>
            <SectorProjectsList sector="infrastructure" eyebrow="Disciplines Covered" className="lg:col-span-5" />
          </div>
        </section>
      }
    />
  );
}
