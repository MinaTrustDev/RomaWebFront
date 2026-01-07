import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export interface ProductCardData {
  id: string;
  name: string;
  name_ar?: string;
  name_en?: string;
  description_ar?: string;
  price: number;
  price_tax: number;
  image?: string;
  stock_status: "instock" | "outofstock" | "lowstock";
}

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: ProductCardData;
  onAddToCart?: (productId: string) => void;
  showAddButton?: boolean;
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    { className, product, onAddToCart, showAddButton = true, ...props },
    ref
  ) => {
    const router = useRouter();
    const isInStock = product.stock_status === "instock";
    const displayName = product.name_ar || product.name_en || product.name;

    const handleCardClick = (e: React.MouseEvent) => {
      // Don't navigate if clicking the add to cart button
      if ((e.target as HTMLElement).closest("button")) {
        return;
      }
      router.push(`/product/${product.id}`);
    };

    return (
      <Card
        ref={ref}
        onClick={handleCardClick}
        className={cn(
          "group overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary/50 cursor-pointer",
          className
        )}
        {...props}
      >
        <div className="relative w-full aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={displayName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="text-sm">لا توجد صورة</span>
            </div>
          )}
          {!isInStock && (
            <Badge
              variant="destructive"
              className="absolute top-2 right-2 shadow-sm"
            >
              غير متوفر
            </Badge>
          )}
        </div>
        <CardContent className="p-4 flex flex-col flex-1">
          <h4 className="font-semibold text-lg mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {displayName}
          </h4>
          {product.description_ar && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
              {product.description_ar}
            </p>
          )}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
            <div>
              <p className="text-2xl font-bold text-primary">
                {product.price_tax.toFixed(2)} ج.م
              </p>
              {product.price_tax && product.price_tax > product.price && (
                <p className="text-xs text-muted-foreground line-through">
                  {(product.price_tax * 1.1).toFixed(2)}
                  ج.م
                </p>
              )}
            </div>
            {isInStock && showAddButton && (
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all"
                onClick={() => onAddToCart?.(product.id)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                أضف
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
ProductCard.displayName = "ProductCard";
