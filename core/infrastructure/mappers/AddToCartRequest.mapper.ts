import { CartItemEntity } from "@/core/domain/entities/CartItem.entity";
import { AddToCartRequestDTO } from "../dtos/AddToCartRequest.dto";

export class AddToCartRequestMapper {
    static toDTO(cartItem: CartItemEntity): AddToCartRequestDTO {
        return {
            product_id: cartItem.productId,
            quantity: cartItem.quantity,
            addons: cartItem.addons.map((addon) => ({
                addon_id: Number(addon.addonId),
                name: addon.name,
                price: addon.price,
            })),
        }
    }
}