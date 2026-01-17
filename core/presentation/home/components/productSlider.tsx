"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, ProductCardData } from "@/components/common/product-card";
import { SectionHeader } from "@/components/common/section-header";
import { useCallback, useEffect, useRef, useState } from "react";

import { ProductDTO } from "@/core/domain/dtos/product.dto";
import { ProductEntity } from "@/core/domain/entities/product.entity";

export type ProductData = ProductDTO;

interface ProductSliderProps {
  products: ProductEntity[];
  title: string;
  onAddToCart?: (productId: number) => void;
  aspectRatio?: "square" | "wide";
}

export const ProductSlider = ({
  products,
  title,
  onAddToCart,
  aspectRatio = "square",
}: ProductSliderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    direction: "rtl",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (products.length === 0) {
    return null;
  }

  const navigationButtons = (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="h-9 w-9 border-primary/20 hover:border-primary hover:bg-primary/10"
        aria-label="التالي"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="h-9 w-9 border-primary/20 hover:border-primary hover:bg-primary/10"
        aria-label="السابق"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <section className="w-full">
      <SectionHeader title={title} action={navigationButtons} />
      <div
        className="overflow-hidden px-4 md:px-0 -mx-4 md:mx-0 py-8 -my-8"
        ref={emblaRef}
      >
        <div className="flex gap-6 md:gap-8">
          {products.map((product) => {
            const productCardData: ProductCardData = {
              id: product.id,
              name: product.name,
              name_ar: product.name_ar,
              name_en: product.name_en,
              description_ar: product.description_ar,
              price: product.price,
              price_tax: product.price_tax,
              image: product.image,
              stock_status: product.stock_status as "instock" | "outofstock" | "lowstock",
            };
            return (
              <div
                key={product.id}
                className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_32%] min-w-0 pl-1"
              >
                <ProductCard
                  product={productCardData}
                  onAddToCart={onAddToCart}
                  aspectRatio={aspectRatio}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
