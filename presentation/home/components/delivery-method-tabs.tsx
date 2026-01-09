"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStore } from "@/presentation/store/local.store";
import { DELIVERY_METHODS } from "@/domain/constants/delivery-methods.constant";
import { cn } from "@/lib/utils";
import { UtensilsCrossed, ShoppingBag, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

const methodIcons = {
  "dine-in": UtensilsCrossed,
  pickup: ShoppingBag,
  delivery: Truck,
};

const methodLabels = {
  "dine-in": "في المطعم",
  pickup: "الاستلام",
  delivery: "التوصيل",
};

export const DeliveryMethodTabs = ({
  variant = "default",
  className,
}: {
  variant?: "default" | "compact" | "inline";
  className?: string;
}) => {
  const { deliveryMethod, setDeliveryMethod, setSelectedBranchId } =
    useLocalStore();
  const router = useRouter();

  const handleMethodChange = (value: string) => {
    const method = value as (typeof DELIVERY_METHODS)[number];
    if (method && DELIVERY_METHODS.includes(method)) {
      setDeliveryMethod(method);
      // Clear branch selection when method changes
      setSelectedBranchId(null);
      if (typeof window !== "undefined") {
        document.cookie = `branch_id=; path=/; max-age=0`;
      }
      // Don't refresh immediately - let OrderFlowManager handle the next step
    }
  };

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <Tabs
          value={deliveryMethod ?? undefined}
          // onValueChange={handleMethodChange}
          className="w-auto"
        >
          <TabsList className="bg-background/20 backdrop-blur-md border border-white/10 rounded-full p-1 h-auto">
            {DELIVERY_METHODS.map((method) => {
              const Icon = methodIcons[method];
              return (
                <TabsTrigger
                  key={method}
                  value={method}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    "data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg",
                    "data-[state=inactive]:text-white data-[state=inactive]:hover:bg-white/10"
                  )}
                >
                  <Icon className="h-4 w-4 ml-2" />
                  {methodLabels[method]}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    );
  }

  // Default variant - Card Grid Style
  return (
    <div className={cn("w-full", className)}>
      <Tabs
        value={deliveryMethod ?? undefined}
        onValueChange={handleMethodChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 gap-4 bg-transparent h-auto p-0">
          {DELIVERY_METHODS.map((method) => {
            const Icon = methodIcons[method];
            const isSelected = deliveryMethod === method;
            return (
              <TabsTrigger
                key={method}
                value={method}
                className={cn(
                  "flex flex-col items-center justify-center gap-3 py-6 px-2 h-auto rounded-xl border-2 transition-all duration-300",
                  "hover:bg-muted/50 hover:border-primary/30 hover:-translate-y-1",
                  isSelected
                    ? "bg-primary/5 border-primary text-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
                    : "bg-card border-border/50 text-muted-foreground grayscale-[0.5] hover:grayscale-0"
                )}
              >
                <div className={cn(
                  "p-3 rounded-full transition-colors",
                  isSelected ? "bg-primary text-white shadow-md" : "bg-muted text-foreground"
                )}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-bold text-base">{methodLabels[method]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};
