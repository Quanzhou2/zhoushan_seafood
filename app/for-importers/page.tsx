"use client";

import { useState } from "react";
import {
  Check,
  Mail,
  FileText,
  Truck,
  CreditCard,
  Globe2,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { t, ui } from "@/lib/i18n";
import { useProducts } from "@/lib/data-context";
import { supabase } from "@/lib/supabase";

const tiers = [
  {
    name: "Sample crate",
    price: "$0",
    period: "first-time buyer",
    description:
      "5 kg curated by our buyer. Free shipping, returnable. One per company.",
    features: [
      "5 SKUs · 1 kg each",
      "Free DDP shipping",
      "Vendor video call",
      "No minimum follow-up",
    ],
    cta: "Order sample crate",
    accent: "border-ocean-200",
    btn: "bg-ocean-950 text-white hover:bg-ocean-900",
  },
  {
    name: "Wholesale",
    price: "$5K",
    period: "min. monthly",
    description:
      "Direct co-op pricing, NET-30 terms, dedicated buyer support.",
    features: [
      "25 kg/SKU min.",
      "NET-30 payment terms",
      "DDP or FOB Ningbo-Zhoushan",
      "Customs done-for-you",
      "Cold-chain SLA: 99.9%",
    ],
    cta: "Open wholesale account",
    accent: "border-coral-400 ring-2 ring-coral-300",
    btn: "bg-coral-500 text-white hover:bg-coral-600",
    badge: "Most popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "container-scale",
    description:
      "20'/40' reefer containers, exclusive SKUs, white-label packaging.",
    features: [
      "Full container loads",
      "White-label / private SKU",
      "Dedicated account team",
      "Multi-country fulfillment",
      "Quarterly trip to Zhoushan",
    ],
    cta: "Talk to sales",
    accent: "border-ocean-200",
    btn: "bg-ocean-950 text-white hover:bg-ocean-900",
  },
];

const trustPoints = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: "All docs handled at origin",
    body: "MSC chain-of-custody, EU IUU catch certs, FDA prior notice, JAS organic — issued at our Zhoushan warehouse before container seal.",
  },
  {
    icon: <Truck className="w-5 h-5" />,
    title: "Cold chain you can audit",
    body: "Every shipment carries a Sigfox temperature logger. Live dashboard, blockchain-stamped trail, automatic refund if integrity drops below 99%.",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "NET-30 from day one",
    body: "Pay in USD/EUR/JPY/KRW. Co-op settles in RMB. We hold escrow and absorb FX risk. T+1 to vendor on order confirmation.",
  },
  {
    icon: <Globe2 className="w-5 h-5" />,
    title: "Multi-region playbook",
    body: "Currently fulfilling to JP, KR, SG, MY, TH, US, CA, UK, DE, FR. Each lane has a vetted last-mile reefer partner.",
  },
];

export default function ForImportersPage() {
  const { locale } = useStore();
  const products = useProducts();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    country: "Japan",
    monthly_volume: "Just sampling",
    preferred_currency: "USD",
    message: "",
  });
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  );

  const toggleProduct = (slug: string) => {
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    // anon role has INSERT-only access (no SELECT) so we don't chain .select() here.
    const { error } = await supabase
      .from("zhoushan_rfq_requests")
      .insert({
        ...form,
        products_of_interest: Array.from(selectedProducts),
      });
    setSubmitting(false);
    if (error) {
      setSubmitError(error.message);
      return;
    }
    setSubmittedId(Date.now() % 100000); // synthetic confirmation number for UX
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-ocean-950 via-ocean-900 to-ocean-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-wave opacity-25" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-coral-500/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-coral-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                For restaurants · importers · distributors
              </p>
              <h1 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                Skip the broker layer. <br />
                <span className="text-coral-300">Buy direct from the boat.</span>
              </h1>
              <p className="mt-6 text-lg text-ocean-200/90 leading-relaxed max-w-xl">
                Average buyer cuts ~32% off landed cost vs. traditional
                three-broker chain — and gets a shipment they can actually
                trace. Request a free 5 kg sample crate to taste the difference.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#rfq"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-coral-500 text-white font-semibold hover:bg-coral-600 transition-colors shadow-card"
                >
                  <Mail className="w-4 h-4" />
                  Request sample crate
                </a>
                <a
                  href="#tiers"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Compare buying tiers
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl bg-white text-ocean-950 p-6 shadow-card-hover">
                <p className="text-[10px] font-mono uppercase tracking-widest text-coral-600 font-bold">
                  Landed-cost comparison · 40 kg yellow croaker · to Tokyo
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    {
                      label: "Traditional 3-broker chain",
                      cost: "$5,840",
                      pct: 100,
                      color: "bg-slate-400",
                    },
                    {
                      label: "Two-broker chain",
                      cost: "$4,720",
                      pct: 80,
                      color: "bg-slate-500",
                    },
                    {
                      label: "Single broker",
                      cost: "$4,180",
                      pct: 70,
                      color: "bg-slate-600",
                    },
                    {
                      label: "Zhoushan Catch direct",
                      cost: "$3,960",
                      pct: 67,
                      color: "bg-coral-500",
                      highlight: true,
                    },
                  ].map((r) => (
                    <div key={r.label}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span
                          className={
                            r.highlight ? "font-bold" : "text-ocean-800"
                          }
                        >
                          {r.label}
                        </span>
                        <span
                          className={`font-mono font-semibold ${
                            r.highlight ? "text-coral-700" : ""
                          }`}
                        >
                          {r.cost}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-ocean-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${r.color}`}
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-ocean-100 flex items-center justify-between">
                  <p className="text-xs text-ocean-700">
                    Your savings · per shipment
                  </p>
                  <p className="font-display text-2xl font-bold text-coral-600">
                    −$1,880 (−32%)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
            What you get
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-ocean-950 leading-tight tracking-tight">
            The boring stuff handled. The good stuff visible.
          </h2>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustPoints.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-ocean-100 shadow-soft"
            >
              <div className="w-10 h-10 rounded-xl bg-coral-50 text-coral-600 flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-ocean-950">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-ocean-800/80 leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section id="tiers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
            Buying tiers
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-ocean-950 leading-tight tracking-tight">
            Start with a sample. Scale to a container.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-6 rounded-2xl bg-white border-2 shadow-card ${tier.accent}`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-coral-500 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {tier.badge}
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-ocean-950">
                {tier.name}
              </h3>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-ocean-950">
                  {tier.price}
                </span>
                <span className="text-xs text-ocean-600">/ {tier.period}</span>
              </p>
              <p className="mt-3 text-sm text-ocean-800/80">{tier.description}</p>
              <ul className="mt-5 space-y-2">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-ocean-900"
                  >
                    <Check className="w-4 h-4 text-coral-500 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#rfq"
                className={`mt-6 block text-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${tier.btn}`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* RFQ */}
      <section id="rfq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-coral-600 font-semibold">
              Request for quote
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-ocean-950 leading-tight tracking-tight">
              We'll come back with pricing in 24 hours.
            </h2>
            <p className="mt-4 text-ocean-800/80 leading-relaxed">
              Tell us what you buy today, how much, and where you ship it. Our
              export team will match you with the right cooperative, propose
              SKUs, and send a quote in your currency with all-in landed cost.
            </p>
            <div className="mt-7 p-5 rounded-2xl bg-ocean-50 border border-ocean-100">
              <p className="text-xs font-mono uppercase tracking-widest text-ocean-700 font-bold">
                What happens next
              </p>
              <ol className="mt-3 space-y-2.5 text-sm text-ocean-900">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-coral-500 text-white font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  Reply within 24h with 2–3 cooperative matches.
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-coral-500 text-white font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  Free 5 kg sample crate (DDP) within 7 days.
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-coral-500 text-white font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  Onboard to platform, NET-30 active from order #1.
                </li>
              </ol>
            </div>
          </div>

          <form
            className="lg:col-span-3 bg-white rounded-2xl border border-ocean-100 shadow-card p-7"
            onSubmit={handleSubmit}
          >
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto rounded-full bg-coral-100 flex items-center justify-center">
                  <Check className="w-8 h-8 text-coral-600" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-ocean-950">
                  Got it — thanks!
                </h3>
                <p className="mt-2 text-ocean-700/90 max-w-md mx-auto">
                  Our Tokyo and Singapore buying desks are now on it. Expect a
                  proposal in your inbox within 24 hours.
                </p>
                {submittedId !== null && (
                  <p className="mt-3 text-xs font-mono text-ocean-500">
                    Confirmation #ZS-{submittedId} · saved to live database
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setSubmittedId(null);
                    setForm({
                      company_name: "",
                      contact_name: "",
                      email: "",
                      country: "Japan",
                      monthly_volume: "Just sampling",
                      preferred_currency: "USD",
                      message: "",
                    });
                    setSelectedProducts(new Set());
                  }}
                  className="mt-6 text-sm font-semibold text-coral-600 hover:text-coral-700"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={t(ui.formCompanyName, locale)} required>
                  <input
                    type="text"
                    required
                    value={form.company_name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, company_name: e.target.value }))
                    }
                    placeholder="Tsukiji Sushi Co., Ltd."
                    className="w-full px-3 py-2.5 rounded-lg border border-ocean-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral-200 focus:border-coral-400"
                  />
                </Field>
                <Field label={t(ui.formContact, locale)} required>
                  <input
                    type="text"
                    required
                    value={form.contact_name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, contact_name: e.target.value }))
                    }
                    placeholder="Tanaka-san"
                    className="w-full px-3 py-2.5 rounded-lg border border-ocean-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral-200 focus:border-coral-400"
                  />
                </Field>
                <Field label={t(ui.formEmail, locale)} required>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="you@company.com"
                    className="w-full px-3 py-2.5 rounded-lg border border-ocean-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral-200 focus:border-coral-400"
                  />
                </Field>
                <Field label={t(ui.formCountry, locale)} required>
                  <select
                    required
                    value={form.country}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, country: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-ocean-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral-200"
                  >
                    <option>Japan</option>
                    <option>Korea</option>
                    <option>Singapore</option>
                    <option>Malaysia</option>
                    <option>Thailand</option>
                    <option>USA</option>
                    <option>Canada</option>
                    <option>UK</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field label={t(ui.formVolume, locale)} required>
                  <select
                    required
                    value={form.monthly_volume}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, monthly_volume: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-ocean-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral-200"
                  >
                    <option>Just sampling</option>
                    <option>25 – 100 kg</option>
                    <option>100 – 500 kg</option>
                    <option>500 kg – 2 t</option>
                    <option>2 – 10 t</option>
                    <option>10 t + (container scale)</option>
                  </select>
                </Field>
                <Field label="Preferred currency" required>
                  <select
                    required
                    value={form.preferred_currency}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, preferred_currency: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-ocean-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral-200"
                  >
                    <option>USD</option>
                    <option>JPY</option>
                    <option>EUR</option>
                    <option>CNY</option>
                    <option>GBP</option>
                    <option>SGD</option>
                    <option>KRW</option>
                  </select>
                </Field>
                <Field label={t(ui.formProducts, locale)} fullWidth>
                  <div className="flex flex-wrap gap-1.5">
                    {products.slice(0, 8).map((p) => (
                      <label
                        key={p.id}
                        className="inline-flex items-center gap-1.5 cursor-pointer text-xs px-2.5 py-1.5 rounded-full bg-ocean-50 border border-ocean-200 hover:border-coral-300 text-ocean-800 hover:text-coral-700 has-[:checked]:bg-coral-500 has-[:checked]:text-white has-[:checked]:border-coral-500 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(p.slug)}
                          onChange={() => toggleProduct(p.slug)}
                          className="sr-only"
                        />
                        {t(p.name, locale)}
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label={t(ui.formMessage, locale)} fullWidth>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Tell us about your menu, timeline, any specific cuts or packaging needs..."
                    className="w-full px-3 py-2.5 rounded-lg border border-ocean-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-coral-200 focus:border-coral-400 resize-none"
                  />
                </Field>
                <div className="sm:col-span-2 pt-2">
                  {submitError && (
                    <p className="mb-3 px-3 py-2 rounded-lg bg-coral-50 border border-coral-200 text-xs text-coral-800">
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-coral-500 text-white text-sm font-semibold hover:bg-coral-600 transition-colors shadow-card disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Mail className="w-4 h-4" />
                    {submitting ? "Submitting…" : t(ui.formSubmit, locale)}
                  </button>
                  <p className="mt-3 text-[11px] text-ocean-600/80 text-center">
                    We respond on Tokyo, Singapore, and San Francisco business
                    hours. No spam — we hate it too.
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  children,
  required,
  fullWidth,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <label className="block text-xs font-semibold text-ocean-700 mb-1.5 uppercase tracking-wider">
        {label}
        {required && <span className="text-coral-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
