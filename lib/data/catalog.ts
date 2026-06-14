import type { Category, Collection, Product } from "./types";

/**
 * SAMPLE CATALOG — the REAL 22-SKU product list (11 Valcambi gold bars,
 * 8 SAM gold bars, 2 coins, 1 SAM silver bar). None of these prices are live
 * market data: they are DEMO prices (today's per-SKU figures, USD->AED x3.6725)
 * flagged for client confirmation before go-live. Swap this module for a real
 * pricing API and the components stay unchanged.
 *
 * Images: the client's OWN real product photos, pulled from their production
 * store (primegoldshop.com) via scripts/fetch_store_images.py + wired by
 * scripts/wire_product_images.py. Each SKU has <slug>.webp (primary/card) and
 * most have <slug>-pack.webp (packaging, shown on hover/swipe). Used as-is —
 * re-encoded to webp for consistency only, no AI and no editing.
 */

export const CATEGORIES: Category[] = [
  {
    slug: "gold-bars",
    name: "Gold Bullion Bars",
    metal: "gold",
    image: "/images/category-gold-bars.webp",
    intro:
      "Certified minted gold bars from 1 gram to 1 kilogram, each serial numbered and sealed with an assay certificate.",
  },
  {
    slug: "gold-coins",
    name: "Gold Bullion Coins",
    metal: "gold",
    image: "/images/category-gold-coins.webp",
    intro:
      "Investment-grade gold coins struck to exacting standards, recognised and traded worldwide.",
  },
  {
    slug: "silver-bars",
    name: "Silver Bullion Bars",
    metal: "silver",
    image: "/images/category-silver-bars.webp",
    intro:
      "Certified silver bars for investors who want to spread their holdings beyond gold.",
  },
];

export const COLLECTIONS: Collection[] = [
  {
    slug: "valcambi",
    name: "Valcambi Suisse",
    image: "/images/collection-valcambi.webp",
    story:
      "Valcambi has refined precious metals in the Swiss canton of Ticino since 1961. Every bar leaves the refinery serial numbered, assay sealed, and accepted on the London market.",
    signals: ["LBMA approved", "Swiss made", "Serial numbered"],
  },
  {
    slug: "sam-precious-metals",
    name: "SAM Precious Metals",
    image: "/images/collection-sam.webp",
    story:
      "SAM Precious Metals refines and mints bullion in the UAE, pairing international certification with local availability and service across the region.",
    signals: ["UAE refined", "Certified", "Assay sealed"],
  },
];

const VALCAMBI_BADGES = ["LBMA approved", "Swiss made"];
const SAM_BADGES = ["UAE refined", "Assay sealed"];

// Shared gold-bar demo prices in AED (same weight => same price across brands).
const GOLD_PRICE: Record<string, number> = {
  "1 g": 628,
  "2.5 g": 1374,
  "5 g": 2656,
  "10 g": 5164,
  "20 g": 10141,
  "1 oz": 15854,
  "50 g": 25536,
  "100 g": 50520,
  "250 g": 125552,
  "500 g": 250185,
  "1 kg": 499244,
};

const WEIGHT_G: Record<string, number> = {
  "1 g": 1,
  "2.5 g": 2.5,
  "5 g": 5,
  "10 g": 10,
  "20 g": 20,
  "1 oz": 31.1,
  "50 g": 50,
  "100 g": 100,
  "250 g": 250,
  "500 g": 500,
  "1 kg": 1000,
};

function goldBar(
  brand: "valcambi" | "sam",
  label: string
): Product {
  const isV = brand === "valcambi";
  const slugBrand = isV ? "valcambi" : "sam";
  const nameBrand = isV ? "Valcambi" : "SAM";
  const key = label.replace(/[^0-9a-z]/gi, "").toLowerCase();
  const slug = `${slugBrand}-gold-bar-${key}`;
  return {
    id: `${slugBrand}-gb-${key}`,
    slug,
    name: `${nameBrand} Gold Bar ${label}`,
    metal: "gold",
    category: "gold-bars",
    collection: isV ? "valcambi" : "sam-precious-metals",
    weightG: WEIGHT_G[label],
    weightLabel: label,
    priceAED: GOLD_PRICE[label],
    purity: "999.9",
    serialNumbered: true,
    image: `/images/products/${slug}.webp`,
    revealImage: `/images/products/${slug}-pack.webp`,
    badges: isV ? VALCAMBI_BADGES : SAM_BADGES,
  };
}

const VALCAMBI_WEIGHTS = ["1 g", "2.5 g", "5 g", "10 g", "20 g", "1 oz", "50 g", "100 g", "250 g", "500 g", "1 kg"];
const SAM_WEIGHTS = ["1 g", "2.5 g", "5 g", "10 g", "20 g", "1 oz", "50 g", "100 g"];

export const PRODUCTS: Product[] = [
  ...VALCAMBI_WEIGHTS.map((w) => goldBar("valcambi", w)),
  ...SAM_WEIGHTS.map((w) => goldBar("sam", w)),
  // Coins
  {
    id: "armillary-coin-1oz",
    slug: "armillary-gold-coin-1oz",
    name: "Armillary 1 oz Gold Coin",
    metal: "gold",
    category: "gold-coins",
    collection: "valcambi",
    weightG: 31.1,
    weightLabel: "1 oz",
    priceAED: 18000,
    purity: "999.9",
    serialNumbered: false,
    image: "/images/products/armillary-gold-coin-1oz.webp",
    revealImage: "/images/products/armillary-gold-coin-1oz-pack.webp",
    badges: ["Investment grade", "Limited mintage"],
  },
  {
    id: "sam-gold-coin-1oz",
    slug: "sam-gold-coin-1oz",
    name: "SAM 1 oz Gold Coin",
    metal: "gold",
    category: "gold-coins",
    collection: "sam-precious-metals",
    weightG: 31.1,
    weightLabel: "1 oz",
    priceAED: 15900,
    purity: "999.9",
    serialNumbered: false,
    image: "/images/products/sam-gold-coin-1oz.webp",
    revealImage: "/images/products/sam-gold-coin-1oz-pack.webp",
    badges: ["UAE refined", "Certified"],
  },
  // Silver
  {
    id: "sam-silver-bar-1kg",
    slug: "sam-silver-bar-1kg",
    name: "SAM Silver Bar 1 kg",
    metal: "silver",
    category: "silver-bars",
    collection: "sam-precious-metals",
    weightG: 1000,
    weightLabel: "1 kg",
    priceAED: 3850,
    purity: "999",
    serialNumbered: true,
    image: "/images/products/sam-silver-bar-1kg.webp",
    badges: ["UAE refined", "Assay sealed"],
  },
];
