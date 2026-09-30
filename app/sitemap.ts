import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, priority: 1 },
    { url: `${SITE.url}/products`, priority: 0.9 },
    ...PRODUCTS.map((p) => ({ url: `${SITE.url}/products/${p.slug}`, priority: 0.8 })),
    { url: `${SITE.url}/contact`, priority: 0.6 },
  ];
}
