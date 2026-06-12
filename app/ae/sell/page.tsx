import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Sell Your Gold in the UAE | Prime Gold Buyback",
  description:
    "Sell your gold back to Prime Gold at fair market value. Quick verification, prompt payment, and clear pricing across the UAE and Lebanon.",
  path: "/ae/sell",
});

export default function SellPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/ae" },
          { name: "Sell", path: "/ae/sell" },
        ])}
      />
      <section className="pg-container flex min-h-[70vh] flex-col justify-center py-28">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-luxe text-pg-text-faint">Buyback</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">
            Sell your gold at fair market value
          </h1>
          <p className="mt-5 max-w-prose text-pretty leading-relaxed text-pg-text-muted">
            We buy back the gold we sell, priced against the live market on the day you
            sell. Bring the item in its sealed packaging with its certificate and we will
            verify it and arrange prompt payment by bank transfer.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/ae/contact" size="lg">
              Start a sellback
              <ArrowRight size={18} weight="bold" />
            </Button>
            <Button href="/ae/faqs" variant="secondary" size="lg">
              Read the FAQs
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
