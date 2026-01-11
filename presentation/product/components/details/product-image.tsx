"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProductImageProps {
  image: string;
  name: string;
  stockStatus: string;
  points: number;
}

export const ProductImage = ({
  image,
  name,
  stockStatus,
  points,
}: ProductImageProps) => {
  return (
    <div className="relative w-full aspect-square md:aspect-4/3 lg:aspect-square rounded-[2.5rem] overflow-hidden bg-muted/20 shadow-2xl shadow-primary/5">
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          className="object-stretch transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 bg-muted/20">
          <span className="text-lg">لا توجد صورة</span>
        </div>
      )}

      {/* Status Badges */}
      <div className="absolute top-6 right-6 flex flex-col gap-2">
        {stockStatus !== "instock" && (
          <Badge
            variant="destructive"
            className="text-base px-4 py-1.5 shadow-lg backdrop-blur-md bg-destructive/90 rounded-full"
          >
            غير متوفر
          </Badge>
        )}
        {points > 0 && (
          <Badge
            variant="secondary"
            className="text-base px-4 py-1.5 shadow-lg backdrop-blur-md bg-background/80 rounded-full text-foreground border-primary/20"
          >
            ✨ {points} نقطة
          </Badge>
        )}
      </div>

      {/* Background decoration */}
      <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-[3rem] -z-10 opacity-50" />
    </div>
  );
};
