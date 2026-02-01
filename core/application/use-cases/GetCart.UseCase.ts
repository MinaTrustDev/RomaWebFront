
import { ICart } from "../interfaces/ICart.interface";
import { IStorageRepository } from "../interfaces/iStorage.interface";
import { CartEntity } from "@/core/domain/entities/Cart.entity";

export class GetCartUseCase {
    constructor(private cartRepository: ICart, private storageRepository: IStorageRepository) {}

    async execute(token: string): Promise<CartEntity> {
        // const token = await this.storageRepository.get("guest_id");
        if (!token) {
            throw new Error("Guest ID not found");
        }
        const cart = await this.cartRepository.getCart(token as string);
        return cart;
    }
}