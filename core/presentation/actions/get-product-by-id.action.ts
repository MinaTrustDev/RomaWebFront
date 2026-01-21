"use server";

import z from "zod";
import { createServerAction } from "zsa";
import { getProductByIdUseCase } from "@/core/di";

export const getProductByIdAction = createServerAction()
.input(z.object({
    productId: z.number(),
}))
.handler(async ({ input }) => {
    const product = await getProductByIdUseCase.execute(input.productId);
    return JSON.parse(JSON.stringify(product));
})