"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  Product,
  Vendor,
  ColdChainStage,
  LocalizedText,
  Island,
  Certification,
  ProductCategory,
  Region,
} from "./types";
import { supabase } from "./supabase";

// ============================================================================
// DB row -> TypeScript shape mappers
// ============================================================================

type VendorRow = {
  id: string;
  slug: string;
  name: LocalizedText;
  island: Island;
  founded: number;
  fishers_count: number;
  vessels_count: number;
  story: LocalizedText;
  certifications: Certification[];
  specialty: LocalizedText;
  rating: number;
  review_count: number;
  orders_fulfilled: number;
  monthly_tons: number;
  export_regions: Region[];
  hero_color: string;
};

type ProductRow = {
  id: string;
  slug: string;
  name: LocalizedText;
  category: ProductCategory;
  vendor_id: string;
  price_usd: number;
  wholesale_price_usd: number;
  wholesale_min_kg: number;
  unit: "kg" | "box" | "piece";
  unit_weight: number;
  description: LocalizedText;
  origin: LocalizedText;
  catch_method: LocalizedText;
  certifications: Certification[];
  stock_kg: number;
  rating: number;
  review_count: number;
  image_emoji: string;
  bg_gradient: string;
  is_featured: boolean;
  is_premium: boolean;
  seasonality: LocalizedText;
};

type ColdChainRow = {
  id: number;
  shipment_id: string;
  step_order: number;
  stage: LocalizedText;
  location: LocalizedText;
  temp_c: number;
  duration_hours: number;
  status: "completed" | "active" | "upcoming";
  timestamp_text: string;
};

function mapVendor(r: VendorRow): Vendor {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    island: r.island,
    founded: r.founded,
    fishersCount: r.fishers_count,
    vesselsCount: r.vessels_count,
    story: r.story,
    certifications: r.certifications,
    specialty: r.specialty,
    rating: Number(r.rating),
    reviewCount: r.review_count,
    ordersFulfilled: r.orders_fulfilled,
    monthlyTons: r.monthly_tons,
    exportRegions: r.export_regions,
    heroColor: r.hero_color,
  };
}

function mapProduct(r: ProductRow): Product {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    category: r.category,
    vendorId: r.vendor_id,
    priceUSD: Number(r.price_usd),
    wholesalePriceUSD: Number(r.wholesale_price_usd),
    wholesaleMinKg: r.wholesale_min_kg,
    unit: r.unit,
    unitWeight: Number(r.unit_weight),
    description: r.description,
    origin: r.origin,
    catchMethod: r.catch_method,
    certifications: r.certifications,
    stockKg: r.stock_kg,
    rating: Number(r.rating),
    reviewCount: r.review_count,
    imageEmoji: r.image_emoji,
    bgGradient: r.bg_gradient,
    isFeatured: r.is_featured,
    isPremium: r.is_premium,
    seasonality: r.seasonality,
  };
}

function mapColdChain(r: ColdChainRow): ColdChainStage {
  return {
    stage: r.stage,
    location: r.location,
    tempC: Number(r.temp_c),
    durationHours: r.duration_hours,
    status: r.status,
    timestamp: r.timestamp_text,
  };
}

// ============================================================================
// DataContext + Provider
// ============================================================================

interface DataState {
  vendors: Vendor[];
  products: Product[];
  coldChain: ColdChainStage[];
  isLoading: boolean;
  error: string | null;
}

const DataContext = createContext<DataState>({
  vendors: [],
  products: [],
  coldChain: [],
  isLoading: true,
  error: null,
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DataState>({
    vendors: [],
    products: [],
    coldChain: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [vRes, pRes, cRes] = await Promise.all([
          supabase.from("zhoushan_vendors").select("*").order("orders_fulfilled", {
            ascending: false,
          }),
          supabase.from("zhoushan_products").select("*").order("is_featured", {
            ascending: false,
          }),
          supabase
            .from("zhoushan_cold_chain_stages")
            .select("*")
            .order("step_order", { ascending: true }),
        ]);

        if (cancelled) return;

        if (vRes.error) throw vRes.error;
        if (pRes.error) throw pRes.error;
        if (cRes.error) throw cRes.error;

        setState({
          vendors: (vRes.data as VendorRow[]).map(mapVendor),
          products: (pRes.data as ProductRow[]).map(mapProduct),
          coldChain: (cRes.data as ColdChainRow[]).map(mapColdChain),
          isLoading: false,
          error: null,
        });
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Unknown error";
        setState((s) => ({ ...s, isLoading: false, error: message }));
        console.error("[DataProvider] failed to load:", err);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
}

// ============================================================================
// Hooks
// ============================================================================

export function useData() {
  return useContext(DataContext);
}

export function useVendors() {
  return useContext(DataContext).vendors;
}

export function useProducts() {
  return useContext(DataContext).products;
}

export function useColdChain() {
  return useContext(DataContext).coldChain;
}

export function useVendorBySlug(slug: string) {
  const { vendors } = useContext(DataContext);
  return vendors.find((v) => v.slug === slug);
}

export function useVendorById(id: string | undefined) {
  const { vendors } = useContext(DataContext);
  if (!id) return undefined;
  return vendors.find((v) => v.id === id);
}

export function useProductBySlug(slug: string) {
  const { products } = useContext(DataContext);
  return products.find((p) => p.slug === slug);
}

export function useProductsByVendor(vendorId: string) {
  const { products } = useContext(DataContext);
  return products.filter((p) => p.vendorId === vendorId);
}

export function useFeaturedProducts() {
  const { products } = useContext(DataContext);
  return products.filter((p) => p.isFeatured);
}
