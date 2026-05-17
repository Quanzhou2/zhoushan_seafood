"use client";

import { useState, useMemo } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { useStore } from "@/lib/store";
import { islandLabels } from "@/lib/data";
import { useProducts, useVendors } from "@/lib/data-context";
import type { ProductCategory, Certification } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { t } from "@/lib/i18n";

const categoryLabels: Record<ProductCategory, string> = {
  fish: "Wild fish",
  crustacean: "Crab & shellfish",
  mollusk: "Mollusks",
  dried: "Dried & cured",
  "value-added": "Value-added",
  premium: "Premium SKUs",
};

const allCategories: ProductCategory[] = [
  "fish",
  "crustacean",
  "mollusk",
  "dried",
  "value-added",
  "premium",
];

const allCerts: Certification[] = [
  "MSC",
  "ASC",
  "BRC",
  "HACCP",
  "EU-Export",
  "FDA",
  "JAS-Organic",
];

export default function MarketplacePage() {
  const { locale } = useStore();
  const products = useProducts();
  const vendors = useVendors();
  const [query, setQuery] = useState("");
  const [activeCats, setActiveCats] = useState<Set<ProductCategory>>(new Set());
  const [activeCerts, setActiveCerts] = useState<Set<Certification>>(new Set());
  const [activeVendor, setActiveVendor] = useState<string | null>(null);
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const toggle = <T,>(set: Set<T>, value: T) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (
        query &&
        !t(p.name, locale).toLowerCase().includes(query.toLowerCase()) &&
        !t(p.description, locale).toLowerCase().includes(query.toLowerCase())
      )
        return false;
      if (activeCats.size > 0 && !activeCats.has(p.category)) return false;
      if (
        activeCerts.size > 0 &&
        !p.certifications.some((c) => activeCerts.has(c))
      )
        return false;
      if (activeVendor && p.vendorId !== activeVendor) return false;
      if (premiumOnly && !p.isPremium) return false;
      return true;
    });
    if (sort === "price-asc") list.sort((a, b) => a.priceUSD - b.priceUSD);
    if (sort === "price-desc") list.sort((a, b) => b.priceUSD - a.priceUSD);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "featured")
      list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    return list;
  }, [query, activeCats, activeCerts, activeVendor, premiumOnly, sort, locale]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
          Marketplace · 海鲜市场
        </p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold text-ocean-950 tracking-tight">
          Today's Zhoushan catch
        </h1>
        <p className="mt-3 text-ocean-800/80 max-w-2xl">
          Wild and farmed seafood from 5 verified cooperatives across the
          archipelago. Caught yesterday or today, blast-frozen within 2 hours,
          ready to ship.
        </p>
      </header>

      {/* search + sort row */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search croaker, abalone, crab..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-ocean-200 text-sm placeholder:text-ocean-400 focus:outline-none focus:ring-2 focus:ring-coral-200 focus:border-coral-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-ocean-600" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="px-3 py-2.5 rounded-lg bg-white border border-ocean-200 text-sm text-ocean-900 focus:outline-none focus:ring-2 focus:ring-coral-200"
          >
            <option value="featured">Featured first</option>
            <option value="price-asc">Price · low to high</option>
            <option value="price-desc">Price · high to low</option>
            <option value="rating">Highest rated</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-[260px,1fr] gap-6">
        {/* Filter sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <div className="bg-white rounded-xl border border-ocean-100 p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-ocean-100">
              <Filter className="w-4 h-4 text-coral-600" />
              <h3 className="font-display text-sm font-bold text-ocean-950 uppercase tracking-wider">
                Filters
              </h3>
              {(activeCats.size > 0 ||
                activeCerts.size > 0 ||
                activeVendor ||
                premiumOnly) && (
                <button
                  onClick={() => {
                    setActiveCats(new Set());
                    setActiveCerts(new Set());
                    setActiveVendor(null);
                    setPremiumOnly(false);
                  }}
                  className="ml-auto text-[10px] uppercase tracking-wider text-coral-600 font-bold hover:text-coral-700"
                >
                  Clear all
                </button>
              )}
            </div>

            <label className="flex items-center gap-2 cursor-pointer pb-4 mb-4 border-b border-ocean-100">
              <input
                type="checkbox"
                checked={premiumOnly}
                onChange={(e) => setPremiumOnly(e.target.checked)}
                className="rounded border-ocean-300 text-coral-500 focus:ring-coral-300"
              />
              <span className="text-sm text-ocean-900 font-medium">
                Premium SKUs only
              </span>
            </label>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-ocean-600 font-bold mb-2">
                Category
              </p>
              <div className="space-y-1.5">
                {allCategories.map((c) => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeCats.has(c)}
                      onChange={() => setActiveCats((s) => toggle(s, c))}
                      className="rounded border-ocean-300 text-coral-500 focus:ring-coral-300"
                    />
                    <span className="text-sm text-ocean-800">
                      {categoryLabels[c]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-ocean-100">
              <p className="text-[10px] uppercase tracking-wider text-ocean-600 font-bold mb-2">
                Certifications
              </p>
              <div className="flex flex-wrap gap-1.5">
                {allCerts.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCerts((s) => toggle(s, c))}
                    className={`text-[10px] font-mono font-semibold px-1.5 py-1 rounded transition-colors border ${
                      activeCerts.has(c)
                        ? "bg-coral-500 text-white border-coral-500"
                        : "bg-seafoam-50 text-seafoam-800 border-seafoam-100 hover:border-coral-300"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-ocean-100">
              <p className="text-[10px] uppercase tracking-wider text-ocean-600 font-bold mb-2">
                Cooperative
              </p>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="vendor"
                    checked={!activeVendor}
                    onChange={() => setActiveVendor(null)}
                    className="border-ocean-300 text-coral-500 focus:ring-coral-300"
                  />
                  <span className="text-sm text-ocean-800">All vendors</span>
                </label>
                {vendors.map((v) => (
                  <label key={v.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="vendor"
                      checked={activeVendor === v.id}
                      onChange={() => setActiveVendor(v.id)}
                      className="border-ocean-300 text-coral-500 focus:ring-coral-300"
                    />
                    <span className="text-sm text-ocean-800 truncate">
                      {t(v.name, locale)}
                      <span className="text-ocean-500 text-xs ml-1">
                        · {t(islandLabels[v.island], locale)}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* RFQ teaser */}
          <div className="bg-ocean-950 text-white rounded-xl p-5 shadow-card relative overflow-hidden">
            <div className="absolute inset-0 bg-wave opacity-20" />
            <div className="relative">
              <p className="text-[10px] font-mono uppercase tracking-widest text-coral-300">
                B2B / wholesale
              </p>
              <h4 className="mt-2 font-display text-base font-bold leading-snug">
                Buying 100+ kg per SKU? Get bespoke pricing.
              </h4>
              <a
                href="/for-importers"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-coral-300 hover:text-coral-200"
              >
                Request quote →
              </a>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <p className="text-sm text-ocean-700/80 mb-4">
            <span className="font-semibold text-ocean-950">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "product" : "products"}
            {(activeCats.size > 0 || activeCerts.size > 0 || activeVendor) && (
              <span className="text-coral-600 ml-1">· filters applied</span>
            )}
          </p>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-ocean-100 p-12 text-center">
              <p className="font-display text-lg text-ocean-950">
                No products match those filters.
              </p>
              <p className="mt-1 text-sm text-ocean-700/80">
                Try widening your selection or clearing filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
