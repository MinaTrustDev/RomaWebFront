"use server";

import { getAddonsUseCase } from "@/core/di";
import { z } from "zod";
import { createServerAction } from "zsa";

export const getAddonsAction = createServerAction()
.input(z.object({
    productId: z.number(),
}))
.handler(async ({ input }) => {
    const addons = await getAddonsUseCase.execute(input.productId);
    return JSON.parse(JSON.stringify(addons));
});