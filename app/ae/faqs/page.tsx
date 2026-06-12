import type { Metadata } from "next";
import { Accordion } from "@/components/faqs/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_CATEGORIES } from "@/lib/faqs";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Gold Buying FAQs | How to Buy Gold in the UAE | Prime Gold",
  description:
    "Answers on how to buy gold in the UAE, selling your gold back, privacy, storage, and delivery. Everything to know before you invest.",
  path: "/ae/faqs",
});

// FAQPage schema lives only on this page.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
    cat.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

export default function FaqsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/ae" },
            { name: "FAQs", path: "/ae/faqs" },
          ]),
          faqSchema,
        ]}
      />

      <section className="pg-container pt-28 lg:pt-32">
        <Reveal>
          <p className="text-[11px] uppercase tracking-luxe text-pg-text-faint">FAQs</p>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">
            Everything to know before you invest
          </h1>
          <p className="mt-5 max-w-prose text-pretty leading-relaxed text-pg-text-muted">
            Clear answers on buying, selling, storage, delivery, and privacy. If something
            is not covered here, our team is one call away.
          </p>
        </Reveal>
      </section>

      <section className="pg-container py-14 lg:py-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-14">
          {FAQ_CATEGORIES.map((cat) => (
            <Reveal key={cat.title}>
              <h2 className="mb-2 font-display text-2xl text-pg-text md:text-3xl">{cat.title}</h2>
              <Accordion items={cat.items} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
