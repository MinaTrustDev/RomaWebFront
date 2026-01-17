"use client";

import { VariationEntity } from "@/core/domain/entities/variants.entity";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";

interface VariantSelectorProps {
  variants: VariationEntity[];
}

export const VariantSelector = ({ variants }: VariantSelectorProps) => {
  const [selectedVariant, setSelectedVariant] =
    useState<VariationEntity | null>(null);
  if (!variants || variants.length === 0) return null;

  const onSelectVariant = (variant: VariationEntity) => {
    console.log(variant);
  };

  // Helper to clean HTML from variant names
  const cleanVariantName = (name: string) => {
    if (!name) return "";
    // Remove specific span separator pattern common in this backend
    let cleaned = name.replace(/<span>\s*-\s*<\/span>/gi, " - ");
    // Remove any other HTML tags
    cleaned = cleaned.replace(/<[^>]*>/g, "");
    return cleaned;
  };

  // Group variants by size
  const variantsBySize = variants.reduce((acc, variant) => {
    const size = variant.attributes.pa_size || "default";
    if (!acc[size]) {
      acc[size] = [];
    }
    acc[size].push(variant);
    return acc;
  }, {} as Record<string, VariationEntity[]>);

  return (
    <div className="space-y-6 pt-2">
      {Object.entries(variantsBySize).map(([size, sizeVariants]) => (
        <div key={size} className="space-y-4">
          {size !== "default" && size && (
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full inline-block" />
              {size}
            </h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sizeVariants.map((variant) => {
              const isSelected = selectedVariant?.id === variant.id;
              const isInStock = variant.stock_status === "instock";

              const rawName =
                variant.name_ar ||
                variant.name_en ||
                variant.name ||
                variant.attribute_summary ||
                "بدون اسم";

              const variantName = cleanVariantName(rawName);

              return (
                <button
                  key={variant.id}
                  onClick={() => onSelectVariant(variant)}
                  disabled={!isInStock}
                  className={cn(
                    "relative group p-6 rounded-3xl border-2 text-right transition-all duration-300 ease-out flex flex-col justify-between min-h-[100px]",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-xl shadow-primary/10 scale-[1.02] ring-1 ring-primary/20"
                      : "border-transparent bg-muted/40 hover:bg-muted/60 hover:scale-[1.01]",
                    !isInStock && "opacity-50 cursor-not-allowed grayscale"
                  )}
                >
                  <div className="flex justify-between items-start w-full gap-4 mb-2">
                    <span
                      className={cn(
                        "font-bold text-xl transition-colors leading-tight",
                        isSelected ? "text-primary" : "text-foreground"
                      )}
                    >
                      {variantName}
                    </span>
                    {isSelected && (
                      <div className="bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg shrink-0 animate-in zoom-in spin-in-90 duration-300">
                        <Check className="h-4 w-4" strokeWidth={4} />
                      </div>
                    )}
                  </div>

                  <div className="flex items-end justify-between w-full mt-auto">
                    <span
                      className={cn(
                        "text-xl font-bold tracking-tight",
                        isSelected ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {variant.price_tax.toFixed(0)}{" "}
                      <span className="text-sm font-normal opacity-70">
                        ج.م
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
