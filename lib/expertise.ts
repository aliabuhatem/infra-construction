/* ────────────────────────────────────────────────────────────────────────
   Expertise catalogue — the single source of truth for INFRA Construction's
   14 Services and 7 Sectors of activity.

   Both /services and /sectors (hub + dynamic [slug] detail pages) and the
   home "Our Expertise" section read from here, so the whole site stays in
   sync from one place. Titles use Title Case (site-wide convention).
──────────────────────────────────────────────────────────────────────────── */

export interface Expertise {
  slug: string;
  num: string;               // "01" … used as a display index on cards
  title: string;
  summary: string;           // one line — shown on the card
  description: string[];     // full copy — shown on the detail page
  capabilities: string[];    // bullet list of what's included
  image: string;             // /media/… hero + card image
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

/* ── 7 SECTORS OF ACTIVITY ───────────────────────────────────────────────── */

export const sectors: Expertise[] = [
  {
    slug: "buildings",
    num: "01",
    title: "Buildings",
    summary: "Distinguished public and private buildings — architecture, MEP, and civil works.",
    description: [
      "We construct distinguished and exceptional public and private buildings.",
      "Our portfolio showcases a range of outstanding projects, reflecting our commitment to excellence and innovation in architecture, MEP (Mechanical, Electrical, and Plumbing), and civil works.",
    ],
    capabilities: [
      "Residential & commercial buildings",
      "Institutional & public facilities",
      "Architectural design",
      "MEP engineering",
      "Structural & civil works",
      "Fit-out & finishing",
    ],
    image: "/media/buildings-social-housing-assiut-egypt.webp",

  },
  {
    slug: "networks-infrastructures",
    num: "02",
    title: "Networks & Infrastructures",
    summary: "Vital utility networks for water, wastewater, and critical distribution systems.",
    description: [
      "INFRA Construction has extensive experience in developing vital infrastructure networks.",
      "This includes projects for water and wastewater collection and distribution, as well as other critical utility networks that connect communities and industry.",
    ],
    capabilities: [
      "Water distribution networks",
      "Wastewater collection",
      "Utility networks",
      "Pumping stations",
      "Network rehabilitation",
      "Urban infrastructure",
    ],
    image: "/media/infrastructure-aden-causeway-widening-yemen.webp",
  
  },
  {
    slug: "civil-works",
    num: "03",
    title: "Civil Works",
    summary: "Reservoirs, storage tanks, dams, and irrigation — sustainable water resource works.",
    description: [
      "Our expertise in civil works covers a broad scope of projects including water reservoirs, storage tanks, dams, and irrigation systems.",
      "We provide robust and sustainable solutions for essential water resource management, engineered to endure in demanding environments.",
    ],
    capabilities: [
      "Water reservoirs",
      "Storage tanks",
      "Dams & dikes",
      "Irrigation systems",
      "Earthworks",
      "Reinforced concrete structures",
    ],
    image: "/media/water-tank-aden-yemen.webp",
   
  },
  {
    slug: "transportation-roads-bridges",
    num: "04",
    title: "Transportation, Roads & Bridges",
    summary: "Complex transport projects that enhance communities and quality of life.",
    description: [
      "We specialise in the successful delivery of large, complex transport projects.",
      "Our services cover all aspects of road, highway, and bridge engineering — from planning and design to construction and maintenance. We aim to enhance communities and improve quality of life through sustainable transportation solutions.",
    ],
    capabilities: [
      "Highways & expressways",
      "Urban & rural roads",
      "Bridges & flyovers",
      "Causeways",
      "Road maintenance",
      "Traffic & drainage works",
    ],
    image: "/media/infrastructure-coastal-highway-taiz-yemen.webp",
   
  },
  {
    slug: "water-sewage-treatment",
    num: "05",
    title: "Water & Sewage Treatment Plants & Networks",
    summary: "Complete water and sewage solutions — treatment plants to distribution networks.",
    description: [
      "INFRA Construction provides complete solutions for water and sewage treatment.",
      "Our services range from the construction of treatment plants to the installation of vast collection and distribution networks. We are dedicated to maximising efficiencies and delivering sustainable solutions in this critical sector.",
    ],
    capabilities: [
      "Water treatment plants",
      "Sewage treatment plants",
      "Collection networks",
      "Distribution networks",
      "Pumping & lift stations",
      "Process & mechanical works",
    ],
    image: "/media/water-al-atiyat-wastewater-treatment-egypt.webp",

  },
  {
    slug: "dams-irrigation",
    num: "06",
    title: "Dams & Irrigation",
    summary: "Planning, design, and construction of dams and irrigation for water and agriculture.",
    description: [
      "We have the technical expertise for the planning, design, and construction of dams and irrigation systems.",
      "These crucial structures manage flood control, provide water storage, and support agriculture — especially in arid regions where water security is vital.",
    ],
    capabilities: [
      "Dam construction",
      "Flood-control structures",
      "Water storage",
      "Irrigation canals",
      "Dikes & barrages",
      "Agricultural water supply",
    ],
    image: "/media/water-hassan-dam-project-yemen.webp",

  },
  {
    slug: "pipelines",
    num: "07",
    title: "Pipelines",
    summary: "Complex pipeline systems for refinery, petrochemical, cross-state, and utility use.",
    description: [
      "Our capabilities include the construction and installation of complex pipeline systems for various applications.",
      "We provide engineering services for refinery piping, petrochemical piping, cross-state pipelines, and utility piping — complete with 3D modelling and stress analysis.",
    ],
    capabilities: [
      "Refinery piping",
      "Petrochemical piping",
      "Cross-state pipelines",
      "Utility piping",
      "3D modelling",
      "Pipe stress analysis",
    ],
    image: "/media/energy-power-plant-piping-aden-yemen.webp",

  },
];

/* ── Lookups ─────────────────────────────────────────────────────────────── */

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);

/* ── Admin-editable overlay ──────────────────────────────────────────────────
   The 14 services and 7 sectors ship with the defaults above, but every field
   is editable in the admin panel. Each item maps to a content section:
     service → "svc_<slug>"   sector → "sct_<slug>"   (dashes become underscores)
   Fields: title, summary, image, description (one paragraph per line),
   capabilities (comma- or newline-separated). resolveExpertise() overlays any
   saved values onto the defaults; expertiseDefaultSections() seeds the admin. */

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

export function resolveExpertise(store: StoreLike, kind: ExpertiseKind, item: Expertise): Expertise {
  const f = store?.content?.[sectionKeyFor(kind, item.slug)] || {};
  return {
    ...item,
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

function storeAddedItems(store: StoreLike, kind: ExpertiseKind): Expertise[] {
  const prefix = kind === "service" ? "svc_" : "sct_";
  const builtIn = kind === "service" ? services : sectors;
  const known = new Set(builtIn.map((i) => sectionKeyFor(kind, i.slug)));
  const deleted = new Set(store?._deletedSections || []);

  return Object.entries(store?.content || {})
    .filter(([key]) => key.startsWith(prefix) && !known.has(key) && !deleted.has(key))
    .filter(([key]) => key.slice(prefix.length) !== HUB_SUFFIX)
    .filter(([, f]) => (f?.title || "").trim() !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, f], i) => ({
      slug: dashify(key.slice(prefix.length)),
      num: String(builtIn.length + i + 1).padStart(2, "0"),
      title: f.title.trim(),
      summary: f.summary || "",
      description: f.description ? splitLines(f.description) : [],
      capabilities: f.capabilities ? splitList(f.capabilities) : [],
      // next/image throws on an empty src — always hand it something real.
      image: f.image || FALLBACK_IMAGE,
    }));
}

export const resolveServices = (store: StoreLike): Expertise[] => [
  ...services.map((s) => resolveExpertise(store, "service", s)),
  ...storeAddedItems(store, "service"),
];
export const resolveSectors = (store: StoreLike): Expertise[] => [
  ...sectors.map((s) => resolveExpertise(store, "sector", s)),
  ...storeAddedItems(store, "sector"),
];

/** Look up a single item by slug, covering built-in *and* admin-created
    entries. Returns undefined when neither matches, so callers can 404. */
export function resolveBySlug(
  store: StoreLike,
  kind: ExpertiseKind,
  slug: string
): Expertise | undefined {
  const builtIn = kind === "service" ? getService(slug) : getSector(slug);
  if (builtIn) return resolveExpertise(store, kind, builtIn);
  return storeAddedItems(store, kind).find((i) => i.slug === slug);
}

/** Default content sections for every service & sector — merged into the admin
    content store so each item is listed and editable. */
export function expertiseDefaultSections(): Record<string, Record<string, string>> {
  const out: Record<string, Record<string, string>> = {};
  const add = (kind: ExpertiseKind, item: Expertise) => {
    out[sectionKeyFor(kind, item.slug)] = {
      title: item.title,
      summary: item.summary,
      image: item.image,
      description: item.description.join("\n"),
      capabilities: item.capabilities.join(", "),
    };
  };
  services.forEach((s) => add("service", s));
  sectors.forEach((s) => add("sector", s));
  return out;
}
