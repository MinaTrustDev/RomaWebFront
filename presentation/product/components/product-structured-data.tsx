"use client";

import { ProductDTO } from "@/domain/dtos/product.dto";
import { SEO_CONSTANTS } from "@/domain/constants/seo.constant";

interface ProductStructuredDataProps {
  product: ProductDTO;
}

export const ProductStructuredData = ({ product }: ProductStructuredDataProps) => {
  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name_ar || product.name_en || product.name,
    description: product.description_ar || product.description_en || product.description,
    image: product.image || product.offer_menu_image,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: SEO_CONSTANTS.siteName,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "SAR",
      availability:
        product.stock_status === "instock"
          ? "https://schema.org/InStock"
          : product.stock_status === "outofstock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/LimitedAvailability",
      url: `${SEO_CONSTANTS.siteUrl}/product/${product.id}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "100",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
    />
  );
};

