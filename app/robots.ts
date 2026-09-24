import type { MetadataRoute } from "next";
import { siteMeta } from "@/lib/content/seed";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${siteMeta.url}/sitemap.xml`,
  };
}
