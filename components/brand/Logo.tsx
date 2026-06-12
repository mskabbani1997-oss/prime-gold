import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Prime Gold logo. /pg-logo.svg is the complete brand lockup (tree mark +
 * wordmark), used exactly as supplied — no separate text alongside it.
 * Intrinsic ratio 168.71 x 37.93; rendered at h-9 (w-auto keeps the ratio),
 * which sits cleanly inside the 72px nav.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/ae"
      aria-label="Prime Gold home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/pg-logo.svg"
        alt="Prime Gold"
        width={169}
        height={38}
        priority
        className="h-9 w-auto"
      />
    </Link>
  );
}
