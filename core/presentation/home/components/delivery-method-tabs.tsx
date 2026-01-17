"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DELIVERY_METHODS } from "@/core/domain/constants/delivery-methods.constant";
import { UtensilsCrossed, ShoppingBag, Truck, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import ListBranches from "../../components/client/ListBranches";
import { useState } from "react";
import { Location, MapSelector } from "@/components/common/map-selector";
import { useServerActionMutation } from "@/core/infrastructure/config/server-action-hooks";
import {  getNearbyBranchesAction } from "../../actions/get-nearby-branches.action";
import { setDeliveryConfiguration } from "../../actions/set-delivery-configuration.action";

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
  const [location, setLocation] = useState<string>("");
  const router = useRouter();
  const {mutate: setDeliveryConfigAction} = useServerActionMutation(setDeliveryConfiguration, {})
const {mutate: findNearbyBranches, isError, error} = useServerActionMutation(getNearbyBranchesAction, {
  onSuccess: (data) => {
    
    setDeliveryConfigAction({
      deliveryConfiguration: {
        order_type: "delivery",
        branchId: data.id,
        address: location,
      },
    })
    router.refresh();

  },
  onError: (error) => {
    alert(error.message);
  },
})
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleLocationSelect = (
    location: Location
  ) => {
    setLocation(location.formattedAddress || "");
    findNearbyBranches({latitude: location.lat, longitude: location.lng});
    
  };


  return (
    <Card className="w-full h-full">
      <CardContent className="w-full h-full pt-3">
      <MapSelector
      onLocationSelect={handleLocationSelect}
      title="حدد موقع التوصيل"
      description="انقر على الخريطة لتحديد موقع التوصيل أو استخدم زر الكشف التلقائي"
      confirmLabel="البحث عن فروع قريبة"
    />
      </CardContent>
    </Card>
  );
};
