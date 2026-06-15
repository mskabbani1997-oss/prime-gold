import type { Metadata } from "next";
import {
  Mountains,
  Scales,
  ArrowsLeftRight,
  HeartStraight,
  Coins,
  Vault,
  HandCoins,
  ChatsCircle,
  SealCheck,
} from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About Prime Gold | Gold Investment Company in the UAE & MENA",
  description:
    "Prime Gold is a Swiss-standard gold investment platform serving the UAE and the wider MENA region, offering certified bullion, storage, and sellback.",
  path: "/ae/about",
});

const PILLARS = [
  { Icon: Mountains, title: "Swiss-backed gold", body: "Our Valcambi bars leave the refinery serial numbered and LBMA Good Delivery accredited, so any dealer or vault will take them back without question." },
  { Icon: Scales, title: "Compliant and on record", body: "We trade under UAE regulation and keep a clear paper trail for every purchase and sellback. If you ever need the documentation, it is there." },
  { Icon: ArrowsLeftRight, title: "Store it or take it home", body: "Keep your gold with us in insured storage or collect it in person. You can move between the two whenever it suits you." },
  { Icon: HeartStraight, title: "No surprises on price", body: "Premiums are stated before you pay, and your metal stays insured from our vault to your hands." },
];

const SERVICES = [
  { Icon: Coins, title: "Gold purchase", body: "Buy certified bars and coins priced live against the spot market in AED." },
  { Icon: Vault, title: "Storage solutions", body: "Keep your holding in insured, vault-grade storage with full records." },
  { Icon: HandCoins, title: "Sellback and liquidity", body: "Sell your gold back to us when you need to, at fair market value." },
  { Icon: ChatsCircle, title: "Expert guidance", body: "Talk to people who know the market before you commit a single dirham." },
  { Icon: SealCheck, title: "Quality assurance", body: "Every item is serial numbered and arrives with its assay certificate." },
];

const COMMITMENTS = [
  { title: "No hidden fees", body: "What you see is what you pay. Our premiums are stated up front and tied to the live market." },
  { title: "Real metal, real proof", body: "Every holding is physical, certified gold or silver, documented from the refinery to your hands." },
  { title: "Service that lasts", body: "We are here for the sellback as much as the purchase, across the UAE and the wider MENA region." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/ae" },
            { name: "About", path: "/ae/about" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Prime Gold",
            url: SITE.origin + "/ae/about",
            about: { "@type": "Organization", name: SITE.name, areaServed: ["AE", "LB"] },
          },
        ]}
      />

      <PageHero
        image="/images/about-hero.webp"
        imageLabel="Private vault"
        title="Welcome to Prime Gold"
        intro="A Swiss-standard gold investment platform built for investors across the UAE and the wider MENA region."
        crumbs={[
          { name: "Home", path: "/ae" },
          { name: "About", path: "/ae/about" },
        ]}
      />

      {/* Who we are */}
      <section className="pg-container py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading title="Who we are" />
          <Reveal className="max-w-prose space-y-4 text-pretty leading-relaxed text-pg-text-muted">
            <p>
              Prime Gold gives people a straightforward way to own physical gold. We bring
              certified Swiss and regional bullion to the region, price it against the
              spot market with no hidden fees, and stand behind every bar and coin we sell.
            </p>
            <p>
              We run on a Swiss-standard platform and serve clients across the UAE and the
              wider MENA region. Whether you are buying your first gram or holding kilos in insured
              storage, the process is the same: clear pricing, real certification, and
              service that does not disappear after the sale.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why invest */}
      <section className="bg-pg-surface py-14 lg:py-20">
        <div className="pg-container">
          <SectionHeading title="Why invest with us" align="center" />
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map(({ Icon, title, body }) => (
              <RevealItem key={title}>
                <div className="h-full rounded-2xl border border-pg-border bg-pg-card p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-pg-border-strong text-pg-accent">
                    <Icon size={20} weight="light" />
                  </span>
                  <h3 className="mt-5 font-display text-xl text-pg-text">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pg-text-muted">{body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Services */}
      <section className="pg-container py-14 lg:py-20">
        <SectionHeading title="Our services" />
        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ Icon, title, body }) => (
            <RevealItem key={title}>
              <div className="group flex h-full gap-4 rounded-2xl border border-pg-border bg-pg-card p-6 transition-colors hover:border-pg-border-strong">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-pg-border-strong text-pg-accent">
                  <Icon size={20} weight="light" />
                </span>
                <div>
                  <h3 className="font-display text-lg text-pg-text">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-pg-text-muted">{body}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Commitment */}
      <section className="bg-pg-surface py-14 lg:py-20">
        <div className="pg-container">
          <SectionHeading title="Our commitment" align="center" />
          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
            {COMMITMENTS.map((c) => (
              <RevealItem key={c.title}>
                <div className="h-full rounded-2xl border border-pg-border bg-pg-card p-8">
                  <h3 className="font-display text-2xl text-pg-text">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-pg-text-muted">{c.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
