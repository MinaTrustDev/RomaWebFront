"use server";

import { getDeliveryConfigurationUseCase } from "@/core/di";
import { z } from "zod";
import { createServerAction } from "zsa";

export const getDeliveryConfigurationAction = createServerAction().output(z.object({
    order_type: z.enum(["dinein", "pickup", "delivery"]),
    branchId: z.number(),
    branchName: z.string(),
    address: z.string(),
  }).nullable()).handler(
  async () => {
    const deliveryConfiguration =
      await getDeliveryConfigurationUseCase.execute();

    return JSON.parse(JSON.stringify(deliveryConfiguration))
  }
)
;
