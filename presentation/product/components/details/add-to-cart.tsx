"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface AddToCartProps {
    onAddToCart: () => void;
    disabled?: boolean;
    price: number;
    points: number;
}

export const AddToCart = ({ onAddToCart, disabled, price, points }: AddToCartProps) => {
    return (
        <div className="pt-6 mt-auto">
            <Button
                size="lg"
                className="w-full h-16 text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 rounded-[2rem]"
                onClick={onAddToCart}
                disabled={disabled}
            >
                <ShoppingCart className="h-6 w-6 ml-3" strokeWidth={2.5} />
                <span className="ml-2">أضف إلى السلة</span>
                <span className="mr-auto bg-primary-foreground/20 text-sm px-3 py-1 rounded-full font-mono">
                    {price.toFixed(0)} ج.م
                </span>
            </Button>

            {points > 0 && (
                <p className="text-center text-sm text-muted-foreground mt-4 font-medium">
                    ستحصل على <span className="text-primary font-bold">{points}</span> نقطة
                    مكافأة عند إتمام الشراء ✨
                </p>
            )}
        </div>
    );
};
