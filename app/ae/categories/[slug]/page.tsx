import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { ProductGrid } from "@/components/store/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { CATEGORIES, getCategory, getProductsByCategory, type CategorySlug } from "@/lib/data";
import { pageMeta, breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

const SEO: Record<CategorySlug, { title: string; description: string; h1: string; intro: string; copy: string[] }> = {
  "gold-bars": {
    title: "Certified Gold Bars in UAE | 1g to 1kg | Prime Gold",
    description:
      "Buy LBMA-certified gold bars in the UAE, from 1g to 1kg. Live AED pricing, serial-numbered, insured storage and safe delivery.",
    h1: "Certified gold bars in the UAE",
    intro:
      "The most direct way to own physical gold, from one-gram wafers to kilo bars, each serial numbered and assay sealed.",
    copy: [
      "Gold bars get you closest to the metal value. You pay a small premium over spot, and that premium shrinks as the bar grows, so a 100 gram bar costs less per gram than ten separate 10 gram bars.",
      "Smaller bars are easy to resell and suit a first purchase. Larger bars store more value in less space and work better for a long hold. Every bar we sell arrives certified, serial numbered, and sealed with its assay card, which is exactly what a buyer or storage provider wants to see later.",
    ],
  },
  "gold-coins": {
    title: "Buy Gold Coins in Dubai & UAE | Prime Gold Bullion",
    description:
      "Buy investment-grade gold coins in Dubai. Certified, live AED pricing, secure storage and insured delivery across the UAE.",
    h1: "Gold bullion coins",
    intro:
      "Mint-guaranteed weight and purity, recognised and traded the world over.",
    copy: [
      "A gold coin carries a mint's guarantee of its weight and purity, which makes it simple to recognise and quick to sell almost anywhere. That liquidity is the reason coins usually cost a little more than a bar of the same weight.",
      "Coins also split a holding into smaller units. If you ever want to sell part of your position rather than a whole bar, coins make that easy, and they make a considered gift.",
    ],
  },
  "silver-bars": {
    title: "Buy Silver Bars in UAE | Certified Silver Bullion | Prime Gold",
    description:
      "Buy certified silver bullion bars in the UAE with live AED pricing, insured storage, and safe delivery. Start investing in silver.",
    h1: "Silver bullion bars",
    intro: "A lower entry point than gold, certified and assay sealed.",
    copy: [
      "Silver costs a fraction of gold per gram, so a silver bar lets you build a position without committing as much capital. It tends to move more sharply than gold in both directions, which suits investors who want some movement alongside a gold core.",
      "Like our gold, every silver bar is certified and assay sealed. Silver does take more room to store for the same value, so plan for that if you intend to hold larger amounts.",
    ],
  },
};

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const seo = SEO[params.slug as CategorySlug];
  if (!seo) return {};
  return pageMeta({ title: seo.title, description: seo.description, path: `/ae/categories/${params.slug}` });
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug as CategorySlug);
  const seo = SEO[params.slug as CategorySlug];
  if (!category || !seo) notFound();

  const products = getProductsByCategory(category.slug);
  const path = `/ae/categories/${category.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/ae" },
            { name: "Store", path: "/ae/store" },
            { name: category.name, path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: category.name,
            description: seo.description,
            url: SITE.origin + path,
          },
          ...products.map((p) => productJsonLd(p, path)),
        ]}
      />

      <PageHero
        image={category.image}
        imageLabel={category.name}
        title={seo.h1}
        intro={seo.intro}
        crumbs={[
          { name: "Home", path: "/ae" },
          { name: "Store", path: "/ae/store" },
          { name: category.name, path },
        ]}
      />

      <section className="pg-container pt-14 pb-6 lg:pt-20 lg:pb-8">
        <ProductGrid products={products} />
      </section>

      <section className="bg-pg-surface pb-20 pt-10 lg:pb-28 lg:pt-12">
        <div className="pg-container">
          <SectionHeading title={`About ${category.name.toLowerCase()}`} />
          <Reveal className="mt-6 max-w-prose space-y-4 text-pretty leading-relaxed text-pg-text-muted">
            {seo.copy.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
