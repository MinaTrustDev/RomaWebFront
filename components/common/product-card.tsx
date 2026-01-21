'use client';

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShoppingCart, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export interface ProductCardData {
  id: number;
  slug: string;
  name: string;
  name_ar?: string;
  name_en?: string;
  description_ar?: string;
  price: string;
  price_tax: number;
  image?: string;
  stock_status: "instock" | "outofstock" | "lowstock";
}

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: ProductCardData;
  onAddToCart?: (productId: number) => void;
  showAddButton?: boolean;
  aspectRatio?: "square" | "wide";
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      product,
      onAddToCart,
      showAddButton = true,
      aspectRatio = "square",
      ...props
    },
    ref
  ) => {
    const router = useRouter();
    const isInStock = product.stock_status === "instock";
    const displayName = product.name_ar || product.name_en || product.name;

    const handleCardClick = (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) {
        return;
      }
      router.push(`/product/${product.slug}`);
    };

    return (
      <Card
        ref={ref}
        onClick={handleCardClick}
        className={cn(
          "group overflow-hidden h-full flex flex-col transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 border-transparent bg-card/50 backdrop-blur-sm hover:bg-card rounded-[2rem]",
          className
        )}
        {...props}
      >
        {/* Image Container */}
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-[2rem] m-2 mb-0",
            aspectRatio === "wide" ? "aspect-4/3" : "aspect-square"
          )}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={displayName}
              fill
              className={cn(
                "object-cover transition-transform duration-700 ease-in-out group-hover:scale-110",
                !isInStock && "grayscale"
              )}
              // sizes="(max-width: 768px) 25vw, (max-width: 1024px) 25vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 bg-muted/20">
              <span className="text-sm">لا توجد صورة</span>
            </div>
          )}

          {/* Status Badge */}
          {!isInStock && (
            <Badge
              variant="destructive"
              className="absolute top-4 right-4 shadow-lg backdrop-blur-md bg-destructive/90 px-3 py-1 text-sm font-medium"
            >
              غير متوفر
            </Badge>
          )}

          {/* Slight gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <CardContent className="p-6 flex flex-col flex-1 relative gap-3">
          <div className="space-y-2">
            <h4 className="font-bold text-xl leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {displayName}
            </h4>

            {product.description_ar && (
              <p className="text-base text-muted-foreground/70 line-clamp-2 leading-relaxed min-h-12">
                {product.description_ar}
              </p>
            )}
          </div>

          <div className="mt-auto pt-2 flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-primary tracking-tight">
                  {product.price_tax.toFixed(0)}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  ج.م
                </span>
              </div>
              {/* {product.price_tax && product.price_tax > product.price && (
                <span className="text-sm text-muted-foreground/50 line-through decoration-primary/30">
                  {Math.round(product.price_tax * 1.1)}
                </span>
              )} */}
            </div>

            {isInStock && showAddButton && (
              <Button
                size="icon"
                className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:bg-primary hover:scale-110 active:scale-95 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.(product.id);
                }}
              >
                <Plus className="h-6 w-6 stroke-[2.5]" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
ProductCard.displayName = "ProductCard";
