import { getProductBySlugAction } from "@/core/presentation/actions/get-product-details.action";
import { ProductStructuredData } from "@/core/presentation/product/components/product-structured-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SEO_CONSTANTS } from "@/core/domain/constants/seo.constant";
import dynamic from "next/dynamic";
import { getDeliveryConfigurationAction } from "@/core/presentation/actions/get-delivery-configuration.action";
import { Suspense } from "react";
import { getProductVariations } from "@/core/presentation/actions/get-product-variations";
import { getAddonsAction } from "@/core/presentation/actions/get-addons.actions";
import AddonsSelector from "@/core/presentation/product/components/AddonsSelector";
import VariationsConfiguration from "@/core/presentation/product/components/VariationsConfiguration";
import ProductConfiguration from "@/core/presentation/product/components/ProductConfiguration";

// Lazy load product detail components (keep SSR for SEO)
const ProductBackButton = dynamic(() => import("@/core/presentation/product/components/ProductBackButton").then(mod => ({ default: mod.ProductBackButton })));

const ProductImage = dynamic(() => import("@/core/presentation/product/components/details/product-image").then(mod => ({ default: mod.ProductImage })));

const VariantSelector = dynamic(() => import("@/core/presentation/product/components/details/variant-selector").then(mod => ({ default: mod.VariantSelector })));

const PriceDisplay = dynamic(() => import("@/core/presentation/product/components/details/price-display").then(mod => ({ default: mod.PriceDisplay })));

const AddToCart = dynamic(() => import("@/core/presentation/product/components/details/add-to-cart").then(mod => ({ default: mod.AddToCart })));

const ProductHeader = dynamic(() => import("@/core/presentation/product/components/details/product-header").then(mod => ({ default: mod.ProductHeader })));


export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [deliveryConfig, noDeliveryConfig] = await getDeliveryConfigurationAction();


  const [product, productNotFound] = await getProductBySlugAction({slug: slug, branchId: deliveryConfig?.branchId});
  
  if (productNotFound) {
    notFound();
  }

  const [variations, error] = await getProductVariations({productId: product?.id});
  

  return (
    <ProductConfiguration variations={variations} product={product} />
  );
}


// Generate metadata for product pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [product, _] = await getProductBySlugAction({slug: slug});

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
      card: product.image || product.offer_menu_image,
      title,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: `${SEO_CONSTANTS.siteUrl}/product/${slug}`,
    },
  };
}
