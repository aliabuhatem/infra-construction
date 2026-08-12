import Link from "next/link";
import Image from "next/image";
import type { Expertise } from "@/lib/expertise";

const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

/* Wide horizontal sector card used on the home page "Sectors of Activity"
   block: image on the left, copy + "Read more" affordance on the right.
   The two sectors get this treatment instead of the compact ExpertiseCard
   used by the services grid. */

export default function SectorCardWide({ item }: { item: Expertise }) {
  return (
    <Link
      href={`/sectors/${item.slug}`}
      className="group flex w-full flex-col items-center rounded-lg border border-[#213B4D]/10 bg-[#f6f8f9] p-6 shadow-xs transition-shadow duration-300 hover:shadow-[0_24px_50px_-20px_rgba(33,59,77,0.35)] md:flex-row md:items-center"
    >
      {/* Fixed 1:1 box. Stretching the photo to the card's height (the old
          `md:h-auto md:self-stretch`) made it as tall as whatever copy sat
          beside it, so the crop changed from card to card. */}
      <div className="relative mb-4 aspect-square w-full shrink-0 overflow-hidden rounded-lg md:mb-0 md:w-56">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
          sizes="(max-width: 768px) 100vw, 224px"
        />
        <span
          className="absolute left-3 top-2 text-[22px] font-bold leading-none text-white/85"
          style={{ fontFamily: B }}
        >
          {item.num}
        </span>
      </div>

      <div className="flex flex-col justify-between leading-normal md:p-4">
        <h5
          className="mb-2 text-2xl font-bold tracking-tight text-[#213B4D] transition-colors group-hover:text-[#1F93A4]"
          style={{ fontFamily: B }}
        >
          {item.title}
        </h5>
        <p className="mb-6 text-[15px] leading-relaxed text-[#5E5E5E]" style={{ fontFamily: B }}>
          {item.summary}
        </p>
        <div>
          <span
            className="box-border inline-flex w-auto items-center rounded-lg border border-[#213B4D]/15 bg-white px-4 py-2.5 text-sm font-medium leading-5 text-[#5E5E5E] shadow-xs transition-colors group-hover:bg-[#1F93A4] group-hover:text-white"
            style={{ fontFamily: B }}
          >
            Read more
            <svg
              className="-me-0.5 ms-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
