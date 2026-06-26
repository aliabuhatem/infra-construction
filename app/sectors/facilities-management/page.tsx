import SectorLayout from "@/components/SectorLayout";

export const metadata = {
  title: "Facilities Management & Operations Services | INFRA Construction",
  description: "Professional facilities management and operations services for industrial, commercial, and infrastructure assets.",
};

export default function FacilitiesManagementPage() {
  return (
    <SectorLayout
      eyebrow="Our Sectors"
      heroTitle="Facilities Management & Operations"
      heroSubtitle="Delivering reliable facilities management and operational excellence for industrial, commercial, governmental, and infrastructure assets across multiple sectors and regions."
      heroDescription="INFRA Construction provides integrated Facilities Management & Operations solutions designed to maximize asset performance, reduce operational downtime, improve workplace safety, and enhance long-term value for clients."
      heroImage="/media/fm-concrete-gates-abyan-yemen.jpeg"
      intro={[
        "INFRA Construction delivers comprehensive Facilities Management & Operations services tailored to the unique requirements of commercial developments, industrial facilities, public infrastructure, utilities, residential communities, and institutional projects. Backed by decades of regional and international experience, we provide integrated operational solutions that ensure facilities remain safe, efficient, compliant, and sustainable throughout their lifecycle.",
        "Our approach combines technical expertise, proactive maintenance strategies, operational planning, and advanced asset management systems to help clients optimize performance while reducing operational costs. We understand that effective facility management goes beyond maintenance — it requires strategic planning, operational reliability, workforce coordination, sustainability integration, and responsive service delivery.",
        "We support clients across various industries by providing both hard and soft facilities management services, operations management, preventive maintenance, corrective maintenance, asset lifecycle planning, infrastructure operations, and technical support services.",
        "INFRA Construction has developed a reputation for delivering dependable, high-quality facility services across governmental, private, industrial, and infrastructure sectors. Our dedicated teams work closely with clients to customize solutions that align with operational goals, compliance requirements, and business continuity objectives.",
      ]}
      serviceGroups={[
        {
          title: "Integrated Facilities Management",
          description: "We provide fully integrated facilities management solutions that combine technical operations, maintenance, administration, safety management, and support services under a single operational framework. Our integrated approach enables clients to streamline operations, improve service coordination, reduce operational complexity, and maintain consistent service quality.",
          items: [
            "Technical operations management",
            "Maintenance and administration",
            "Safety management systems",
            "Support services integration",
            "Service quality assurance",
            "Operational complexity reduction",
            "Single management framework delivery",
          ],
        },
        {
          title: "Hard Facilities Management",
          description: "Our hard FM services focus on maintaining and optimizing critical building systems and infrastructure components.",
          items: [
            "HVAC system maintenance",
            "Electrical systems maintenance",
            "Plumbing and drainage systems",
            "Mechanical systems operations",
            "Fire protection systems",
            "Power generation systems",
            "Water supply systems",
            "Civil and structural maintenance",
            "Building fabric maintenance",
            "Utility systems management",
          ],
        },
        {
          title: "Soft Facilities Management",
          description: "We provide professional soft FM services that support the daily functionality, comfort, and safety of facilities.",
          items: [
            "Cleaning and janitorial services",
            "Waste management",
            "Landscaping maintenance",
            "Pest control",
            "Reception and helpdesk services",
            "Security coordination",
            "Staff accommodation management",
            "Logistics support services",
          ],
        },
        {
          title: "Operations & Maintenance Services",
          description: "INFRA Construction specializes in preventive, predictive, and corrective maintenance services designed to improve operational reliability and reduce downtime.",
          items: [
            "Preventive maintenance programs",
            "Corrective maintenance",
            "Emergency maintenance response",
            "Shutdown planning and execution",
            "Equipment inspection and testing",
            "Asset integrity management",
            "Maintenance planning and scheduling",
            "Spare parts management",
            "Technical manpower support",
          ],
        },
        {
          title: "Industrial Facility Operations",
          description: "We support industrial clients by managing complex operational environments including manufacturing plants, utility facilities, processing plants, power stations, and infrastructure networks. Our operational teams ensure safe, compliant, and efficient daily operations while maintaining high productivity and minimal disruptions.",
          items: [
            "Manufacturing plant operations",
            "Utility facility management",
            "Processing plant support",
            "Power station operations",
            "Infrastructure network management",
            "Safe and compliant daily operations",
            "Productivity and uptime optimization",
          ],
        },
        {
          title: "Asset Management Solutions",
          description: "We implement strategic asset management systems that help clients monitor asset performance, plan maintenance activities, optimize lifecycle costs, and improve operational decision-making.",
          items: [
            "Asset performance monitoring",
            "Maintenance activity planning",
            "Lifecycle cost optimization",
            "Operational decision-making support",
          ],
        },
        {
          title: "Infrastructure Operations",
          description: "INFRA Construction provides operations and maintenance support for roads, utilities, water systems, power distribution networks, and public infrastructure facilities. Our infrastructure operation services focus on reliability, sustainability, safety, and long-term operational performance.",
          items: [
            "Roads and utilities O&M",
            "Power distribution maintenance",
            "Public infrastructure management",
            "Water network operations",
            "Reliability and sustainability focus",
            "Long-term performance monitoring",
          ],
        },
      ]}
      features={[
        { title: "Customized Facility Solutions", body: "Management strategies and operational plans tailored to client industry, facility type, and performance objectives." },
        { title: "Preventive Maintenance Approach", body: "Proactive and predictive maintenance strategies to reduce equipment failure and extend asset lifespan." },
        { title: "24/7 Operational Support", body: "Dedicated response teams providing around-the-clock emergency maintenance and operational support." },
        { title: "Skilled Technical Workforce", body: "Highly trained engineers, technicians, operators, inspectors, and maintenance specialists for complex environments." },
        { title: "Health, Safety & Environmental Compliance", body: "Strict compliance with international HSE standards and operational safety procedures to ensure safe working environments and regulatory compliance." },
        { title: "Technology-Driven Operations", body: "Digital asset management, maintenance tracking software, reporting platforms, and performance monitoring tools." },
        { title: "Sustainability Integration", body: "Energy efficiency, resource optimization, environmental responsibility, and sustainable facility performance." },
        { title: "Multi-Sector Experience", body: "Experience spanning commercial buildings, industrial facilities, utility infrastructure, governmental projects, transportation assets, and residential developments." },
      ]}
      process={[
        { num: "01", title: "Facility Assessment", body: "We evaluate the facility's infrastructure, operational requirements, maintenance history, asset conditions, compliance standards, and performance objectives." },
        { num: "02", title: "Operational Planning", body: "Our specialists develop a customized operations and maintenance strategy aligned with client requirements, priorities, and lifecycle objectives." },
        { num: "03", title: "Resource Mobilization", body: "We deploy qualified personnel, equipment, maintenance systems, and operational resources required for efficient service delivery." },
        { num: "04", title: "Implementation & Operations", body: "Our teams execute day-to-day operations, preventive maintenance, inspections, technical support, and emergency response services." },
        { num: "05", title: "Performance Monitoring", body: "We continuously monitor operational performance using KPIs, maintenance reporting systems, inspections, audits, and analytics." },
        { num: "06", title: "Continuous Improvement", body: "INFRA Construction continually refines operational procedures, maintenance schedules, and asset strategies to improve efficiency and quality." },
      ]}
      whyUs={[
        { title: "Extensive Industry Experience", body: "Successfully delivered operations, maintenance, and FM solutions across diverse sectors and challenging environments." },
        { title: "One-Stop Operational Partner", body: "Complete facilities management and operational support services under one integrated management structure." },
        { title: "Proven Operational Reliability", body: "Committed to minimizing downtime, maximizing performance, and ensuring operational continuity." },
        { title: "Strong Technical Capabilities", body: "Experienced engineers, technicians, and operational specialists delivering technically sound and reliable solutions." },
        { title: "Flexible Service Models", body: "Scalable and flexible contracts tailored to client operational requirements, budgets, and project durations." },
        { title: "Commitment to Safety", body: "Safety integrated into every aspect of operations through strict HSE protocols, training programs, and compliance management." },
        { title: "Sustainable Operations", body: "Sustainable practices through energy-efficient maintenance strategies and environmentally responsible operations." },
        { title: "Regional & International Reach", body: "Operations across multiple countries with the capability to mobilize quickly in remote and complex locations." },
      ]}
      industries={[
        "Commercial Buildings",
        "Residential Communities",
        "Government Facilities",
        "Industrial Plants",
        "Oil & Gas Facilities",
        "Power Plants",
        "Water & Utility Infrastructure",
        "Transportation Infrastructure",
        "Healthcare Facilities",
        "Educational Institutions",
        "Hospitality & Tourism",
        "Ports & Marine Facilities",
        "Airports & Aviation Infrastructure",
      ]}
      faqs={[
        { q: "What facilities management services do you provide?", a: "We provide integrated hard and soft facilities management services including maintenance, operations, asset management, technical support, utility management, cleaning, landscaping, and operational coordination." },
        { q: "Do you offer 24/7 maintenance support?", a: "Yes. INFRA Construction provides round-the-clock emergency maintenance and operational support services." },
        { q: "Can you manage industrial and infrastructure facilities?", a: "Absolutely. We specialize in industrial operations, infrastructure maintenance, utility management, and large-scale operational support services." },
        { q: "Do you provide preventive maintenance programs?", a: "Yes. Our preventive maintenance programs are designed to improve equipment reliability, reduce downtime, and optimize lifecycle performance." },
        { q: "Are your operations compliant with international safety standards?", a: "Yes. We implement strict health, safety, environmental, and quality management systems aligned with international standards." },
      ]}
      ctaTitle="Reliable FM & Operations"
      ctaBody="Partner with INFRA Construction for reliable Facilities Management & Operations solutions that improve efficiency, reduce operational risks, and maximize asset value."
    />
  );
}
