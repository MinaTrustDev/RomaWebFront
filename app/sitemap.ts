import { MetadataRoute } from "next";
import { SEO_CONSTANTS } from "@/domain/constants/seo.constant";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONSTANTS.siteUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseUrl}/product`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}

