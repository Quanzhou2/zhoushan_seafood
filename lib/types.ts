// Domain types — designed to match a Supabase schema 1:1
// so the prototype can later swap seed data for real queries.

export type Locale = "en" | "zh" | "ja";
export type Currency = "USD" | "CNY" | "JPY" | "EUR";

export type Region =
  | "north-america"
  | "japan-korea"
  | "southeast-asia"
  | "europe"
  | "china";

export type Island = "putuo" | "daishan" | "shengsi" | "zhujiajian" | "liuheng";

export type Certification =
  | "MSC"
  | "ASC"
  | "BRC"
  | "HACCP"
  | "EU-Export"
  | "FDA"
  | "JAS-Organic"
  | "China-Customs-AEO";

export type ProductCategory =
  | "fish"
  | "crustacean"
  | "mollusk"
  | "dried"
  | "value-added"
  | "premium";

export interface LocalizedText {
  en: string;
  zh: string;
  ja: string;
}

export interface Vendor {
  id: string;
  slug: string;
  name: LocalizedText;
  island: Island;
  founded: number;
  fishersCount: number;
  vesselsCount: number;
  story: LocalizedText;
  certifications: Certification[];
  specialty: LocalizedText;
  rating: number;
  reviewCount: number;
  ordersFulfilled: number;
  monthlyTons: number;
  exportRegions: Region[];
  heroColor: string;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedText;
  category: ProductCategory;
  vendorId: string;
  priceUSD: number;
  wholesalePriceUSD: number;
  wholesaleMinKg: number;
  unit: "kg" | "box" | "piece";
  unitWeight: number;
  description: LocalizedText;
  origin: LocalizedText;
  catchMethod: LocalizedText;
  certifications: Certification[];
  stockKg: number;
  rating: number;
  reviewCount: number;
  imageEmoji: string;
  bgGradient: string;
  isFeatured: boolean;
  isPremium: boolean;
  seasonality: LocalizedText;
}

export interface ColdChainStage {
  stage: LocalizedText;
  location: LocalizedText;
  tempC: number;
  durationHours: number;
  status: "completed" | "active" | "upcoming";
  timestamp: string;
}

export interface PlatformMetric {
  label: LocalizedText;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
}
