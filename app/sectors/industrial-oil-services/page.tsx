import SectorLayout from "@/components/SectorLayout";

export const metadata = {
  title: "Industrial & Oil Services Solutions | INFRA Construction",
  description: "Comprehensive industrial and oil services including pipelines, plant engineering, maintenance, and EPC support.",
};

export default function IndustrialOilPage() {
  return (
    <SectorLayout
      eyebrow="Our Sectors"
      heroTitle="Industrial & Oil Services"
      heroSubtitle="Delivering reliable industrial and oilfield engineering solutions with advanced technical expertise, operational excellence, and global project capabilities."
      heroDescription="INFRA Construction provides specialized Industrial & Oil Services for energy, petrochemical, industrial processing, and oil & gas infrastructure projects."
      heroImage="/media/industrial-floating-marine-pier-yemen.jpeg"
      intro={[
        "INFRA Construction provides integrated Industrial & Oil Services designed to support the development, operation, maintenance, and expansion of industrial and energy infrastructure projects. Our multidisciplinary capabilities allow us to deliver technically advanced solutions for oil & gas facilities, petrochemical plants, industrial processing facilities, utility infrastructure, and energy-related developments.",
        "We understand the demanding nature of industrial environments where operational reliability, safety compliance, engineering precision, and efficient project execution are critical. Our teams combine engineering expertise, operational experience, advanced technology, and strict quality control systems to deliver projects that meet international industry standards.",
        "From pipeline engineering and plant construction to maintenance services and operational support, INFRA Construction provides end-to-end industrial solutions tailored to the requirements of each client and project environment.",
        "Our experience across regional and international markets enables us to manage projects in remote, complex, and technically demanding environments while maintaining operational safety, schedule efficiency, and construction quality.",
      ]}
      serviceGroups={[
        {
          title: "Oil & Gas Infrastructure Services",
          description: "We provide specialized engineering and construction services for upstream, midstream, and downstream oil & gas infrastructure projects.",
          items: [
            "Oil & gas pipeline construction",
            "Refinery infrastructure support",
            "Petrochemical facility works",
            "Utility piping systems",
            "Process piping installation",
            "Mechanical systems integration",
            "Storage facility infrastructure",
            "Industrial utility networks",
          ],
        },
        {
          title: "Pipeline Engineering & Construction",
          description: "INFRA Construction delivers complete pipeline engineering, fabrication, installation, and maintenance services for industrial and oilfield operations.",
          items: [
            "Cross-country pipelines",
            "Utility pipelines",
            "Steam piping systems",
            "Industrial ducting systems",
            "Pipeline stress analysis",
            "Pipe support systems",
            "Pipeline integrity support",
            "Piping fabrication and erection",
          ],
        },
        {
          title: "Plant Engineering Services",
          description: "We provide engineering support for industrial plants, processing facilities, utility systems, and production infrastructure.",
          items: [
            "Industrial plant layouts",
            "Mechanical engineering",
            "Structural engineering",
            "Electrical systems engineering",
            "Utility integration",
            "Industrial process support",
            "Equipment foundations",
            "3D plant modeling",
          ],
        },
        {
          title: "Industrial Construction Services",
          description: "INFRA Construction supports the construction and expansion of industrial facilities with experienced project management and construction teams.",
          items: [
            "Industrial buildings",
            "Processing facilities",
            "Utility infrastructure",
            "Mechanical installations",
            "Structural steel works",
            "Equipment foundations",
            "Heavy civil works",
            "Industrial maintenance shutdowns",
          ],
        },
        {
          title: "Industrial Operations & Maintenance",
          description: "We provide operational support and maintenance services for industrial facilities to maximize equipment reliability and minimize downtime.",
          items: [
            "Preventive maintenance",
            "Corrective maintenance",
            "Shutdown maintenance",
            "Equipment inspections",
            "Emergency repairs",
            "Operational manpower support",
            "Reliability improvement programs",
            "Asset integrity management",
          ],
        },
        {
          title: "Engineering Design & Technical Support",
          description: "Our engineering teams provide technical design, drafting, modeling, and engineering consultancy for industrial and oilfield developments. We utilize advanced CAD and engineering software systems to deliver accurate and efficient engineering solutions.",
          items: [
            "Technical design and drafting",
            "3D modeling and BIM",
            "Engineering consultancy",
            "CAD system utilization",
            "Feasibility and technical studies",
            "Specifications development",
            "Design coordination",
          ],
        },
      ]}
      features={[
        { title: "Specialized Technical Expertise", body: "Multidisciplinary teams with expertise in industrial systems, pipelines, utility networks, process infrastructure, and mechanical installations." },
        { title: "International Standards Compliance", body: "All industrial and oilfield projects executed in accordance with international engineering, safety, and quality standards." },
        { title: "Safety-First Operations", body: "Strict HSE protocols and operational safety systems to ensure safe industrial operations and project execution." },
        { title: "Advanced Engineering Technology", body: "Modern engineering software, 3D modeling systems, BIM technologies, and digital coordination tools." },
        { title: "Skilled Industrial Workforce", body: "Experienced engineers, technicians, welders, inspectors, operators, and industrial specialists." },
        { title: "Remote Project Capability", body: "Resources and operational experience required to execute projects in remote and challenging environments." },
        { title: "Reliable Project Delivery", body: "Project management systems ensuring timely execution, efficient coordination, quality control, and cost-effective delivery." },
        { title: "Integrated Solutions", body: "End-to-end industrial services covering engineering, procurement, construction, operations, and maintenance." },
      ]}
      process={[
        { num: "01", title: "Project Evaluation", body: "We analyze project requirements, operational objectives, technical specifications, safety standards, and environmental considerations." },
        { num: "02", title: "Engineering & Planning", body: "Our engineering teams develop detailed technical designs, schedules, procurement plans, and operational strategies." },
        { num: "03", title: "Procurement & Logistics", body: "We manage sourcing, quality inspections, logistics coordination, and material procurement to ensure project readiness." },
        { num: "04", title: "Construction & Installation", body: "Our construction teams execute civil, mechanical, piping, electrical, and structural works according to approved specifications." },
        { num: "05", title: "Testing & Commissioning", body: "We perform testing, inspections, commissioning activities, and operational verification to ensure system performance." },
        { num: "06", title: "O&M Support", body: "INFRA Construction provides ongoing maintenance, operational support, inspections, and reliability management services." },
      ]}
      whyUs={[
        { title: "Proven Industrial Experience", body: "Successfully supported industrial, utility, and oil-related infrastructure projects across multiple regions." },
        { title: "Multidisciplinary Engineering Capability", body: "Integrated engineering teams covering civil, structural, mechanical, electrical, and piping disciplines." },
        { title: "Strong Resource Network", body: "Access to equipment, technical resources, skilled manpower, and procurement systems for complex projects." },
        { title: "Commitment to Quality", body: "Comprehensive QA/QC systems and inspection procedures to ensure consistent project quality." },
        { title: "Flexible Project Execution", body: "Teams that adapt efficiently to project-specific requirements, operational environments, and client expectations." },
        { title: "Operational Reliability", body: "Focused on minimizing operational disruptions and maximizing long-term system reliability." },
        { title: "Global Project Reach", body: "International operational experience enabling support across diverse geographic and industrial environments." },
        { title: "Technical Excellence", body: "Advanced engineering capabilities backed by decades of industrial project delivery experience." },
      ]}
      industries={[
        "Oil & Gas",
        "Petrochemical Plants",
        "Energy & Utilities",
        "Industrial Manufacturing",
        "Processing Facilities",
        "Power Generation",
        "Water & Wastewater Infrastructure",
        "Heavy Industrial Facilities",
        "Transportation Infrastructure",
        "Government Industrial Projects",
      ]}
      faqs={[
        { q: "What industrial services does INFRA Construction provide?", a: "We provide industrial engineering, pipeline construction, mechanical installations, plant engineering, operations support, maintenance, and EPC-related services." },
        { q: "Do you support oil & gas infrastructure projects?", a: "Yes. We provide engineering, construction, and maintenance services for pipelines, utility systems, industrial facilities, and oilfield infrastructure." },
        { q: "Can you handle remote industrial projects?", a: "Absolutely. INFRA Construction has extensive experience operating in remote and challenging environments." },
        { q: "Do you provide plant maintenance services?", a: "Yes. We offer preventive maintenance, corrective maintenance, shutdown support, inspections, and operational maintenance services." },
        { q: "Are your projects compliant with safety regulations?", a: "Yes. We implement strict HSE standards and internationally recognized quality and safety management systems." },
      ]}
      ctaTitle="Industrial & Oil Services Excellence"
      ctaBody="Partner with INFRA Construction for reliable Industrial & Oil Services that deliver operational efficiency, engineering precision, and long-term infrastructure performance."
    />
  );
}
