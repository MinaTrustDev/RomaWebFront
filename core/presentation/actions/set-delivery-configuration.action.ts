"use server";

import { setDeliveryConfigurationUseCase } from "@/core/di";
import { z } from "zod";
import { createServerAction } from "zsa";

export const setDeliveryConfiguration = createServerAction()
  .input(
    z.object({
      deliveryConfiguration: z.object({
        order_type: z.enum(["dinein", "pickup", "delivery"]),
        branchId: z.number(),
        address: z.string(),
      }),
    })
  )
  .handler(async ({ input }) => {
    await setDeliveryConfigurationUseCase.execute({
      order_type: input.deliveryConfiguration.order_type,
      branchId: input.deliveryConfiguration.branchId,
      address: input.deliveryConfiguration.address,
    });
  });
