"use client";

import { useState } from "react";
import { X, Sparkle } from "@phosphor-icons/react";
import { ANNOUNCEMENT } from "@/lib/site";

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="relative z-50 overflow-hidden border-b border-pg-border bg-pg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-shimmer bg-gold-sheen opacity-30 motion-reduce:hidden"
      />
      <div className="pg-container relative flex h-9 items-center justify-center gap-2 text-center">
        <Sparkle size={13} weight="fill" className="text-pg-accent" />
        <p className="text-[11px] uppercase tracking-luxe text-pg-text-muted">
          {ANNOUNCEMENT}
        </p>
        <button
          onClick={() => setOpen(false)}
          aria-label="Dismiss announcement"
          className="absolute right-4 grid h-5 w-5 place-items-center rounded-full text-pg-text-faint transition-colors hover:text-pg-text"
        >
          <X size={12} weight="bold" />
        </button>
      </div>
    </div>
  );
}
