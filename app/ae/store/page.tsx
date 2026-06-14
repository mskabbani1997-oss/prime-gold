import type { Metadata } from "next";
import { StoreView } from "@/components/store/StoreView";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllProducts } from "@/lib/data";
import { pageMeta, breadcrumbJsonLd, itemListJsonLd, productJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Buy Gold Bars & Coins in UAE | Prime Gold Bullion Store",
  description:
    "Shop certified gold and silver bullion in the UAE. Live AED pricing, Valcambi and SAM collections, insured storage and safe delivery.",
  path: "/ae/store",
});

export default function StorePage() {
  const products = getAllProducts();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/ae" },
            { name: "Store", path: "/ae/store" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Prime Gold Bullion Store",
            url: "https://primegoldshop.com/ae/store",
          },
          itemListJsonLd(products, "/ae/store"),
          ...products.map((p) => productJsonLd(p, "/ae/store")),
        ]}
      />

      <section className="pg-container pt-28 lg:pt-32">
        <p className="text-[11px] uppercase tracking-luxe text-pg-text-faint">The store</p>
        <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">
          Buy gold bars and coins in the UAE
        </h1>
        <p className="mt-5 max-w-prose text-pretty leading-relaxed text-pg-text-muted">
          Browse certified gold and silver bullion with honest, spot-linked AED pricing.
          Filter by category, collection, metal, and budget to find the right holding.
        </p>
      </section>

      <StoreView products={products} />
    </>
  );
}
