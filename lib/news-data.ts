// ─────────────────────────────────────────────────────────────────────────────
// news-data.ts
// Source: INFRA Construction LinkedIn page (linkedin.com/company/ic-gp)
//         and ic-gp.com posts
// ─────────────────────────────────────────────────────────────────────────────

export type NewsItem = {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  author?: string;
  location?: string;
  readTime?: string;
  content: string[];
  highlights?: string[];
};

export const newsItems: NewsItem[] = [
  // ── 1. MOST RECENT: Shaanxi Partnership (LinkedIn June 2025) ─────────────
  {
    slug: "infra-construction-shaanxi-global-partnership-2025",
    date: "June 2025",
    category: "Partnerships",
    title: "INFRA Construction Group Partners with Shaanxi Construction",
    excerpt:
      "INFRA Construction Group has entered into a strategic partnership with Shaanxi Construction Engineering Group Corporation, marking a significant expansion of global collaboration to deliver large-scale infrastructure projects across key markets.",
    image: "/media/news-shaanxi-partnership-2025.jpg",
    location: "Abu Dhabi, UAE",
    author: "INFRA Communications",
    readTime: "4 min read",
    content: [
      "INFRA Construction Group has formalised a strategic partnership with Shaanxi Construction Engineering Group Corporation — the largest state-owned investment and construction group in Shaanxi Province, China — through the signing of a Memorandum of Understanding.",
      "The partnership is designed to combine INFRA's deep expertise in Middle Eastern and African markets with Shaanxi Construction's large-scale engineering capabilities and proven global delivery record. Together, the two organisations will target complex infrastructure programmes across multiple regions.",
      "This collaboration is expected to open new business development avenues, enhance competitive positioning, and enable both organisations to pursue projects that neither could as effectively approach independently. The agreement covers a wide range of infrastructure disciplines, including civil works, industrial projects, and large-scale transportation infrastructure.",
      "INFRA Construction's CEO and leadership team expressed strong confidence in the long-term value of this global partnership, noting that it aligns directly with the company's strategic direction and its commitment to delivering excellence across borders.",
    ],
    highlights: [
      "MOU signed with Shaanxi Construction Engineering Group Corporation",
      "Shaanxi Construction is the largest state-owned construction group in Shaanxi Province",
      "Targeting large-scale infrastructure projects across global markets",
      "Combines INFRA's regional expertise with Shaanxi's engineering scale",
    ],
  },

  // ── 2. Kuwait Market Expansion Meeting (LinkedIn 2025) ───────────────────
  {
    slug: "infra-construction-kuwait-market-expansion-2025",
    date: "May 2025",
    category: "Business Development",
    title: "A Strategic Step Toward Kuwait: INFRA Explores Market Expansion Opportunities",
    excerpt:
      "As part of its continuous efforts to explore expansion opportunities in the Kuwait market, INFRA Construction held an important meeting with Go Green, marking a strategic step toward establishing a presence in Kuwait.",
    image: "/media/news-kuwait-expansion-2025.jpg",
    location: "Kuwait",
    author: "INFRA Communications",
    readTime: "3 min read",
    content: [
      "As part of its continuous efforts to explore expansion opportunities in new markets, INFRA Construction held an important strategic meeting with Go Green in Kuwait — a significant step in the company's ambitions to enter and grow within the Kuwaiti construction sector.",
      "The meeting focused on identifying collaboration pathways, understanding the local market landscape, and establishing the groundwork for potential joint ventures and project delivery in Kuwait. INFRA's leadership engaged directly with Go Green representatives to assess mutual opportunities.",
      "Kuwait represents a key target market for INFRA's regional growth strategy, given the country's substantial pipeline of infrastructure and building projects driven by government investment programmes and Vision 2035 development plans.",
      "This engagement reflects INFRA Construction's broader approach to strategic market entry — building relationships, understanding local requirements, and identifying the right partners before committing to full operational presence in new geographies.",
    ],
    highlights: [
      "Strategic meeting held with Go Green in Kuwait",
      "Exploring market entry and expansion opportunities",
      "Kuwait identified as key target market for regional growth",
      "Building foundations for potential project delivery in Kuwait",
    ],
  },

  // ── 3. Nad Al Sheba Dubai Residential Delivery (LinkedIn ~1 month ago) ───
  {
    slug: "infra-construction-nad-al-sheba-dubai-villas-2025",
    date: "May 2025",
    category: "Projects",
    title: "Business as Unusual: INFRA Completes Two Residential Plots in Nad Al Sheba, Dubai",
    excerpt:
      "INFRA Construction has successfully completed and delivered two residential plots in Nad Al Sheba, Dubai — each featuring two standalone villas thoroughly designed to offer exceptional privacy and comfortable family living.",
    image: "/media/news-nad-al-sheba-dubai-villas-2025.jpg",
    location: "Nad Al Sheba, Dubai, UAE",
    author: "INFRA Projects Team",
    readTime: "4 min read",
    content: [
      "INFRA Construction has successfully completed and delivered two residential plots in Nad Al Sheba, Dubai. Each plot features two standalone villas thoroughly designed to offer exceptional privacy and a comfortable, high-quality family lifestyle.",
      "The villas were designed and built to a meticulous standard, reflecting INFRA's commitment to architectural quality and client satisfaction in the UAE residential market. Each unit was crafted to balance modern aesthetics with practical family living requirements.",
      "The successful delivery of these Nad Al Sheba villas adds to INFRA's growing residential portfolio in the UAE and demonstrates the company's capability to deliver private residential projects to international standards within Dubai's premium residential neighbourhoods.",
      "This project is a further example of INFRA Construction's 'business as unusual' approach — going beyond standard delivery to ensure every detail of design, quality, and client experience is attended to with care.",
    ],
    highlights: [
      "Two residential plots completed in Nad Al Sheba, Dubai",
      "Each plot features two standalone villas",
      "Designed for exceptional privacy and family living",
      "Delivered to international residential standards",
    ],
  },

  // ── 4. Jordan Independence Day (LinkedIn May 2025) ───────────────────────
  {
    slug: "infra-construction-jordan-independence-day-2025",
    date: "May 2025",
    category: "Community",
    title: "INFRA Construction Celebrates Jordan's Independence Day",
    excerpt:
      "On the occasion of the Independence Day of the Hashemite Kingdom of Jordan, INFRA Construction proudly celebrates Jordan's journey of growth, stability, and continuous development.",
    image: "/media/news-jordan-independence-day-2025.jpg",
    location: "Amman, Jordan",
    author: "INFRA Communications",
    readTime: "2 min read",
    content: [
      "On the occasion of the Independence Day of the Hashemite Kingdom of Jordan, INFRA Construction proudly joins in celebrating Jordan's remarkable journey of growth, stability, and continuous development since its independence.",
      "Jordan holds a special significance in INFRA Construction's regional operations and partnerships, and the occasion serves as a moment to reaffirm the company's respect and admiration for the Jordanian people and their nation's proud heritage.",
      "INFRA Construction has maintained a close relationship with Jordan throughout its years of operation in the region, and the company's leadership extended warm congratulations to the Hashemite Kingdom on this important national day.",
      "The company remains committed to contributing positively to the communities and nations it operates in — including through the delivery of infrastructure and buildings projects that support long-term growth and quality of life.",
    ],
    highlights: [
      "Celebrating Jordan's Independence Day — 25 May",
      "Recognising Jordan's journey of growth and stability",
      "Reaffirming INFRA's commitment to its regional partnerships",
      "Congratulations extended to the Hashemite Kingdom",
    ],
  },

  // ── 5. Railway & Intelligent Transportation Expansion (LinkedIn 2025) ────
  {
    slug: "infra-construction-railway-intelligent-transport-expansion-2025",
    date: "April 2025",
    category: "Business Development",
    title: "INFRA Expands into Railway Projects and Intelligent Transportation Systems",
    excerpt:
      "INFRA Construction is expanding its presence in railway projects and intelligent transportation systems, following a strategic meeting with a leading Korean company to explore collaboration in this growing sector.",
    image: "/media/news-railway-transport-expansion-2025.jpg",
    location: "UAE",
    author: "INFRA Communications",
    readTime: "4 min read",
    content: [
      "INFRA Construction is expanding its presence in railway infrastructure projects and intelligent transportation systems — a strategic move that broadens the company's portfolio beyond its established civil and buildings expertise.",
      "As part of this expansion, INFRA held a strategic meeting with a leading Korean company specialising in railway systems and intelligent transportation technologies. The meeting explored potential collaboration opportunities and the integration of advanced transport solutions into INFRA's project delivery capabilities.",
      "The railway and intelligent transportation sector represents a significant growth area across the Middle East and Africa, driven by government investments in modern urban mobility, inter-city rail networks, and smart infrastructure programmes.",
      "This strategic direction reflects INFRA Construction's commitment to evolving with the needs of the markets it serves and positioning itself at the forefront of next-generation infrastructure development.",
    ],
    highlights: [
      "Expanding into railway and intelligent transportation systems",
      "Strategic meeting held with leading Korean company",
      "Targeting growing rail infrastructure market in the region",
      "Broadening INFRA's project delivery capabilities",
    ],
  },

  // ── 6. HS Group / INFRA East Africa Focus (LinkedIn 2025) ────────────────
  {
    slug: "infra-construction-hs-group-east-africa-expansion-2025",
    date: "March 2025",
    category: "Partnerships",
    title: "INFRA Strengthens Its Role Within HS Group with Focus on East Africa",
    excerpt:
      "As part of strengthening its execution role within HS Group, INFRA Construction is expanding its presence in infrastructure, with a renewed strategic focus on East Africa — a key growth region for the Group.",
    image: "/media/news-hs-group-east-africa-2025.jpg",
    location: "Abu Dhabi, UAE",
    author: "INFRA Communications",
    readTime: "4 min read",
    content: [
      "As part of a strategic initiative to strengthen its execution role within HS Group, INFRA Construction is expanding its operational presence in infrastructure — with a particular focus on East Africa as a key growth region for the Group's activities.",
      "The initiative builds on INFRA's existing track record in the African continent and positions the company to take on larger, more complex programmes across East African markets. The strategy is aligned with HS Group's broader ambition to deepen its footprint in high-growth emerging markets.",
      "East Africa offers significant infrastructure development opportunities across transport, water, energy, and buildings sectors, driven by sustained economic growth and increasing public and private investment in the region's built environment.",
      "INFRA's leadership confirmed that Abu Dhabi remains the operational hub and strategic base for all Group activities, with the East Africa focus representing a natural extension of the company's international project delivery capabilities.",
    ],
    highlights: [
      "Strengthening execution role within HS Group",
      "Strategic focus on East Africa infrastructure markets",
      "Building on existing track record across the African continent",
      "Abu Dhabi remains core operational hub for all Group activities",
    ],
  },

  // ── 7. Gradspan Cooperation Agreement (LinkedIn 2025) ────────────────────
  {
    slug: "infra-construction-gradspan-cooperation-agreement-2025",
    date: "February 2025",
    category: "Partnerships",
    title: "INFRA Construction Signs Cooperation Agreement with Gradspan",
    excerpt:
      "INFRA Construction is pleased to announce the signing of a cooperation agreement with Gradspan, a company specialised in construction and steel works within the UAE — expanding INFRA's delivery capabilities and specialist partnerships.",
    image: "/media/news-gradspan-agreement-2025.jpg",
    location: "UAE",
    author: "INFRA Communications",
    readTime: "3 min read",
    content: [
      "INFRA Construction is pleased to announce the signing of a cooperation agreement with Gradspan, a company specialised in construction and steel works within the United Arab Emirates.",
      "The agreement formalises a collaborative framework between the two companies, enabling INFRA to leverage Gradspan's specialist expertise in steel construction and works — complementing INFRA's broad civil, infrastructure, and buildings capabilities.",
      "This partnership is expected to enhance INFRA's competitiveness on projects that require integrated steel and civil construction delivery, and opens new avenues for joint business development across the UAE and wider regional markets.",
      "The cooperation with Gradspan is part of INFRA Construction's ongoing strategy to build a strong network of specialist partners, enabling the company to offer comprehensive, high-quality solutions across all construction disciplines.",
    ],
    highlights: [
      "Cooperation agreement signed with Gradspan",
      "Gradspan specialises in construction and steel works in the UAE",
      "Enhances INFRA's specialist delivery capabilities",
      "Part of INFRA's broader strategic partner network development",
    ],
  },
];

export function getNewsBySlug(slug: string) {
  return newsItems.find((n) => n.slug === slug);
}