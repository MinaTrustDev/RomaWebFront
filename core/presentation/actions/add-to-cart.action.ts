"use server";

import { createServerAction } from "zsa";
import { z } from "zod";
import { addToCartUseCase } from "@/core/di";

export const addToCartAction = createServerAction()
  .input(
    z.object({
      productId: z.number(),
    })
  )
  .handler(async ({ input }) => {
    return await addToCartUseCase.execute(input.productId);
  });
