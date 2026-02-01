"use client"

import { useMutation } from "@tanstack/react-query"
import { addToCartAction } from "../actions/add-to-cart.action"
import { CartItem } from "../schemas/cart.schema"
import { CartItemEntity } from "@/core/domain/entities/CartItem.entity";
import { queryClient } from "@/lib/providers/query-provider";
import { toast } from "sonner";

export const useAddToCart = () => {
    return useMutation({
        mutationFn: async ({ cartItems, token }: {cartItems: CartItem, token: string}) => {
            const [, error] = await addToCartAction({ cartItem: cartItems, token: token });
            if (error) {
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success("تم الاضافه الي السله")
        },
        onError: (error) => {
            toast.error(error.message || 'فشل إضافة المنتج إلى السلة');
        },
    })
}