"use client";

import { Button } from "@/components/ui/button";
import { useServerActionMutation } from "@/core/infrastructure/config/server-action-hooks";
import { addToCartAction } from "@/core/presentation/actions/add-to-cart.action";
import { MethodSelectionDialog } from "@/core/presentation/home/components/methodSelectionDialog";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useActionState } from "react";

interface AddToCartProps {
  disabled?: boolean;
  price: number;
  points: number;
  productId: number;
  handleAddToCart: () => void;
  isPending: boolean;
  isError: boolean;
}

export const AddToCart = ({
  disabled,
  price,
  points,
  productId,
  handleAddToCart,
  isPending,
  isError,
}: AddToCartProps) => {
  const onAddToCart = async () => {
    handleAddToCart();
  };

  return (
    <div className="pt-6 mt-auto">
      <MethodSelectionDialog isOpen={isError} />
      <Button
        size="lg"
        className="w-full h-16 text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 rounded-[2rem] disabled:opacity-60 disabled:cursor-wait"
        onClick={onAddToCart}
        disabled={disabled || isPending}
      >
        {isPending ? (
          <Loader2 className="h-6 w-6 ml-3 animate-spin" strokeWidth={2.5} />
        ) : (
          <ShoppingCart className="h-6 w-6 ml-3" strokeWidth={2.5} />
        )}
        <span className="ml-2">{isPending ? "جاري الإضافة..." : "أضف إلى السلة"}</span>
        {!isPending && (
          <span className="mr-auto bg-primary-foreground/20 text-sm px-3 py-1 rounded-full font-mono">
            {price.toFixed(0)} ج.م
          </span>
        )}
      </Button>

      {points > 0 && (
        <p className="text-center text-sm text-muted-foreground mt-4 font-medium">
          ستحصل على <span className="text-primary font-bold">{points}</span>{" "}
          نقطة مكافأة عند إتمام الشراء ✨
        </p>
      )}
    </div>
  );
};
