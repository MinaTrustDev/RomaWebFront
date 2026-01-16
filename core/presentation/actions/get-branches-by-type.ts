"use server";

import { getBranchesByOrderTypeUseCase } from "@/core/di";
import { createServerAction } from "zsa";
import { z } from "zod";

export const getBranchesByType = createServerAction()
  .input(
    z.object({
      order_type: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const branches = await getBranchesByOrderTypeUseCase.execute({
      order_type: input.order_type,
    });
    return JSON.parse(JSON.stringify(branches));
  });
