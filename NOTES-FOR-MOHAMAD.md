# Notes for Mohamad — Prime Gold build

Every assumption, placeholder, and decision made on the `navy-rebuild` branch.
Nothing here is merged to `main`. Read this before go-live and confirm each item
with the client.

Last updated: 2026-06-15

---

## 1. Canonical / Open Graph URL + indexing

Origin logic lives in `lib/site.ts` (`SITE_ORIGIN`). It drives `metadataBase`,
so canonical, `og:url`, `og:image`, and all JSON-LD URLs resolve from one value.
Resolution order: `NEXT_PUBLIC_SITE_URL` → `VERCEL_URL` (the build actually
serving the page) → `http://localhost:3010` (dev). No domain is hardcoded.

**Vercel environment variable setup:**

- **Production:** set `NEXT_PUBLIC_SITE_URL` to the **real custom domain** (e.g.
  `https://primegoldshop.com`, no trailing slash). This makes canonical correct
  AND makes the deploy indexable.
- **Preview:** leave `NEXT_PUBLIC_SITE_URL` **unset**. Canonical then falls back
  to `VERCEL_URL` (this exact build), not a shared alias.

**Indexing gate (so unsold-client previews are never crawled):** a deploy is
indexable ONLY when its origin is a real custom domain. Any `*.vercel.app`
preview or localhost outputs `<meta name="robots" content="noindex,nofollow">`
and a `robots.txt` of `Disallow: /`. The real domain on Production is indexable
automatically. This is why the preview canonical value no longer matters.

**Original bug (fixed):** the old code fell back to
`VERCEL_PROJECT_PRODUCTION_URL` (the `prime-gold-taupe.vercel.app` alias), so
with `NEXT_PUBLIC_SITE_URL` unset, canonical pointed at that stale alias. That
fallback is gone. Note `prime-gold.vercel.app` is owned by an unrelated
deployment, so this project's only auto alias contains `-taupe`; that is moot
now because previews are noindex and the real domain is set at launch.

## 2. Prices are DEMO figures — confirm before go-live

- All 22 SKU prices in `lib/data/catalog.ts` are **demo prices**: today's per-SKU
  figures converted USD→AED at ×3.6725. They are **not** live market data.
- Gold bars share a price by weight (same weight = same price across brands).
- Action: confirm pricing with the client, or wire a live pricing API. The data
  module is structured so swapping in a real feed needs no component changes.
- `priceValidUntil` in the Product JSON-LD (`lib/seo.ts`) is intentionally short
  because bullion pricing tracks spot.

## 3. Contact details — assumptions

- **WhatsApp number is assumed to be the same as the phone number**
  (`056 340 0600` → `971563400600` for wa.me). Confirm the client uses this exact
  number for WhatsApp; if their WhatsApp line differs, update `SITE.contact.whatsapp`
  in `lib/site.ts`.
- Phone: `056 340 0600` (display) / `+971563400600` (tel + schema).
- Email: `info@primegoldshop.com`.
- Address: Gold Souk, Hind Plaza 108, Dubai, UAE — confirm exact unit/plaza name.
- Legal name in schema: `Salor Gold Trading LLC` — confirm this is correct.
- Socials: Instagram `primegoldmena`, Facebook page `61567137142072` — confirm.

## 4. Rebrand decisions (navy → light)

- Direction: **light ivory background + slate-navy accent + antique gold**.
  This is the client-delivery system; the earlier dark-navy hero was rebuilt to
  the lighter, more spacious look.
- "No hidden fees" messaging used throughout; confident pricing copy (dropped the
  earlier "honest/spot-linked" filler wording).
- Hero: 3D-depth carousel with the PRIME watermark; copy avoids em-dashes.

## 5. Product images — real, not AI/stock

- All product photos are the **client's own real images**, pulled from their
  production store (primegoldshop.com) via `scripts/fetch_store_images.py` and
  wired by `scripts/wire_product_images.py`.
- Each SKU has `<slug>.webp` (primary/card); most have `<slug>-pack.webp`
  (packaging, shown on hover/swipe). Re-encoded to webp for consistency only —
  no AI generation, no editing.

## 6. QA fix pass — assumptions to confirm

- **Regional framing standardized to "the wider MENA region"** across all visible
  copy (About, Sell, Terms, site description). The earlier "UAE and Lebanon"
  wording was removed because it contradicted the "MENA region" framing used on the
  home hero, footer, and FAQs. The Organization/AboutPage JSON-LD still lists
  `areaServed: ["AE", "LB"]` (Lebanon is a MENA country, so this is not a visible
  contradiction). **Confirm whether Lebanon is still a served market** — if not,
  drop `"LB"` from `areaServed` in `app/layout.tsx` and `app/ae/about/page.tsx`.
- **Armillary 1 oz Gold Coin re-assigned from the Valcambi collection to SAM
  Precious Metals** (`lib/data/catalog.ts`), per your note that it is a SAM/Combi
  product, not Valcambi. It remains in the Gold Coins category. Confirm the brand
  attribution is correct.

## 7. Dev / housekeeping

- Dev server runs on a **fixed port 3010** (`npm run dev` → `next dev -p 3010`).
  It will not grab 3000.
- Work stays on branch `navy-rebuild`. **Do not merge to `main` without your
  approval.** Deploy previews only.
