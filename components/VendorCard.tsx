"use client";

import Link from "next/link";
import { MapPin, Ship, Users, Star, ArrowUpRight } from "lucide-react";
import type { Vendor } from "@/lib/types";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { islandLabels } from "@/lib/data";

export function VendorCard({ vendor }: { vendor: Vendor }) {
  const { locale } = useStore();

  return (
    <Link
      href={`/vendor/${vendor.slug}`}
      className="group block rounded-2xl overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-300 bg-white border border-ocean-100/60"
    >
      <div
        className={`relative h-32 bg-gradient-to-br ${vendor.heroColor} overflow-hidden`}
      >
        <div className="absolute inset-0 bg-wave opacity-60" />
        <div className="absolute top-3 left-4 flex items-center gap-1.5 text-white/90 text-xs font-medium">
          <MapPin className="w-3.5 h-3.5" />
          {t(islandLabels[vendor.island], locale)}
        </div>
        <div className="absolute top-3 right-4 glass-dark px-2 py-1 rounded-md text-white text-[10px] font-mono">
          est. {vendor.founded}
        </div>
        <ArrowUpRight className="absolute bottom-3 right-4 w-5 h-5 text-white/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-ocean-950 leading-tight group-hover:text-coral-600 transition-colors">
          {t(vendor.name, locale)}
        </h3>
        <p className="mt-1 text-xs text-ocean-700/80 font-medium">
          {t(vendor.specialty, locale)}
        </p>

        <p className="mt-3 text-sm text-ocean-800/80 leading-relaxed line-clamp-2">
          {t(vendor.story, locale)}
        </p>

        <div className="mt-4 pt-4 border-t border-ocean-100/80 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="font-display text-lg font-bold text-ocean-950">
              {vendor.fishersCount}
            </p>
            <p className="text-[10px] text-ocean-600/80 uppercase tracking-wider font-medium flex items-center justify-center gap-0.5">
              <Users className="w-3 h-3" />
              fishers
            </p>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-ocean-950">
              {vendor.vesselsCount}
            </p>
            <p className="text-[10px] text-ocean-600/80 uppercase tracking-wider font-medium flex items-center justify-center gap-0.5">
              <Ship className="w-3 h-3" />
              vessels
            </p>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-ocean-950 flex items-center justify-center gap-0.5">
              {vendor.rating}
              <Star className="w-3.5 h-3.5 fill-coral-400 text-coral-400" />
            </p>
            <p className="text-[10px] text-ocean-600/80 uppercase tracking-wider font-medium">
              rating
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {vendor.certifications.slice(0, 4).map((c) => (
            <span
              key={c}
              className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-seafoam-50 text-seafoam-800 border border-seafoam-100"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
