"use server";

import { useCases } from "@/infrastructure/factories/UseCaseFactory";

// Caching disabled: always fetch fresh product details
export const getProductDetails = async (productId: string) => {
  return useCases.getProductById.execute(productId);
};
