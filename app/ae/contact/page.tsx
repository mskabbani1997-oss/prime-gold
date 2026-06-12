import type { Metadata } from "next";
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  InstagramLogo,
  XLogo,
  FacebookLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact Prime Gold | Gold Dealer in Dubai, UAE",
  description:
    "Contact Prime Gold in Dubai. Call, email, or visit our Al Ras office for help with buying, storing, or selling certified gold bullion.",
  path: "/ae/contact",
});

const socials = [
  { Icon: InstagramLogo, href: SITE.social.instagram, label: "Instagram" },
  { Icon: XLogo, href: SITE.social.x, label: "X" },
  { Icon: FacebookLogo, href: SITE.social.facebook, label: "Facebook" },
  { Icon: YoutubeLogo, href: SITE.social.youtube, label: "YouTube" },
];

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.origin + "/ae/contact",
  telephone: SITE.contact.phone,
  email: SITE.contact.email,
  image: SITE.origin + "/images/og-default.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.contact.office.line1,
    addressLocality: SITE.contact.office.city,
    addressRegion: "Dubai",
    addressCountry: SITE.contact.office.countryCode,
  },
  areaServed: ["AE", "LB"],
  sameAs: [SITE.social.instagram, SITE.social.x, SITE.social.facebook, SITE.social.youtube],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/ae" },
            { name: "Contact", path: "/ae/contact" },
          ]),
          localBusiness,
          { "@context": "https://schema.org", "@type": "ContactPage", url: SITE.origin + "/ae/contact" },
        ]}
      />

      <section className="pg-container pt-28 lg:pt-32">
        <Reveal>
          <p className="text-[11px] uppercase tracking-luxe text-pg-text-faint">Contact</p>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">
            Talk to a gold specialist
          </h1>
          <p className="mt-5 max-w-prose text-pretty leading-relaxed text-pg-text-muted">
            Questions about buying, storing, or selling gold? Reach us directly, or send a
            message and we will get back to you.
          </p>
        </Reveal>
      </section>

      <section className="pg-container grid gap-10 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
        <Reveal className="flex flex-col gap-8">
          <div className="space-y-5">
            <a
              href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`}
              className="group flex items-center gap-4"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-pg-border-strong text-pg-accent transition-colors group-hover:border-pg-rose">
                <Phone size={20} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-pg-text-faint">Call</span>
                <span className="text-pg-text">{SITE.contact.phone}</span>
              </span>
            </a>
            <a href={`mailto:${SITE.contact.email}`} className="group flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-pg-border-strong text-pg-accent transition-colors group-hover:border-pg-rose">
                <EnvelopeSimple size={20} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-pg-text-faint">Email</span>
                <span className="text-pg-text">{SITE.contact.email}</span>
              </span>
            </a>
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-pg-border-strong text-pg-accent">
                <MapPin size={20} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-pg-text-faint">
                  Dubai office
                </span>
                <span className="text-pg-text">{SITE.contact.office.company}</span>
                <span className="block text-sm text-pg-text-muted">
                  {SITE.contact.office.line1}, {SITE.contact.office.area}, {SITE.contact.office.city},{" "}
                  {SITE.contact.office.country}
                </span>
              </span>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-wide text-pg-text-faint">Follow</p>
            <div className="flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-pg-border text-pg-text-muted transition-all hover:border-pg-rose hover:text-pg-text"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
