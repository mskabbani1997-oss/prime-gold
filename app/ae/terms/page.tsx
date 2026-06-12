import type { Metadata } from "next";
import { Legal, LegalSection } from "@/components/legal/Legal";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Terms & Conditions | Prime Gold",
  description:
    "Read the terms and conditions for buying, storing, and selling gold bullion with Prime Gold in the UAE and Lebanon.",
  path: "/ae/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/ae" },
            { name: "Terms & Conditions", path: "/ae/terms" },
          ]),
          { "@context": "https://schema.org", "@type": "WebPage", name: "Terms & Conditions", url: SITE.origin + "/ae/terms" },
        ]}
      />
      <Legal title="Terms and conditions" updated="12 June 2026">
        <LegalSection heading="Introduction">
          <p>
            These terms govern your use of the Prime Gold website and any purchase, storage,
            or sale of bullion through us. By placing an order you agree to them.
          </p>
        </LegalSection>
        <LegalSection heading="Eligibility">
          <p>
            You must be of legal age to enter a binding contract in your country of residence.
            We may ask for identification to meet anti-money-laundering requirements.
          </p>
        </LegalSection>
        <LegalSection heading="Orders and pricing">
          <p>
            Gold and silver prices change throughout the day. The price shown at checkout is
            the price for that order. We confirm your order by email once it is accepted.
          </p>
          <p>
            We may decline or cancel an order where a clear pricing error has occurred, in
            which case any payment is refunded in full.
          </p>
        </LegalSection>
        <LegalSection heading="Payment">
          <p>
            We accept bank transfer and major cards. Title to the metal passes to you once we
            have received cleared payment in full.
          </p>
        </LegalSection>
        <LegalSection heading="Delivery and storage">
          <p>
            You can take insured delivery or hold your metal in insured storage. Risk during
            delivery is covered by insurance until the item reaches you.
          </p>
        </LegalSection>
        <LegalSection heading="Buyback">
          <p>
            We buy back gold we have sold at fair market value on the day of sale. Items in
            their original sealed packaging with the certificate are processed fastest.
          </p>
        </LegalSection>
        <LegalSection heading="Liability">
          <p>
            Bullion prices can rise and fall. Nothing on this site is investment advice, and
            we are not liable for losses arising from changes in the market price of metal.
          </p>
        </LegalSection>
        <LegalSection heading="Governing law">
          <p>
            These terms are governed by the laws of the United Arab Emirates, and the courts
            of Dubai have jurisdiction over any dispute.
          </p>
        </LegalSection>
        <LegalSection heading="Contact">
          <p>
            Questions about these terms can go to {SITE.contact.email} or {SITE.contact.phone}.
          </p>
        </LegalSection>
      </Legal>
    </>
  );
}
