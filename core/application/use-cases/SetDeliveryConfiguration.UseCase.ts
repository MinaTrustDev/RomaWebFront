import { DeliveryConfiguration } from "@/core/domain/value-objects/deliveryConfigurations";
import { IStorageRepository } from "../interfaces/iStorage.interface";
import { revalidatePath } from "next/cache";

export class SetDeliveryConfigurationUseCase {
  constructor(private storageRepository: IStorageRepository) {}

  async execute(deliveryConfiguration: DeliveryConfiguration): Promise<void> {
    await this.storageRepository.set(
      "delivery_configuration",
      deliveryConfiguration
    );

    revalidatePath("/", "layout");
    revalidatePath("/product/[id]", "page");
  }
}
