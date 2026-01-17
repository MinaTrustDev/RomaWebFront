"use server";

import { removeDeliveryConfigurationUseCase } from "@/core/di";
import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";

export const deleteDeliveryConfiguration = createServerAction().handler(
  async () => {
    await removeDeliveryConfigurationUseCase.execute();

    revalidatePath("/", "layout");
    revalidatePath("/product/[id]", "page");
  }
);
