import type { Locale, LocalizedText } from "./types";

export const locales: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ja: "日本語",
};

export function t(field: LocalizedText, locale: Locale): string {
  return field[locale] ?? field.en;
}

// UI strings — extend as needed. Keep keys flat for clarity.
export const ui = {
  // Nav
  navMarketplace: {
    en: "Marketplace",
    zh: "海鲜市场",
    ja: "マーケット",
  },
  navVendors: {
    en: "Cooperatives",
    zh: "合作社",
    ja: "協同組合",
  },
  navHowItWorks: {
    en: "How it works",
    zh: "运作方式",
    ja: "仕組み",
  },
  navForImporters: {
    en: "For Importers",
    zh: "B2B 进口",
    ja: "輸入業者向け",
  },
  navAbout: {
    en: "About",
    zh: "关于",
    ja: "会社情報",
  },
  navDashboard: {
    en: "Dashboard",
    zh: "数据看板",
    ja: "ダッシュボード",
  },
  // CTA buttons
  ctaShopNow: {
    en: "Shop the marketplace",
    zh: "立即进入市场",
    ja: "マーケットを見る",
  },
  ctaForImporters: {
    en: "Wholesale & import →",
    zh: "批发与进口 →",
    ja: "卸売・輸入 →",
  },
  ctaAddToCart: {
    en: "Add to cart",
    zh: "加入购物车",
    ja: "カートに追加",
  },
  ctaRequestQuote: {
    en: "Request wholesale quote",
    zh: "申请批发报价",
    ja: "卸見積もり依頼",
  },
  ctaContactCoop: {
    en: "Contact cooperative",
    zh: "联系合作社",
    ja: "組合へ連絡",
  },
  ctaViewAll: {
    en: "View all",
    zh: "查看全部",
    ja: "すべて表示",
  },
  ctaLearnMore: {
    en: "Learn more",
    zh: "了解更多",
    ja: "詳細を見る",
  },
  // Hero
  heroEyebrow: {
    en: "Zhoushan, China · est. 1387",
    zh: "舟山，中国 · 1387 年开埠",
    ja: "中国・舟山 · 1387年開港",
  },
  heroTitle: {
    en: "The ocean's larder,\nshipped door-to-door.",
    zh: "东海百味，\n直送您家门口。",
    ja: "東シナ海の宝庫を\nドアまでお届け。",
  },
  heroSubtitle: {
    en: "We connect 147 verified Zhoushan fishing cooperatives with restaurants, importers, and seafood lovers in 23 countries — with end-to-end cold chain, customs clearance, and multi-currency settlement built in.",
    zh: "我们将 147 家经过认证的舟山渔业合作社，与全球 23 个国家的餐厅、进口商及海鲜爱好者相连——端到端冷链、报关清关、多币种结算一体化完成。",
    ja: "認証済み舟山漁業協同組合147社を、23カ国のレストラン・輸入業者・シーフード愛好家とつなぎます。エンドツーエンドの低温物流、通関、多通貨決済を一括対応。",
  },
  // Pillars
  pillarColdChain: {
    en: "End-to-end −20°C",
    zh: "全程 −20°C 冷链",
    ja: "全行程 −20°C 冷蔵",
  },
  pillarColdChainDesc: {
    en: "Catch-to-doorstep temperature logging on every shipment. Real-time alerts, blockchain-stamped.",
    zh: "每批货物从捕捞到送达全程温控记录，实时告警，区块链存证。",
    ja: "漁獲から配送まで全工程の温度ログを記録。リアルタイム警告、ブロックチェーン保証。",
  },
  pillarCustoms: {
    en: "Customs done-for-you",
    zh: "报关全代办",
    ja: "通関代行",
  },
  pillarCustomsDesc: {
    en: "AEO-certified clearance through Ningbo-Zhoushan port. EU IUU, FDA, JAS, halal — handled at origin.",
    zh: "经宁波舟山港 AEO 认证通道。欧盟 IUU、美国 FDA、日本 JAS、清真——产地一站搞定。",
    ja: "寧波舟山港のAEO認証レーン経由。EU IUU、米FDA、JAS、ハラル——出荷地で完結。",
  },
  pillarVendors: {
    en: "Verified cooperatives",
    zh: "认证合作社",
    ja: "認証協同組合",
  },
  pillarVendorsDesc: {
    en: "Every co-op visited on-site. MSC/ASC sustainability audits. Direct from boat — no broker layer.",
    zh: "每家合作社实地考察。MSC/ASC 可持续认证。船家直供，无中间商。",
    ja: "全組合を現地監査。MSC/ASC持続可能性審査済み。船から直送、ブローカー層なし。",
  },
  pillarMulticurrency: {
    en: "Multi-currency settlement",
    zh: "多币种结算",
    ja: "多通貨決済",
  },
  pillarMulticurrencyDesc: {
    en: "Buyers pay in their currency. Co-ops settle to RMB. T+1 to escrow, no FX hassle on either side.",
    zh: "买家本币支付，合作社人民币结算。T+1 入托管，双方无外汇烦恼。",
    ja: "買い手は自国通貨、組合は人民元で決済。T+1エスクロー入金、為替手間なし。",
  },
  // Section headers
  sectionFeaturedTitle: {
    en: "From the morning catch",
    zh: "今日鲜捕",
    ja: "本日の水揚げ",
  },
  sectionFeaturedSubtitle: {
    en: "Selected by our buyers in Tokyo, San Francisco, and Singapore this week.",
    zh: "本周由东京、旧金山、新加坡买手精选。",
    ja: "今週、東京・サンフランシスコ・シンガポールのバイヤーが厳選。",
  },
  sectionVendorsTitle: {
    en: "Meet the cooperatives",
    zh: "了解合作社",
    ja: "協同組合のご紹介",
  },
  sectionVendorsSubtitle: {
    en: "Five of the 147 fishery co-ops on the platform. Click any to see their story, vessels, and product line.",
    zh: "平台 147 家渔业合作社中的五家。点击查看故事、船队与产品线。",
    ja: "プラットフォーム上147組合の中から5組合。クリックで物語・船団・商品をご覧ください。",
  },
  // Form labels
  formCompanyName: {
    en: "Company / restaurant name",
    zh: "公司 / 餐厅名称",
    ja: "会社名・レストラン名",
  },
  formContact: {
    en: "Contact person",
    zh: "联系人",
    ja: "ご担当者",
  },
  formEmail: {
    en: "Email",
    zh: "邮箱",
    ja: "メールアドレス",
  },
  formCountry: {
    en: "Country / region",
    zh: "国家 / 地区",
    ja: "国・地域",
  },
  formVolume: {
    en: "Expected monthly volume",
    zh: "预计月采购量",
    ja: "月間予定数量",
  },
  formProducts: {
    en: "Products of interest",
    zh: "感兴趣的产品",
    ja: "ご希望の商品",
  },
  formMessage: {
    en: "Additional notes",
    zh: "其他备注",
    ja: "備考",
  },
  formSubmit: {
    en: "Request quote within 24 hours",
    zh: "24小时内获取报价",
    ja: "24時間以内に見積もり",
  },
  // Cold chain
  coldChainTitle: {
    en: "Cold-chain journey",
    zh: "冷链溯源",
    ja: "コールドチェーン履歴",
  },
  coldChainSubtitle: {
    en: "Live temperature & location for this shipment.",
    zh: "本批货物实时温度与位置。",
    ja: "本出荷のリアルタイム温度・位置情報。",
  },
  // Product detail
  retailPrice: {
    en: "Retail",
    zh: "零售",
    ja: "小売",
  },
  wholesalePrice: {
    en: "Wholesale",
    zh: "批发",
    ja: "卸売",
  },
  minOrder: {
    en: "min. order",
    zh: "起订量",
    ja: "最低注文",
  },
  inStock: {
    en: "In stock",
    zh: "现货",
    ja: "在庫あり",
  },
  origin: {
    en: "Origin",
    zh: "产地",
    ja: "産地",
  },
  catchMethod: {
    en: "Catch method",
    zh: "捕捞方式",
    ja: "漁法",
  },
  certifications: {
    en: "Certifications",
    zh: "认证",
    ja: "認証",
  },
  seasonality: {
    en: "Seasonality",
    zh: "时节",
    ja: "旬",
  },
  // Footer
  footerTagline: {
    en: "Bringing Zhoushan's ocean larder to the world's tables.",
    zh: "把舟山东海的百味，送上世界的餐桌。",
    ja: "舟山東シナ海の宝を世界の食卓へ。",
  },
} as const;

export type UiKey = keyof typeof ui;
