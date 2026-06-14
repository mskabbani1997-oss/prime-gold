import Link from "next/link";
import { ProductMedia } from "./ProductMedia";
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
        <ProductMedia
          image={product.image}
          revealImage={product.revealImage}
          alt={product.name}
          label={product.metal === "silver" ? "Silver bullion" : "Gold bullion"}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-3.5 sm:gap-3 sm:p-5">
        <h3 className="font-display text-base leading-tight text-pg-panel-ink sm:text-lg">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-pg-panel-muted sm:text-xs">
          <span>{product.weightLabel}</span>
          <span aria-hidden>&middot;</span>
          <span>{product.purity} purity</span>
        </div>

        <div className="mt-auto flex flex-col gap-2.5 pt-1 sm:gap-3 sm:pt-2">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-pg-panel-muted">
              Price
            </p>
            <p className="tabular font-sans text-lg font-semibold text-pg-panel-ink sm:text-xl">
              {formatAED(product.priceAED)}
            </p>
          </div>
          <AddToCartButton productName={product.name} className="w-full" />
        </div>
      </div>
    </article>
  );
}
