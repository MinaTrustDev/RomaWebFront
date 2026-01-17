import { MissingDeliveryConfiguration } from "@/core/domain/errors/MissingDeliveryConfiguration.error";
import { IProductRepository } from "../interfaces/IProductRepository.interface";
import { IStorageRepository } from "../interfaces/iStorage.interface";

export class AddToCardUseCase {
  constructor(
    private productRepository: IProductRepository,
    private storageRepository: IStorageRepository
  ) {}

  async execute(productId: number): Promise<void> {
    const deliveryConfiguration = await this.storageRepository.get(
      "delivery_configuration"
    );
    console.log("deliveryConfiguration", deliveryConfiguration);
    if (!deliveryConfiguration || deliveryConfiguration === null) {
      throw new MissingDeliveryConfiguration("Missing delivery configuration");
    }
  }
}
