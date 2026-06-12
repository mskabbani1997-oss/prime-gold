"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Cinematic gold-bar visual. On a slow auto-cadence the bar lifts (translateY +
 * subtle scale), rotates 180deg on its Y axis to reveal the back face, holds,
 * then settles — like picking up a real bar and turning it over. A specular
 * highlight sweeps across the face as it turns. Static front-only under
 * prefers-reduced-motion.
 *
 * Back face is the photoreal Valcambi assay-certificate blister, generated via
 * the banana/Gemini Nano Banana 2 pipeline (public/images/hero-bar-back.webp).
 */
export function HeroGoldBar({
  front,
  className,
}: {
  front: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const cycle = {
    rotateY: [0, 0, 180, 180, 0],
    y: [0, -26, -26, -26, 0],
    scale: [1, 1.05, 1.05, 1.05, 1],
  };
  const transition = {
    duration: 9,
    times: [0, 0.18, 0.42, 0.78, 1],
    ease: "easeInOut" as const,
    repeat: Infinity,
    repeatDelay: 1.2,
  };

  return (
    <div className={cn("relative [perspective:1600px]", className)}>
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ transformStyle: "preserve-3d" }}
        animate={reduce ? undefined : cycle}
        transition={reduce ? undefined : transition}
      >
        {/* Front face — the gold bar passed in from the hero */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          {front}
          {!reduce && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[1.75rem] mix-blend-screen"
              style={{
                background:
                  "linear-gradient(115deg, transparent 35%, rgba(255,250,235,0.6) 50%, transparent 65%)",
              }}
              animate={{
                x: ["-60%", "60%", "60%", "-60%", "-60%"],
                opacity: [0, 0.9, 0.35, 0.9, 0],
              }}
              transition={transition}
            />
          )}
        </div>

        {/* Back face — photoreal Valcambi assay certificate blister */}
        <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-pg-border-strong shadow-glow [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Image
            src="/images/products/hero-bar-back.webp"
            alt="Valcambi Suisse assay certificate — 1 oz fine gold, Au 999.9"
            fill
            sizes="(max-width: 1024px) 340px, 400px"
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
