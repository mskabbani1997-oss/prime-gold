import { Reveal } from "@/components/ui/Reveal";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

export function NewsletterSection() {
  return (
    <section className="pg-container py-24 lg:py-36">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-pg-border bg-pg-card px-7 py-16 text-center shadow-card md:px-16 md:py-20">
          <div className="relative mx-auto max-w-xl">
            <h2 className="text-balance font-display text-3xl font-semibold leading-tight md:text-5xl">
              Stay ahead in the gold market
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-pg-text-muted">
              Concise market notes and new releases, sent only when there is something
              worth your attention.
            </p>
            <div className="mx-auto mt-8 max-w-md">
              <NewsletterForm />
            </div>
            <p className="mt-4 text-xs text-pg-text-faint">
              No noise. Unsubscribe whenever you like.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
