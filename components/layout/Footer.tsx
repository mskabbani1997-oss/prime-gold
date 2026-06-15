import Link from "next/link";
import {
  InstagramLogo,
  FacebookLogo,
  Phone,
  EnvelopeSimple,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/Logo";
import { TreeWatermark } from "@/components/brand/TreeWatermark";
import { FOOTER_SECTIONS, SITE } from "@/lib/site";

const socials = [
  { Icon: InstagramLogo, href: SITE.social.instagram, label: "Instagram" },
  { Icon: FacebookLogo, href: SITE.social.facebook, label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-pg-navy-deep text-pg-navy-text">
      {/* tree varied: right side, larger — different from the BrandStatement instance */}
      <TreeWatermark
        className="-right-32 -top-24 h-[560px] w-[560px]"
        opacity="opacity-[0.06]"
      />

      <div className="pg-container relative py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-pg-navy-muted">
              Certified gold and silver bullion for investors across the UAE and the wider
              MENA region. No hidden fees, insured storage, and safe delivery.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 text-sm text-pg-navy-muted">
              <a
                href={`tel:${SITE.contact.phoneTel}`}
                className="flex items-center gap-2.5 transition-colors hover:text-pg-navy-text"
              >
                <Phone size={16} className="text-pg-accent" />
                {SITE.contact.phone}
              </a>
              <a
                href={`mailto:${SITE.contact.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-pg-navy-text"
              >
                <EnvelopeSimple size={16} className="text-pg-accent" />
                {SITE.contact.email}
              </a>
              <span className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-pg-accent" />
                {SITE.contact.office.line1}, {SITE.contact.office.city},{" "}
                {SITE.contact.office.country}
              </span>
            </div>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-sans text-[11px] uppercase tracking-luxe text-pg-navy-muted">
                {section.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-pg-navy-muted transition-colors hover:text-pg-navy-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-12 h-px border-0 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-xs text-pg-navy-muted">
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
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-pg-navy-muted transition-all duration-300 hover:border-pg-accent hover:text-pg-navy-text"
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
