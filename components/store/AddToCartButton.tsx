"use client";

import { useState } from "react";
import { Plus, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/**
 * Add-to-cart control. Presentational stub until the cart backend exists.
 * Gives tactile feedback so the interaction feels complete.
 */
export function AddToCartButton({
  productName,
  className,
}: {
  productName: string;
  className?: string;
}) {
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      aria-label={`Add ${productName} to cart`}
      onClick={() => {
        // TODO: wire to the real cart once the backend exists.
        setAdded(true);
        setTimeout(() => setAdded(false), 1600);
      }}
      className={cn(
        "group/cta relative inline-flex h-11 items-center justify-center gap-1.5 overflow-hidden rounded-full bg-gold-grad px-5 text-xs font-semibold uppercase tracking-wide text-pg-ink shadow-glow transition-all duration-300 ease-luxe hover:shadow-[0_0_0_1px_rgba(205,162,74,0.45),0_14px_50px_-10px_rgba(205,162,74,0.55)] active:scale-[0.97]",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gold-sheen opacity-80 transition-transform duration-[800ms] ease-luxe group-hover/cta:translate-x-full motion-reduce:hidden"
      />
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {added ? (
          <>
            <Check size={14} weight="bold" />
            Added
          </>
        ) : (
          <>
            <Plus size={14} weight="bold" />
            Add to cart
          </>
        )}
      </span>
    </button>
  );
}
