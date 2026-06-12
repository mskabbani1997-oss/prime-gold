/**
 * Central site configuration: brand details, navigation, footer, contact, social.
 * Routing mirrors the live site at primegoldshop.com/ae exactly.
 */

export const SITE = {
  name: "Prime Gold",
  legalName: "Salor Gold Trading LLC",
  locale: "ae",
  /** Production origin, used for canonical + Open Graph URLs. */
  origin: "https://primegoldshop.com",
  /** Home path for the UAE locale. */
  home: "/ae",
  tagline: "Your trusted partner in gold investment",
  description:
    "Buy certified gold bars and coins in the UAE with transparent pricing, insured storage, and safe delivery across Dubai and Lebanon.",

  contact: {
    phone: "+961 70 882 983",
    email: "info@primegoldshop.com",
    office: {
      company: "Salor Gold Trading LLC",
      line1: "Office 108, Floor 1, Hind Plaza Building 1/A",
      area: "Al Ras",
      city: "Dubai",
      country: "United Arab Emirates",
      countryCode: "AE",
    },
  },

  // Best-guess handles. Confirm exact URLs before launch.
  social: {
    instagram: "https://www.instagram.com/primegoldshop",
    x: "https://x.com/primegoldshop",
    facebook: "https://www.facebook.com/primegoldshop",
    youtube: "https://www.youtube.com/@primegoldshop",
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
