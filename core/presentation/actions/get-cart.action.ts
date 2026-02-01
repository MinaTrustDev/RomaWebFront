"use server";

import { getCartUseCase } from "@/core/di";
import { createServerAction } from "zsa";
import { z } from "zod";

export const getCartAction = createServerAction()
.input(z.object({
    token: z.string(),
}))
.handler(async ({ input }) => {
    const cart = await getCartUseCase.execute(input.token);
    return JSON.parse(JSON.stringify(cart));
});