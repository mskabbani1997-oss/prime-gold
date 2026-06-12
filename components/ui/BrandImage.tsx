import Image from "next/image";
import { cn } from "@/lib/cn";

interface BrandImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Accepted for call-site clarity; not rendered. */
  label?: string;
}

/**
 * Brand image wrapper around next/image. Optimizes to WebP/AVIF and serves the
 * right size per breakpoint. Client-safe (no server-only APIs) so it can render
 * inside interactive components like the store grid.
 */
export function BrandImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
}: BrandImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-pg-card", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
