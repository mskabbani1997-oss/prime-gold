import { ProductCard } from "./ProductCard";
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

  // Plain grid (same approach as the store): every product is in the static DOM
  // and always visible. The previous whileInView reveal could leave a tall grid
  // (e.g. 22 products, 2 columns at tablet width) stuck at opacity 0 when the
  // container was taller than the viewport could ever satisfy its trigger amount.
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
