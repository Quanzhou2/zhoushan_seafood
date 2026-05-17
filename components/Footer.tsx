"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { t, ui } from "@/lib/i18n";
import { Logo } from "./Logo";

export function Footer() {
  const { locale } = useStore();

  return (
    <footer className="bg-ocean-950 text-ocean-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-2">
            <div className="bg-white/95 inline-block px-3 py-2 rounded-md">
              <Logo />
            </div>
            <p className="mt-4 text-sm text-ocean-200/80 max-w-sm leading-relaxed">
              {t(ui.footerTagline, locale)}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {["MSC", "ASC", "BRC", "EU-Export", "FDA", "JAS"].map((c) => (
                <span
                  key={c}
                  className="px-2 py-1 rounded-md border border-ocean-700/70 text-ocean-300 font-mono tracking-wide"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-coral-300 uppercase tracking-widest mb-3">
              Marketplace
            </h4>
            <ul className="space-y-2 text-sm text-ocean-200/90">
              <li>
                <Link href="/marketplace" className="hover:text-white">
                  Browse all
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace?category=fish"
                  className="hover:text-white"
                >
                  Wild fish
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace?category=crustacean"
                  className="hover:text-white"
                >
                  Crab & shrimp
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace?category=mollusk"
                  className="hover:text-white"
                >
                  Shellfish
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace?category=premium"
                  className="hover:text-white"
                >
                  Premium SKUs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-coral-300 uppercase tracking-widest mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-ocean-200/90">
              <li>
                <Link href="/how-it-works" className="hover:text-white">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/for-importers" className="hover:text-white">
                  For importers
                </Link>
              </li>
              <li>
                <Link href="/vendors" className="hover:text-white">
                  For cooperatives
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white">
                  Investor dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-coral-300 uppercase tracking-widest mb-3">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-ocean-200/90">
              <li>
                Free-Trade Zone, Bldg 7<br />
                Zhoushan, Zhejiang 316021
              </li>
              <li>
                <a href="mailto:hello@zhoushan.catch" className="hover:text-white">
                  hello@zhoushan.catch
                </a>
              </li>
              <li>
                <a href="tel:+8657389000000" className="hover:text-white">
                  +86 580 8900 0000
                </a>
              </li>
              <li className="text-ocean-300/70 pt-2 font-mono text-xs">
                WeChat · ZhoushanCatch_Sales
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ocean-800/60 flex flex-col md:flex-row gap-3 justify-between text-xs text-ocean-300/70">
          <p>© 2026 Zhoushan Catch Trading Co., Ltd. ICP 备 2026000000 号</p>
          <p>
            Customs AEO certified · MSC Chain-of-Custody #C-86224 · Investor
            demo build
          </p>
        </div>
      </div>
    </footer>
  );
}
