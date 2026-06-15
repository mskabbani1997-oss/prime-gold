import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { SITE, ROBOTS } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: "Buy Gold Bullion in UAE & Dubai | Prime Gold Shop",
    template: "%s | Prime Gold",
  },
  description: SITE.description,
  applicationName: SITE.name,
  robots: ROBOTS,
  alternates: { canonical: SITE.home },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Buy Gold Bullion in UAE & Dubai | Prime Gold Shop",
    description: SITE.description,
    url: SITE.home,
    locale: "en_AE",
    images: [{ url: "/images/og-default.webp", width: 1200, height: 630, alt: "Prime Gold" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Gold Bullion in UAE & Dubai | Prime Gold Shop",
    description: SITE.description,
    images: ["/images/og-default.webp"],
  },
  icons: {
    icon: [
      { url: "/pg-logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/pg-logo.svg",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.origin + SITE.home,
  logo: SITE.origin + "/pg-logo.svg",
  description: SITE.description,
  telephone: SITE.contact.phoneTel,
  email: SITE.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.contact.office.line1,
    addressLocality: SITE.contact.office.city,
    addressCountry: SITE.contact.office.countryCode,
  },
  areaServed: ["AE", "LB"],
  sameAs: [SITE.social.instagram, SITE.social.facebook],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.origin + SITE.home,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${display.variable}`}>
      <body className="bg-pg-bg text-pg-text antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-grad focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-pg-ink"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
