"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { t, ui } from "@/lib/i18n";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CurrencySwitcher } from "./CurrencySwitcher";

export function Header() {
  const { locale, cartCount } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/marketplace", label: t(ui.navMarketplace, locale) },
    { href: "/vendors", label: t(ui.navVendors, locale) },
    { href: "/how-it-works", label: t(ui.navHowItWorks, locale) },
    { href: "/for-importers", label: t(ui.navForImporters, locale) },
    { href: "/about", label: t(ui.navAbout, locale) },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-ocean-100/70 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-ocean-800 hover:text-coral-500 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <div className="hidden md:flex items-center">
              <LanguageSwitcher />
              <CurrencySwitcher />
            </div>
            <Link
              href="/admin"
              className="hidden lg:inline-flex items-center px-3 py-1.5 ml-1 rounded-md text-xs font-medium text-ocean-700 border border-ocean-200 hover:bg-ocean-50 transition-colors"
            >
              {t(ui.navDashboard, locale)}
            </Link>
            <button
              className="relative p-2 rounded-md text-ocean-800 hover:bg-ocean-50 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-coral-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="lg:hidden p-2 rounded-md text-ocean-800 hover:bg-ocean-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-ocean-100 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-3 py-2 text-sm font-medium text-ocean-800 hover:bg-ocean-50 rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/admin"
                className="px-3 py-2 text-sm font-medium text-ocean-800 hover:bg-ocean-50 rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                {t(ui.navDashboard, locale)}
              </Link>
              <div className="flex items-center gap-2 px-3 pt-2 md:hidden">
                <LanguageSwitcher />
                <CurrencySwitcher />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
