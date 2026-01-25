"use server";

import { setDeliveryConfigurationUseCase } from "@/core/di";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const setDeliveryConfigurationAction = createServerAction()
  .input(
    z.object({
      deliveryConfiguration: z.object({
        order_type: z.enum(["dinein", "pickup", "delivery"]),
        branchId: z.number(),
        branchName: z.string(),
        address: z.string(),
      }),
    })
  )
  .handler(async ({ input }) => {
    await setDeliveryConfigurationUseCase.execute({
      order_type: input.deliveryConfiguration.order_type,
      branchId: input.deliveryConfiguration.branchId,
      branchName: input.deliveryConfiguration.branchName,
      address: input.deliveryConfiguration.address,
    });
    revalidatePath("/", "layout");
  });
