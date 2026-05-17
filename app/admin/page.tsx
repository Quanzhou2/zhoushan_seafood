"use client";

import {
  TrendingUp,
  Truck,
  ShieldAlert,
  CheckCircle2,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { useStore } from "@/lib/store";
import {
  platformMetrics,
  gmvSeries,
  regionGmv,
} from "@/lib/data";
import { useVendors, useProducts } from "@/lib/data-context";
import { t } from "@/lib/i18n";
import { GmvChart } from "@/components/GmvChart";

const recentOrders = [
  {
    id: "ZS-2026-051522",
    sku: "Yellow croaker · 240 kg",
    buyer: "Tsukiji Sushi Co.",
    region: "Tokyo, JP",
    value: "$21,120",
    status: "In transit",
    stage: 5,
  },
  {
    id: "ZS-2026-051521",
    sku: "Live abalone · 18 kg",
    buyer: "T'ang Court (HK)",
    region: "Hong Kong",
    value: "$4,320",
    status: "Customs",
    stage: 4,
  },
  {
    id: "ZS-2026-051520",
    sku: "Swimming crab · 80 kg",
    buyer: "Maxim's Catering",
    region: "Singapore",
    value: "$4,480",
    status: "Delivered",
    stage: 6,
  },
  {
    id: "ZS-2026-051519",
    sku: "Mixed crate · 120 kg",
    buyer: "99 Ranch Market",
    region: "Los Angeles, US",
    value: "$8,940",
    status: "Air freight",
    stage: 5,
  },
  {
    id: "ZS-2026-051518",
    sku: "Smoked squid · 60 kg",
    buyer: "Mitsui & Co. Foods",
    region: "Osaka, JP",
    value: "$2,280",
    status: "Warehouse",
    stage: 3,
  },
];

const alerts = [
  {
    severity: "warn",
    title: "Temp excursion · ZS-2026-051319",
    body: "Container climbed to −15.4°C for 11 min during PVG handoff. Within 30-min SLA — no action required.",
    time: "23 min ago",
  },
  {
    severity: "info",
    title: "New cooperative onboarded",
    body: "Daixi Pearl Bay Co-op (Daishan) cleared MSC audit. Live with 4 SKUs.",
    time: "2 h ago",
  },
  {
    severity: "ok",
    title: "Customs SLA improved",
    body: "Q2 avg clearance dropped to 4.1 h (from 4.6 h). New JP-bound lane via Pudong AEO.",
    time: "5 h ago",
  },
];

export default function AdminPage() {
  const { locale } = useStore();
  const vendors = useVendors();
  const products = useProducts();
  const latest = gmvSeries[gmvSeries.length - 1];

  return (
    <div className="bg-ocean-50/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
              Platform dashboard · 数据看板
            </p>
            <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold text-ocean-950 tracking-tight">
              Real-time operations & traction
            </h1>
            <p className="mt-2 text-sm text-ocean-700">
              Last updated 2026-05-16 · Auto-refresh every 60 s
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-2.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </span>
          </div>
        </header>

        {/* Metric tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {platformMetrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-ocean-100 shadow-soft p-4"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-ocean-600 font-bold leading-tight">
                {t(m.label, locale)}
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-ocean-950 leading-none">
                {m.value}
              </p>
              <p className="mt-1.5 text-xs text-emerald-700 font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                {m.delta}
              </p>
            </div>
          ))}
        </div>

        {/* Chart + Region split */}
        <div className="grid lg:grid-cols-3 gap-5 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-ocean-100 shadow-soft p-6">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-ocean-600 font-bold">
                  GMV · last 12 months
                </p>
                <p className="mt-1 font-display text-3xl font-bold text-ocean-950">
                  ${latest.gmv}M
                  <span className="ml-2 text-sm font-semibold text-emerald-700">
                    +34.2% MoM
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono uppercase tracking-widest text-ocean-600 font-bold">
                  ARR pace
                </p>
                <p className="font-display text-lg font-bold text-ocean-950">
                  ~$101M
                </p>
              </div>
            </div>
            <GmvChart />
          </div>

          <div className="bg-white rounded-2xl border border-ocean-100 shadow-soft p-6">
            <p className="text-xs font-mono uppercase tracking-widest text-ocean-600 font-bold">
              GMV by region
            </p>
            <p className="mt-1 font-display text-xl font-bold text-ocean-950">
              23 countries · 5 lanes
            </p>
            <div className="mt-5 space-y-3.5">
              {regionGmv.map((r) => (
                <div key={r.region}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-ocean-900 font-medium">{r.region}</span>
                    <span className="font-mono font-semibold text-ocean-950">
                      {r.gmv}
                      <span className="text-ocean-500 ml-1 text-xs">
                        ({r.pct}%)
                      </span>
                    </span>
                  </div>
                  <div className="h-2 bg-ocean-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${r.color}`}
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent orders + alerts */}
        <div className="grid lg:grid-cols-3 gap-5 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-ocean-100 shadow-soft overflow-hidden">
            <div className="p-5 border-b border-ocean-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-ocean-600 font-bold">
                  In-flight orders
                </p>
                <p className="mt-0.5 font-display text-lg font-bold text-ocean-950">
                  47 shipments active right now
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-xs font-semibold text-coral-700 hover:text-coral-800"
              >
                View all <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-ocean-50/60 text-[10px] font-mono uppercase tracking-wider text-ocean-700">
                <tr>
                  <th className="text-left px-5 py-2.5 font-semibold">Order</th>
                  <th className="text-left px-3 py-2.5 font-semibold">Buyer</th>
                  <th className="text-left px-3 py-2.5 font-semibold">Lane</th>
                  <th className="text-right px-3 py-2.5 font-semibold">Value</th>
                  <th className="text-left px-5 py-2.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ocean-100">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-ocean-50/40">
                    <td className="px-5 py-3">
                      <p className="font-mono text-xs text-ocean-700">{o.id}</p>
                      <p className="text-ocean-950 font-medium text-sm">
                        {o.sku}
                      </p>
                    </td>
                    <td className="px-3 py-3 text-ocean-900">{o.buyer}</td>
                    <td className="px-3 py-3 text-ocean-700">{o.region}</td>
                    <td className="px-3 py-3 text-right font-mono font-semibold text-ocean-950">
                      {o.value}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                            o.status === "Delivered"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-coral-50 text-coral-700"
                          }`}
                        >
                          {o.status === "Delivered" ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <Truck className="w-3 h-3" />
                          )}
                          {o.status}
                        </span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5, 6].map((s) => (
                            <span
                              key={s}
                              className={`w-1.5 h-3 rounded-sm ${
                                s <= o.stage ? "bg-coral-400" : "bg-ocean-100"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-2xl border border-ocean-100 shadow-soft p-5">
            <p className="text-xs font-mono uppercase tracking-widest text-ocean-600 font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Operational signal
            </p>
            <div className="mt-4 space-y-3">
              {alerts.map((a, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border ${
                    a.severity === "warn"
                      ? "bg-coral-50/50 border-coral-200"
                      : a.severity === "ok"
                      ? "bg-emerald-50/50 border-emerald-200"
                      : "bg-ocean-50/50 border-ocean-200"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {a.severity === "warn" ? (
                      <ShieldAlert className="w-4 h-4 text-coral-600 mt-0.5 flex-shrink-0" />
                    ) : a.severity === "ok" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Activity className="w-4 h-4 text-ocean-600 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-ocean-950 leading-tight">
                        {a.title}
                      </p>
                      <p className="mt-1 text-xs text-ocean-700/90 leading-relaxed">
                        {a.body}
                      </p>
                      <p className="mt-1 text-[10px] text-ocean-500 font-mono">
                        {a.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vendor leaderboard */}
        <div className="bg-white rounded-2xl border border-ocean-100 shadow-soft p-6">
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-ocean-600 font-bold">
                Cooperative leaderboard · last 30 days
              </p>
              <p className="mt-1 font-display text-lg font-bold text-ocean-950">
                Top performers by GMV
              </p>
            </div>
            <p className="text-xs text-ocean-600/80">
              {vendors.length} of {products.length} SKUs listed today
            </p>
          </div>

          <table className="w-full text-sm">
            <thead className="text-[10px] font-mono uppercase tracking-wider text-ocean-700">
              <tr className="border-b border-ocean-100">
                <th className="text-left py-2 font-semibold">#</th>
                <th className="text-left py-2 font-semibold">Cooperative</th>
                <th className="text-left py-2 font-semibold">Island</th>
                <th className="text-right py-2 font-semibold">Tons/mo</th>
                <th className="text-right py-2 font-semibold">Orders</th>
                <th className="text-right py-2 font-semibold">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ocean-100">
              {vendors
                .slice()
                .sort((a, b) => b.ordersFulfilled - a.ordersFulfilled)
                .map((v, idx) => (
                  <tr key={v.id} className="hover:bg-ocean-50/40">
                    <td className="py-3 text-ocean-500 font-mono">
                      {idx + 1}
                    </td>
                    <td className="py-3 font-medium text-ocean-950">
                      {t(v.name, locale)}
                    </td>
                    <td className="py-3 text-ocean-700 capitalize">
                      {v.island}
                    </td>
                    <td className="py-3 text-right font-mono text-ocean-950">
                      {v.monthlyTons}
                    </td>
                    <td className="py-3 text-right font-mono text-ocean-950">
                      {v.ordersFulfilled.toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      <span className="font-display font-bold text-ocean-950">
                        {v.rating}
                      </span>
                      <span className="text-ocean-500 ml-1 text-xs">
                        ({v.reviewCount})
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-xs text-ocean-500 font-mono">
          Investor demo — data illustrative. Wire to Supabase + RudderStack for
          production.
        </p>
      </div>
    </div>
  );
}
