"use server";

import { createServerAction } from "zsa";
import { z } from "zod";
import { addToCartUseCase } from "@/core/di";
import { CartItemEntity } from "@/core/domain/entities/CartItem.entity";
import { cartItemSchema } from "@/core/presentation/schemas/cart.schema";

export const addToCartAction = createServerAction()
  .input(z.object({
    cartItem: cartItemSchema,
    token: z.string(),
  }))

  .handler(async ({ input }) => {
    console.log("input", input);
    const cartItemEntity = new CartItemEntity(input.cartItem);
    return await addToCartUseCase.execute(cartItemEntity, input.token);
  });
