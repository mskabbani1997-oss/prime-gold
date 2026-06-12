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
        "inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-pg-border-strong bg-pg-card/60 px-4 text-xs font-medium text-pg-text transition-all duration-300 ease-luxe hover:border-pg-rose hover:bg-pg-card-hover active:scale-[0.97]",
        className
      )}
    >
      {added ? (
        <>
          <Check size={14} weight="bold" className="text-pg-positive" />
          Added
        </>
      ) : (
        <>
          <Plus size={14} weight="bold" />
          Add to cart
        </>
      )}
    </button>
  );
}
