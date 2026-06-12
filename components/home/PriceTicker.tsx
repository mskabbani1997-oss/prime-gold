"use client";

import { CaretUp, CaretDown } from "@phosphor-icons/react";
import { SAMPLE_TICKER } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * Horizontal price ticker. Sample data, swappable for a live feed.
 * Loops seamlessly, pauses on hover, and wraps statically under reduced motion.
 */
export function PriceTicker({ className }: { className?: string }) {
  const items = [...SAMPLE_TICKER, ...SAMPLE_TICKER];

  return (
    <div
      className={cn(
        "group relative overflow-hidden border-y border-pg-border bg-pg-surface/50 backdrop-blur-sm",
        className
      )}
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-pg-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-pg-bg to-transparent" />

      <ul
        aria-hidden
        className="flex w-max animate-marquee items-center gap-10 py-3.5 group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center"
      >
        {items.map((item, i) => {
          const up = item.change >= 0;
          return (
            <li key={i} className="flex items-center gap-2.5 whitespace-nowrap">
              <span className="text-[11px] uppercase tracking-wide text-pg-text-faint">
                {item.label}
              </span>
              <span className="tabular text-sm font-medium text-pg-text">{item.value}</span>
              <span
                className={cn(
                  "tabular inline-flex items-center gap-0.5 text-xs",
                  up ? "text-pg-positive" : "text-pg-negative"
                )}
              >
                {up ? <CaretUp size={11} weight="fill" /> : <CaretDown size={11} weight="fill" />}
                {Math.abs(item.change).toFixed(2)}%
              </span>
              <span aria-hidden className="text-pg-border-strong">
                /
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
