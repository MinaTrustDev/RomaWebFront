"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStore } from "@/core/presentation/store/local.store";
import { DELIVERY_METHODS } from "@/core/domain/constants/delivery-methods.constant";
import { cn } from "@/lib/utils";
import { UtensilsCrossed, ShoppingBag, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { OrderFlowManager } from "./order-flow-manager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ListBranches from "../../components/client/ListBranches";

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
  // Default variant - Card Grid Style
  return (
    <Tabs>
      <TabsList className="flex w-full flex-wrap gap-4 bg-foreground/20 h-auto border border-foreground/20 rounded-lg">
        <TabsTrigger value={DELIVERY_METHODS[0]}>في المطعم</TabsTrigger>
        <TabsTrigger value={DELIVERY_METHODS[1]}>الاستلام</TabsTrigger>
        <TabsTrigger value={DELIVERY_METHODS[2]}>التوصيل</TabsTrigger>
      </TabsList>
      <TabsContent value={DELIVERY_METHODS[0]}>
        <DineInContent />
      </TabsContent>
      <TabsContent value={DELIVERY_METHODS[1]}>
        <PickupContent />
      </TabsContent>
      <TabsContent value={DELIVERY_METHODS[2]}>
        <DeliveryContent />
      </TabsContent>
    </Tabs>
  );
};

const DineInContent = () => {
  return (
    <Card>
      <CardContent className="p-2">
        <ListBranches order_type="dinein" />
      </CardContent>
    </Card>
  );
};

const PickupContent = () => {
  return (
    <Card>
      <CardContent className="p-2">
        <ListBranches order_type="pickup" />
      </CardContent>
    </Card>
  );
};

const DeliveryContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>التوصيل</CardTitle>
      </CardHeader>
    </Card>
  );
};
