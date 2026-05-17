import type { Currency } from "./types";

// Static FX rates for the demo. Production: pull from /api/fx with hourly cache.
// Rates as of mid-May 2026 (illustrative).
export const fxRates: Record<Currency, number> = {
  USD: 1.0,
  CNY: 7.18,
  JPY: 149.4,
  EUR: 0.91,
};

export const currencySymbols: Record<Currency, string> = {
  USD: "$",
  CNY: "¥",
  JPY: "¥",
  EUR: "€",
};

export const currencyLabels: Record<Currency, string> = {
  USD: "USD",
  CNY: "CNY",
  JPY: "JPY",
  EUR: "EUR",
};

export function convert(priceUSD: number, currency: Currency): number {
  return priceUSD * fxRates[currency];
}

export function formatPrice(priceUSD: number, currency: Currency): string {
  const value = convert(priceUSD, currency);
  const sym = currencySymbols[currency];
  if (currency === "JPY") {
    return `${sym}${Math.round(value).toLocaleString()}`;
  }
  return `${sym}${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
