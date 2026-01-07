"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { DELIVERY_METHODS } from "@/domain/constants/delivery-methods.constant";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SelectMethod({
  selectedMethod,
  setSelectedMethod,
  onContinue,
}: {
  selectedMethod: (typeof DELIVERY_METHODS)[number] | null;
  setSelectedMethod: (
    selectedMethod: (typeof DELIVERY_METHODS)[number]
  ) => void;
  onContinue: () => void;
}) {
  return (
    <DrawerContent className="max-h-[85vh] bg-gradient-to-b from-background to-background/95">
      <DrawerHeader className="text-center border-b border-border/50 pb-4">
        <DrawerTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          ما الطريقة التي تود طلب البيتزا بها؟
        </DrawerTitle>
        <DrawerDescription className="text-base text-muted-foreground mt-2">
          اختر الطريقة التي تريد المتابعة بها
        </DrawerDescription>
      </DrawerHeader>

      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant={selectedMethod === "dine-in" ? "default" : "outline"}
            onClick={() => setSelectedMethod("dine-in")}
            className={cn(
              "h-auto py-6 px-4 text-base font-semibold transition-all duration-300 border-2",
              selectedMethod === "dine-in"
                ? "bg-primary text-primary-foreground shadow-lg border-primary hover:bg-primary/90 scale-105"
                : "border-border hover:border-primary/50 hover:bg-primary/5"
            )}
          >
            في المطعم
          </Button>
          <Button
            variant={selectedMethod === "pickup" ? "default" : "outline"}
            onClick={() => setSelectedMethod("pickup")}
            className={cn(
              "h-auto py-6 px-4 text-base font-semibold transition-all duration-300 border-2",
              selectedMethod === "pickup"
                ? "bg-primary text-primary-foreground shadow-lg border-primary hover:bg-primary/90 scale-105"
                : "border-border hover:border-primary/50 hover:bg-primary/5"
            )}
          >
            الاستلام
          </Button>
          <Button
            variant={selectedMethod === "delivery" ? "default" : "outline"}
            onClick={() => setSelectedMethod("delivery")}
            className={cn(
              "h-auto py-6 px-4 text-base font-semibold transition-all duration-300 border-2",
              selectedMethod === "delivery"
                ? "bg-primary text-primary-foreground shadow-lg border-primary hover:bg-primary/90 scale-105"
                : "border-border hover:border-primary/50 hover:bg-primary/5"
            )}
          >
            التوصيل
          </Button>
        </div>
      </div>

      <DrawerFooter className="gap-3 border-t border-border/50 pt-4 bg-gradient-to-t from-background to-background/95">
        <Button
          disabled={!selectedMethod}
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
          onClick={onContinue}
        >
          متابعة
        </Button>
        <Link
          href="/"
          className="text-center text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline font-medium"
        >
          تسجيل الدخول او إنشاء حساب
        </Link>
      </DrawerFooter>
    </DrawerContent>
  );
}
