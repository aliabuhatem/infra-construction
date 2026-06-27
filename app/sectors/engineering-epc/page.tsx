import SectorLayout from "@/components/SectorLayout";

export const metadata = {
  title: "Engineering & EPC Services Company | INFRA Construction",
  description: "Comprehensive engineering and EPC services including design, procurement, construction, and project management.",
};

export default function EngineeringEPCPage() {
  return (
    <SectorLayout
      eyebrow="Our Sectors"
      sectionKey="sector_epc"
      heroTitle="Engineering & EPC"
      heroSubtitle="Delivering integrated engineering and EPC solutions with precision, innovation, and operational excellence."
      heroDescription="INFRA Construction provides complete Engineering, Procurement, and Construction services for industrial, infrastructure, utility, and development projects."
      heroImage="/media/buildings-general-structure.jpeg"
      intro={[
        "INFRA Construction provides comprehensive Engineering & EPC services designed to support the successful delivery of complex infrastructure, industrial, utility, transportation, and development projects. Our multidisciplinary engineering teams, project management specialists, procurement professionals, and construction experts work collaboratively to deliver integrated project solutions from concept through completion.",
        "We understand that successful EPC project delivery requires technical precision, efficient coordination, procurement reliability, construction excellence, and operational discipline. INFRA Construction combines advanced engineering technologies, experienced personnel, strong supply chain networks, and proven management systems to execute projects efficiently while maintaining quality, safety, and schedule performance.",
        "Our capabilities span engineering design, procurement management, construction execution, project controls, BIM coordination, quality assurance, testing and commissioning, and operational support.",
        "INFRA Construction's engineering offices in Amman, Jordan and Cairo, Egypt maintain a permanent core staff of approximately 275 qualified professionals — capable of delivering over 150,000 engineering man-hours per year. IC is continuously engaged in research and development to enhance quality and productivity, including in-house software development and implementation of the latest design technology for EPC projects.",
        "With international project experience and strong regional capabilities, INFRA Construction successfully delivers projects across multiple sectors and complex operational environments.",
      ]}
      serviceGroups={[
        {
          title: "Detailed Engineering Services",
          description: "INFRA Construction provides multidisciplinary engineering design services for infrastructure, industrial, utility, transportation, and building projects.",
          items: [
            "Civil engineering",
            "Structural engineering",
            "Mechanical engineering",
            "Electrical engineering",
            "MEP engineering",
            "Utility engineering",
            "Transportation engineering",
            "Water infrastructure engineering",
            "Industrial plant engineering",
            "Architectural design",
          ],
        },
        {
          title: "Engineering Design & Consultancy",
          description: "Our engineering teams utilize advanced CAD, BIM, and engineering software systems to develop accurate and efficient project solutions.",
          items: [
            "Concept design",
            "Detailed design",
            "Feasibility studies",
            "Technical analysis",
            "Value engineering",
            "Engineering consultancy",
            "Technical specifications",
            "Design coordination",
          ],
        },
        {
          title: "Procurement & Supply Chain Management",
          description: "The Central Procurement Department, situated in Dubai, UAE, operates in accordance with an ISO 9001 approved procurement manual. IC's E-Procurement capabilities include a unified materials catalogue with standardized coding, supply agreements for typical project items, competitive source identification, and online procurement services.",
          items: [
            "Material sourcing & purchasing",
            "Vendor management",
            "Procurement planning",
            "Equipment procurement",
            "Desk and shop expediting services",
            "Quality surveillance (test/inspections)",
            "Traffic & logistics expertise",
            "Supply chain optimization",
          ],
        },
        {
          title: "EPC Project Delivery",
          description: "We provide complete EPC project execution services covering engineering, procurement, construction, commissioning, and handover.",
          items: [
            "Turnkey project delivery",
            "Design-build services",
            "Construction management",
            "Site supervision",
            "Project controls",
            "Risk management",
            "QA/QC management",
            "Testing & commissioning",
          ],
        },
        {
          title: "Building Information Modeling (BIM)",
          description: "INFRA Construction integrates BIM technologies to improve design coordination, project visualization, clash detection, and construction planning.",
          items: [
            "3D modeling",
            "Coordination modeling",
            "Clash detection",
            "Quantity takeoffs",
            "Construction sequencing",
            "Asset information management",
            "Digital project controls",
          ],
        },
        {
          title: "Construction Management Services",
          description: "We provide professional construction management solutions focused on safety, quality, efficiency, and schedule performance.",
          items: [
            "Site management",
            "Workforce coordination",
            "Progress monitoring",
            "Contract administration",
            "Quality inspections",
            "HSE management",
            "Cost control",
            "Schedule management",
          ],
        },
      ]}
      features={[
        { title: "Integrated EPC Capability", body: "End-to-end project delivery covering engineering, procurement, construction, and commissioning under one team." },
        { title: "Advanced Engineering Technology", body: "Modern engineering software, BIM systems, and digital coordination platforms for precision delivery." },
        { title: "Strong Procurement Network", body: "Efficient sourcing systems supporting quality control and timely delivery of materials and equipment." },
        { title: "Experienced Project Teams", body: "Engineers, planners, procurement specialists, construction managers, and technical professionals." },
        { title: "International Standards Compliance", body: "All engineering and construction activities comply with international technical, quality, and safety standards." },
        { title: "Flexible Project Delivery Models", body: "EPC services adapted according to client requirements, project complexity, and operational conditions." },
        { title: "Quality & Safety Focus", body: "Strict QA/QC systems and HSE procedures implemented across all EPC projects." },
        { title: "Multi-Sector Experience", body: "EPC solutions delivered across industrial, infrastructure, utility, transportation, energy, and building sectors." },
      ]}
      process={[
        { num: "01", title: "Project Analysis & Planning", body: "We evaluate technical requirements, project objectives, operational conditions, and client expectations." },
        { num: "02", title: "Engineering & Design Development", body: "Our engineering teams prepare technical designs, calculations, BIM models, specifications, and project documentation." },
        { num: "03", title: "Procurement & Supply Chain Coordination", body: "We manage sourcing, supplier coordination, inspections, logistics, and procurement scheduling." },
        { num: "04", title: "Construction & Execution", body: "INFRA Construction executes project works through experienced construction teams and management systems." },
        { num: "05", title: "Quality Control & Commissioning", body: "We conduct inspections, testing, commissioning, performance verification, and compliance assessments." },
        { num: "06", title: "Handover & Operational Support", body: "Our teams provide final project handover, documentation, operational support, and maintenance coordination." },
      ]}
      whyUs={[
        { title: "Proven EPC Experience", body: "Delivered engineering and construction projects across multiple industries and regions." },
        { title: "Multidisciplinary Engineering Teams", body: "Integrated engineering departments providing comprehensive technical expertise across all disciplines." },
        { title: "Reliable Procurement Systems", body: "Efficient procurement and logistics systems that support successful project execution." },
        { title: "Strong Construction Capability", body: "Workforce, equipment, and project management systems capable of executing complex construction projects." },
        { title: "Commitment to Excellence", body: "Projects delivered safely, efficiently, on schedule, and according to quality standards." },
        { title: "Flexible & Scalable Solutions", body: "EPC services adapting to projects of varying sizes, complexities, and operational requirements." },
        { title: "Global Project Reach", body: "Capability to mobilize resources and execute projects across diverse international markets." },
        { title: "BIM Integration", body: "Advanced digital tools for design coordination, project visualization, and construction planning." },
      ]}
      industries={[
        "Industrial Facilities",
        "Infrastructure Projects",
        "Water & Utilities",
        "Energy & Power",
        "Transportation Infrastructure",
        "Buildings & Developments",
        "Oil & Gas",
        "Government Projects",
        "Commercial Developments",
        "Ports & Marine Infrastructure",
      ]}
      faqs={[
        { q: "What EPC services does INFRA Construction provide?", a: "We provide engineering, procurement, construction, commissioning, project management, BIM coordination, and operational support services." },
        { q: "Do you offer turnkey project delivery?", a: "Yes. INFRA Construction provides complete turnkey EPC solutions for infrastructure, industrial, and development projects." },
        { q: "Can you manage large-scale international projects?", a: "Absolutely. We possess the technical resources, workforce, procurement systems, and operational experience required for large-scale projects." },
        { q: "Do you use BIM technologies?", a: "Yes. We integrate BIM and advanced engineering software systems to improve coordination, planning, and project efficiency." },
        { q: "What sectors do you serve?", a: "We serve industrial, infrastructure, energy, water, transportation, oil & gas, and commercial development sectors." },
      ]}
      ctaTitle="Deliver Your EPC Project with Confidence"
      ctaBody="Partner with INFRA Construction for integrated Engineering & EPC solutions that deliver technical excellence, operational efficiency, and successful project outcomes."
    />
  );
}
