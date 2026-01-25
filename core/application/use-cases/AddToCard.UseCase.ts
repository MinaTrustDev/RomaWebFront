import { MissingDeliveryConfiguration } from "@/core/domain/errors/MissingDeliveryConfiguration.error";
import { IProductRepository } from "../interfaces/IProductRepository.interface";
import { IStorageRepository } from "../interfaces/iStorage.interface";
import { CartItemEntity } from "@/core/domain/entities/CartItem.entity";
import { ICart } from "../interfaces/ICart.interface";

export class AddToCardUseCase {
  constructor(
    private cartRepository: ICart,
    private storageRepository: IStorageRepository
  ) {}

  async execute(cartItem: CartItemEntity): Promise<void> {
    console.log("cartItem", cartItem);
    const deliveryConfiguration = await this.storageRepository.get(
      "delivery_configuration"
    );
    if (!deliveryConfiguration || deliveryConfiguration === null) {
      throw new MissingDeliveryConfiguration("Missing delivery configuration");
    }


    const token = await this.storageRepository.get("guest_id");

    await this.cartRepository.addToCart(cartItem, token);
  }
}
