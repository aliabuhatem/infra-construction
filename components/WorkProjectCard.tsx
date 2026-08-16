import Link from "next/link";
import ContentText from "@/components/admin-panel/ContentText";
import MediaImage from "@/components/admin-panel/MediaImage";

const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

/* The card used by the home page's "Our Work" block and by the project strip at
   the foot of each sector page. Both read from the admin store, so every field
   is a ContentText/MediaImage bound to `sectionKey` — editing a project in the
   panel updates it wherever it appears.

   The Reveal wrapper stays with the caller: the two grids stagger their cards
   differently, and that is layout, not card. */

export interface WorkProject {
  /** Admin section key — "home_project_1" or "project_7". */
  sectionKey: string;
  href: string;
  title: string;
  country: string;
  type: string;
  image: string;
}

export default function WorkProjectCard({ project: p }: { project: WorkProject }) {
  return (
    <Link
      href={p.href}
      className="card-base group relative overflow-hidden rounded-lg border border-[#213B4D]/10 bg-white shadow-[0_1px_2px_rgba(33,59,77,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1F93A4] hover:shadow-[0_22px_46px_-24px_rgba(33,59,77,0.4)]"
    >
      <div className="relative h-60 shrink-0 overflow-hidden">
        <MediaImage
          category={p.sectionKey}
          title={`${p.sectionKey}_image`}
          fallbackSrc={p.image}
          alt={p.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-[#213B4D]/25 group-hover:bg-[#213B4D]/10 transition-colors duration-300" />
        {/* The teal country pill that sat at top-4 left-4 is off, matching the
            portfolio grid. `country` stays on the props and in the store, so
            restoring the badge is a markup change only. This variant has no
            sub-sector badge on the image — it carries the sub-sector as the
            teal label under it, and two of them would just repeat. */}
      </div>
      <div className="card-body p-6">
        <p className="text-[#1F93A4] text-sm font-medium uppercase tracking-[0.08em] mb-2" style={{ fontFamily: B }}>
          <ContentText section={p.sectionKey} name="type" fallback={p.type} />
        </p>
        {/* lineHeight inline: .card-title (globals.css) is unlayered and so
            outranks Tailwind's leading-* utility. */}
        <h3 className="card-title text-[#213B4D] font-bold text-[17px] lg:text-[18px] group-hover:text-[#1F93A4] transition-colors" style={{ fontFamily: B, lineHeight: 1.35 }}>
          <ContentText section={p.sectionKey} name="title" fallback={p.title} />
        </h3>
      </div>
      <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1F93A4] transition-all duration-500 group-hover:w-full" />
    </Link>
  );
}
