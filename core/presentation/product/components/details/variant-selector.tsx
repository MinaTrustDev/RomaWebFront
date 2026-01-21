"use client";

import { VariationEntity } from "@/core/domain/entities/variants.entity";
import { getProductVariations } from "@/core/presentation/actions/get-product-variations";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

interface VariantSelectorProps {
  productId: number;
}

const getVariationsQuery = (productId: number) => {
  return useSuspenseQuery({
    queryKey: ['variations', productId],
    queryFn: async () => {
      const [variations, error] = await getProductVariations({productId: productId});
      return variations;
    },
  })
}

export const VariantSelector = ({ productId }: VariantSelectorProps) => {
  const { data: variants } = getVariationsQuery(productId);
  
  const [selectedVariant, setSelectedVariant] =
    useState<VariationEntity>(variants[0]);

  const onSelectVariant = (variant: VariationEntity) => {
    setSelectedVariant(variant);
  };

  return (
    <div className="space-y-6 pt-2">
      {variants.map((variant: VariationEntity) => (
        <VariationItem key={variant.id} variant={variant} selectedVariant={selectedVariant} onSelectVariant={onSelectVariant} />
      ))}
    </div>
  );
};

const VariationItem = ({ variant, selectedVariant, onSelectVariant }: { variant: VariationEntity, selectedVariant: VariationEntity | null, onSelectVariant: (variant: VariationEntity) => void }) => {
  return (
    <div onClick={() => onSelectVariant(variant)} className={cn("relative group p-6 rounded-3xl border-2 text-right transition-all duration-300 ease-out flex flex-col justify-between min-h-[100px]", selectedVariant?.id === variant.id && "border-primary")}>
      <div className="flex justify-between items-start w-full gap-4 mb-2">
        <span className="font-bold text-xl transition-colors leading-tight">
          {variant.name_en}
        </span>
        <div className="flex flex-col items-center gap-2">
        <span className="font-bold text-xl transition-colors leading-tight">
          {variant.price_tax}
          <span className="text-sm text-gray-500 ml-1">EGP</span>
        </span>

        <span className="text-sm text-gray-500 ml-1">
          {variant.points}
          <span className="text-sm text-gray-500 ml-1">Points</span>
        </span>
        </div>
      </div>
    </div>
  );
};