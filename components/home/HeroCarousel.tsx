"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

export interface CarouselItem {
  image: string;
  name: string;
  weightLabel: string;
}

/**
 * 3D depth product carousel. The active product sits center, large and sharp;
 * neighbours shrink and blur to the sides; anything further back is ghosted out.
 * All roles crossfade together (~650ms) as the active index changes. Arrows
 * navigate; a gentle auto-advance runs unless reduced motion is requested.
 */
export function HeroCarousel({
  items,
  className,
}: {
  items: CarouselItem[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = items.length;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const on = () => setIsMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (reduce || paused || n <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), 2600);
    return () => clearInterval(id);
  }, [reduce, paused, n]);

  const go = (dir: number) => setActive((a) => (a + dir + n) % n);

  // signed distance from the active item, wrapped to the shortest direction
  const rel = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const spread = isMobile ? 104 : 250;
  const ease = [0.4, 0, 0.2, 1] as const;

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-full w-full [perspective:1600px]">
        {items.map((it, i) => {
          const d = rel(i);
          const abs = Math.abs(d);
          const visible = abs <= 2;
          // strong center emphasis: the active product pops forward (>1) and
          // sharp; neighbours shrink + blur hard for dramatic depth.
          const scale = d === 0 ? 1.18 : abs === 1 ? 0.6 : 0.42;
          const blur = d === 0 ? 0 : abs === 1 ? 5 : 9;
          const opacity = !visible ? 0 : d === 0 ? 1 : abs === 1 ? 0.5 : 0.22;
          const x = d * spread;
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{ zIndex: 100 - abs }}
              initial={false}
              animate={{
                x: `calc(-50% + ${x}px)`,
                y: "-50%",
                scale,
                opacity,
                filter: `blur(${blur}px)`,
              }}
              transition={{ duration: reduce ? 0 : 0.65, ease }}
            >
              <div
                className={cn(
                  "relative aspect-[4/5] w-[180px] sm:w-[240px] lg:w-[290px]",
                  d !== 0 && "pointer-events-none"
                )}
              >
                <Image
                  src={it.image}
                  alt={it.name}
                  fill
                  sizes="(max-width: 640px) 180px, 290px"
                  priority={i === 0}
                  className={cn(
                    "object-contain",
                    d === 0
                      ? "drop-shadow-[0_45px_75px_rgba(0,0,0,0.72)]"
                      : "drop-shadow-[0_18px_38px_rgba(0,0,0,0.5)]"
                  )}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Previous product"
        onClick={() => go(-1)}
        className="absolute left-0 top-1/2 z-[120] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-pg-border-strong bg-pg-card/60 text-pg-text backdrop-blur-sm transition-colors duration-300 hover:border-pg-accent hover:text-pg-accent"
      >
        <CaretLeft size={18} weight="bold" />
      </button>
      <button
        type="button"
        aria-label="Next product"
        onClick={() => go(1)}
        className="absolute right-0 top-1/2 z-[120] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-pg-border-strong bg-pg-card/60 text-pg-text backdrop-blur-sm transition-colors duration-300 hover:border-pg-accent hover:text-pg-accent"
      >
        <CaretRight size={18} weight="bold" />
      </button>

      <div className="absolute -bottom-1 left-1/2 z-[120] -translate-x-1/2 whitespace-nowrap text-center">
        <motion.p
          key={active}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="font-display text-base text-pg-navy-text sm:text-lg"
        >
          {items[active]?.name}
        </motion.p>
      </div>
    </div>
  );
}
