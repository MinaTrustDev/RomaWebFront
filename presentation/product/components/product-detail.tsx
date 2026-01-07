"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

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

  const displayPrice = selectedVariant
    ? selectedVariant.price
    : product.price;
  const displayPriceTax = selectedVariant
    ? selectedVariant.price_tax
    : product.price_tax;
  const displayStockStatus = selectedVariant
    ? selectedVariant.stock_status
    : product.stock_status;

  const displayName =
    product.name_ar || product.name_en || product.name;
  const displayDescription =
    product.description_ar || product.description_en || product.description;

  const handleAddToCart = () => {
    // TODO: Implement add to cart
    console.log("Add to cart:", {
      productId: product.id,
      variantId: selectedVariant?.id,
    });
  };

  // Group variants by size
  const variantsBySize = product.variants.reduce(
    (acc, variant) => {
      const size = variant.attributes.pa_size || "default";
      if (!acc[size]) {
        acc[size] = [];
      }
      acc[size].push(variant);
      return acc;
    },
    {} as Record<string, VariantData[]>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowRight className="h-4 w-4 ml-2" />
          العودة
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted border-2 border-border">
            {product.image ? (
              <Image
                src={product.image}
                alt={displayName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <span>لا توجد صورة</span>
              </div>
            )}
            {displayStockStatus !== "instock" && (
              <Badge
                variant="destructive"
                className="absolute top-4 right-4 text-sm px-3 py-1"
              >
                غير متوفر
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                {displayName}
              </h1>
              {displayDescription && (
                <p className="text-base text-muted-foreground leading-relaxed">
                  {displayDescription}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">
                {displayPrice.toFixed(2)} ج.م
              </span>
              {displayPriceTax > displayPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {displayPriceTax.toFixed(2)} ج.م
                </span>
              )}
            </div>

            {/* Variants Selection */}
            {product.variants.length > 0 && (
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    اختر الحجم
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(variantsBySize).map(([size, variants]) => (
                    <div key={size} className="space-y-3">
                      {size !== "default" && size && (
                        <h3 className="text-base font-semibold text-foreground mb-2">
                          {size}
                        </h3>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {variants.map((variant) => {
                          const isSelected = selectedVariant?.id === variant.id;
                          const isInStock = variant.stock_status === "instock";
                          const variantName =
                            variant.name_ar ||
                            variant.name_en ||
                            variant.name ||
                            variant.attribute_summary ||
                            "بدون اسم";
                          return (
                            <button
                              key={variant.id}
                              onClick={() => setSelectedVariant(variant)}
                              disabled={!isInStock}
                              className={cn(
                                "p-4 rounded-lg border-2 transition-all duration-200 text-right relative",
                                isSelected
                                  ? "border-primary bg-primary/10 text-primary font-semibold shadow-lg ring-2 ring-primary/20"
                                  : "border-border hover:border-primary/50 bg-card hover:bg-accent/30",
                                !isInStock &&
                                  "opacity-50 cursor-not-allowed grayscale"
                              )}
                            >
                              {isSelected && (
                                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md">
                                  <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                                </div>
                              )}
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">
                                  {variantName}
                                </span>
                              </div>
                              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                                <span className="text-xl font-bold text-primary">
                                  {variant.price.toFixed(2)} ج.م
                                </span>
                                {!isInStock && (
                                  <Badge variant="destructive" className="text-xs">
                                    غير متوفر
                                  </Badge>
                                )}
                              </div>
                              {variant.attribute_summary &&
                                variant.attribute_summary !== variantName && (
                                  <p className="text-xs text-muted-foreground mt-2">
                                    {variant.attribute_summary}
                                  </p>
                                )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Add to Cart Button */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                onClick={handleAddToCart}
                disabled={displayStockStatus !== "instock"}
              >
                <ShoppingCart className="h-5 w-5 ml-2" />
                أضف للسلة
              </Button>
            </div>

            {/* Product Points */}
            {product.points > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary" className="font-medium">
                  {product.points} نقطة
                </Badge>
                <span>ستحصل على نقاط عند الشراء</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

