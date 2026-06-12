export type Metal = "gold" | "silver";

export type CategorySlug = "gold-bars" | "gold-coins" | "silver-bars";

export type CollectionSlug = "valcambi" | "sam-precious-metals";

export interface Product {
  id: string;
  slug: string;
  name: string;
  metal: Metal;
  category: CategorySlug;
  collection: CollectionSlug;
  /** Weight in grams, used for sorting and filtering. */
  weightG: number;
  /** Human label, e.g. "10 g", "1 oz". */
  weightLabel: string;
  /**
   * Sample price in AED. NOT live market data.
   * Replace lib/data with a real pricing API and these values disappear.
   */
  priceAED: number;
  purity: string;
  serialNumbered: boolean;
  /** Path under /public/images. Falls back to the category image until a product shot exists. */
  image: string;
  badges: string[];
}

export interface Category {
  slug: CategorySlug;
  name: string;
  metal: Metal;
  image: string;
  intro: string;
}

export interface Collection {
  slug: CollectionSlug;
  name: string;
  image: string;
  story: string;
  signals: string[];
}
