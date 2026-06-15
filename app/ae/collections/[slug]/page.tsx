import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { ProductGrid } from "@/components/store/ProductGrid";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  COLLECTIONS,
  getCollection,
  getProductsByCollection,
  type CollectionSlug,
} from "@/lib/data";
import { pageMeta, breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

const SEO: Record<CollectionSlug, { title: string; description: string }> = {
  valcambi: {
    title: "Valcambi Suisse Gold Bars in UAE | Prime Gold",
    description:
      "Buy Valcambi Suisse gold bars in the UAE. LBMA-approved, Swiss-made, serial-numbered, with live AED pricing and insured delivery.",
  },
  "sam-precious-metals": {
    title: "SAM Precious Metals Gold | Prime Gold UAE",
    description:
      "Buy SAM Precious Metals gold bullion in the UAE. Certified, regionally trusted, with live AED pricing and insured delivery.",
  },
};

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const seo = SEO[params.slug as CollectionSlug];
  if (!seo) return {};
  return pageMeta({ title: seo.title, description: seo.description, path: `/ae/collections/${params.slug}` });
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = getCollection(params.slug as CollectionSlug);
  const seo = SEO[params.slug as CollectionSlug];
  if (!collection || !seo) notFound();

  const products = getProductsByCollection(collection.slug);
  const path = `/ae/collections/${collection.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/ae" },
            { name: "Store", path: "/ae/store" },
            { name: collection.name, path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: collection.name,
            description: seo.description,
            url: SITE.origin + path,
            about: { "@type": "Brand", name: collection.name },
          },
          ...products.map((p) => productJsonLd(p, path)),
        ]}
      />

      <PageHero
        image={collection.image}
        imageLabel={collection.name}
        title={collection.name}
        intro={collection.story}
        crumbs={[
          { name: "Home", path: "/ae" },
          { name: "Store", path: "/ae/store" },
          { name: collection.name, path },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          {collection.signals.map((s) => (
            <Badge key={s} icon>
              {s}
            </Badge>
          ))}
        </div>
      </PageHero>

      <section className="pg-container py-16 lg:py-24">
        <ProductGrid products={products} />
      </section>
    </>
  );
}
