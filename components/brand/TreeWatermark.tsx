import { LogoTreeMark } from "./LogoTreeMark";
import { cn } from "@/lib/cn";

/**
 * Atmospheric watermark built from the EXACT Prime Gold logo tree mark
 * (see LogoTreeMark, paths lifted from public/pg-logo.svg). Scaled large and
 * tinted at low opacity so the real emblem radiates behind hero/footer content
 * as brand texture. Decorative only (aria-hidden, non-interactive).
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
      <LogoTreeMark className={cn("h-full w-full text-pg-antique", opacity)} />
    </div>
  );
}
