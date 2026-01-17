"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DELIVERY_METHODS } from "@/core/domain/constants/delivery-methods.constant";
import { UtensilsCrossed, ShoppingBag, Truck, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Location } from "@/components/common/map-selector";
import { useServerActionMutation } from "@/core/infrastructure/config/server-action-hooks";
import {  getNearbyBranchesAction } from "../../actions/get-nearby-branches.action";
import { setDeliveryConfiguration } from "../../actions/set-delivery-configuration.action";
import { queryClient } from "@/lib/providers/query-provider";
import { LoadingState } from "@/components/common/loading-state";

// Lazy load heavy components
const ListBranches = dynamic(() => import("../../components/client/ListBranches").then(mod => ({ default: mod.default })), {
  loading: () => (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="h-16 bg-muted/20 rounded-lg animate-pulse" />
      ))}
    </div>
  ),
  ssr: false,
});

const MapSelector = dynamic(() => import("@/components/common/map-selector").then(mod => ({ default: mod.MapSelector })), {
  loading: () => <LoadingState text="جاري تحميل الخريطة..." />,
  ssr: false,
});

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
  const [activeTab, setActiveTab] = useState<string>(DELIVERY_METHODS[0]);

  // Default variant - Card Grid Style
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="flex w-full flex-wrap gap-4 bg-foreground/20 h-auto border border-foreground/20 rounded-lg">
        <TabsTrigger value={DELIVERY_METHODS[0]}>في المطعم</TabsTrigger>
        <TabsTrigger value={DELIVERY_METHODS[1]}>الاستلام</TabsTrigger>
        <TabsTrigger value={DELIVERY_METHODS[2]}>التوصيل</TabsTrigger>
      </TabsList>
      {/* Conditionally render only the active tab content for lazy loading */}
      {activeTab === DELIVERY_METHODS[0] && (
        <TabsContent value={DELIVERY_METHODS[0]}>
          <DineInContent />
        </TabsContent>
      )}
      {activeTab === DELIVERY_METHODS[1] && (
        <TabsContent value={DELIVERY_METHODS[1]}>
          <PickupContent />
        </TabsContent>
      )}
      {activeTab === DELIVERY_METHODS[2] && (
        <TabsContent value={DELIVERY_METHODS[2]}>
          <DeliveryContent />
        </TabsContent>
      )}
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
  const {mutate: setDeliveryConfigAction, isPending: isSettingConfig} = useServerActionMutation(setDeliveryConfiguration, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-configuration"] });
      router.refresh();
    },
  })
const {mutate: findNearbyBranches, isError, error, isPending: isFindingBranches} = useServerActionMutation(getNearbyBranchesAction, {
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
  const isLoading = isFindingBranches || isSettingConfig;

  const handleLocationSelect = (
    location: Location
  ) => {
    setLocation(location.formattedAddress || "");
    findNearbyBranches({latitude: location.lat, longitude: location.lng});
    
  };


  return (
    <Card className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">
              {isFindingBranches ? "جاري البحث عن الفروع القريبة..." : "جاري حفظ الإعدادات..."}
            </p>
          </div>
        </div>
      )}
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
