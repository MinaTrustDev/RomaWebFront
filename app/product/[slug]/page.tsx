import { getProductBySlugAction } from "@/core/presentation/actions/get-product-details.action";
import { ProductStructuredData } from "@/core/presentation/product/components/product-structured-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SEO_CONSTANTS } from "@/core/domain/constants/seo.constant";
import dynamic from "next/dynamic";
import { getDeliveryConfigurationAction } from "@/core/presentation/actions/get-delivery-configuration.action";
import { Suspense } from "react";

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

  const [deliveryConfig, _] = await getDeliveryConfigurationAction();

  const [product, productNotFound] = await getProductBySlugAction({slug: slug, branchId: deliveryConfig?.branchId});
 
  if (productNotFound) {
    notFound();
  }

  return (
    <>
      <ProductStructuredData product={product} />
      <div className="relative min-h-screen bg-background pb-20">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          <ProductBackButton />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7 flex flex-col gap-10">
              <ProductImage
                image={product.image}
                name={product.name_ar}
                stockStatus={product.stock_status}
                points={product.points}
              />
              <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground px-2">
                    خيارات المنتج
                  </h3>

                  <Suspense fallback={<div className="h-[100px] w-full bg-gray-200 rounded-lg animate-pulse" />}>
                    <VariantSelector productId={product.id} />
                  </Suspense>
                </div>

              
              <div className="md:hidden sticky bottom-0 bg-white p-4 pt-0 w-full border border-primary rounded-t-md">
                <AddToCart
                  disabled={product.stock_status !== "instock"}
                  price={product.price_tax}
                  points={product.points}
                  productId={product.id}
                />
              </div>
            </div>
            <div className="hidden lg:col-span-5 md:flex flex-col space-y-8 md:space-y-10 sticky top-8">
                <ProductHeader
                  name={product.name_ar}
                  description={product.description_ar}
                />

                <div className="space-y-8 bg-card/30 p-8 rounded-[2rem] border border-primary/5 shadow-2xl shadow-primary/5">
                  <PriceDisplay
                    price={product.price_tax}
                    priceTax={product.price_tax}
                  />

                  <AddToCart
                    disabled={product.stock_status !== "instock"}
                    price={product.price_tax}
                    points={product.points}
                    productId={product.id}
                  />
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
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
