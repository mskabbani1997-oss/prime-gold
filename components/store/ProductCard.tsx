import Link from "next/link";
import { BrandImage } from "@/components/ui/BrandImage";
import { AddToCartButton } from "./AddToCartButton";
import { formatAED, type Product } from "@/lib/data";
import { cn } from "@/lib/cn";

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
        "group flex flex-col overflow-hidden rounded-2xl border border-pg-border bg-pg-card shadow-card transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-pg-border-strong hover:shadow-card-hover",
        className
      )}
    >
      <Link
        href={`/ae/store?product=${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden"
        aria-label={product.name}
      >
        <BrandImage
          src={product.image}
          alt={product.name}
          label={product.metal === "silver" ? "Silver bullion" : "Gold bullion"}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="absolute inset-0"
          imgClassName="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.07]"
        />
        {product.serialNumbered && (
          <span className="absolute left-3 top-3 rounded-full border border-pg-border-strong bg-pg-bg/70 px-2.5 py-1 text-[10px] uppercase tracking-wide text-pg-text-muted backdrop-blur-sm">
            Serial numbered
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-tight text-pg-text">
            {product.name}
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-pg-text-faint">
          <span>{product.weightLabel}</span>
          <span aria-hidden>&middot;</span>
          <span>{product.purity} purity</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-pg-text-faint">
              Price
            </p>
            <p className="tabular font-sans text-xl font-semibold text-pg-text">
              {formatAED(product.priceAED)}
            </p>
          </div>
          <AddToCartButton productName={product.name} />
        </div>
      </div>
    </article>
  );
}
