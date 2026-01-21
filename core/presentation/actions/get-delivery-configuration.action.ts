"use server";

import { getDeliveryConfigurationUseCase } from "@/core/di";
import { createServerAction } from "zsa";

export const getDeliveryConfigurationAction = createServerAction().handler(
  async () => {
    const deliveryConfiguration =
      await getDeliveryConfigurationUseCase.execute();
    return JSON.parse(JSON.stringify(deliveryConfiguration));
  }
);
