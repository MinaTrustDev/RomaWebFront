'use server';

import { getDontMissUseCase } from "@/core/di";
import { createServerAction } from "zsa";

export const getDontMissAction = createServerAction()
.handler(async () => {
    const products = await getDontMissUseCase.execute();
    return JSON.parse(JSON.stringify(products));
})