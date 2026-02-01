import { z } from "zod";

export const cartItemSchema = z.object({
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

export type CartItem = z.infer<typeof cartItemSchema>;


