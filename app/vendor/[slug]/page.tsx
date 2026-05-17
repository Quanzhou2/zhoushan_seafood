"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Users,
  Ship,
  Star,
  ShieldCheck,
  Mail,
  Calendar,
  Package,
  Globe,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { t, ui } from "@/lib/i18n";
import { islandLabels } from "@/lib/data";
import {
  useVendorBySlug,
  useProductsByVendor,
  useData,
} from "@/lib/data-context";
import { ProductCard } from "@/components/ProductCard";

const regionLabels: Record<string, string> = {
  "north-america": "North America",
  "japan-korea": "Japan / Korea",
  "southeast-asia": "Southeast Asia",
  europe: "Europe",
  china: "China (domestic)",
};

export default function VendorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { locale } = useStore();
  const { isLoading } = useData();
  const vendor = useVendorBySlug(slug);
  const products = useProductsByVendor(vendor?.id ?? "");

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-ocean-600/70 font-mono text-sm">Loading cooperative…</p>
      </div>
    );
  }
  if (!vendor) notFound();

  return (
    <>
      {/* Hero */}
      <section
        className={`relative bg-gradient-to-br ${vendor.heroColor} overflow-hidden`}
      >
        <div className="absolute inset-0 bg-wave opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-white">
          <Link
            href="/vendors"
            className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
          >
            ← All cooperatives
          </Link>
          <div className="mt-6 grid lg:grid-cols-3 gap-8 items-end">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-coral-200">
                <MapPin className="w-4 h-4" />
                {t(islandLabels[vendor.island], locale)} · est. {vendor.founded}
              </div>
              <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-balance">
                {t(vendor.name, locale)}
              </h1>
              <p className="mt-4 text-base md:text-lg text-white/90 max-w-2xl leading-relaxed text-balance">
                {t(vendor.story, locale)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-2">
              <StatCard
                value={String(vendor.fishersCount)}
                label="Fishers"
                icon={<Users className="w-3.5 h-3.5" />}
              />
              <StatCard
                value={String(vendor.vesselsCount)}
                label="Vessels"
                icon={<Ship className="w-3.5 h-3.5" />}
              />
              <StatCard
                value={`${vendor.monthlyTons} t`}
                label="Monthly catch"
                icon={<Package className="w-3.5 h-3.5" />}
              />
              <StatCard
                value={`${vendor.rating}★`}
                label={`${vendor.reviewCount} reviews`}
                icon={<Star className="w-3.5 h-3.5" />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick info bar */}
      <section className="bg-white border-b border-ocean-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-5">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-ocean-600 font-bold flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Founded
            </p>
            <p className="mt-0.5 font-display font-bold text-ocean-950">
              {vendor.founded}{" "}
              <span className="font-normal text-sm text-ocean-700">
                ({2026 - vendor.founded} yrs)
              </span>
            </p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-ocean-600 font-bold flex items-center gap-1">
              <Package className="w-3 h-3" /> Specialty
            </p>
            <p className="mt-0.5 text-sm font-medium text-ocean-950">
              {t(vendor.specialty, locale)}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-ocean-600 font-bold flex items-center gap-1">
              <Globe className="w-3 h-3" /> Export regions
            </p>
            <p className="mt-0.5 text-sm font-medium text-ocean-950">
              {vendor.exportRegions
                .map((r) => regionLabels[r])
                .join(" · ")}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-ocean-600 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Certifications
            </p>
            <div className="mt-0.5 flex flex-wrap gap-1">
              {vendor.certifications.map((c) => (
                <span
                  key={c}
                  className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-seafoam-50 text-seafoam-800 border border-seafoam-100"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
              Product line · 产品系列
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-ocean-950 tracking-tight">
              {products.length}{" "}
              {products.length === 1 ? "product" : "products"} from this
              cooperative
            </h2>
          </div>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-ocean-700/80">
            No products listed yet — check back soon.
          </p>
        )}
      </section>

      {/* Contact strip */}
      <section className="bg-ocean-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-coral-300 font-semibold">
              Direct line to the cooperative
            </p>
            <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold leading-tight">
              Bulk order, custom processing, or vessel-side pickup?
            </h3>
            <p className="mt-3 text-ocean-200/85 max-w-md">
              We'll connect you with the cooperative's export manager within
              one business day. WeChat, WhatsApp, or email — your choice.
            </p>
          </div>
          <div className="flex justify-end">
            <Link
              href="/for-importers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-coral-500 text-white font-semibold hover:bg-coral-600 transition-colors shadow-card"
            >
              <Mail className="w-4 h-4" />
              {t(ui.ctaContactCoop, locale)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="glass-dark border border-white/15 rounded-xl p-3">
      <p className="font-display text-2xl md:text-3xl font-bold">{value}</p>
      <p className="mt-0.5 text-[11px] uppercase tracking-wider text-seafoam-200 font-medium flex items-center gap-1">
        {icon}
        {label}
      </p>
    </div>
  );
}
