import Link from "next/link";
import {
  InstagramLogo,
  XLogo,
  FacebookLogo,
  YoutubeLogo,
  Phone,
  EnvelopeSimple,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/Logo";
import { TreeWatermark } from "@/components/brand/TreeWatermark";
import { NewsletterForm } from "./NewsletterForm";
import { FOOTER_SECTIONS, SITE } from "@/lib/site";

const socials = [
  { Icon: InstagramLogo, href: SITE.social.instagram, label: "Instagram" },
  { Icon: XLogo, href: SITE.social.x, label: "X" },
  { Icon: FacebookLogo, href: SITE.social.facebook, label: "Facebook" },
  { Icon: YoutubeLogo, href: SITE.social.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-pg-border bg-pg-surface">
      <TreeWatermark className="-right-24 -top-28 h-[520px] w-[520px]" />

      <div className="pg-container relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-pg-text-muted">
              Certified gold and silver bullion for investors across the UAE and
              Lebanon. Transparent pricing, insured storage, and safe delivery.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 text-sm text-pg-text-muted">
              <a href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 transition-colors hover:text-pg-text">
                <Phone size={16} className="text-pg-accent" />
                {SITE.contact.phone}
              </a>
              <a href={`mailto:${SITE.contact.email}`} className="flex items-center gap-2.5 transition-colors hover:text-pg-text">
                <EnvelopeSimple size={16} className="text-pg-accent" />
                {SITE.contact.email}
              </a>
              <span className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-pg-accent" />
                {SITE.contact.office.line1}, {SITE.contact.office.area},{" "}
                {SITE.contact.office.city}
              </span>
            </div>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-sans text-[11px] uppercase tracking-luxe text-pg-text-faint">
                {section.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-pg-text-muted transition-colors hover:text-pg-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="pg-rule my-12" />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <h3 className="font-display text-2xl text-pg-text">
              Stay ahead in the gold market
            </h3>
            <p className="mt-2 text-sm text-pg-text-muted">
              Market notes and new releases, sent when they matter.
            </p>
          </div>
          <NewsletterForm compact />
        </div>

        <hr className="pg-rule my-12" />

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-xs text-pg-text-faint">
            &copy; {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-pg-border text-pg-text-muted transition-all duration-300 hover:border-pg-rose hover:text-pg-text"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
