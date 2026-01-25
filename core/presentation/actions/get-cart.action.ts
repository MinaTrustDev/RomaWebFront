"use server";

import { getCartUseCase } from "@/core/di";
import { createServerAction } from "zsa";

export const getCartAction = createServerAction().handler(async () => {
    const cart = await getCartUseCase.execute();
    return JSON.parse(JSON.stringify(cart));
});