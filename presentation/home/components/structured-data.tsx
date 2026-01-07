"use client";

import { BranchDTO } from "@/domain/dtos/branch.dto";
import { SEO_CONSTANTS } from "@/domain/constants/seo.constant";

interface StructuredDataProps {
  branch?: BranchDTO;
  type?: "Organization" | "Restaurant" | "LocalBusiness";
}

export const StructuredData = ({ branch, type = "Restaurant" }: StructuredDataProps) => {
  if (!branch) {
    // Default organization structured data
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SEO_CONSTANTS.siteName,
      description: SEO_CONSTANTS.defaultDescription,
      url: SEO_CONSTANTS.siteUrl,
      logo: `${SEO_CONSTANTS.siteUrl}/logo.png`,
      sameAs: [],
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
    );
  }

  // Restaurant/LocalBusiness structured data
  const restaurantData = {
    "@context": "https://schema.org",
    "@type": type,
    name: branch.branch_name,
    description: SEO_CONSTANTS.defaultDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: branch.latitude,
      longitude: branch.longitude,
    },
    image: branch.image,
    priceRange: "$$",
    servesCuisine: "Pizza",
    openingHours: branch.ordering_status === "open" ? "Mo-Su" : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantData) }}
    />
  );
};

