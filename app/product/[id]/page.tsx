import { getProductDetails } from "@/core/presentation/actions/get-product-details.action";
import { ProductStructuredData } from "@/core/presentation/product/components/product-structured-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SEO_CONSTANTS } from "@/core/domain/constants/seo.constant";
import { ProductBackButton } from "@/core/presentation/product/components/ProductBackButton";
import { ProductImage } from "@/core/presentation/product/components/details/product-image";
import { VariantSelector } from "@/core/presentation/product/components/details/variant-selector";
import { PriceDisplay } from "@/core/presentation/product/components/details/price-display";
import { AddToCart } from "@/core/presentation/product/components/details/add-to-cart";
import { ProductHeader } from "@/core/presentation/product/components/details/product-header";
import { getDeliveryConfiguration } from "@/core/presentation/actions/get-delivery-configuration.action";
import { ProductEntity } from "@/core/domain/entities/product.entity";
import { DeliveryConfiguration } from "@/core/domain/value-objects/deliveryConfigurations";

// Generate metadata for product pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
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

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  let product: ProductEntity;
  let deliveryConfig: DeliveryConfiguration;
  try {
    product = JSON.parse(JSON.stringify(await getProductDetails(id))) as ProductEntity;
    deliveryConfig = JSON.parse(JSON.stringify(await getDeliveryConfiguration())) as DeliveryConfiguration;

    console.log("deliveryConfig", deliveryConfig);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    notFound();
  }

  if (!product || (deliveryConfig.branchId && !product.branch_ids?.includes(deliveryConfig.branchId))) {
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
              {/* Variants - Placed Under the Image */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground px-2">
                    خيارات المنتج
                  </h3>
                  <VariantSelector variants={product.variants} />
                </div>
              )}

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
              <div className="md:hidden sticky bottom-0 bg-white p-4 pt-0 w-full border border-primary rounded-t-md">
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
