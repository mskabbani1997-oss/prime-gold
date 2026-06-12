import type { Metadata } from "next";
import { SITE } from "./site";
import { formatAED, type Product } from "./data";

/** Build per-page metadata with an absolute title (bypasses the layout template). */
export function pageMeta({
  title,
  description,
  path,
  image = "/images/og-default.webp",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title,
      description,
      url: path,
      locale: "en_AE",
      images: [{ url: image, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: SITE.origin + it.path,
    })),
  };
}

/**
 * Product schema. priceValidUntil is intentionally short because pricing tracks
 * the spot market. Prices here come from the sample data layer; wire to live
 * pricing before launch so the markup matches what the page renders.
 */
export function productJsonLd(product: Product, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: `${product.weightLabel} ${product.metal} bullion, ${product.purity} purity${
      product.serialNumbered ? ", serial numbered" : ""
    }.`,
    sku: product.id,
    category: product.metal === "silver" ? "Silver bullion" : "Gold bullion",
    image: SITE.origin + product.image,
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      price: product.priceAED,
      availability: "https://schema.org/InStock",
      url: SITE.origin + path,
    },
  };
}

export function itemListJsonLd(products: Product[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${SITE.origin}${path}?product=${p.slug}`,
    })),
  };
}

export { formatAED };
