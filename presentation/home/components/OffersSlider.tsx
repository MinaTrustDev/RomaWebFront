"use client";

import { ProductCard } from "@/components/common/product-card";
import { SectionHeader } from "@/components/common/section-header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductEntity } from "@/domain/entities/product.entity";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function OffersSlider({
  products,
  title,
}: {
  products: ProductEntity[];
  title: string;
}) {
  const router = useRouter();
  const handleCardClick = (product: ProductEntity) => {
    router.push(`/product/${product.id}`);
  };

  return (
    <section className="w-full">
      <SectionHeader title={title} />
      <Carousel opts={{ align: "start", direction: "rtl", slidesToScroll: 1 }}>
        <CarouselContent className="flex gap-6 md:gap-8">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              onClick={() => handleCardClick(product)}
              className="w-full select-none"
            >
              <img
                src={product.image}
                alt={product.name}
                width={"100%"}
                height={100}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
