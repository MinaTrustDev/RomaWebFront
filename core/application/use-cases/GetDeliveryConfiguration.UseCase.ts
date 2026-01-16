import { DeliveryConfiguration } from "@/core/domain/value-objects/deliveryConfigurations";
import { IStorageRepository } from "../interfaces/iStorage.interface";
import { MissingDeliveryConfiguration } from "@/core/domain/errors/MissingDeliveryConfiguration.error";

export class GetDeliveryConfigurationUseCase {
  constructor(private storageRepository: IStorageRepository) {}

  async execute(): Promise<DeliveryConfiguration> {
    const deliveryConfiguration: DeliveryConfiguration =
      await this.storageRepository.get("delivery_configuration");
    if (!deliveryConfiguration) {
      throw new MissingDeliveryConfiguration("Missing delivery configuration");
    }
    console.log("deliveryConfiguration", deliveryConfiguration);

    return deliveryConfiguration;
  }
}
