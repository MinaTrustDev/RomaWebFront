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
  const { deliveryMethod, setDeliveryMethod, setSelectedBranchId } = useLocalStore();
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

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Tabs
          value={deliveryMethod ?? undefined}
          onValueChange={handleMethodChange}
          className="w-auto"
        >
          <TabsList className="h-9 bg-muted/50 p-1">
            {DELIVERY_METHODS.map((method) => {
              const Icon = methodIcons[method];
              return (
                <TabsTrigger
                  key={method}
                  value={method}
                  className={cn(
                    "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-xs px-3 h-7"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 ml-1" />
                  {methodLabels[method]}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <span className="text-sm font-medium text-muted-foreground">
          طريقة الطلب:
        </span>
        <Tabs
          value={deliveryMethod ?? undefined}
          onValueChange={handleMethodChange}
          className="w-auto"
        >
          <TabsList className="h-10 bg-muted/50 p-1">
            {DELIVERY_METHODS.map((method) => {
              const Icon = methodIcons[method];
              return (
                <TabsTrigger
                  key={method}
                  value={method}
                  className={cn(
                    "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-sm px-4 h-8 flex items-center gap-2"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {methodLabels[method]}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    );
  }

  // Default variant - full card style
  return (
    <div className={cn("w-full", className)}>
      <Tabs
        value={deliveryMethod ?? undefined}
        onValueChange={handleMethodChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 h-12">
          {DELIVERY_METHODS.map((method) => {
            const Icon = methodIcons[method];
            const isSelected = deliveryMethod === method;
            return (
              <TabsTrigger
                key={method}
                value={method}
                className={cn(
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-base",
                  isSelected && "shadow-lg scale-105"
                )}
              >
                <Icon className="h-5 w-5" />
                {methodLabels[method]}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};

