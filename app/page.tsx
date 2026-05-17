"use client";

import Link from "next/link";
import {
  Thermometer,
  ShieldCheck,
  Sparkles,
  CircleDollarSign,
  ArrowRight,
  Ship,
  TrendingUp,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { t, ui } from "@/lib/i18n";
import { platformMetrics } from "@/lib/data";
import { useFeaturedProducts, useVendors, useData } from "@/lib/data-context";
import { ProductCard } from "@/components/ProductCard";
import { VendorCard } from "@/components/VendorCard";
import { PillarCard } from "@/components/PillarCard";

export default function HomePage() {
  const { locale } = useStore();
  const { isLoading, error } = useData();
  const featured = useFeaturedProducts().slice(0, 4);
  const featuredVendors = useVendors().slice(0, 3);

  return (
    <>
      {/* ============================================================ HERO */}
      <section className="relative overflow-hidden bg-sand-50">
        {/* background art */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute -top-20 -right-20 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-coral-200/40 via-coral-100/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-seafoam-200/40 via-seafoam-100/20 to-transparent blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:pt-20 md:pb-28">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 animate-slide-up">
              <p className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-coral-700 bg-coral-50 px-3 py-1.5 rounded-full border border-coral-100">
                <span className="w-1.5 h-1.5 rounded-full bg-coral-500 animate-pulse" />
                {t(ui.heroEyebrow, locale)}
              </p>
              <h1 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ocean-950 leading-[1.05] tracking-tight whitespace-pre-line text-balance">
                {t(ui.heroTitle, locale)}
              </h1>
              <p className="mt-6 text-base md:text-lg text-ocean-800/85 leading-relaxed max-w-2xl text-balance">
                {t(ui.heroSubtitle, locale)}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/marketplace"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-ocean-950 text-white text-sm font-semibold hover:bg-ocean-900 transition-colors shadow-card"
                >
                  {t(ui.ctaShopNow, locale)}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/for-importers"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-ocean-900 text-sm font-semibold border border-ocean-200 hover:border-coral-300 hover:text-coral-700 transition-colors"
                >
                  {t(ui.ctaForImporters, locale)}
                </Link>
              </div>

              {/* social proof strip */}
              <div className="mt-10 flex items-center gap-6 text-xs text-ocean-700/80">
                <p className="font-medium">Trusted by buyers in</p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 font-display font-semibold text-ocean-900">
                  <span>東京</span>
                  <span>•</span>
                  <span>San Francisco</span>
                  <span>•</span>
                  <span>Singapore</span>
                  <span>•</span>
                  <span>London</span>
                  <span>•</span>
                  <span>서울</span>
                </div>
              </div>
            </div>

            {/* right column — animated stat card stack */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[5/6] max-w-md mx-auto">
                {/* big card */}
                <div className="absolute inset-0 rounded-3xl gradient-ocean shadow-card-hover overflow-hidden">
                  <div className="absolute inset-0 bg-wave opacity-30" />
                  <div className="relative h-full p-8 flex flex-col justify-between text-white">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-seafoam-300">
                        Live shipment · 2026-05-15 22:30
                      </p>
                      <p className="mt-2 font-display text-xl font-semibold leading-tight">
                        Yellow croaker · 240 kg
                      </p>
                      <p className="text-sm text-ocean-200/70 mt-1">
                        Putuo → Tokyo Tsukiji
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="glass-dark rounded-xl p-3 border border-white/10">
                        <p className="text-[10px] uppercase tracking-wider text-seafoam-200">
                          Temp
                        </p>
                        <p className="font-display text-2xl font-bold text-white">
                          −20°C
                        </p>
                      </div>
                      <div className="glass-dark rounded-xl p-3 border border-white/10">
                        <p className="text-[10px] uppercase tracking-wider text-seafoam-200">
                          ETA
                        </p>
                        <p className="font-display text-2xl font-bold text-white">
                          18h 22m
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-seafoam-200">Stage 5 of 6</span>
                        <span className="text-white/70 font-mono">
                          PVG → NRT
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-coral-400 rounded-full w-[78%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* floating coral card */}
                <div className="absolute -bottom-6 -left-6 w-44 rounded-2xl bg-white shadow-card p-4 border border-ocean-100 rotate-[-3deg] hover:rotate-0 transition-transform">
                  <p className="text-[10px] uppercase tracking-widest text-coral-600 font-mono font-bold">
                    Monthly GMV
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold text-ocean-950">
                    $8.42M
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-emerald-700 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +34.2% MoM
                  </div>
                </div>

                {/* floating top-right tag */}
                <div className="absolute -top-4 -right-4 glass px-3 py-2 rounded-xl shadow-soft border border-coral-100 rotate-3 hover:rotate-0 transition-transform">
                  <p className="text-[10px] uppercase tracking-widest text-ocean-700 font-mono font-bold">
                    147 co-ops
                  </p>
                  <p className="text-xs text-ocean-900 font-medium">
                    23 countries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================== METRICS BAND */}
      <section className="relative -mt-6 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-card border border-ocean-100/80 grid grid-cols-2 md:grid-cols-4 divide-x divide-ocean-100/80">
            {platformMetrics.slice(0, 4).map((m, idx) => (
              <div key={idx} className="p-5 md:p-6">
                <p className="text-[10px] font-mono uppercase tracking-widest text-ocean-600/80 font-semibold">
                  {t(m.label, locale)}
                </p>
                <p className="mt-1 font-display text-2xl md:text-3xl font-bold text-ocean-950">
                  {m.value}
                </p>
                <p className="text-xs text-emerald-700 font-medium mt-0.5">
                  {m.delta} vs last month
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== FOUR PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
            Why Zhoushan Catch
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-ocean-950 leading-tight text-balance">
            Built for the four things that break in cross-border seafood.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <PillarCard
            index={1}
            icon={<Thermometer className="w-5 h-5" />}
            title={t(ui.pillarColdChain, locale)}
            description={t(ui.pillarColdChainDesc, locale)}
          />
          <PillarCard
            index={2}
            icon={<ShieldCheck className="w-5 h-5" />}
            title={t(ui.pillarCustoms, locale)}
            description={t(ui.pillarCustomsDesc, locale)}
          />
          <PillarCard
            index={3}
            icon={<Sparkles className="w-5 h-5" />}
            title={t(ui.pillarVendors, locale)}
            description={t(ui.pillarVendorsDesc, locale)}
          />
          <PillarCard
            index={4}
            icon={<CircleDollarSign className="w-5 h-5" />}
            title={t(ui.pillarMulticurrency, locale)}
            description={t(ui.pillarMulticurrencyDesc, locale)}
          />
        </div>
      </section>

      {/* ================================================ FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
              This week's catch
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-ocean-950 leading-tight">
              {t(ui.sectionFeaturedTitle, locale)}
            </h2>
            <p className="mt-3 text-ocean-800/80 max-w-xl">
              {t(ui.sectionFeaturedSubtitle, locale)}
            </p>
          </div>
          <Link
            href="/marketplace"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-ocean-900 hover:text-coral-600 transition-colors"
          >
            {t(ui.ctaViewAll, locale)}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* =================================================== VENDOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
              Direct from the source
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-ocean-950 leading-tight">
              {t(ui.sectionVendorsTitle, locale)}
            </h2>
            <p className="mt-3 text-ocean-800/80 max-w-xl">
              {t(ui.sectionVendorsSubtitle, locale)}
            </p>
          </div>
          <Link
            href="/vendors"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-ocean-900 hover:text-coral-600 transition-colors"
          >
            {t(ui.ctaViewAll, locale)}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredVendors.map((v) => (
            <VendorCard key={v.id} vendor={v} />
          ))}
        </div>
      </section>

      {/* ===================================================== FINAL CTA */}
      <section className="mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-ocean p-10 md:p-16">
            <div className="absolute inset-0 bg-wave opacity-30" />
            <div className="relative grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-300 font-semibold">
                  For restaurants, importers & distributors
                </p>
                <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                  Skip the broker. Order direct from the Zhoushan fleet.
                </h2>
                <p className="mt-4 text-ocean-200/90 leading-relaxed max-w-xl">
                  Wholesale tiers from 25 kg, NET-30 terms, samples shipped
                  free. Average customs clearance: 4.3 hours.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/for-importers"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-coral-500 text-white text-sm font-semibold hover:bg-coral-600 transition-colors shadow-card"
                  >
                    Request a sample crate
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 text-white text-sm font-semibold border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <Ship className="w-4 h-4" />
                    See logistics flow
                  </Link>
                </div>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 gap-3">
                {[
                  { value: "4.3 hrs", label: "Avg. customs clearance" },
                  { value: "99.87%", label: "Cold-chain integrity" },
                  { value: "T+1", label: "Settlement to vendor" },
                  { value: "$5K", label: "Min. wholesale order" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="glass-dark rounded-xl p-4 border border-white/10"
                  >
                    <p className="font-display text-2xl font-bold text-white">
                      {s.value}
                    </p>
                    <p className="text-[11px] text-seafoam-200/90 mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
