"use server";

import { removeDeliveryConfigurationUseCase } from "@/core/di";
import { createServerAction } from "zsa";

export const deleteDeliveryConfiguration = createServerAction().handler(
  async () => {
    await removeDeliveryConfigurationUseCase.execute();
  }
);
