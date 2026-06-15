"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import type { Faq } from "@/lib/faqs";
import { cn } from "@/lib/cn";

/** Accordion with smooth height animation. One item open at a time per group. */
export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="border-y border-pg-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={cn(i > 0 && "border-t border-pg-border")}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-pg-text"
              >
                <span className="font-display text-lg text-pg-text">{item.q}</span>
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-pg-border-strong text-pg-accent transition-transform duration-300 ease-luxe",
                    isOpen && "rotate-45"
                  )}
                >
                  <Plus size={15} weight="bold" />
                </span>
              </button>
            </h3>
            {/* The answer is always rendered in the DOM (server-side included) so
                search engines can read it; it is only visually collapsed when
                closed. */}
            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="max-w-prose pb-5 pr-10 leading-relaxed text-pg-text-muted">
                {item.a}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
