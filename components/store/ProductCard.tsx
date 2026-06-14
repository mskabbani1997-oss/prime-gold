import Link from "next/link";
import { BrandImage } from "@/components/ui/BrandImage";
import { AddToCartButton } from "./AddToCartButton";
import { formatAED, type Product } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * Product card — light panel (gold reads best on light cards) sitting on the
 * navy theme. Beauty treatment: gentle float + lift on hover, soft image zoom.
 */
export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-pg-panel-border bg-pg-panel-card text-pg-panel-ink shadow-panel transition-all duration-500 ease-luxe hover:-translate-y-1.5 hover:shadow-panel-hover",
        className
      )}
    >
      <Link
        href={`/ae/store?product=${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-pg-panel"
        aria-label={product.name}
      >
        <BrandImage
          src={product.image}
          alt={product.name}
          label={product.metal === "silver" ? "Silver bullion" : "Gold bullion"}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="absolute inset-0"
          imgClassName="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.06]"
        />
        {product.serialNumbered && (
          <span className="absolute left-3 top-3 rounded-full border border-pg-border-strong bg-pg-ink/70 px-2.5 py-1 text-[10px] uppercase tracking-wide text-pg-text backdrop-blur-sm">
            Serial numbered
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <h3 className="font-display text-lg leading-tight text-pg-panel-ink">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 text-xs text-pg-panel-muted">
          <span>{product.weightLabel}</span>
          <span aria-hidden>&middot;</span>
          <span>{product.purity} purity</span>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-pg-panel-muted">
              Price
            </p>
            <p className="tabular font-sans text-xl font-semibold text-pg-panel-ink">
              {formatAED(product.priceAED)}
            </p>
          </div>
          <AddToCartButton productName={product.name} className="w-full" />
        </div>
      </div>
    </article>
  );
}
