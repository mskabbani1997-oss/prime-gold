/**
 * Central site configuration: brand details, navigation, footer, contact, social.
 * Routing mirrors the live site at primegoldshop.com/ae exactly.
 */

/**
 * Site origin for canonical + Open Graph URLs. Single source of truth, driven by
 * env so it resolves to wherever the site is actually being served (NEVER
 * hardcoded, and never the stale Vercel project alias).
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL  - the real production domain. MUST be set in the
 *      Vercel production environment so canonical/og:url point at the live site.
 *   2. VERCEL_URL            - the actual current deployment URL (matches where
 *      this exact build is served, e.g. a branch preview). Used so canonical and
 *      og:url agree with the page that renders them.
 *   3. localhost (dev)       - fixed dev port for this project.
 *
 * VERCEL_PROJECT_PRODUCTION_URL is deliberately NOT used: it is the auto-assigned
 * project alias (e.g. prime-gold-taupe.vercel.app) and leaked into canonical when
 * NEXT_PUBLIC_SITE_URL was unset, pointing SEO at the wrong, stale origin.
 */
const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3010");

/**
 * Indexability gate. ONLY the real production domain should be crawled. Any
 * Vercel preview (*.vercel.app) and local dev stay noindex,nofollow, so an
 * unsold-client preview is never indexed and the preview canonical value is
 * irrelevant to search engines. At launch, point NEXT_PUBLIC_SITE_URL at the
 * real custom domain (set it on the Production environment only) and that deploy
 * becomes indexable automatically. Leave NEXT_PUBLIC_SITE_URL unset on Preview
 * so canonical falls back to VERCEL_URL (the URL of the build actually serving
 * the content), not a shared alias.
 */
const SITE_HOST = (() => {
  try {
    return new URL(SITE_ORIGIN).hostname;
  } catch {
    return "";
  }
})();

export const IS_INDEXABLE =
  SITE_HOST.length > 0 &&
  SITE_HOST !== "localhost" &&
  !SITE_HOST.endsWith(".vercel.app");

/** Robots directive shared by the layout default and per-page metadata. */
export const ROBOTS = IS_INDEXABLE
  ? { index: true, follow: true }
  : { index: false, follow: false };

export const SITE = {
  name: "Prime Gold",
  legalName: "Salor Gold Trading LLC",
  locale: "ae",
  /** Production origin, used for canonical + Open Graph URLs. */
  origin: SITE_ORIGIN,
  /** Home path for the UAE locale. */
  home: "/ae",
  tagline: "Your trusted partner in gold investment",
  description:
    "Buy certified gold bars and coins in the UAE, priced live against the global spot market, with insured storage and safe delivery across the UAE and the wider MENA region.",

  contact: {
    /** Display form (UAE local). */
    phone: "056 340 0600",
    /** Dialable E.164 form for tel: links and schema. */
    phoneTel: "+971563400600",
    /** wa.me click-to-chat number (no +). */
    whatsapp: "971563400600",
    email: "info@primegoldshop.com",
    office: {
      company: "Salor Gold Trading LLC",
      line1: "Gold Souk, Hind Plaza 108",
      city: "Dubai",
      country: "United Arab Emirates",
      countryCode: "AE",
    },
  },

  social: {
    instagram: "https://www.instagram.com/primegoldmena/",
    facebook: "https://www.facebook.com/p/Prime-Gold-61567137142072/",
  },
} as const;

/** Primary navigation, matching the live site. */
export const NAV_LINKS = [
  { label: "Home", href: "/ae" },
  { label: "About", href: "/ae/about" },
  { label: "Products", href: "/ae/store" },
  { label: "Sell", href: "/ae/sell" },
  { label: "Contact", href: "/ae/contact" },
] as const;

export const FOOTER_SECTIONS = [
  {
    title: "Categories",
    links: [
      { label: "Gold Bars", href: "/ae/categories/gold-bars" },
      { label: "Gold Coins", href: "/ae/categories/gold-coins" },
      { label: "Silver Bars", href: "/ae/categories/silver-bars" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "Valcambi", href: "/ae/collections/valcambi" },
      { label: "SAM Precious Metals", href: "/ae/collections/sam-precious-metals" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/ae/contact" },
      { label: "FAQs", href: "/ae/faqs" },
      { label: "Terms & Conditions", href: "/ae/terms" },
      { label: "Privacy Policy", href: "/ae/privacy" },
    ],
  },
] as const;

export const ANNOUNCEMENT = "Gold Certificate of Authenticity, included with safe delivery";
