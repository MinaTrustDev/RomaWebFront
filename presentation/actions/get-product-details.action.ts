"use server";

import { useCases } from "@/infrastructure/factories/UseCaseFactory";
import { unstable_cache } from "next/cache";

// Cache product details for 1 hour
// Each product gets its own cache entry via the cache key
export const getProductDetails = async (productId: string) => {
  return unstable_cache(
    async () => {
      return useCases.getProductById.execute(productId);
    },
    [`product-details-${productId}`],
    {
      revalidate: 3600, // 1 hour
      tags: ["product-details"],
    }
  )();
};
