"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";

/** Email capture. Submits to a stub until a backend exists. */
export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to the real subscribe endpoint once the backend exists.
    setDone(true);
  }

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm text-pg-positive">
        <CheckCircle size={18} weight="fill" />
        You are on the list. Watch your inbox for market notes.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <label htmlFor={compact ? "nl-footer" : "nl-main"} className="sr-only">
          Email address
        </label>
        <input
          id={compact ? "nl-footer" : "nl-main"}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-12 w-full rounded-full border border-pg-border bg-pg-card/60 px-5 text-sm text-pg-text placeholder:text-pg-text-faint transition-colors duration-300 focus:border-pg-rose focus:outline-none focus:ring-2 focus:ring-pg-glow"
        />
      </div>
      <Button type="submit" size="md" className="shrink-0">
        Subscribe
        <ArrowRight size={16} weight="bold" />
      </Button>
    </form>
  );
}
