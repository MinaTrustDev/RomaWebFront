"use server";

import { getProductByIdUseCase, getProductBySlugUseCase } from "@/core/di";
import { z } from "zod";
import { createServerAction } from "zsa";
export const getProductDetails = async (productId: number) => {
  return getProductByIdUseCase.execute(productId);
};

export const getProductBySlugAction = createServerAction()
.input(z.object({
  slug: z.string(),
  branchId: z.number().optional(),
}))
.handler(async ({ input }) => {
  const product = await getProductBySlugUseCase.execute(input.slug, input.branchId);
  return JSON.parse(JSON.stringify(product));
});