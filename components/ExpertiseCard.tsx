"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import type { Expertise } from "@/lib/expertise";

const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

/* A clickable card with a subtle 3D pointer-tilt, image zoom, and reveal.
   `base` is "/services" or "/sectors"; the card links to `${base}/${slug}`. */

export default function ExpertiseCard({
  item,
  base,
  index = 0,
}: {
  item: Expertise;
  base: string;
  index?: number;
}) {
  const reduce = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 18 });

  function onMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
      style={{ perspective: 1000 }}
    >
      <motion.div className="h-full" style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformStyle: "preserve-3d" }}>
        <Link
          href={`${base}/${item.slug}`}
          onPointerMove={onMove}
          onPointerLeave={reset}
          className="card-base group relative overflow-hidden rounded-lg border border-[#213B4D]/10 bg-white shadow-[0_1px_2px_rgba(33,59,77,0.04)] transition-shadow duration-300 hover:shadow-[0_24px_50px_-20px_rgba(33,59,77,0.35)]"
        >
          {/* Image */}
          <div className="relative h-44 shrink-0 overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e28]/70 via-[#0d1e28]/10 to-transparent" />
            <span
              className="absolute right-4 top-3 text-[26px] font-bold leading-none text-white/85"
              style={{ fontFamily: B }}
            >
              {item.num}
            </span>  
            </div>

          {/* Body */}
          <div className="card-body p-6 pt-9">
            <h3
              className="card-title mb-2 text-[17px] font-bold text-[#213B4D] transition-colors group-hover:text-[#1F93A4]"
              style={{ fontFamily: B }}
            >
              {item.title}
            </h3>
            <p className="mb-5 flex-1 text-[13px] leading-relaxed text-[#5E5E5E]" style={{ fontFamily: B }}>
              {item.summary}
            </p>
            <span
              className="mt-auto inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#1F93A4]"
              style={{ fontFamily: B }}
            >
              View Details
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </span>
          </div>

          {/* Bottom accent grows on hover */}
          <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1F93A4] transition-all duration-500 group-hover:w-full" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
