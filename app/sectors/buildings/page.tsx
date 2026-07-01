import SectorLayout from "@/components/SectorLayout";
import SectorProjectsList from "@/components/SectorProjectsList";

export const metadata = {
  title: "Buildings & Architecture Services | INFRA Construction",
  description: "Comprehensive buildings and architecture services including architectural design, MEP engineering, residential, commercial, and institutional construction.",
};

const H = "var(--font-myriad), system-ui, -apple-system, sans-serif";
const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

export default function BuildingsPage() {
  return (
    <SectorLayout
      sectionKey="sector_buildings"
      eyebrow="Our Sectors"
      heroTitle="Buildings & Architecture"
      heroSubtitle="Crafting enduring and efficient structures that foster comfort, functionality, and spatial harmony across residential, commercial, and institutional developments."
      heroDescription="INFRA Construction delivers comprehensive buildings and architecture services across the Middle East, East Africa, and East Asia — combining architectural excellence with MEP engineering and construction expertise."
      heroImage="/media/buildings-social-housing-assiut-egypt.avif"
      intro={[
        "Architecture, as both an art and science, encompasses the intricate interplay of graphics, aesthetics, functionality, and spatial harmony. INFRA Construction adheres to this principle, recognizing its significance in creating remarkable spaces. By thoroughly studying, analyzing, and engineering each project as a distinct and singular undertaking, we craft enduring and efficient structures that foster comfort for both individuals and their surrounding natural environment.",
        "With a notable presence in the Middle East, East Africa, and East Asia, INFRA Construction has established a reputation for constructing distinguished and exceptional public and private buildings. Our portfolio showcases a range of outstanding projects that have left a lasting impact on the built environment, reflecting our commitment to excellence and innovation.",
        "Our Buildings division integrates Architectural Design, MEP Engineering, structural and civil works, and quality management under one coordinated team — providing clients with a complete built environment solution from concept design through project handover and facilities management.",
        "INFRA Construction's engineering offices in Cairo, Egypt provide a permanent core of qualified architecture, structural, and MEP professionals. Clients partnering with INFRA benefit from extensive experience, proven reliability, abundant resources, and the flexibility to work in challenging and remote locations.",
      ]}
      serviceGroups={[
        {
          title: "Architectural Design & Engineering",
          description: "INFRA Construction provides comprehensive architectural design services that balance aesthetics, functionality, and structural efficiency for every project type.",
          items: [
            "Concept and schematic design",
            "Detailed architectural drawings",
            "3D visualization and modeling",
            "Building code compliance review",
            "Interior space planning",
            "Facade design and engineering",
            "Shop drawing preparation",
            "As-built documentation",
          ],
        },
        {
          title: "MEP Engineering — Mechanical",
          description: "Our mechanical engineering section provides HVAC services for enclosed areas, distributing cooled or heated air throughout spaces to suit inhabitants and create a perfect environment for living and working.",
          items: [
            "HVAC system design and installation",
            "Chilled water system design",
            "Ventilation and air distribution",
            "Fire suppression systems",
            "Plumbing and drainage systems",
            "Water supply and sanitation",
            "Mechanical room design",
            "System commissioning",
          ],
        },
        {
          title: "MEP Engineering — Electrical",
          description: "Our electrical engineers set up AC electrical systems that supply all appliances and electronics, and establish the infrastructure of telecommunications networks.",
          items: [
            "LV/MV electrical systems",
            "Power distribution design",
            "Lighting systems design",
            "Telecommunications infrastructure",
            "Data and network cabling",
            "Security and access control",
            "Fire alarm systems",
            "Building management systems (BMS)",
          ],
        },
        {
          title: "Buildings Construction Services",
          description: "INFRA Construction delivers complete building construction for residential, commercial, governmental, and institutional projects — drawing on international experience and vast construction resources.",
          items: [
            "Residential buildings and housing",
            "Commercial office buildings",
            "Government and institutional buildings",
            "Healthcare and medical facilities",
            "Educational buildings",
            "Hospitality and hotel construction",
            "Industrial buildings",
            "Mixed-use developments",
          ],
        },
        {
          title: "Construction Management",
          description: "We provide professional construction management and supervision services focused on quality, safety, schedule compliance, and cost efficiency across all building projects.",
          items: [
            "Project management and coordination",
            "Construction supervision",
            "Quality control and assurance",
            "HSE management",
            "Cost control and budget management",
            "Schedule planning and monitoring",
            "Contract administration",
            "Progress reporting",
          ],
        },
        {
          title: "Fit-Out & Finishing Works",
          description: "INFRA Construction delivers high-quality interior fit-out and finishing works, ensuring every space meets client specifications and international quality standards.",
          items: [
            "Interior fit-out and partitioning",
            "Flooring and wall finishes",
            "Ceiling systems",
            "Joinery and carpentry",
            "Painting and decorative finishes",
            "External cladding and facades",
            "Landscaping and external works",
            "Snagging and handover",
          ],
        },
      ]}
      features={[
        { title: "Extensive Experience", body: "Deep expertise across residential, commercial, governmental, healthcare, educational, and hospitality building projects in the Middle East and Africa." },
        { title: "Reliability", body: "A proven track record of consistently delivering building projects on time and to the highest level of quality and client satisfaction." },
        { title: "Abundant Resources", body: "Access to a vast array of resources including plant and equipment, a skilled workforce, highly trained staff, and robust headquarters support." },
        { title: "Remote Location Capability", body: "Demonstrated capability and experience working in challenging and remote locations, ensuring project success even in demanding environments." },
        { title: "Engineering Support Centers", body: "Engineering support and design centers across global locations in Cairo, Abu Dhabi, and Dubai — ensuring access to top-notch technical expertise." },
        { title: "Contract Flexibility", body: "Flexible contract terms to accommodate the specific requirements and preferences of clients across different project scales and structures." },
        { title: "Integrated MEP Expertise", body: "In-house mechanical, electrical, and plumbing engineering ensures seamless coordination between architectural design and building systems." },
        { title: "Quality Assurance Systems", body: "ISO 9001 certified quality management systems applied across all building projects from design through handover." },
      ]}
      process={[
        { num: "01", title: "Concept & Feasibility", body: "We study, analyze, and engineer each project as a distinct undertaking — evaluating site conditions, client brief, regulatory requirements, and design feasibility." },
        { num: "02", title: "Architectural Design", body: "Our architects prepare detailed design drawings, 3D models, specifications, and building documentation aligned with international standards." },
        { num: "03", title: "MEP Engineering", body: "Mechanical, electrical, and plumbing engineers develop integrated building systems designs ensuring functionality, efficiency, and compliance." },
        { num: "04", title: "Construction & Execution", body: "INFRA Construction executes civil, structural, MEP, and finishing works through experienced site teams with rigorous quality management." },
        { num: "05", title: "Quality Assurance", body: "We conduct inspections, testing, quality verification, and compliance monitoring throughout construction according to international standards." },
        { num: "06", title: "Handover & Support", body: "Our teams finalize fit-out, commissioning, snagging, documentation, and project handover — with ongoing FM support available." },
      ]}
      whyUs={[
        { title: "Proven Buildings Track Record", body: "INFRA Construction has successfully delivered residential, commercial, governmental, and institutional buildings across multiple countries." },
        { title: "Integrated Design & Build", body: "In-house architecture and MEP engineering teams working alongside construction specialists deliver seamless project coordination." },
        { title: "International Quality Standards", body: "ISO 9001 certified quality management with stringent inspection and testing protocols across all building works." },
        { title: "Skilled Multidisciplinary Workforce", body: "Architects, structural engineers, MEP engineers, project managers, and construction specialists working as one cohesive team." },
        { title: "Strong Regional Presence", body: "Established offices across the UAE, Egypt, Yemen, and Canada providing responsive local support across key markets." },
        { title: "HSE Commitment", body: "A 'zero harm' safety culture embedded across all building sites through strict HSE protocols and regular safety training." },
        { title: "Flexible Delivery Models", body: "Adaptable project structures including design-build, construction management, and full EPC delivery to suit client requirements." },
        { title: "Sustainable Building Practices", body: "Environmentally responsible design and construction approaches supporting energy efficiency and long-term building performance." },
      ]}
      industries={[
        "Residential Developments",
        "Commercial Buildings",
        "Government & Institutional",
        "Healthcare Facilities",
        "Educational Buildings",
        "Hospitality & Hotels",
        "Industrial Buildings",
        "Mixed-Use Developments",
        "Religious Buildings",
        "Sports & Recreation Facilities",
      ]}
      faqs={[
        { q: "What building types does INFRA Construction deliver?", a: "We deliver residential, commercial, governmental, institutional, healthcare, educational, hospitality, and industrial buildings across the Middle East and Africa." },
        { q: "Do you provide architectural design services?", a: "Yes. INFRA Construction provides full architectural design services including concept design, detailed drawings, 3D modeling, and shop drawings." },
        { q: "Do you offer MEP engineering in-house?", a: "Absolutely. Our in-house MEP engineering teams provide mechanical (HVAC), electrical (power and telecoms), and plumbing design and installation services." },
        { q: "Can you deliver design-build projects?", a: "Yes. INFRA Construction provides complete design-build delivery covering architecture, MEP, structural engineering, and construction under one contract." },
        { q: "Are your building projects compliant with international standards?", a: "Yes. All projects are executed according to international engineering, architectural, MEP, and quality management standards, with ISO 9001 certified quality systems." },
      ]}
      ctaTitle="Build Your Vision with INFRA"
      ctaBody="Partner with INFRA Construction for exceptional Buildings & Architecture solutions that combine design excellence, engineering expertise, and reliable construction delivery."
      projectsSlot={
        /* New section mirroring infrastructure's "Disciplines Covered" box —
           lists building projects as a text list. Projects added via the admin
           panel (sector "Building…") appear here automatically. */
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
                Building Projects
              </h2>
              <p className="text-[#5E5E5E] text-[16px] leading-relaxed" style={{ fontFamily: B }}>
                A selection of buildings and architecture projects delivered across the Middle East, Africa, and beyond.
              </p>
            </div>
            <SectorProjectsList sector="building" eyebrow="Disciplines Covered" className="lg:col-span-5" />
          </div>
        </section>
      }
    />
  );
}
