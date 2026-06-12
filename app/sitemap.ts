import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { CATEGORIES, COLLECTIONS } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.origin;
  const routes = [
    "/ae",
    "/ae/store",
    "/ae/about",
    "/ae/sell",
    "/ae/contact",
    "/ae/faqs",
    "/ae/terms",
    "/ae/privacy",
    ...CATEGORIES.map((c) => `/ae/categories/${c.slug}`),
    ...COLLECTIONS.map((c) => `/ae/collections/${c.slug}`),
  ];

  return routes.map((path) => ({
    url: base + path,
    changeFrequency: path === "/ae" || path === "/ae/store" ? "daily" : "weekly",
    priority: path === "/ae" ? 1 : path.includes("/categories/") || path === "/ae/store" ? 0.8 : 0.6,
  }));
}
