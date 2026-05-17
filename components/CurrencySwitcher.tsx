"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import { currencyLabels } from "@/lib/currency";
import type { Currency } from "@/lib/types";

const currencies: Currency[] = ["USD", "CNY", "JPY", "EUR"];

export function CurrencySwitcher() {
  const { currency, setCurrency } = useStore();
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

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-sm text-ocean-800 hover:bg-ocean-50 transition-colors font-medium"
        aria-label="Change currency"
      >
        <span>{currencyLabels[currency]}</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-28 bg-white rounded-lg shadow-card border border-ocean-100 py-1 z-50 animate-fade-in">
          {currencies.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCurrency(c);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-ocean-50 transition-colors"
            >
              <span className="text-ocean-900 font-medium">{c}</span>
              {c === currency && <Check className="w-4 h-4 text-coral-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
