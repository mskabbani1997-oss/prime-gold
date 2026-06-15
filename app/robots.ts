import type { MetadataRoute } from "next";
import { SITE, IS_INDEXABLE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Non-production (Vercel preview / local) deploys are blocked from crawling
  // entirely, matching the page-level noindex,nofollow.
  if (!IS_INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/ae/account", "/ae/cart"],
    },
    sitemap: `${SITE.origin}/sitemap.xml`,
  };
}
