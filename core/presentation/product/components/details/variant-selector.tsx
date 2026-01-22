"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { VariationEntity } from "@/core/domain/entities/variants.entity";
import { getProductVariations } from "@/core/presentation/actions/get-product-variations";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Stars } from "lucide-react";
import { useState } from "react";
import { LiaCoinsSolid } from "react-icons/lia";


interface VariantSelectorProps {
  variants: VariationEntity[];
  setSelectedVariant: (variant: VariationEntity) => void;
  selectedVariant: VariationEntity | null;
}


export const VariantSelector = ({ variants, selectedVariant, setSelectedVariant }: VariantSelectorProps) => {
  

  const onSelectVariant = (variant: VariationEntity) => {
    setSelectedVariant(variant);
  };

  return (
    <div className="space-y-6 pt-2 flex gap-4 ">
      {variants.map((variant: VariationEntity) => (
        <VariationItem key={variant.id} variant={variant} selectedVariant={selectedVariant} onSelectVariant={onSelectVariant} />
      ))}
    </div>
  );
};

const VariationItem = ({ variant, selectedVariant, onSelectVariant }: { variant: VariationEntity, selectedVariant: VariationEntity | null, onSelectVariant: (variant: VariationEntity) => void }) => {
  return (
    <Card className={cn("flex-1 h-full items-center text-center", selectedVariant?.id === variant.id && "bg-primary text-white border-primary")} onClick={() => onSelectVariant(variant)}>
      <CardHeader>
        <CardTitle>{variant.size}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-2xl flex items-center justify-center gap-1 font-bold">
            {variant.price_tax}
            <span>ج.م</span>
          </span>
        <span className="flex items-center justify-center gap-1 text-xl font-bold">
            <LiaCoinsSolid className="size-5 text-orange-300" />
            {variant.points}
          </span>
      </CardContent>
    </Card>
  );
};