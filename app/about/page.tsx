"use client";

import Link from "next/link";
import { ArrowRight, Heart, Globe2, Anchor } from "lucide-react";

const team = [
  {
    name: "Chen Wei",
    role: "Co-founder & CEO",
    bio: "20 years at COFCO and Sealand Securities. Grew up in Shenjiamen — first job at age 12 was sorting his uncle's catch.",
    color: "from-ocean-600 to-ocean-800",
    initials: "CW",
  },
  {
    name: "Rin Yamada",
    role: "Co-founder & Head of Markets",
    bio: "Former Tsukiji-market head buyer for Maruha Nichiro. Speaks Japanese, English, Mandarin. Lives between Tokyo and Zhoushan.",
    color: "from-coral-500 to-coral-700",
    initials: "RY",
  },
  {
    name: "Lin Mei",
    role: "Head of Cooperatives",
    bio: "Marine biology PhD (Zhejiang Ocean Univ.) Spent 4 years auditing fishing co-ops for MSC and ASC certifications.",
    color: "from-seafoam-500 to-seafoam-700",
    initials: "LM",
  },
  {
    name: "James Park",
    role: "VP Engineering",
    bio: "Built logistics infra at Coupang and Flexport. Owns the cold-chain telemetry stack and the customs API integrations.",
    color: "from-sand-600 to-sand-800",
    initials: "JP",
  },
];

const milestones = [
  {
    year: "2023",
    title: "Founded",
    body: "Chen and Rin meet at a Zhejiang seafood expo. The two-broker chain between Zhoushan boats and Tokyo restaurants is mostly broken margin.",
  },
  {
    year: "2024",
    title: "First 10 cooperatives",
    body: "Onboard Putuo Ocean and Daishan Fishers Union. First 5 kg sample crate shipped to a Singapore omakase. They re-order in 8 days.",
  },
  {
    year: "2025 H1",
    title: "Seed: $4.2M",
    body: "Led by Ocean Vision Capital and Daiwa Quantum. Hire James + 22 ops staff. Open Tokyo + SF buying desks.",
  },
  {
    year: "2025 H2",
    title: "100 co-ops, 12 countries",
    body: "Cross $4M monthly GMV. First container-scale enterprise client (US Whole Foods regional). Cold-chain SLA hits 99.8%.",
  },
  {
    year: "2026 Q1",
    title: "147 co-ops, 23 countries",
    body: "Crossing $8M/mo GMV. Now raising Series A to scale Singapore + EU buying desks and integrate WeChat Pay / PIX / UPI for buyer-side rails.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-ocean-50 to-sand-100 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral-200/30 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
            About · 关于
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ocean-950 leading-[1.05] tracking-tight max-w-3xl text-balance">
            We're rebuilding the supply chain
            <span className="text-coral-600"> between China's seas and the world's tables.</span>
          </h1>
          <p className="mt-6 text-lg text-ocean-800/85 max-w-2xl leading-relaxed">
            Zhoushan has been a fishing port for 600 years. Most of its catch
            still moves through 3–4 broker layers before it reaches a foreign
            buyer. We think those buyers and those cooperatives deserve a
            direct line — with the cold chain, customs, and capital to make it
            actually work.
          </p>
        </div>
      </section>

      {/* Zhoushan story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
              The place · 舟山
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ocean-950 leading-tight tracking-tight">
              1,390 islands. The East China Sea's pantry.
            </h2>
          </div>
          <div className="lg:col-span-3 space-y-5 text-ocean-800/90 leading-relaxed">
            <p>
              The Zhoushan archipelago sits where the Yangtze River meets the
              East China Sea — a 28,572 km² zone of cold currents, nutrient
              upwellings, and the largest concentration of marine biomass in
              Chinese waters. It is the source of the "Zhoushan Four" — yellow
              croaker, hairtail, pomfret, and cuttlefish — that have anchored
              coastal Chinese cuisine for six centuries.
            </p>
            <p>
              Today Zhoushan still produces over a million tons of seafood
              annually, but most of it flows through opaque domestic
              wholesalers. Foreign buyers — Japanese sushi houses, US
              specialty markets, European fine-dining importers — pay 30–40%
              more for the same product, and have no traceability when
              shipments arrive at temperature.
            </p>
            <p>
              We exist to close that loop. Our team lives between Zhoushan,
              Tokyo, and San Francisco. We've spent two years walking docks,
              auditing co-ops, and rebuilding the customs lane. Now we ship
              ~$8M of product a month — and we're just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Mission pillars */}
      <section className="bg-ocean-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-300 font-semibold text-center">
            What we believe
          </p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Heart className="w-5 h-5" />,
                title: "Fishing families come first",
                body: "Cooperatives get 71% of every retail dollar. We publish the math on every invoice. Co-ops own their pricing — we don't squeeze.",
              },
              {
                icon: <Globe2 className="w-5 h-5" />,
                title: "Cross-border should be boring",
                body: "Customs, FX, cold chain, compliance — these should be solved infrastructure, not 60% of your operations team's time.",
              },
              {
                icon: <Anchor className="w-5 h-5" />,
                title: "Tradition is a feature",
                body: "Lantern-net catch, 3-day sun-curing, hand-stripped seaweed — these are not folklore. They are quality controls that we preserve and sell.",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="w-11 h-11 rounded-xl bg-coral-500/20 text-coral-300 flex items-center justify-center">
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

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-12">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
              The story so far
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-ocean-950 leading-tight tracking-tight">
              Three years of building. <br /> Just hitting our stride.
            </h2>
          </div>

          <ol className="space-y-7 relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-ocean-200 via-coral-300 to-seafoam-300" />
            {milestones.map((m, idx) => (
              <li key={idx} className="relative pl-12">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border-2 border-coral-400 text-coral-700 font-display font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-coral-600 font-bold">
                  {m.year}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-ocean-950">
                  {m.title}
                </h3>
                <p className="mt-2 text-ocean-800/85 leading-relaxed">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section className="bg-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
              The team
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-ocean-950 leading-tight tracking-tight">
              Built by people who walked the docks.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((m) => (
              <div
                key={m.name}
                className="bg-white rounded-2xl border border-ocean-100 shadow-soft p-6"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white font-display text-xl font-bold`}
                >
                  {m.initials}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ocean-950">
                  {m.name}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-coral-600 mt-0.5">
                  {m.role}
                </p>
                <p className="mt-3 text-sm text-ocean-800/85 leading-relaxed">
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-3xl gradient-ocean p-10 md:p-14 text-white">
          <div className="absolute inset-0 bg-wave opacity-25" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-300 font-semibold">
                Investors · partners · candidates
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                Want to help us ship a million more tons?
              </h2>
              <p className="mt-4 text-ocean-200/90 max-w-md">
                We're hiring across logistics, engineering, and buying desks
                in Tokyo, Singapore, and Frankfurt. Series A open to
                strategic investors with food-supply infrastructure
                expertise.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-start md:justify-end">
              <a
                href="mailto:hello@zhoushan.catch"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-coral-500 text-white font-semibold hover:bg-coral-600 transition-colors shadow-card"
              >
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-colors"
              >
                View live metrics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
