"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { useStore } from "@/lib/store";
import { t, ui } from "@/lib/i18n";
import { formatPrice } from "@/lib/currency";
import { useVendorById } from "@/lib/data-context";

export function ProductCard({ product }: { product: Product }) {
  const { locale, currency } = useStore();
  const vendor = useVendorById(product.vendorId);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col rounded-2xl bg-white shadow-soft hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-ocean-100/60"
    >
      <div
        className={`relative h-48 bg-gradient-to-br ${product.bgGradient} overflow-hidden flex items-center justify-center`}
      >
        <span className="text-7xl group-hover:scale-110 transition-transform duration-500 drop-shadow-xl">
          {product.imageEmoji}
        </span>
        {product.isPremium && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-coral-500 text-white text-[10px] font-bold tracking-wider uppercase">
            Premium
          </span>
        )}
        <span className="absolute bottom-3 right-3 glass-dark text-white text-[10px] font-medium px-2 py-1 rounded-md">
          {product.certifications.slice(0, 2).join(" · ")}
        </span>
      </div>

      <div className="flex-1 flex flex-col p-4">
        <p className="text-[11px] uppercase tracking-wider text-ocean-600/70 font-medium">
          {vendor ? t(vendor.name, locale) : ""}
        </p>
        <h3 className="mt-1 font-display text-base font-semibold text-ocean-950 leading-snug line-clamp-2 group-hover:text-coral-600 transition-colors">
          {t(product.name, locale)}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-xs text-ocean-700/70">
          <span className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 fill-coral-400 text-coral-400" />
            <span className="font-medium text-ocean-800">{product.rating}</span>
          </span>
          <span className="text-ocean-300">·</span>
          <span>{product.reviewCount} reviews</span>
        </div>

        <div className="mt-3 pt-3 border-t border-ocean-100/80 flex items-end justify-between">
          <div>
            <p className="text-xs text-ocean-600/70 font-medium">
              {t(ui.retailPrice, locale)}
            </p>
            <p className="font-display text-lg font-bold text-ocean-950">
              {formatPrice(product.priceUSD, currency)}
              <span className="text-xs font-normal text-ocean-600 ml-1">
                / {product.unit}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-ocean-600/70 font-medium">
              {t(ui.wholesalePrice, locale)}
            </p>
            <p className="font-mono text-sm font-semibold text-coral-600">
              {formatPrice(product.wholesalePriceUSD, currency)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
