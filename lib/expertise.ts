/* ────────────────────────────────────────────────────────────────────────
   Expertise catalogue — the single source of truth for INFRA Construction's
   Services and its two Sectors of activity.

   Both /services and /sectors (hub + dynamic [slug] detail pages) and the
   home "Our Expertise" section read from here, so the whole site stays in
   sync from one place. Titles use Title Case (site-wide convention).
──────────────────────────────────────────────────────────────────────────── */

/** A division within a sector. Rendered as an anchored section on the parent
    sector page rather than a page of its own, so `slug` is an element id. */
export interface SubSector {
  slug: string;              // anchor id — keep stable, inbound links use it
  title: string;
  description: string[];     // paragraphs
  points: string[];          // optional bullets, "Label: detail" renders bold
  image: string;             // /media/…
  /** Named reference projects delivered in this subsector. Rendered as a
      full-width roster under the block, below the copy — deliberately plain
      text, not links: these are historical references and most have no
      counterpart in the projects store, so linking them would 404. */
  projects?: string[];
}

export interface Expertise {
  slug: string;
  num: string;               // "01" … used as a display index on cards
  title: string;
  summary: string;           // one line — shown on the card
  description: string[];     // full copy — shown on the detail page
  capabilities: string[];    // bullet list of what's included
  image: string;             // /media/… hero + card image
  subsectors?: SubSector[];  // sectors only; services have none
}



/* ── 14 SERVICES ─────────────────────────────────────────────────────────── */

export const services: Expertise[] = [
  {
    slug: "detailed-engineering",
    num: "01",
    title: "Detailed Engineering Services",
    summary: "Multidisciplinary engineering delivered by 275+ professionals using advanced CAD/CAE tools.",
    description: [
      "Our engineering offices, staffed by over 275 qualified professionals, provide a wide range of detailed engineering services across every discipline a modern project demands.",
      "We utilise advanced CAD/CAE design software and maintain in-house capabilities for specialised requirements — covering Buildings, Civil and Structural Works, Water Reservoirs and Networks, Sewage Treatment, Dams and Irrigation, Marine Works, Power Generation, and Transportation Engineering.",
    ],
    capabilities: [
      "Buildings, civil & structural design",
      "Water reservoirs and networks",
      "Sewage treatment engineering",
      "Dams, irrigation & marine works",
      "Power generation systems",
      "Transportation engineering",
    ],
    image: "/media/buildings-general-structure.webp",
  },
  {
    slug: "procurement-expediting",
    num: "02",
    title: "Procurement & Expediting Services",
    summary: "ISO 9001 procurement ensuring the right materials arrive on time, at the highest quality.",
    description: [
      "Our central procurement department, operating under an ISO 9001-approved manual, ensures the timely acquisition of materials, equipment, and services at the highest quality standards.",
      "Our scope includes purchasing and sourcing, shop expediting, quality surveillance, and logistics expertise. We also utilise E-Procurement solutions — including a unified materials catalogue and supply agreements — to enhance efficiency.",
    ],
    capabilities: [
      "Purchasing & strategic sourcing",
      "Shop expediting",
      "Quality surveillance",
      "Logistics & freight management",
      "E-procurement & materials catalogue",
      "Supply agreements",
    ],
    image: "/media/industrial-concrete-mix-plant-yemen.webp",
  },
  {
    slug: "construction-services",
    num: "03",
    title: "Construction Services",
    summary: "Comprehensive construction capability across building, civil, and MEP works at any scale.",
    description: [
      "With teams of experienced construction specialists, INFRA Construction provides comprehensive construction capabilities across multiple fields.",
      "We have a proven track record of managing diverse workforces and efficiently mobilising equipment and crews for projects of any scale. Our services include building works, civil engineering, and the erection of mechanical, electrical, and piping systems.",
    ],
    capabilities: [
      "Building works",
      "Civil engineering",
      "Mechanical erection",
      "Electrical installation",
      "Piping systems",
      "Rapid crew & equipment mobilisation",
    ],
    image: "/media/buildings-social-housing-assiut-egypt.webp",
    
  },
  {
    slug: "construction-management",
    num: "04",
    title: "Construction Management Services",
    summary: "Sophisticated controls that keep large, complex projects safe, on time, and effective.",
    description: [
      "INFRA Construction excels in managing large, complex projects, employing sophisticated management controls for planning and monitoring to ensure safe, timely, and effective construction.",
      "We leverage our global experience and deep understanding of local laws to facilitate rapid mobilisation and successful project execution wherever we operate.",
    ],
    capabilities: [
      "Planning & scheduling controls",
      "Progress monitoring",
      "Safety management",
      "Local regulatory compliance",
      "Rapid mobilisation",
      "Multi-site coordination",
    ],
    image: "/media/infrastructure-highway-expansion-mocha-yemen.webp",

  },
  {
    slug: "facilities-management",
    num: "05",
    title: "Facilities Management Services",
    summary: "A one-stop-shop for management, maintenance, procurement, design, and health & safety.",
    description: [
      "As a comprehensive “one-stop-shop”, INFRA Construction offers top-tier facility and property management services. Our team provides complete solutions for management, maintenance, procurement, design, and health and safety.",
      "We tailor our services on a client-by-client basis, providing both on-site teams and off-site support such as help desks.",
    ],
    capabilities: [
      "Property & facility management",
      "Planned maintenance",
      "Procurement support",
      "Design services",
      "Health & safety",
      "On-site teams & help desks",
    ],
    image: "/media/fm-hotel-moroni-comoros.webp",

  },
  {
    slug: "operation-maintenance",
    num: "06",
    title: "Operation & Maintenance Services",
    summary: "Comprehensive O&M that optimises the performance and longevity of your assets.",
    description: [
      "We specialise in providing comprehensive O&M services to optimise the operational performance and longevity of our clients' assets.",
      "Our services include routine inspections, preventive and corrective maintenance, breakdown and emergency repairs, and manpower support tailored to each facility.",
    ],
    capabilities: [
      "Routine inspections",
      "Preventive maintenance",
      "Corrective maintenance",
      "Breakdown & emergency repairs",
      "Manpower support",
      "Performance optimisation",
    ],
    image: "/media/energy-power-plant-maintenance-taiz-yemen.webp",

  },
  {
    slug: "project-management-consultancy",
    num: "07",
    title: "Project Management Consultancy",
    summary: "Expert PMC balancing scope, time, cost, and quality from planning through handover.",
    description: [
      "We offer expert project management consultancy to ensure your projects meet the best goals of scope, time, cost, and quality.",
      "Our services cover project planning, risk assessment, claims management, contract administration, and value engineering — a full advisory layer around your programme.",
    ],
    capabilities: [
      "Project planning",
      "Risk assessment",
      "Claims management",
      "Contract administration",
      "Value engineering",
      "Scope, time, cost & quality control",
    ],
    image: "/media/company-team-photo.webp",

  },
  {
    slug: "construction-supervision",
    num: "08",
    title: "Construction Supervision",
    summary: "Rigorous on-site supervision ensuring work meets specifications and international codes.",
    description: [
      "Our experienced professionals provide rigorous construction supervision to ensure that all work is executed according to specifications, international codes, and quality standards.",
      "We oversee every aspect of the construction process to guarantee compliance and quality at each stage of delivery.",
    ],
    capabilities: [
      "Specification compliance",
      "International code adherence",
      "Quality assurance",
      "Workmanship inspection",
      "Site coordination",
      "Progress verification",
    ],
    image: "/media/infrastructure-aden-causeway-widening-yemen.webp",

  },
  {
    slug: "quantity-surveying",
    num: "09",
    title: "Quantity Surveying",
    summary: "Precise cost estimates, bills of quantities, and cost control across the lifecycle.",
    description: [
      "We provide accurate and detailed quantity surveying services to help manage project costs effectively.",
      "Our team delivers precise cost estimates, bills of quantities, and cost control throughout the project lifecycle, giving clients confidence in every figure.",
    ],
    capabilities: [
      "Cost estimation",
      "Bills of quantities",
      "Cost control & reporting",
      "Valuations & payments",
      "Tender pricing",
      "Final account settlement",
    ],
    image: "/media/buildings-general-facade.webp",

  },
  {
    slug: "risk-assessment-management",
    num: "10",
    title: "Risk Assessment & Management",
    summary: "Identifying project challenges early and building strategies that keep delivery stable.",
    description: [
      "INFRA Construction conducts thorough risk assessments to identify potential project challenges before they threaten delivery.",
      "We develop and implement comprehensive risk management strategies to mitigate these risks, ensuring project stability and success.",
    ],
    capabilities: [
      "Risk identification",
      "Impact & probability analysis",
      "Mitigation strategies",
      "Risk registers",
      "Contingency planning",
      "Ongoing monitoring",
    ],
    image: "/media/infrastructure-stormwater-drainage-yemen.webp",

  },
  {
    slug: "value-engineering",
    num: "11",
    title: "Value Engineering",
    summary: "Optimising designs and processes for the highest value without compromising quality.",
    description: [
      "We apply value engineering principles to optimise project designs and processes.",
      "Our goal is to achieve the highest value for our clients by analysing functions and identifying cost-effective alternatives without compromising quality or performance.",
    ],
    capabilities: [
      "Function analysis",
      "Design optimisation",
      "Cost-effective alternatives",
      "Lifecycle cost review",
      "Constructability studies",
      "Performance benchmarking",
    ],
    image: "/media/infrastructure-bani-mazar-bridge-egypt.webp",
  
  },
  {
    slug: "claims-management",
    num: "12",
    title: "Claims Management",
    summary: "Preparing and defending claims efficiently to protect our clients' interests.",
    description: [
      "Our team has the expertise to navigate complex contractual issues.",
      "We provide professional claims management services — preparing and defending claims efficiently and effectively to protect our clients' interests throughout a contract's life.",
    ],
    capabilities: [
      "Claim preparation",
      "Claim defence",
      "Contractual analysis",
      "Delay & disruption analysis",
      "Negotiation support",
      "Dispute avoidance",
    ],
    image: "/media/company-brand-quote.webp",

  },
  {
    slug: "contract-administration",
    num: "13",
    title: "Contract Administration",
    summary: "Managing every contractual obligation so projects run exactly to their terms.",
    description: [
      "We offer comprehensive contract administration services to manage all aspects of contractual agreements.",
      "This ensures that all parties meet their obligations, and the project is executed according to the contract's terms and conditions.",
    ],
    capabilities: [
      "Contract drafting review",
      "Obligation tracking",
      "Variation management",
      "Payment certification",
      "Correspondence control",
      "Close-out administration",
    ],
    image: "/media/about-.sectionjpg.webp",

  },
  {
    slug: "building-information-modelling",
    num: "14",
    title: "Building Information Modelling (BIM)",
    summary: "Intelligent 3D digital models that improve delivery across the facility lifecycle.",
    description: [
      "Our BIM centres are staffed with engineers and IT professionals who support projects of varying size and complexity.",
      "We use intelligent 3D digital representations to improve project delivery, facilitate decision-making, and manage information throughout the entire facility lifecycle.",
    ],
    capabilities: [
      "3D coordinated modelling",
      "Clash detection",
      "4D scheduling & 5D cost",
      "Information management",
      "Design collaboration",
      "Lifecycle asset data",
    ],
    image: "/media/airports-dhobab-airport-diagram.webp",
  
  },
];

/* ── 2 SECTORS OF ACTIVITY ────────────────────────────────────────────────────
   The operating model is two pillars — Built Environment and Infrastructure —
   and each carries a set of subsectors. Subsectors render as anchored sections
   on the parent sector page (`/sectors/infrastructure#airports`), so they stay
   linkable from the navbar without splitting the copy across thin pages. */

export const sectors: Expertise[] = [
  {
    slug: "built-environment",
    num: "01",
    title: "Built Environment",
    summary: "High-complexity building structures, public architecture, and commercial facilities.",
    description: [
      "The Built Environment division at IC focuses on high-complexity building structures, public architecture, and commercial facilities.",
      "We manage the entire project lifecycle — from pre-construction design review and civil execution to structural fit-outs, building services integration. ",
    ],
    capabilities: [
      "Healthcare Infrastructure",
      "Educational Facilities",
      "Tourism & Entertainment",
      "Residential Sector",
      "Public & Commercial Buildings",
      "Special Buildings",
    ],
    image: "/media/buildings-hero.webp",
    subsectors: [
      {
        slug: "healthcare-infrastructure",
        title: "Healthcare Infrastructure",
        description: [
          "IC delivers specialized medical facilities engineered to meet international healthcare design and infection control standards. Our capabilities span the construction of general hospital complexes, diagnostic centers, specialized outpatient clinics, and high-capacity kidney dialysis facilities.",
          "We integrate complex mechanical, electrical, and plumbing (MEP) systems, medical gas networks, cleanroom environments, and emergency power supply infrastructures necessary for critical care environments.",
        ],
        points: [],
        image: "/media/buildings-dialysis-center-hargeisa-somaliland.webp",
        projects: [
          "Dialysis Center, Hargeisa — Somaliland",
          "New College of Nursing (Fatima College of Health Sciences), Ajman — UAE",
        ],
      },
      {
        slug: "educational-facilities",
        title: "Educational Facilities",
        description: [
          "We build educational infrastructure designed to support modern learning, research, and campus logistics. Our experience includes the turnkey delivery of university campuses, administrative buildings, technical institutes, research laboratories, and primary/secondary school complexes.",
          "The scope encompasses heavy structural civil works, material procurement, acoustic and climate-controlled finishing, and complete site infrastructure.",
        ],
        points: [],
        image: "/media/1784614576280-new-college-of-nursing-fatima-college-of-health-sciences-location-ajman-uae-1.jpg",
        projects: [
          "Assiut University Building, Assiut — Egypt",
          "Design and Build of Attaya School, Hadibo — Socotra",
          "Mohamed V. University, Ajman — UAE",
          "School of the 100 Low-Cost Housing Units Project, Moroni — Comoros",
          "Dorms for Moroni University, Moroni — Comoros",
          "Sheikh Khalifa School Project, Al Mukalla Hadramout — Yemen",
        ],
      },
      {
        slug: "tourism-entertainment",
        title: "Tourism & Entertainment",
        description: [
          "IC provides engineering and construction services for the hospitality and commercial leisure sectors. We execute structural and architectural works for high-end hotel developments, beachfront resort complexes, cultural centers, and public entertainment hubs.",
          "Our teams balance aesthetic requirements with structural durability, ensuring full compliance with international safety, accessibility, and environmental standards.",
        ],
        points: [],
        image: "/media/fm-hotel-moroni-comoros.webp",
        projects: [
          "Budget Hotels, Moroni — Comoros",
          "Rehabilitation of Sheraton Hotel, Aden — Yemen",
          "Construction of Civil Works and Shore Protection for Abyan Coast Corniche, Aden — Yemen",
        ],
      },
      {
        slug: "residential-sector",
        title: "Residential Sector",
        description: [
          "Our residential portfolio addresses both public development initiatives and private real estate demand. We execute large-scale social housing programs, integrated gated residential communities, mixed-use residential towers, and custom luxury villas.",
          "IC emphasizes structural durability, energy-efficient building envelopes, and complete site integration, including internal road networks, landscaping, and residential utility hookups.",
        ],
        points: [],
        image: "/media/buildings-residential-complex-dubai.webp",
        projects: [
          "Design and Build of Sixteen Low-Cost Housing Units, Jakarta — Indonesia",
          "Design and Build of Sheikh Zayed City 361 Low-Cost Housing Units, Socotra — Yemen",
          "Private Residential Complex, Dubai — UAE",
          "Construction of Social Housing, Assiut — Egypt",
          "Dorms for Moroni University, Moroni — Comoros",
          "100 Low-Cost Housing Units with Community Facilities (Services Buildings, Mosque, and School), Moroni — Comoros",
        ],
      },
      {
        slug: "public-commercial-buildings",
        title: "Public & Commercial Buildings",
        description: [
          "IC delivers complex public and commercial developments designed to support governmental operations, business activities, and community services. Our expertise covers the construction of government administrative buildings, municipal facilities, corporate headquarters, office complexes, financial institutions, retail developments, shopping malls, convention and exhibition centers, and mixed-use commercial projects.",
          "We execute complete structural, architectural, and MEP works while integrating intelligent building systems, fire and life safety solutions, energy-efficient technologies, and sustainable construction practices to ensure long-term operational performance and compliance with international standards.",
        ],
        points: [],
        image: "/media/buildings-ministry-foreign-aden-yemen.webp",
        projects: [
          "Al-Kutbi Building — UAE",
          "Estero Commercial Shopping Center, Socotra — Yemen",
          "Implementation of the Ministry of Foreign Affairs Building, Aden — Yemen",
          "Bader Offices Buildings, Aden — Yemen",
        ],
      },
      {
        slug: "special-buildings",
        title: "Special Buildings",
        description: [
          "IC specializes in the delivery of technically demanding and purpose-built facilities that require advanced engineering solutions, specialized construction methodologies, and stringent operational requirements. Our capabilities include the construction of data centers, command and control centers, security and defense facilities, industrial support buildings, laboratories, logistics hubs, and mission-critical operational facilities.",
          "These projects involve high-performance structural systems, specialized MEP installations, controlled environments, security infrastructure, and resilient utility networks designed to achieve maximum reliability, operational continuity, and compliance with international technical and safety standards.",
        ],
        points: [],
        image: "/media/1782635477365-slaughterhouse-barbara-somaliland-01.webp",
        projects: [
          "Design and Build of Modern Slaughterhouse, Barbara — Somaliland",
          "Design and Build of Hadibo Modern Slaughterhouse, Hadibo — Socotra",
          "Al Wathba Slaughterhouse, Abu Dhabi — UAE",
        ],
      },
    ],
  },
  {
    slug: "infrastructure",
    num: "02",
    title: "Infrastructure",
    summary: "Water and wastewater systems, dams and irrigation, ports and marine works, airports, roads and bridges, and energy and power infrastructure.",
    description: [
      "IC's Infrastructure division handles heavy civil engineering, utility networks, marine works, and energy transportation systems designed to withstand demanding environmental conditions and long-term operational demands. We manage the entire lifecycle — from design and site works to installation and handover",
    ],
    capabilities: [
      "Water & Wastewater Management",
      "Dams and Irrigation",
      "Ports & Marine Works",
      "Airports",
      "Roads, Highways & Bridges",
      "Energy Infrastructure",
      "Power Generation & Distribution",

    ],
    image: "/media/infrastructure-aden-causeway-widening-yemen.webp",
    subsectors: [
      {
        slug: "water-wastewater-management",
        title: "Water & Wastewater Management",
        description: ["IC implements complete water lifecycle engineering solutions. Our operational scope includes:"],
        points: [
          "Wastewater Treatment & Collection: Construction of municipal sewage treatment plants (STPs), pumping stations, trunk sewers, and deep gravity collection networks.",
          "Marine Outfalls & Treatment: Engineering marine water treatment systems and coastal discharge infrastructure designed to protect marine ecosystems.",
          "Water Reuse & Conservation: Development of tertiary treatment systems, industrial effluent recycling facilities, and non-revenue water (NRW) reduction networks.",
        ],
        image: "/media/water-al-atiyat-wastewater-treatment-egypt.webp",
        projects: [
          "Soum, Asba and Assem Water Supply Network Project",
          "Five Water Supply Wells and water transitions line, Qalansiyah and Hadibo",
          "Infrastructure for Sheikh Khalifa Housing Project, (204) Housing Units, Tarim Hadramout, Yemen",
          "Infrastructure for Sheikh Khalifa Housing Project, Housing Units, Al Mukalla Hadramout, Yemen",
          "Al Saad Villas, Al Ain — UAE",
          "Al-Attiyat Al-Bahariya Wastewater Treatment Plant in Abnoub — Hayah Kareema",
          "Bassra Wastewater Treatment Plan",
          "Industrial Zone Sewerage System in Arab El A’wamer",
          "Sewerage System for 14 Villages in Abnoub",
          "Civil works and material supply, sewage network for 13 villages, Manfalut — Egypt",
        ],
      },
      {
        slug: "dams-irrigation",
        title: "Dams and Irrigation",
        description: [
          "To combat water scarcity and support agricultural development in arid regions, IC constructs water retention and diversion infrastructure:",
        ],
        points: [
          "Dam Construction: Engineering earth-fill, rock-fill, and concrete dams for flood control, stormwater management, and strategic water storage.",
          "Irrigation Networks: Designing and installing primary and secondary irrigation canals, pressurized water distribution pipes, agricultural pumping stations, and control gates.",
        ],
        image: "/media/water-hassan-dam-project-yemen.webp",
        projects: [
          "Beryan Dam Project, Yemen",
          "New Assiut Barrage",
          "Al-Dhaytayn Dam Project",
          "Al-Lafag Dam Project",
        ],
      },
      {
        slug: "ports-marine-works",
        title: "Ports & Marine Works",
        description: ["IC delivers specialized marine construction and coastal engineering solutions:"],
        points: [
          "Port Facilities: Construction of commercial fishing ports, cargo handling quays, and vessel berth infrastructures.",
          "Coastal Protection: Fabrication and placement of marine breakwaters, riprap slope protection, and shoreline stabilization systems.",
          "Floating & Fixed Structures: Engineering floating pontoon systems, concrete jetties, and marine access walkways.",
        ],
        image: "/media/1784614760728-qana-port-shabwah-yemen.png",
        projects: [
          "Breakwater and Fixed Pier, Aden — Yemen",
          "Angoche Fishing Port — Mozambique",
          "Marine Breakwater Project — Socotra",
        ],
      },
      {
        slug: "airports",
        title: "Airports",
        description: [
          "We support civil aviation authorities and airport operators with specialized airside and landside construction services:",
        ],
        points: [
          "Facilities Rehabilitation: Upgrading, expanding, and modernizing existing passenger terminals, cargo hangars, and administrative buildings.",
          "Airside Infrastructure: Civil works for runway expansions, taxiway overlays, apron pavements, and specialized drainage networks.",
        ],
        image: "/media/airports-al-riyan-airport-yemen.webp",
        projects: [
          "Berbera International Airport, Somaliland",
          "Rehabilitation and Expansion of Al Riyan Airport, Hadramout — Yemen",
          "Salah Alden Airport, Aden — Yemen",
        ],
      },
      {
        slug: "roads-highways-bridges",
        title: "Roads, Highways & Bridges",
        description: [
          "IC manages comprehensive transportation infrastructure programs from ground preparation to final surfacing:",
        ],
        points: [
          "Highway & Urban Road Construction: Grading, paving, and surfacing for multi-lane intercity highways, arterial urban roads, and industrial corridors.",
          "Bridges & Overpasses: Structural execution of reinforced concrete and steel bridges, flyovers, grade-separated interchanges, and pedestrian crossings.",
          "Traffic & Maintenance Systems: Installation of signage, safety barriers, intelligent transport system (ITS) conduits, and ongoing highway maintenance programs.",
        ],
        image: "/media/infrastructure-coastal-highway-taiz-yemen.webp",
        projects: [
          "Bani Mazar Bridge",
          "West Assiut Plateau Road",
          "Facilities 1304 Feddans, Assiut",
          "Arabco Projects — Cairo, Egypt",
          "New Road Links Sheikh Khalifa Road from Maleha Area through Al-Madam to Al Showaib Area (Phase 3), from Sharjah Border to Al-Showaib Roundabout Area at Al Ain — UAE",
          "Al Gazal wal Naseej and Cairo Intersection and Bridges",
          "As-Suwayda — Wadi Al Zubayrah Road 2.4 M Project",
          "Al-Zarbi Road — Hayfan — Taiz",
          "Zy Al-Barh Al-Sarari Road — Lower Section",
          "Al Saad Villas — Al Ain, UAE",
        ],
      },
      {
        slug: "energy-infrastructure",
        title: "Energy Infrastructure",
        description: [
          "We execute civil works and structural installations for conventional and renewable energy developments:",
        ],
        points: [
          "Renewable Energy Integration: Site preparation, foundation civil engineering, and structural installations for solar PV parks and utility-scale renewable facilities.",
          "Sustainable Power Assets: Civil infrastructure for clean energy plants and industrial energy recovery systems.",
        ],
        image: "/media/1784614915593-project-manegment-belhaf-yemen.png",
      },
      {
        slug: "power-generation-distribution",
        title: "Power Generation & Distribution",
        description: [
          "IC supports national power grids through heavy power plant engineering and distribution network execution:",
        ],
        points: [
          "Power Generation Facilities: Civil works, equipment foundations, and structural framing for thermal, steam, and gas turbine power stations.",
          "Substations & Grid Connection: Construction of high-voltage indoor and outdoor substations, including transformer pads, control buildings, and switchyards.",
          "Transmission & Distribution Networks: Installation of overhead transmission line towers, underground high-voltage cabling networks, and regional distribution grids.",
        ],
        image: "/media/1784614960071-power-study-generation-and-transmission-sulamani-iraq.png",
        projects: [
          "Construction & Operation of Power Plant, Hadibo",
          "Construction & Operation of Power Plant, Qalansiyah",
          "Civil works for Power Plant in Alhaswa Power Station, Aden",
          "Al Saad Villas — Al Ain, UAE",
        ],
      },
    ],
  },
];

/* ── Legacy sector paths ──────────────────────────────────────────────────────
   The catalogue used to be seven flat sectors, then a renamed set of eight.
   Both generations are still linked from the web, so every retired path maps
   onto its home in the two-pillar model — usually a subsector anchor. */

export const LEGACY_SECTOR_PATHS: Record<string, string> = {
  // original taxonomy
  "buildings":                     "/sectors/built-environment",
  "networks-infrastructures":      "/sectors/infrastructure#water-wastewater-management",
  "civil-works":                   "/sectors/infrastructure#dams-irrigation",
  "transportation-roads-bridges":  "/sectors/infrastructure#roads-highways-bridges",
  "water-sewage-treatment":        "/sectors/infrastructure#water-wastewater-management",
  "dams-irrigation":               "/sectors/infrastructure#dams-irrigation",
  "pipelines":                     "/sectors/infrastructure#energy-infrastructure",
};

/* ── Lookups ─────────────────────────────────────────────────────────────── */

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);

/* ── Admin-editable overlay ──────────────────────────────────────────────────
   The 14 services and 7 sectors ship with the defaults above, but every field
   is editable in the admin panel. Each item maps to a content section:
     service → "svc_<slug>"   sector → "sct_<slug>"   (dashes become underscores)
   Fields: title, slug (the URL segment), summary, image, description (one
   paragraph per line), capabilities (comma- or newline-separated).
   resolveExpertise() overlays any saved values onto the defaults;
   expertiseDefaultSections() seeds the admin. */

export type ExpertiseKind = "service" | "sector";

type StoreLike = {
  content?: Record<string, Record<string, string>>;
  _deletedSections?: string[];
} | null | undefined;

const underscore = (slug: string) => slug.replace(/-/g, "_");
const dashify = (key: string) => key.replace(/_/g, "-");
export const serviceSectionKey = (slug: string) => `svc_${underscore(slug)}`;
export const sectorSectionKey = (slug: string) => `sct_${underscore(slug)}`;
const sectionKeyFor = (kind: ExpertiseKind, slug: string) =>
  kind === "service" ? serviceSectionKey(slug) : sectorSectionKey(slug);

const splitLines = (v: string) => v.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
const splitList = (v: string) => v.split(/[,\n]/).map((s) => s.trim()).filter(Boolean);

/** URL-safe form of an admin-entered slug. Anything that isn't a letter or
    digit becomes a single dash, so "Ports & Marine" → "ports-marine". */
const cleanSlug = (v: string | undefined) =>
  (v || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/* A section is keyed by the item's *original* slug (`svc_<slug>`), never by the
   editable one — that key is what ties saved content to its built-in defaults,
   so it has to stay put even after the URL changes. */

/** Admin section holding one subsector's copy. Keyed off the *sector's*
    built-in slug so the pairing survives a sector URL change. */
export const subSectionKey = (sectorSlug: string, subSlug: string) =>
  `sub_${underscore(sectorSlug)}_${underscore(subSlug)}`;

/** Subsectors of a built-in sector, overlaid with saved edits and minus any the
    admin deleted. The anchor `slug` is deliberately not editable — inbound
    links and the navbar both depend on it. */
function resolveSubsectors(store: StoreLike, sector: Expertise): SubSector[] {
  const deleted = deletedKeys(store);
  return (sector.subsectors || [])
    .filter((sub) => !deleted.has(subSectionKey(sector.slug, sub.slug)))
    .map((sub) => {
      const f = store?.content?.[subSectionKey(sector.slug, sub.slug)] || {};
      return {
        ...sub,
        title: f.title || sub.title,
        image: f.image || sub.image,
        description: f.description ? splitLines(f.description) : sub.description,
        // Bullets carry commas of their own, so newlines are the only separator.
        points: f.points ? splitLines(f.points) : sub.points,
        // Same rule — project names are full of commas ("…, Hadramout, Yemen").
        projects: f.projects ? splitLines(f.projects) : sub.projects,
      };
    });
}

export function resolveExpertise(store: StoreLike, kind: ExpertiseKind, item: Expertise): Expertise {
  const f = store?.content?.[sectionKeyFor(kind, item.slug)] || {};
  return {
    ...item,
    ...(item.subsectors ? { subsectors: resolveSubsectors(store, item) } : {}),
    slug: cleanSlug(f.slug) || item.slug,
    title: f.title || item.title,
    summary: f.summary || item.summary,
    image: f.image || item.image,
    description: f.description ? splitLines(f.description) : item.description,
    capabilities: f.capabilities ? splitList(f.capabilities) : item.capabilities,
  };
}

/* ── Admin-created items ─────────────────────────────────────────────────────
   The panel's "Add Section" can create a `sct_<slug>` / `svc_<slug>` section
   with no counterpart in the arrays above — a sector or service authored
   entirely from the admin panel. We synthesise an Expertise from the stored
   fields and append it after the built-in ones, so the panel can add items
   without a code change.

   A stored section only becomes live once it has a title: that stops a
   half-finished entry from publishing an empty card and a bare detail page. */

const HUB_SUFFIX = "hub";   // sct_hub / svc_hub hold hub-page copy, not items
const FALLBACK_IMAGE = "/media/sectors hero section photo.webp";

/* Section keys of the retired sectors in LEGACY_SECTOR_PATHS. The admin store
   still carries a `sct_<slug>` section for each — leftovers from when they were
   real sectors, since renaming the taxonomy in code never removed their content
   — and storeAddedItems would otherwise resurrect all seven as phantom sectors
   numbered 03…09 after the two real pillars.

   This has to be enforced here rather than by deleting them from
   data/site-content.json: the live admin panel commits its own store back to
   the repo, so a JSON-only cleanup is undone by the next "Admin content update"
   merge. Deriving the set from LEGACY_SECTOR_PATHS keeps the two lists from
   drifting — retiring a sector there retires its leftover section here too. */
const RETIRED_SECTOR_KEYS = new Set(Object.keys(LEGACY_SECTOR_PATHS).map(sectorSectionKey));

function storeAddedItems(store: StoreLike, kind: ExpertiseKind): Expertise[] {
  const prefix = kind === "service" ? "svc_" : "sct_";
  const builtIn = kind === "service" ? services : sectors;
  const known = new Set(builtIn.map((i) => sectionKeyFor(kind, i.slug)));
  const deleted = new Set(store?._deletedSections || []);
  const retired = kind === "sector" ? RETIRED_SECTOR_KEYS : new Set<string>();

  return Object.entries(store?.content || {})
    .filter(([key]) => key.startsWith(prefix) && !known.has(key) && !deleted.has(key))
    .filter(([key]) => !retired.has(key))
    .filter(([key]) => key.slice(prefix.length) !== HUB_SUFFIX)
    .filter(([, f]) => (f?.title || "").trim() !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, f], i) => ({
      slug: cleanSlug(f.slug) || dashify(key.slice(prefix.length)),
      num: String(builtIn.length + i + 1).padStart(2, "0"),
      title: f.title.trim(),
      summary: f.summary || "",
      description: f.description ? splitLines(f.description) : [],
      capabilities: f.capabilities ? splitList(f.capabilities) : [],
      // next/image throws on an empty src — always hand it something real.
      image: f.image || FALLBACK_IMAGE,
    }));
}

/* ── Deletion ────────────────────────────────────────────────────────────────
   A built-in item lives in the arrays above, so deleting it in the admin panel
   cannot remove it from the source. The panel records the section key in
   `_deletedSections` instead, and every consumer must honour that — otherwise a
   "deleted" service keeps rendering site-wide, falling back to its default copy
   because its saved section is gone. */

const deletedKeys = (store: StoreLike) => new Set(store?._deletedSections || []);

/** Built-in items the admin hasn't deleted, each overlaid with saved edits. */
function liveBuiltIns(store: StoreLike, kind: ExpertiseKind): Expertise[] {
  const deleted = deletedKeys(store);
  const builtIn = kind === "service" ? services : sectors;
  return builtIn
    .filter((i) => !deleted.has(sectionKeyFor(kind, i.slug)))
    .map((i) => resolveExpertise(store, kind, i));
}

/** `num` is a positional display index, so it has to be re-derived after
    deletions — otherwise removing item 03 leaves a gap in the 01…N sequence. */
const renumber = (items: Expertise[]): Expertise[] =>
  items.map((item, i) => ({ ...item, num: String(i + 1).padStart(2, "0") }));

export const resolveServices = (store: StoreLike): Expertise[] =>
  renumber([...liveBuiltIns(store, "service"), ...storeAddedItems(store, "service")]);

export const resolveSectors = (store: StoreLike): Expertise[] =>
  renumber([...liveBuiltIns(store, "sector"), ...storeAddedItems(store, "sector")]);

/** Look up a single item by slug, covering built-in *and* admin-created
    entries. Resolved from the same list the hub pages render, so a deleted item
    returns undefined (callers 404) and `num` matches the card it was opened
    from. */
export function resolveBySlug(
  store: StoreLike,
  kind: ExpertiseKind,
  slug: string
): Expertise | undefined {
  const all = kind === "service" ? resolveServices(store) : resolveSectors(store);
  return all.find((i) => i.slug === slug);
}

/** Where an old URL should now point, or undefined when it shouldn't redirect.
    Renaming an item's slug orphans its previous path, so the built-in slug that
    shipped in this file is treated as a permanent alias for that item.

    Nothing is redirected when the path still resolves (a live item's slug always
    wins, even if another item used to own that path) or when the item behind it
    was deleted — removed content has to keep 404ing rather than soft-landing on
    an unrelated page. */
export function redirectSlugFor(
  store: StoreLike,
  kind: ExpertiseKind,
  slug: string
): string | undefined {
  if (resolveBySlug(store, kind, slug)) return undefined;

  const builtIn = kind === "service" ? getService(slug) : getSector(slug);
  if (!builtIn) return undefined;
  if (deletedKeys(store).has(sectionKeyFor(kind, builtIn.slug))) return undefined;

  const current = resolveExpertise(store, kind, builtIn).slug;
  return current === slug ? undefined : current;
}

/** Default content sections for every service & sector — merged into the admin
    content store so each item is listed and editable. */
export function expertiseDefaultSections(): Record<string, Record<string, string>> {
  const out: Record<string, Record<string, string>> = {};
  const add = (kind: ExpertiseKind, item: Expertise) => {
    out[sectionKeyFor(kind, item.slug)] = {
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      image: item.image,
      description: item.description.join("\n"),
      capabilities: item.capabilities.join(", "),
    };
  };
  services.forEach((s) => add("service", s));
  sectors.forEach((s) => {
    add("sector", s);
    // Each subsector gets its own section so the panel can edit them
    // individually under the sector they belong to.
    (s.subsectors || []).forEach((sub) => {
      out[subSectionKey(s.slug, sub.slug)] = {
        title: sub.title,
        image: sub.image,
        description: sub.description.join("\n"),
        points: sub.points.join("\n"),
        // Seeded even when empty so every subsector offers the field, and a
        // subsector with no references yet can gain them from the panel alone.
        projects: (sub.projects || []).join("\n"),
      };
    });
  });
  return out;
}
