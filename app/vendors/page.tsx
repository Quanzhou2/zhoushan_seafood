"use client";

import { useStore } from "@/lib/store";
import { islandLabels } from "@/lib/data";
import { useVendors } from "@/lib/data-context";
import { VendorCard } from "@/components/VendorCard";
import { t } from "@/lib/i18n";
import { MapPin } from "lucide-react";

export default function VendorsPage() {
  const { locale } = useStore();
  const vendors = useVendors();

  // Group by island
  const byIsland = vendors.reduce<Record<string, typeof vendors>>((acc, v) => {
    if (!acc[v.island]) acc[v.island] = [];
    acc[v.island].push(v);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10">
        <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
          Cooperatives · 渔业合作社
        </p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold text-ocean-950 tracking-tight max-w-3xl text-balance">
          The fishing families who feed your tables.
        </h1>
        <p className="mt-4 text-ocean-800/80 max-w-2xl">
          Five of the 147 cooperatives that ship through Zhoushan Catch — each
          family-run, each visited on-site, each holding active sustainability
          and food-safety certifications.
        </p>
      </header>

      {/* archipelago strip */}
      <div className="relative mb-12 p-7 rounded-2xl bg-gradient-to-br from-ocean-50 to-seafoam-50 border border-ocean-100/70 overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-coral-100/40 blur-3xl" />
        <p className="relative text-xs font-mono uppercase tracking-widest text-ocean-700 font-bold">
          The Zhoushan archipelago
        </p>
        <h2 className="relative mt-2 font-display text-2xl md:text-3xl font-bold text-ocean-950 leading-tight max-w-2xl">
          1,390 islands. 28,572 km² of fishing grounds. The largest fishing port in
          China.
        </h2>
        <div className="relative mt-6 flex flex-wrap gap-3">
          {Object.keys(byIsland).map((island) => (
            <a
              key={island}
              href={`#island-${island}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold bg-white px-3 py-1.5 rounded-full border border-ocean-200 hover:border-coral-300 hover:text-coral-700 text-ocean-800 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              {t(
                islandLabels[island as keyof typeof islandLabels],
                locale
              )}
              <span className="text-ocean-400">
                · {byIsland[island].length}
              </span>
            </a>
          ))}
        </div>
      </div>

      {Object.entries(byIsland).map(([island, list]) => (
        <section
          key={island}
          id={`island-${island}`}
          className="mb-14 scroll-mt-20"
        >
          <div className="flex items-baseline gap-3 mb-5">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-ocean-950 tracking-tight">
              {t(islandLabels[island as keyof typeof islandLabels], locale)}
            </h2>
            <span className="text-sm text-ocean-600/70 font-mono">
              {list.length}{" "}
              {list.length === 1 ? "cooperative" : "cooperatives"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((v) => (
              <VendorCard key={v.id} vendor={v} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
