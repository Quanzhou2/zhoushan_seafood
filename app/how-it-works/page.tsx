"use client";

import {
  Anchor,
  Snowflake,
  Warehouse,
  FileCheck,
  Plane,
  Truck,
  Home,
  ShieldCheck,
  CircleDollarSign,
  Workflow,
} from "lucide-react";

const steps = [
  {
    icon: <Anchor className="w-5 h-5" />,
    duration: "T = 0",
    title: "Catch & on-vessel handling",
    body: "Co-op vessels return to port within 24 hours of harvest. Single-species sorting begins on deck — no mixed nets, no cross-contamination.",
    temp: "+4°C → −18°C",
    color: "from-ocean-700 to-ocean-900",
  },
  {
    icon: <Snowflake className="w-5 h-5" />,
    duration: "+ 2h",
    title: "Blast-freeze at Shenjiamen port",
    body: "Catch enters −40°C blast tunnels for 90 minutes, then transitions to −22°C cold storage. We freeze the cell water before it crystallizes.",
    temp: "−40°C blast",
    color: "from-seafoam-600 to-seafoam-800",
  },
  {
    icon: <Warehouse className="w-5 h-5" />,
    duration: "+ 18h",
    title: "Free-Trade Zone warehouse",
    body: "Goods enter the Zhoushan Free-Trade Zone for export consolidation. Each pallet gets RFID + Sigfox temp logger. Inventory live to all buyers.",
    temp: "−25°C ambient",
    color: "from-ocean-600 to-ocean-800",
  },
  {
    icon: <FileCheck className="w-5 h-5" />,
    duration: "+ 24h",
    title: "Customs & compliance",
    body: "Our team prepares MSC chain-of-custody, IUU catch certs, FDA prior notice, HS-code mapping. AEO lane clears in 4.3h avg — vs. 19h industry standard.",
    temp: "−22°C",
    color: "from-coral-600 to-coral-800",
  },
  {
    icon: <Plane className="w-5 h-5" />,
    duration: "+ 30h",
    title: "International reefer freight",
    body: "Air (4–6h) for premium SKUs to JP/KR; LCL ocean reefer (7–10d) for bulk volumes to EU/NA. Each container temp-logged & GPS-tracked.",
    temp: "−20°C tracked",
    color: "from-sand-600 to-sand-800",
  },
  {
    icon: <Truck className="w-5 h-5" />,
    duration: "+ 38h",
    title: "Destination cold-chain handoff",
    body: "Vetted local partners — Yamato Cool (JP), HavenColdLogistics (US), DACHSER (EU) — pick up at port. Live handoff alerts to your dashboard.",
    temp: "−18°C",
    color: "from-seafoam-700 to-ocean-700",
  },
  {
    icon: <Home className="w-5 h-5" />,
    duration: "+ 46h",
    title: "Doorstep, kitchen, or sushi counter",
    body: "Last-mile reefer to your door. Photo proof of delivery, temperature snapshot at handoff, end-to-end blockchain receipt for your records.",
    temp: "−18°C → −5°C",
    color: "from-coral-500 to-coral-700",
  },
];

const fees = [
  {
    name: "Platform commission",
    body: "8% on retail orders. 4% on wholesale (≥$5K/mo).",
  },
  {
    name: "Cold-chain logistics",
    body: "Passed through at cost. Avg $1.80–$3.20/kg DDP depending on lane.",
  },
  {
    name: "Customs & docs",
    body: "Included on platform. We absorb the cost.",
  },
  {
    name: "FX & settlement",
    body: "1.2% margin on FX. Vendor receives RMB; buyer pays in their currency.",
  },
  {
    name: "Insurance",
    body: "0.4% of cargo value — Lloyd's-backed, covers spoilage and loss.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sand-100 to-sand-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-coral-200/30 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
            How it works · 运作方式
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ocean-950 leading-[1.05] tracking-tight max-w-3xl text-balance">
            From the East China Sea to your door —{" "}
            <span className="text-coral-600">in 46 hours.</span>
          </h1>
          <p className="mt-6 text-lg text-ocean-800/85 max-w-2xl leading-relaxed">
            Cross-border seafood is unforgiving. One broken handoff, one
            customs delay, one warm reefer — and the catch is ruined. Here is
            every step we own, end to end.
          </p>
        </div>
      </section>

      {/* Pipeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-[120px,1fr] gap-8">
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <Workflow className="w-8 h-8 text-coral-500" />
              <p className="mt-3 text-xs font-mono uppercase tracking-widest text-ocean-700 font-bold">
                The flow
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-ocean-950 leading-tight">
                7 steps. <br />
                100% owned.
              </p>
            </div>
          </div>

          <div className="relative">
            {/* vertical timeline rail */}
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-ocean-200 via-coral-300 to-seafoam-300 rounded-full hidden md:block" />

            <ol className="space-y-8">
              {steps.map((s, idx) => (
                <li key={idx} className="relative md:pl-14">
                  <div
                    className={`absolute left-0 top-0 hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br ${s.color} text-white items-center justify-center shadow-card ring-4 ring-sand-50`}
                  >
                    {s.icon}
                  </div>
                  <div className="bg-white rounded-2xl border border-ocean-100 shadow-soft p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div className="md:hidden">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${s.color} text-white flex items-center justify-center mb-3`}
                        >
                          {s.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-coral-600 font-bold">
                            Step {idx + 1} · {s.duration}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-ocean-700/70 bg-ocean-50 px-2 py-0.5 rounded-full">
                            <Snowflake className="inline w-3 h-3 mr-0.5" />
                            {s.temp}
                          </span>
                        </div>
                        <h3 className="mt-2 font-display text-xl font-bold text-ocean-950 leading-tight">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-ocean-800/85 leading-relaxed">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Trust pillars */}
      <section className="bg-ocean-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-300 font-semibold">
            Things that break — and how we don't
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-tight tracking-tight max-w-3xl text-balance">
            We own every handoff because cross-border seafood is where the
            chain breaks first.
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              {
                icon: <Snowflake className="w-5 h-5" />,
                title: "Cold-chain monitoring",
                body: "Every shipment carries 2× Sigfox loggers. Temperature streamed every 4 minutes. Anomaly → automatic refund + replacement, no claim form.",
              },
              {
                icon: <ShieldCheck className="w-5 h-5" />,
                title: "Customs handled at origin",
                body: "AEO-certified through Ningbo-Zhoushan. EU IUU, FDA, JAS, MSC chain-of-custody — issued at our warehouse, not your port.",
              },
              {
                icon: <CircleDollarSign className="w-5 h-5" />,
                title: "Multi-currency settlement",
                body: "Buyer pays in USD/EUR/JPY/KRW/SGD. We escrow + handle FX. Vendor receives RMB in T+1. Your bookkeeper smiles.",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur"
              >
                <div className="w-10 h-10 rounded-xl bg-coral-500/20 text-coral-300 flex items-center justify-center">
                  {p.icon}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-ocean-200/85 leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing transparency */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-[1fr,1.4fr] gap-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
              Transparent pricing
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-ocean-950 leading-tight tracking-tight">
              No hidden margins. <br />
              No mystery surcharges.
            </h2>
            <p className="mt-4 text-ocean-800/80 leading-relaxed">
              Cooperatives publish their price. We add platform fees. Logistics
              passes through at cost. You see the whole stack — and the
              vendor's share — on every invoice.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-ocean-100 shadow-soft divide-y divide-ocean-100">
            {fees.map((f) => (
              <div key={f.name} className="p-5 md:p-6 flex gap-5">
                <p className="font-display text-base font-bold text-ocean-950 w-44 flex-shrink-0">
                  {f.name}
                </p>
                <p className="text-sm text-ocean-800/85 leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
