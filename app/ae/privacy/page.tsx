import type { Metadata } from "next";
import { Legal, LegalSection } from "@/components/legal/Legal";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy | Prime Gold",
  description:
    "How Prime Gold collects, uses, and protects your personal data when you buy and store gold bullion with us.",
  path: "/ae/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/ae" },
            { name: "Privacy Policy", path: "/ae/privacy" },
          ]),
          { "@context": "https://schema.org", "@type": "WebPage", name: "Privacy Policy", url: SITE.origin + "/ae/privacy" },
        ]}
      />
      <Legal title="Privacy policy" updated="12 June 2026">
        <LegalSection heading="Introduction">
          <p>
            This policy explains what personal data Prime Gold collects, why we collect it,
            and how we protect it. We keep the data we hold to the minimum we need.
          </p>
        </LegalSection>
        <LegalSection heading="Data we collect">
          <p>
            We collect your name, contact details, and payment information when you place an
            order, along with any identification needed to meet legal requirements.
          </p>
        </LegalSection>
        <LegalSection heading="How we use your data">
          <p>
            We use your data to process orders, arrange storage and delivery, provide support,
            and meet our legal obligations. We do not use it for anything you have not agreed to.
          </p>
        </LegalSection>
        <LegalSection heading="Sharing">
          <p>
            We do not sell your data. We share it only with the partners needed to fulfil your
            order, such as payment processors and delivery providers, under their own duties of
            confidentiality.
          </p>
        </LegalSection>
        <LegalSection heading="Cookies">
          <p>
            We use essential cookies to run the site and basic analytics to understand how it is
            used so we can improve it. You can control cookies through your browser settings.
          </p>
        </LegalSection>
        <LegalSection heading="Security">
          <p>
            We use industry-standard measures to protect your data and limit access to staff who
            need it to do their work.
          </p>
        </LegalSection>
        <LegalSection heading="Your rights">
          <p>
            You can ask to see the data we hold about you, correct it, or have it deleted. Contact
            us and we will respond within the limits of the law.
          </p>
        </LegalSection>
        <LegalSection heading="Retention">
          <p>
            We keep your data only as long as needed for the purpose it was collected or as the
            law requires, then remove it securely.
          </p>
        </LegalSection>
        <LegalSection heading="Contact">
          <p>
            For any privacy question, write to {SITE.contact.email} or call {SITE.contact.phone}.
          </p>
        </LegalSection>
      </Legal>
    </>
  );
}
