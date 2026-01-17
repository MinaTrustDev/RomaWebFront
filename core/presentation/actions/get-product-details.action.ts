"use server";

import { getProductByIdUseCase } from "@/core/di";
export const getProductDetails = async (productId: number) => {
  return getProductByIdUseCase.execute(productId);
};
