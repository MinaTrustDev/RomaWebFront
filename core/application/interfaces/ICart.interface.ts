import { CartEntity } from "@/core/domain/entities/Cart.entity";
import { CartItemEntity } from "@/core/domain/entities/CartItem.entity";

export interface ICart {
    getCart(token: string): Promise<CartEntity>;
    addToCart(cartItem: CartItemEntity, token: string): Promise<void>;
}