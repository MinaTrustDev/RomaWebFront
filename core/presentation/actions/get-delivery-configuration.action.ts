"use server";

import { getDeliveryConfigurationUseCase } from "@/core/di";
import { createServerAction } from "zsa";

export const getDeliveryConfiguration = createServerAction().handler(
  async () => {
    const deliveryConfiguration =
      await getDeliveryConfigurationUseCase.execute();
    return JSON.parse(JSON.stringify(deliveryConfiguration));
  }
);
