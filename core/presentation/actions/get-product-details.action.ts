"use server";

import { getProductByIdUseCase } from "@/core/di";
export const getProductDetails = async (productId: string) => {
  return getProductByIdUseCase.execute(productId);
};
