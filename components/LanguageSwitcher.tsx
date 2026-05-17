"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import { locales } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = locales.find((l) => l.code === locale)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm text-ocean-800 hover:bg-ocean-50 transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium">{current.label}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-40 bg-white rounded-lg shadow-card border border-ocean-100 py-1 z-50 animate-fade-in">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-ocean-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <span>{l.flag}</span>
                <span className="text-ocean-900">{l.label}</span>
              </span>
              {l.code === locale && <Check className="w-4 h-4 text-coral-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
