"use client";

import { useState } from "react";
import { PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";

const SUBJECTS = [
  "Buying gold",
  "Selling gold",
  "Storage and delivery",
  "Account help",
  "Something else",
];

const fieldClass =
  "h-12 w-full rounded-xl border border-pg-border bg-pg-card/60 px-4 text-sm text-pg-text placeholder:text-pg-text-faint transition-colors duration-300 focus:border-pg-rose focus:outline-none focus:ring-2 focus:ring-pg-glow";
const labelClass = "mb-2 block text-xs uppercase tracking-wide text-pg-text-muted";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to the real contact endpoint once the backend exists.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-pg-border bg-pg-card p-10 text-center">
        <CheckCircle size={40} weight="fill" className="text-pg-positive" />
        <h3 className="font-display text-2xl text-pg-text">Message received</h3>
        <p className="max-w-sm text-sm text-pg-text-muted">
          Thank you. A member of our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-pg-border bg-pg-card p-6 md:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label htmlFor="subject" className={labelClass}>
            Subject
          </label>
          <select id="subject" required defaultValue="" className={`${fieldClass} cursor-pointer`}>
            <option value="" disabled>
              Select a subject
            </option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s} className="bg-pg-card">
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input id="name" type="text" required placeholder="Your full name" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input id="phone" type="tel" placeholder="+971 ..." className={fieldClass} />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" type="email" required placeholder="you@example.com" className={fieldClass} />
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            placeholder="How can we help?"
            className={`${fieldClass} h-auto resize-none py-3`}
          />
        </div>

        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Send message
          <PaperPlaneTilt size={16} weight="fill" />
        </Button>
      </div>
    </form>
  );
}
