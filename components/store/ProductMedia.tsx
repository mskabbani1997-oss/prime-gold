"use client";

import { useRef, useState } from "react";
import { BrandImage } from "@/components/ui/BrandImage";
import { cn } from "@/lib/cn";

/**
 * Product media with a packaging reveal: the primary product shot, with the
 * second image (packaging / assay card) revealed on hover (desktop, via mouse
 * events) or a horizontal swipe (mobile, via touch). No-op when there's no
 * reveal image. Mouse and touch handlers don't both fire on the same device,
 * so the two interactions stay cleanly separated.
 */
export function ProductMedia({
  image,
  revealImage,
  alt,
  sizes,
  label,
}: {
  image: string;
  revealImage?: string;
  alt: string;
  sizes?: string;
  label?: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const startX = useRef<number | null>(null);
  const hasReveal = Boolean(revealImage);

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => hasReveal && setRevealed(true)}
      onMouseLeave={() => hasReveal && setRevealed(false)}
      onTouchStart={(e) => {
        startX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (!hasReveal || startX.current == null) return;
        const dx = (e.changedTouches[0]?.clientX ?? startX.current) - startX.current;
        if (Math.abs(dx) > 40) setRevealed((v) => !v);
        startX.current = null;
      }}
    >
      <BrandImage
        src={image}
        alt={alt}
        label={label}
        sizes={sizes}
        className={cn(
          "absolute inset-0 bg-transparent transition-opacity duration-500 ease-luxe",
          revealed && hasReveal ? "opacity-0" : "opacity-100"
        )}
        imgClassName="object-contain p-5"
      />
      {hasReveal && (
        <BrandImage
          src={revealImage as string}
          alt={`${alt} — packaging`}
          sizes={sizes}
          className={cn(
            "absolute inset-0 bg-transparent transition-opacity duration-500 ease-luxe",
            revealed ? "opacity-100" : "opacity-0"
          )}
          imgClassName="object-contain p-5"
        />
      )}
      {hasReveal && (
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-pg-ink/70 px-2 py-1 text-[9px] uppercase tracking-wide text-pg-text backdrop-blur-sm sm:hidden">
          Swipe
        </span>
      )}
    </div>
  );
}
