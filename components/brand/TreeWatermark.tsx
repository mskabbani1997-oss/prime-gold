import { TreeOfLife } from "./TreeOfLife";
import { cn } from "@/lib/cn";

/**
 * Atmospheric tree-of-life watermark. Renders the vector logo tree large and
 * soft so it radiates outward as brand texture rather than a hard illustration.
 *
 * It draws the vector (not a baked dark-field texture) so it sits correctly on
 * the warm light palette at any opacity — a screen-blended bitmap would vanish
 * on cream. Decorative only (aria-hidden, non-interactive).
 */
export function TreeWatermark({
  className,
  opacity = "opacity-[0.07]",
}: {
  className?: string;
  /** Tailwind opacity utility; tune per surface so it stays subtle. */
  opacity?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute select-none", className)}
    >
      <TreeOfLife
        strokeWidth={0.7}
        className={cn("h-full w-full text-pg-antique", opacity)}
      />
    </div>
  );
}
