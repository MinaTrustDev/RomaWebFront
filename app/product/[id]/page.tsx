import { getProductDetails } from "@/presentation/actions/get-product-details.action";
import { ProductDetail } from "@/presentation/product/components/product-detail";
import { ProductStructuredData } from "@/presentation/product/components/product-structured-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SEO_CONSTANTS } from "@/domain/constants/seo.constant";
import { ProductDTO } from "@/domain/dtos/product.dto";

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
export const revalidate = 3600; // Revalidate every hour
export const dynamicParams = true;

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

  // Convert class instance to plain object for client component
  const productData = {
    id: product.id,
    name: product.name,
    name_en: product.name_en,
    name_ar: product.name_ar,
    slug: product.slug,
    description: product.description,
    description_en: product.description_en,
    description_ar: product.description_ar,
    price: product.price,
    price_tax: product.price_tax,
    image: product.image,
    offer_menu_image: product.offer_menu_image,
    stock_status: product.stock_status,
    points: product.points,
    variants: product.variants.map((variant) => ({
      id: variant.id,
      name: variant.name,
      name_en: variant.name_en,
      name_ar: variant.name_ar,
      slug: variant.slug,
      price: variant.price,
      price_tax: variant.price_tax,
      menu_order: variant.menu_order,
      stock_status: variant.stock_status,
      attributes: {
        pa_size: variant.attributes.pa_size,
      },
      attribute_summary: variant.attribute_summary,
      points: variant.points,
    })),
    related_products: product.related_products,
  };

  return (
    <>
      <ProductStructuredData product={productData as ProductDTO} />
      <ProductDetail product={productData} />
    </>
  );
}
