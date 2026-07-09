"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ── Reveal ───────────────────────────────────────────────────────────────
   Fades + slides content in the first time it scrolls into view. Honours the
   user's "reduce motion" setting. `delay` staggers siblings; `y` sets travel. */

type Dir = "up" | "down" | "left" | "right" | "none";

const offset: Record<Dir, { x?: number; y?: number }> = {
  up: { y: 28 }, down: { y: -28 }, left: { x: 28 }, right: { x: -28 }, none: {},
};

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: Dir;
  className?: string;
  as?: "div" | "span" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const M = motion[as] as React.ElementType;
  const from = reduce ? {} : offset[direction];
  return (
    <M
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

/* ── Stagger ──────────────────────────────────────────────────────────────
   Parent that reveals its <StaggerItem> children one after another. */

export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Counter ──────────────────────────────────────────────────────────────
   Counts a number up from 0 when scrolled into view. Keeps any non-digit
   prefix/suffix in `value` (e.g. "75+", "12"). */

export function Counter({
  value,
  className,
  style,
}: {
  value: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState("0");

  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match ? match[1] : "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : value;
  const hasNumber = match !== null;

  // NOTE: depend only on stable primitives — never on the `match` object, whose
  // identity changes every render and would restart the animation on each frame
  // (making the number appear to keep flickering instead of settling).
  useEffect(() => {
    if (!hasNumber) { setDisplay(value); return; }
    if (reduce || !inView) { setDisplay(inView ? String(target) : "0"); return; }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(String(Math.round(eased * target)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, target, hasNumber]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{display}{suffix}
    </span>
  );
}
