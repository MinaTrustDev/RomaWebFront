"use server";

import { getProductVariationsUseCase } from "@/core/di";
import z from "zod";
import { createServerAction } from "zsa";

export const getProductVariations = createServerAction()
.input(z.object({
  productId: z.number(),
}))
.handler(async ({ input }) => {
  const variations = await getProductVariationsUseCase.execute(input.productId);
  return JSON.parse(JSON.stringify(variations));
}); 