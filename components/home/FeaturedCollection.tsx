import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { BrandImage } from "@/components/ui/BrandImage";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/store/ProductCard";
import type { Collection, Product } from "@/lib/data";

/**
 * Featured collection band. Two layouts so consecutive collections on the
 * homepage do not read as the same section (taste rule: no layout repeats).
 */
export function FeaturedCollection({
  collection,
  products,
  layout = "split",
}: {
  collection: Collection;
  products: Product[];
  layout?: "split" | "banner";
}) {
  const href = `/ae/collections/${collection.slug}`;
  const items = products.slice(0, 4);

  const story = (
    <div>
      <p className="text-[11px] uppercase tracking-luxe text-pg-text-faint">
        Featured collection
      </p>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">
        {collection.name}
      </h2>
      <p className="mt-4 max-w-md leading-relaxed text-pg-text-muted">{collection.story}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {collection.signals.map((s) => (
          <Badge key={s} icon>
            {s}
          </Badge>
        ))}
      </div>
      <Link
        href={href}
        className="group mt-7 inline-flex items-center gap-2 text-sm text-pg-accent transition-colors hover:text-pg-champagne"
      >
        Explore {collection.name}
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );

  if (layout === "banner") {
    return (
      <section className="pg-container py-24 lg:py-36">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-pg-border">
            <BrandImage
              src={collection.image}
              alt={collection.name}
              label={collection.name}
              sizes="100vw"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pg-bg via-pg-bg/80 to-pg-bg/30" />
            <div className="relative max-w-lg p-8 md:p-14">{story}</div>
          </div>
        </Reveal>
        <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {items.map((p) => (
            <Reveal key={p.id}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="pg-container py-24 lg:py-36">
      <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-pg-border">
            <BrandImage
              src={collection.image}
              alt={collection.name}
              label={collection.name}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pg-bg/70 to-transparent" />
          </div>
        </Reveal>
        <div>
          <Reveal>{story}</Reveal>
          <div className="mt-8 grid grid-cols-2 gap-5">
            {items.slice(0, 2).map((p) => (
              <Reveal key={p.id}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
