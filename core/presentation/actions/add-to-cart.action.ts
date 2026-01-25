"use server";

import { createServerAction } from "zsa";
import { z } from "zod";
import { addToCartUseCase } from "@/core/di";
import { CartItemEntity } from "@/core/domain/entities/CartItem.entity";

const cartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  addons: z.array(
    z.object({
      addonId: z.string(),
      name: z.string(),
      price: z.number(),
    })
  ),
});

export const addToCartAction = createServerAction()
  .input(z.object({
    cartItem: cartItemSchema,
  }))

  .handler(async ({ input }) => {
    console.log("input", input);
    // Reconstruct CartItemEntity from plain object
    const cartItemEntity = new CartItemEntity(input.cartItem);
    return await addToCartUseCase.execute(cartItemEntity);
  });
