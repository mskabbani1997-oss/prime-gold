import { Hero } from "@/components/home/Hero";
import { TrustPillars } from "@/components/home/TrustPillars";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { BrandStatement } from "@/components/home/BrandStatement";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { getCollection, getFeatured } from "@/lib/data";

export default function HomePage() {
  const valcambi = getCollection("valcambi")!;
  const sam = getCollection("sam-precious-metals")!;

  return (
    <>
      <Hero />
      <TrustPillars />
      <CategoryShowcase />
      <FeaturedCollection
        collection={valcambi}
        products={getFeatured("valcambi", 2)}
        layout="split"
      />
      <hr className="pg-rule pg-container" />
      <FeaturedCollection
        collection={sam}
        products={getFeatured("sam-precious-metals", 4)}
        layout="banner"
      />
      <BrandStatement />
      <NewsletterSection />
    </>
  );
}
