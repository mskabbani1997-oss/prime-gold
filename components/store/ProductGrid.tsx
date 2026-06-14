import { ProductCard } from "./ProductCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Product } from "@/lib/data";
import { cn } from "@/lib/cn";

export function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-pg-border bg-pg-card/50 p-12 text-center">
        <p className="text-pg-text-muted">No products match these filters yet.</p>
      </div>
    );
  }

  return (
    <RevealGroup
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <RevealItem key={product.id}>
          <ProductCard product={product} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
