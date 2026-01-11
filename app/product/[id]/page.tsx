import { getProductDetails } from "@/presentation/actions/get-product-details.action";
import { ProductDetail } from "@/presentation/product/components/product-detail";
import { ProductStructuredData } from "@/presentation/product/components/product-structured-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SEO_CONSTANTS } from "@/domain/constants/seo.constant";

// Generate metadata for product pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductDetails(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const title = product.name_ar || product.name_en || product.name;
  const description =
    product.description_ar ||
    product.description_en ||
    product.description ||
    SEO_CONSTANTS.defaultDescription;
  const image = product.image || product.offer_menu_image;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: `${SEO_CONSTANTS.siteUrl}/product/${id}`,
    },
  };
}

// Enable ISR with revalidation
export const revalidate = 1; // Revalidate every hour
export const dynamicParams = false;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;
  try {
    product = await getProductDetails(id);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    notFound();
  }

  if (!product) {
    notFound();
  }
  return (
    <>
      <ProductStructuredData product={product} />
      <ProductDetail product={product} />
    </>
  );
}
