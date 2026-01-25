import { CartEntity } from "@/core/domain/entities/Cart.entity";
import { GetCartResponseDTO } from "../dtos/GetCartResponse.dto";
import { CartItemEntity } from "@/core/domain/entities/CartItem.entity";

export class GetCartResponseMapper {
    static toDomain(data: GetCartResponseDTO): CartEntity {
        return new CartEntity({
            totalPrice: data.total_price,
            VAT: data.VAT,
            VATDinein: data.VATDinein,
            totalPriceWithTax: data.total_price_with_tax,
            totalPriceWithTaxDinein: data.total_price_with_tax_dinein,
            totalItems: data.total_items,
            totalPoints: data.total_points,
            userPoints: data.user_points,
            pointsWorth: data.points_worth,
            cartItems: data.cart_items.map(item => new CartItemEntity({
                productId: item.product_id,
                quantity: item.quantity,
                addons: item.addons || [],
                price: item.price,
                points: item.points,
                total: item.total,
                image: item.image,
                productName: item.product_name,
                productNameAr: item.product_name_ar,
                productNameEn: item.product_name_en,
            })),
        });
    }
}