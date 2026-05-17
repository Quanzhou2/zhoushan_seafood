// Static-only constants live here.
// Dynamic data (vendors, products, cold-chain) now comes from Supabase via lib/data-context.
//
// What stays here:
//   - platformMetrics, gmvSeries, regionGmv  — admin dashboard metrics (computed in real life)
//   - islandLabels                            — pure i18n constants
//
// Old seed data has been migrated into Postgres (see zhoushan_catch_initial_schema migration).

import type { PlatformMetric, Island } from "./types";

// ============================================================================
// PLATFORM METRICS — admin dashboard / investor traction page
// In production these would be aggregations over the orders + shipments tables.
// ============================================================================

export const platformMetrics: PlatformMetric[] = [
  {
    label: { en: "GMV (last 30 days)", zh: "近30天GMV", ja: "過去30日GMV" },
    value: "$8.42M",
    delta: "+34.2%",
    trend: "up",
  },
  {
    label: { en: "Orders shipped", zh: "已发货订单", ja: "出荷済み注文" },
    value: "12,840",
    delta: "+28.7%",
    trend: "up",
  },
  {
    label: {
      en: "Active vendor co-ops",
      zh: "活跃合作社",
      ja: "稼働中協同組合",
    },
    value: "147",
    delta: "+12",
    trend: "up",
  },
  {
    label: {
      en: "Buyer regions served",
      zh: "买家覆盖地区",
      ja: "買い手対応地域",
    },
    value: "23",
    delta: "+4",
    trend: "up",
  },
  {
    label: {
      en: "Cold-chain integrity",
      zh: "冷链完整率",
      ja: "冷蔵チェーン完全率",
    },
    value: "99.87%",
    delta: "+0.12pp",
    trend: "up",
  },
  {
    label: {
      en: "Avg. customs clearance",
      zh: "平均通关时长",
      ja: "平均通関時間",
    },
    value: "4.3 hrs",
    delta: "−1.8 hrs",
    trend: "up",
  },
];

export const gmvSeries = [
  { month: "Jun '25", gmv: 1.2 },
  { month: "Jul '25", gmv: 1.5 },
  { month: "Aug '25", gmv: 1.9 },
  { month: "Sep '25", gmv: 2.4 },
  { month: "Oct '25", gmv: 3.1 },
  { month: "Nov '25", gmv: 3.8 },
  { month: "Dec '25", gmv: 4.4 },
  { month: "Jan '26", gmv: 5.1 },
  { month: "Feb '26", gmv: 5.7 },
  { month: "Mar '26", gmv: 6.5 },
  { month: "Apr '26", gmv: 7.3 },
  { month: "May '26", gmv: 8.4 },
];

export const regionGmv = [
  { region: "Japan / Korea", pct: 38, gmv: "$3.20M", color: "bg-coral-500" },
  { region: "North America", pct: 27, gmv: "$2.27M", color: "bg-ocean-500" },
  { region: "Southeast Asia", pct: 18, gmv: "$1.52M", color: "bg-seafoam-500" },
  { region: "Europe", pct: 12, gmv: "$1.01M", color: "bg-sand-500" },
  { region: "Other", pct: 5, gmv: "$0.42M", color: "bg-slate-400" },
];

// ============================================================================
// Island labels — i18n constant, not a DB row
// ============================================================================

export const islandLabels: Record<Island, { en: string; zh: string; ja: string }> = {
  putuo: { en: "Putuo Island", zh: "普陀岛", ja: "普陀島" },
  daishan: { en: "Daishan", zh: "岱山", ja: "岱山" },
  shengsi: { en: "Shengsi", zh: "嵊泗", ja: "嵊泗" },
  zhujiajian: { en: "Zhujiajian", zh: "朱家尖", ja: "朱家尖" },
  liuheng: { en: "Liuheng", zh: "六横岛", ja: "六横島" },
};
