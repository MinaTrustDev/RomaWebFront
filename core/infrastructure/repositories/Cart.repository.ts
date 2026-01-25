import { ICart } from "@/core/application/interfaces/ICart.interface";
import { CartItemEntity } from "@/core/domain/entities/CartItem.entity";
import { axiosClient } from "@/lib/axiosClient";
import { API_CONFIG } from "../config/api.config";
import { AddToCartRequestMapper } from "../mappers/AddToCartRequest.mapper";
import { GetCartResponseDTO } from "../dtos/GetCartResponse.dto";
import { GetCartResponseMapper } from "../mappers/GetCartResponse.mapper";
import { CartEntity } from "@/core/domain/entities/Cart.entity";

export class CartRepository implements ICart {
    async addToCart(cartItem: CartItemEntity, token: string): Promise<void> {
        const addToCartRequestDTO = AddToCartRequestMapper.toDTO(cartItem);
        const response = await axiosClient.post(`${API_CONFIG.API_URL}/guest-cart/v1/add-to-cart`, addToCartRequestDTO, {
            headers: {
                ...API_CONFIG.HEADERS,
                guest_id: token,
            },
        });

        console.log("response", addToCartRequestDTO, response.data.message);
        
    }
    async getCart(token: string): Promise<CartEntity> {
        const response = await axiosClient.get(`${API_CONFIG.API_URL}/guest-cart/v1/get-cart`, {
        headers: {
            ...API_CONFIG.HEADERS,
            guest_id: token,
        },
      });
      const data: GetCartResponseDTO = response.data;
      return GetCartResponseMapper.toDomain(data);
    }
}