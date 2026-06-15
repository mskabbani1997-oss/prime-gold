import type { Metadata } from "next";
import {
  ArrowRight,
  Package,
  SealCheck,
  Bank,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Sell Your Gold in the UAE | Prime Gold Buyback",
  description:
    "Sell your gold back to Prime Gold at fair market value. Quick verification, prompt payment, and clear pricing across the UAE and the wider MENA region.",
  path: "/ae/sell",
});

const STEPS = [
  {
    Icon: Package,
    step: "01",
    title: "Bring your item",
    body: "Bring your gold in its sealed packaging with the assay certificate to our Dubai office, or arrange a collection with our team.",
  },
  {
    Icon: SealCheck,
    step: "02",
    title: "We verify",
    body: "We check the serial number, weight, and certificate, then price the piece against the live market on the day you sell.",
  },
  {
    Icon: Bank,
    step: "03",
    title: "Bank transfer",
    body: "Once it is verified, we settle promptly by bank transfer at fair market value. No haggling, no hidden cuts.",
  },
];

export default function SellPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/ae" },
          { name: "Sell", path: "/ae/sell" },
        ])}
      />
      <section className="pg-container flex min-h-[60vh] flex-col justify-center py-24 lg:py-28">
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

      {/* How sellback works */}
      <section className="bg-pg-surface py-20 lg:py-28">
        <div className="pg-container">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps from item to payment"
            intro="A straightforward buyback with no surprises. Most sellbacks are settled the same day."
          />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map(({ Icon, step, title, body }) => (
              <RevealItem key={step}>
                <div className="group h-full rounded-2xl border border-pg-border bg-pg-card p-7 transition-colors hover:border-pg-border-strong">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-pg-border-strong text-pg-accent">
                      <Icon size={20} weight="light" />
                    </span>
                    <span className="font-display text-3xl text-pg-border-strong">
                      {step}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl text-pg-text">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pg-text-muted">{body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-12">
            <Button href="/ae/contact" size="lg">
              Start a sellback
              <ArrowRight size={18} weight="bold" />
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
