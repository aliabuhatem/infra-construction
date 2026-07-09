"use client";

import { useMemo, useState } from "react";

/* Self-contained interactive world map (no external tiles — CSP-safe).
   Land is drawn as a dot matrix from coarse continent polygons; each office is a
   pulsing marker that opens a small detail popup on click. Equirectangular
   projection: x = (lng+180)/360, y = (90-lat)/180  (matches the % overlay). */

export interface Office {
  city: string;
  country: string;
  lat: number;
  lng: number;
  address?: string;
  region?: string;
  /* Visual-only nudge (in % of the map) to separate markers that sit on the
     same pixel at world scale, e.g. Abu Dhabi & Dubai. */
  nudgeX?: number;
  nudgeY?: number;
}

const B = "var(--font-myriad), system-ui, -apple-system, sans-serif";

// Coarse continent outlines [lng, lat] — enough to read as a world map in dots.
const CONTINENTS: [number, number][][] = [
  [[-165, 68], [-125, 70], [-90, 68], [-65, 52], [-70, 42], [-82, 24], [-100, 22], [-118, 32], [-128, 48], [-150, 60], [-165, 68]],
  [[-100, 20], [-88, 22], [-77, 9], [-83, 8], [-95, 15], [-100, 20]],
  [[-78, 9], [-60, 6], [-50, 0], [-35, -6], [-40, -22], [-55, -35], [-70, -53], [-72, -38], [-79, -14], [-81, -2], [-78, 9]],
  [[-9, 37], [-9, 44], [2, 49], [5, 60], [24, 70], [40, 68], [42, 54], [30, 46], [16, 40], [3, 38], [-9, 37]],
  [[-16, 16], [-16, 30], [10, 36], [32, 33], [44, 11], [51, 12], [42, -3], [40, -18], [25, -34], [16, -34], [10, -16], [8, 4], [-8, 6], [-16, 16]],
  [[35, 38], [45, 40], [60, 25], [52, 13], [43, 12], [35, 28], [35, 38]],
  [[42, 45], [50, 62], [70, 74], [110, 74], [145, 68], [160, 62], [143, 50], [138, 42], [142, 34], [122, 28], [120, 20], [108, 10], [100, 6], [92, 20], [80, 8], [70, 22], [57, 25], [45, 40], [42, 45]],
  [[114, -22], [130, -11], [142, -11], [153, -28], [147, -38], [133, -33], [116, -34], [114, -22]],
];

function pointInPolygon(lng: number, lat: number, poly: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect = yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

const projX = (lng: number) => ((lng + 180) / 360) * 100;
const projY = (lat: number) => ((90 - lat) / 180) * 100;

export default function OfficesMap({ offices }: { offices: Office[] }) {
  const [active, setActive] = useState<number | null>(null);

  const dots = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    for (let lat = 78; lat >= -56; lat -= 4) {
      for (let lng = -180; lng <= 180; lng += 4) {
        if (CONTINENTS.some((p) => pointInPolygon(lng, lat, p))) {
          out.push({ x: projX(lng), y: projY(lat) });
        }
      }
    }
    return out;
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-[#213B4D]/10 bg-white"
      style={{ aspectRatio: "2 / 1" }}
      onClick={() => setActive(null)}
    >
      {/* Dotted land */}
      <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y / 2} r={0.22} className="fill-[#213B4D]" opacity={0.2} />
        ))}
      </svg>

      {/* Office markers */}
      {offices.map((o, i) => {
        const left = projX(o.lng) + (o.nudgeX || 0);
        const top = projY(o.lat) + (o.nudgeY || 0);
        const isActive = active === i;
        return (
          <div key={i} className="absolute" style={{ left: `${left}%`, top: `${top}%` }}>
            <button
              type="button"
              aria-label={`${o.city}, ${o.country}`}
              onClick={(e) => { e.stopPropagation(); setActive(isActive ? null : i); }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <span className={`absolute inset-0 -m-2 rounded-full bg-[#1F93A4]/40 ${isActive ? "" : "animate-ping"}`} />
              <span className={`relative block h-3 w-3 rounded-full ring-2 ring-white transition-colors ${isActive ? "bg-[#F2613C]" : "bg-[#1F93A4]"}`} />
            </button>

            {isActive && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute z-20 w-56 max-w-[70vw] -translate-x-1/2 -translate-y-[calc(100%+16px)] rounded-lg border border-[#213B4D]/10 bg-white p-4 shadow-[0_18px_40px_-16px_rgba(33,59,77,0.45)]"
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#F2613C]" />
                  <span className="text-[9px] font-bold tracking-[0.25em] text-[#F2613C]" style={{ fontFamily: B }}>
                    {o.region || "Regional Office"}
                  </span>
                </div>
                <div className="text-[15px] font-bold leading-tight text-[#213B4D]" style={{ fontFamily: B }}>
                  {o.city}
                </div>
                <div className="text-[12px] font-semibold text-[#1F93A4]" style={{ fontFamily: B }}>{o.country}</div>
                {o.address && (
                  <div className="mt-1.5 border-t border-[#213B4D]/10 pt-1.5 text-[11.5px] leading-snug text-[#5E5E5E]" style={{ fontFamily: B }}>
                    {o.address}
                  </div>
                )}
                <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-[#213B4D]/10 bg-white" />
              </div>
            )}
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-3 right-4 flex items-center gap-2 text-[10px] tracking-[0.15em] text-[#5E5E5E]" style={{ fontFamily: B }}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#1F93A4] ring-2 ring-white" />
        Tap A Marker
      </div>
    </div>
  );
}
