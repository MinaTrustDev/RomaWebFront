import { MetadataRoute } from "next";
import { SEO_CONSTANTS } from "@/core/domain/constants/seo.constant";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SEO_CONSTANTS.siteUrl}/sitemap.xml`,
  };
}
