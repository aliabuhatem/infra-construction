import SectorLayout from "@/components/SectorLayout";

export const metadata = {
  title: "Energy & Power Infrastructure Services | INFRA Construction",
  description: "Energy and power infrastructure services including power plants, transmission systems, substations, and renewable energy.",
};

export default function EnergyPowerPage() {
  return (
    <SectorLayout
      eyebrow="Our Sectors"
      sectionKey="sector_energy"
      heroTitle="Energy & Power"
      heroSubtitle="Powering communities, industries, and future development through reliable energy infrastructure and advanced engineering solutions."
      heroDescription="INFRA Construction delivers integrated Energy & Power services covering generation, transmission, distribution, substations, and utility infrastructure projects."
      heroImage="/media/energy-power-plant-alhaswa-aden-yemen.jpeg"
      intro={[
        "INFRA Construction provides comprehensive Energy & Power infrastructure solutions that support industrial growth, urban development, utility expansion, and sustainable energy delivery. We specialize in the engineering, construction, operation, and maintenance of power generation facilities, electrical infrastructure, transmission systems, and utility networks.",
        "As global demand for reliable and sustainable energy continues to grow, infrastructure projects require advanced engineering expertise, operational efficiency, strict safety standards, and long-term performance reliability. INFRA Construction combines multidisciplinary engineering capabilities with strong project management systems to deliver complex energy projects across diverse environments.",
        "Our expertise covers conventional power generation, renewable energy infrastructure, electrical distribution systems, substations, transmission networks, utility automation, and power infrastructure maintenance.",
        "We work closely with utility authorities, governmental organizations, industrial operators, private developers, and infrastructure stakeholders to provide tailored energy solutions that support operational reliability, sustainability goals, and future growth.",
      ]}
      serviceGroups={[
        {
          title: "Power Generation Infrastructure",
          description: "INFRA Construction provides engineering and construction services for power generation facilities across multiple energy sectors.",
          items: [
            "Steam power plants",
            "Diesel engine power plants",
            "Gas turbine power systems",
            "Combined cycle power plants",
            "Renewable energy infrastructure",
            "Utility support facilities",
            "Plant civil works",
            "Mechanical and electrical installations",
          ],
        },
        {
          title: "Transmission & Distribution Networks",
          description: "We deliver complete transmission and distribution infrastructure solutions designed to improve power reliability and utility performance.",
          items: [
            "Overhead transmission lines",
            "Underground transmission systems",
            "Electrical distribution networks",
            "Utility substations",
            "Ring main units",
            "Utility corridors",
            "Electrical infrastructure integration",
            "Grid connectivity systems",
          ],
        },
        {
          title: "Substations & Utility Systems",
          description: "INFRA Construction specializes in substation engineering, installation, and utility automation systems.",
          items: [
            "Substation construction",
            "Switchgear installations",
            "GIS systems",
            "Utility automation",
            "Protection systems",
            "SCADA integration",
            "Utility monitoring systems",
            "Electrical testing & commissioning",
          ],
        },
        {
          title: "Renewable Energy Infrastructure",
          description: "We support sustainable energy initiatives through renewable power infrastructure services.",
          items: [
            "Solar infrastructure support",
            "Renewable utility integration",
            "Electrical balance of systems",
            "Energy storage support infrastructure",
            "Sustainable utility systems",
            "Renewable plant civil works",
          ],
        },
        {
          title: "Power Operations & Maintenance",
          description: "We provide long-term operations and maintenance support for power facilities and utility infrastructure.",
          items: [
            "Preventive maintenance",
            "Electrical inspections",
            "Equipment testing",
            "Utility operations support",
            "Emergency maintenance",
            "Asset management",
            "Reliability optimization",
            "Technical manpower support",
          ],
        },
        {
          title: "Electrical Engineering Services",
          description: "Our engineering teams provide technical design and consultancy services for power and utility projects.",
          items: [
            "Power system studies",
            "Load analysis",
            "Utility coordination",
            "Electrical design",
            "System optimization",
            "Infrastructure planning",
            "Engineering consultancy",
          ],
        },
      ]}
      features={[
        { title: "Advanced Power Engineering Expertise", body: "Multidisciplinary expertise across power generation, electrical systems, utility infrastructure, and energy operations." },
        { title: "Reliable Infrastructure Delivery", body: "Robust project management systems ensuring timely and efficient energy project execution." },
        { title: "Strong Safety Culture", body: "Strict HSE standards and operational safety systems across all power and utility projects." },
        { title: "Sustainable Energy Focus", body: "Supporting energy-efficient and environmentally responsible infrastructure development." },
        { title: "International Standards Compliance", body: "Projects complying with international electrical, engineering, safety, and operational standards." },
        { title: "Integrated Project Solutions", body: "End-to-end services covering engineering, procurement, construction, commissioning, operations, and maintenance." },
        { title: "Technical Workforce & Resources", body: "Qualified engineers, technicians, operators, inspectors, and utility specialists." },
        { title: "Remote Project Capability", body: "Capability to execute projects in remote, complex, and developing environments." },
      ]}
      process={[
        { num: "01", title: "Project Assessment", body: "We evaluate technical requirements, energy demands, utility integration needs, environmental conditions, and operational objectives." },
        { num: "02", title: "Engineering & System Design", body: "Our engineering teams develop detailed electrical designs, system studies, layouts, and infrastructure plans." },
        { num: "03", title: "Procurement & Logistics", body: "We manage procurement, supplier coordination, equipment sourcing, and logistics planning." },
        { num: "04", title: "Construction & Installation", body: "INFRA Construction executes civil, mechanical, and electrical works according to project specifications and industry standards." },
        { num: "05", title: "Testing & Commissioning", body: "We conduct electrical testing, system commissioning, inspections, and operational verification." },
        { num: "06", title: "O&M Support", body: "Our teams provide long-term operational support, maintenance planning, and infrastructure reliability management." },
      ]}
      whyUs={[
        { title: "Extensive Power Sector Experience", body: "Supported power generation and utility infrastructure projects across multiple regions and operational environments." },
        { title: "Integrated Engineering & Construction Expertise", body: "Comprehensive solutions delivered from design through operations by multidisciplinary teams." },
        { title: "Strong Operational Reliability", body: "Infrastructure systems that maximize efficiency, reliability, and long-term performance." },
        { title: "Flexible Project Delivery", body: "INFRA Construction adapts efficiently to project-specific technical and operational requirements." },
        { title: "Quality & Compliance Commitment", body: "Rigorous QA/QC systems and compliance procedures maintained throughout project execution." },
        { title: "Sustainable Infrastructure Approach", body: "Sustainable energy development through efficient engineering and environmentally responsible solutions." },
        { title: "Global Resource Capability", body: "Equipment, workforce, and procurement systems supporting efficient project delivery worldwide." },
        { title: "Technical Excellence", body: "Qualified engineers, technicians, and utility specialists delivering advanced energy infrastructure." },
      ]}
      industries={[
        "Power Generation",
        "Utility Authorities",
        "Industrial Facilities",
        "Oil & Gas",
        "Government Infrastructure",
        "Renewable Energy Developers",
        "Transportation Infrastructure",
        "Commercial Developments",
        "Manufacturing Facilities",
        "Water & Utility Projects",
      ]}
      faqs={[
        { q: "What energy infrastructure services do you provide?", a: "We provide power generation infrastructure, transmission systems, substations, distribution networks, renewable energy support, and utility operations services." },
        { q: "Do you support renewable energy projects?", a: "Yes. INFRA Construction supports renewable energy infrastructure and utility integration projects." },
        { q: "Can you manage power plant operations and maintenance?", a: "Absolutely. We provide preventive maintenance, inspections, operational support, and reliability optimization services." },
        { q: "Do you provide electrical engineering services?", a: "Yes. Our engineering teams provide electrical system design, utility studies, infrastructure planning, and technical consultancy." },
        { q: "Are your projects compliant with international standards?", a: "Yes. All projects are executed according to international engineering, safety, electrical, and quality standards." },
      ]}
      ctaTitle="Power Your Vision with INFRA"
      ctaBody="Partner with INFRA Construction for reliable Energy & Power infrastructure solutions that support sustainable growth, operational efficiency, and long-term performance."
    />
  );
}
