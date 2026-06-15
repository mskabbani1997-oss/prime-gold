/**
 * Central site configuration: brand details, navigation, footer, contact, social.
 * Routing mirrors the live site at primegoldshop.com/ae exactly.
 */

/**
 * Site origin for canonical + Open Graph URLs. Single source of truth, driven by
 * env so it resolves to wherever the site is deployed (NEVER hardcoded to the
 * client's old domain). Set NEXT_PUBLIC_SITE_URL for the real production domain;
 * otherwise it falls back to the Vercel deployment URL, then localhost.
 */
const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

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
    "Buy certified gold bars and coins in the UAE, priced live against the global spot market, with insured storage and safe delivery across Dubai and Lebanon.",

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
