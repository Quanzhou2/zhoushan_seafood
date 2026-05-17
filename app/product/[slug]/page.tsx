"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Anchor,
  Calendar,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Mail,
  ArrowRight,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { t, ui } from "@/lib/i18n";
import { islandLabels } from "@/lib/data";
import {
  useProductBySlug,
  useVendorById,
  useProducts,
  useColdChain,
  useData,
} from "@/lib/data-context";
import { formatPrice } from "@/lib/currency";
import { ColdChainTimeline } from "@/components/ColdChainTimeline";
import { ProductCard } from "@/components/ProductCard";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { locale, currency, addToCart } = useStore();
  const [tab, setTab] = useState<"retail" | "wholesale">("retail");
  const [qty, setQty] = useState(1);

  const { isLoading } = useData();
  const product = useProductBySlug(slug);
  const vendor = useVendorById(product?.vendorId);
  const products = useProducts();
  const sampleColdChain = useColdChain();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-ocean-600/70 font-mono text-sm">Loading product…</p>
      </div>
    );
  }
  if (!product || !vendor) notFound();

  const related = products
    .filter((p) => p.id !== product.id && p.vendorId === product.vendorId)
    .slice(0, 4);

  const price = tab === "retail" ? product.priceUSD : product.wholesalePriceUSD;
  const minQty = tab === "wholesale" ? product.wholesaleMinKg : 1;
  const safeQty = Math.max(qty, minQty);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-ocean-600/90 mb-6 flex items-center gap-1.5 font-medium">
        <Link href="/" className="hover:text-coral-600">
          Home
        </Link>
        <span className="text-ocean-300">/</span>
        <Link href="/marketplace" className="hover:text-coral-600">
          Marketplace
        </Link>
        <span className="text-ocean-300">/</span>
        <span className="text-ocean-900 truncate">{t(product.name, locale)}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Image / hero */}
        <div>
          <div
            className={`relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br ${product.bgGradient} shadow-card-hover`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[16rem] drop-shadow-2xl">
                {product.imageEmoji}
              </span>
            </div>
            <div className="absolute top-5 left-5 flex flex-col gap-2">
              {product.isPremium && (
                <span className="px-3 py-1 rounded-full bg-coral-500 text-white text-xs font-bold tracking-wider uppercase">
                  Premium
                </span>
              )}
              <span className="glass-dark px-3 py-1.5 rounded-lg text-white text-xs font-medium">
                <MapPin className="inline w-3.5 h-3.5 mr-1" />
                {t(islandLabels[vendor.island], locale)}
              </span>
            </div>
            <div className="absolute bottom-5 right-5 glass-dark px-3 py-2 rounded-lg text-white">
              <p className="text-[10px] uppercase tracking-widest text-seafoam-200">
                Caught
              </p>
              <p className="text-sm font-display font-semibold">
                2026-05-15 04:12
              </p>
            </div>
          </div>

          {/* Thumbnails — decorative placeholders */}
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[
              "from-ocean-700 to-ocean-900",
              "from-seafoam-500 to-seafoam-700",
              "from-coral-400 to-coral-600",
              "from-sand-400 to-sand-600",
            ].map((g, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl bg-gradient-to-br ${g} flex items-center justify-center text-3xl opacity-80 hover:opacity-100 cursor-pointer transition-opacity`}
              >
                {i === 0 ? product.imageEmoji : i === 1 ? "🐟" : i === 2 ? "❄️" : "📦"}
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <Link
            href={`/vendor/${vendor.slug}`}
            className="inline-flex items-center gap-2 text-xs text-coral-700 font-mono uppercase tracking-widest font-bold hover:underline"
          >
            <Anchor className="w-3.5 h-3.5" />
            {t(vendor.name, locale)}
          </Link>
          <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold text-ocean-950 leading-tight tracking-tight">
            {t(product.name, locale)}
          </h1>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-coral-400 text-coral-400" />
              <span className="font-semibold text-ocean-950">
                {product.rating}
              </span>
            </span>
            <span className="text-ocean-300">·</span>
            <span className="text-ocean-700">
              {product.reviewCount} verified reviews
            </span>
            <span className="text-ocean-300">·</span>
            <span className="text-emerald-700 font-semibold">
              {product.stockKg} kg {t(ui.inStock, locale)}
            </span>
          </div>

          <p className="mt-5 text-ocean-800/90 leading-relaxed">
            {t(product.description, locale)}
          </p>

          {/* Price tabs */}
          <div className="mt-7 rounded-2xl bg-white border border-ocean-100 shadow-soft overflow-hidden">
            <div className="flex border-b border-ocean-100">
              {(["retail", "wholesale"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setTab(m)}
                  className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                    tab === m
                      ? "text-ocean-950 bg-white border-b-2 border-coral-500 -mb-px"
                      : "text-ocean-600 bg-ocean-50/50 hover:text-ocean-900"
                  }`}
                >
                  {m === "retail"
                    ? t(ui.retailPrice, locale)
                    : t(ui.wholesalePrice, locale)}
                </button>
              ))}
            </div>
            <div className="p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-display text-4xl font-bold text-ocean-950">
                    {formatPrice(price, currency)}
                    <span className="text-base font-normal text-ocean-600 ml-1.5">
                      / {product.unit}
                    </span>
                  </p>
                  {tab === "wholesale" && (
                    <p className="mt-1 text-xs text-coral-700 font-medium">
                      {t(ui.minOrder, locale)}: {product.wholesaleMinKg} {product.unit}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-ocean-600 font-bold">
                    {tab === "retail" ? "Retail savings" : "Wholesale discount"}
                  </p>
                  <p className="font-display text-lg font-bold text-emerald-700">
                    {tab === "retail" ? "Free shipping ≥ $200" : `−${Math.round(((product.priceUSD - product.wholesalePriceUSD) / product.priceUSD) * 100)}%`}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-ocean-200 bg-white">
                  <button
                    onClick={() => setQty(Math.max(minQty, qty - 1))}
                    className="p-2.5 text-ocean-600 hover:text-coral-600"
                    aria-label="Decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min={minQty}
                    value={safeQty}
                    onChange={(e) => setQty(parseInt(e.target.value, 10) || minQty)}
                    className="w-14 text-center text-sm font-semibold text-ocean-950 bg-transparent focus:outline-none"
                  />
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-2.5 text-ocean-600 hover:text-coral-600"
                    aria-label="Increase"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="px-2 text-xs text-ocean-500">
                    {product.unit}
                  </span>
                </div>
                {tab === "retail" ? (
                  <button
                    onClick={addToCart}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-ocean-950 text-white text-sm font-semibold hover:bg-ocean-900 transition-colors shadow-card"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {t(ui.ctaAddToCart, locale)} ·{" "}
                    {formatPrice(price * safeQty, currency)}
                  </button>
                ) : (
                  <Link
                    href="/for-importers"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-coral-500 text-white text-sm font-semibold hover:bg-coral-600 transition-colors shadow-card"
                  >
                    <Mail className="w-4 h-4" />
                    {t(ui.ctaRequestQuote, locale)}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Spec grid */}
          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <dt className="text-[10px] font-mono uppercase tracking-widest text-ocean-600 font-bold">
                {t(ui.origin, locale)}
              </dt>
              <dd className="mt-1 text-ocean-900">
                {t(product.origin, locale)}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-mono uppercase tracking-widest text-ocean-600 font-bold">
                {t(ui.catchMethod, locale)}
              </dt>
              <dd className="mt-1 text-ocean-900">
                {t(product.catchMethod, locale)}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-mono uppercase tracking-widest text-ocean-600 font-bold flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {t(ui.seasonality, locale)}
              </dt>
              <dd className="mt-1 text-ocean-900">
                {t(product.seasonality, locale)}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-mono uppercase tracking-widest text-ocean-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {t(ui.certifications, locale)}
              </dt>
              <dd className="mt-1 flex flex-wrap gap-1">
                {product.certifications.map((c) => (
                  <span
                    key={c}
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-seafoam-50 text-seafoam-800 border border-seafoam-100"
                  >
                    {c}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Cold chain section */}
      <section className="mt-20 grid lg:grid-cols-[1fr,1.4fr] gap-10">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
            Provenance · 溯源
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ocean-950 tracking-tight leading-tight">
            {t(ui.coldChainTitle, locale)}
          </h2>
          <p className="mt-3 text-ocean-800/80">
            {t(ui.coldChainSubtitle, locale)}
          </p>
          <div className="mt-6 p-4 rounded-xl bg-ocean-950 text-white">
            <p className="text-[10px] font-mono uppercase tracking-widest text-coral-300">
              Live shipment ID
            </p>
            <p className="mt-1 font-mono text-sm">ZS-PT-2026051304-A772</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-white/10">
                <p className="text-seafoam-200 text-[10px]">Current temp</p>
                <p className="font-display font-bold text-base">−20°C</p>
              </div>
              <div className="p-2 rounded bg-white/10">
                <p className="text-seafoam-200 text-[10px]">Integrity</p>
                <p className="font-display font-bold text-base">100%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft border border-ocean-100 p-7">
          <ColdChainTimeline stages={sampleColdChain} />
        </div>
      </section>

      {/* More from vendor */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-ocean-950">
              More from {t(vendor.name, locale)}
            </h2>
            <Link
              href={`/vendor/${vendor.slug}`}
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-900 hover:text-coral-600"
            >
              View cooperative <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
