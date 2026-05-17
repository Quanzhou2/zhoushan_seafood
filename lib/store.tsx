"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Currency, Locale } from "./types";

interface StoreContextValue {
  locale: Locale;
  currency: Currency;
  setLocale: (l: Locale) => void;
  setCurrency: (c: Currency) => void;
  cartCount: number;
  addToCart: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [cartCount, setCartCount] = useState(0);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem("zs-locale") as Locale | null;
    const savedCurrency = localStorage.getItem("zs-currency") as Currency | null;
    const savedCart = localStorage.getItem("zs-cart");
    if (savedLocale) setLocaleState(savedLocale);
    if (savedCurrency) setCurrencyState(savedCurrency);
    if (savedCart) setCartCount(parseInt(savedCart, 10) || 0);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("zs-locale", l);
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("zs-currency", c);
  };

  const addToCart = () => {
    setCartCount((c) => {
      const next = c + 1;
      localStorage.setItem("zs-cart", String(next));
      return next;
    });
  };

  return (
    <StoreContext.Provider
      value={{ locale, currency, setLocale, setCurrency, cartCount, addToCart }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
