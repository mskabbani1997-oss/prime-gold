import { CATEGORIES, COLLECTIONS, PRODUCTS } from "./catalog";
import type { CategorySlug, CollectionSlug, Product } from "./types";

export * from "./types";
export { CATEGORIES, COLLECTIONS, PRODUCTS };

/**
 * Single access point for catalog data. Components call these helpers only,
 * so a real API can replace the implementation without touching the UI.
 */

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function getProductsByCollection(slug: CollectionSlug): Product[] {
  return PRODUCTS.filter((p) => p.collection === slug);
}

export function getCategory(slug: CategorySlug) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCollection(slug: CollectionSlug) {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function getFeatured(slug: CollectionSlug, limit = 4): Product[] {
  return getProductsByCollection(slug).slice(0, limit);
}

/** Format an AED amount the way the storefront displays it. */
export function formatAED(amount: number): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * SAMPLE spot prices for the hero ticker. Not live data.
 * Shape matches what a live feed would return so it swaps cleanly.
 */
export const SAMPLE_TICKER = [
  { label: "Gold / oz", value: "AED 9,180", change: 0.42 },
  { label: "Gold / g", value: "AED 295", change: 0.38 },
  { label: "Gold 22K / g", value: "AED 271", change: 0.31 },
  { label: "Silver / oz", value: "AED 118", change: -0.12 },
  { label: "Silver / g", value: "AED 3.80", change: -0.09 },
  { label: "Platinum / oz", value: "AED 3,640", change: 0.21 },
] as const;
