"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductImage } from "./details/product-image";
import { ProductHeader } from "./details/product-header";
import { VariantSelector } from "./details/variant-selector";
import { PriceDisplay } from "./details/price-display";
import { AddToCart } from "./details/add-to-cart";

export type VariantData = {
  id: string;
  name: string;
  name_en: string;
  name_ar: string;
  slug: string;
  price: number;
  price_tax: number;
  menu_order: number;
  stock_status: "instock" | "outofstock" | "lowstock";
  attributes: {
    pa_size: string;
  };
  attribute_summary: string;
  points: number;
};

export type ProductDetailData = {
  id: string;
  name: string;
  name_en: string;
  name_ar: string;
  slug: string;
  description: string;
  description_en: string;
  description_ar: string;
  price: number;
  price_tax: number;
  image: string;
  offer_menu_image: string;
  stock_status: "instock" | "outofstock" | "lowstock";
  points: number;
  variants: VariantData[];
  related_products: number[];
};

interface ProductDetailProps {
  product: ProductDetailData;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<VariantData | null>(
    product.variants.length > 0 ? product.variants[0] : null
  );

  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const displayPriceTax = selectedVariant
    ? selectedVariant.price_tax
    : product.price_tax;
  const displayStockStatus = selectedVariant
    ? selectedVariant.stock_status
    : product.stock_status;

  const displayName = product.name_ar || product.name_en || product.name;
  const displayDescription =
    product.description_ar || product.description_en || product.description;

  const handleAddToCart = () => {
    // TODO: Implement add to cart
    console.log("Add to cart:", {
      productId: product.id,
      variantId: selectedVariant?.id,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8 md:mb-12 text-muted-foreground hover:text-foreground hover:bg-muted/50 -mr-4"
        >
          <ArrowRight className="h-5 w-5 ml-2" />
          <span className="text-lg">العودة للقائمة</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT COLUMN: Product Visuals & Variants */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <ProductImage
              image={product.image}
              name={displayName}
              stockStatus={displayStockStatus}
              points={product.points}
            />

            {/* Variants - Placed Under the Image */}
            {product.variants.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground px-2">
                  خيارات المنتج
                </h3>
                <VariantSelector
                  variants={product.variants}
                  selectedVariant={selectedVariant}
                  onSelectVariant={setSelectedVariant}
                />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Info & Actions */}
          <div className="lg:col-span-5 flex flex-col space-y-8 md:space-y-10 sticky top-8">
            <ProductHeader
              name={displayName}
              description={displayDescription}
            />

            <div className="space-y-8 bg-card/30 p-8 rounded-[2rem] border border-primary/5 shadow-2xl shadow-primary/5">
              <PriceDisplay
                price={displayPriceTax}
                priceTax={displayPriceTax}
              />

              <AddToCart
                onAddToCart={handleAddToCart}
                disabled={displayStockStatus !== "instock"}
                price={displayPriceTax}
                points={product.points}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
