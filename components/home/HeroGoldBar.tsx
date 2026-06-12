"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { TreeOfLife } from "@/components/brand/TreeOfLife";

/**
 * Cinematic gold-bar visual. On a slow auto-cadence the bar lifts (translateY +
 * subtle scale), rotates 180deg on its Y axis to reveal the back face, holds,
 * then settles — like picking up a real bar and turning it over. A specular
 * highlight sweeps across the face as it turns. Static front-only under
 * prefers-reduced-motion.
 *
 * Back face is a designed assay-certificate card (Au 999.9, weight, serial).
 * NOTE: the brief called for a banana-generated Valcambi blister photo here;
 * image generation is unavailable on this machine (no Gemini key / free-tier
 * limit 0), so this is a hand-built, on-brand stand-in with the same elements.
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

        {/* Back face — assay certificate */}
        <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-pg-border-strong shadow-glow [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="relative flex h-full w-full flex-col bg-[linear-gradient(150deg,#f3d18a_0%,#d9a64a_42%,#b8862f_78%,#8a5a23_100%)] p-6 text-pg-ink">
            {/* guilloché hairlines */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.16] bg-[repeating-linear-gradient(135deg,rgba(42,29,12,0.6)_0,rgba(42,29,12,0.6)_1px,transparent_1px,transparent_7px)]"
            />
            {/* tree watermark */}
            <TreeOfLife
              strokeWidth={0.7}
              className="pointer-events-none absolute -bottom-10 -right-8 h-56 w-56 text-pg-ink opacity-[0.12]"
            />

            <div className="relative flex items-center justify-between">
              <span className="font-display text-lg font-semibold tracking-wide">
                PRIME GOLD
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-pg-ink/30">
                <TreeOfLife strokeWidth={1.4} className="h-5 w-5 text-pg-ink" />
              </span>
            </div>

            <div className="relative mt-auto">
              <p className="text-[10px] font-medium uppercase tracking-luxe text-pg-ink/70">
                Assay Certificate
              </p>
              <p className="mt-1 font-display text-4xl font-semibold leading-none">
                Au 999.9
              </p>
              <p className="mt-1.5 text-sm font-medium text-pg-ink/80">
                Fine Gold &middot; 1 oz / 31.1 g
              </p>
            </div>

            <div className="relative mt-5 flex items-end justify-between border-t border-pg-ink/25 pt-3 text-[10px] uppercase tracking-wide text-pg-ink/70">
              <span className="leading-relaxed">
                Serial
                <br />
                <span className="tabular text-pg-ink">PG&middot;0007&middot;AU</span>
              </span>
              <span className="text-right leading-relaxed">
                Swiss refined
                <br />
                LBMA good delivery
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
