"use client";

import { MapSelector, Location } from "@/components/common/map-selector";

interface SelectDeliveryLocationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLocationSelect: (latitude: string, longitude: string) => void;
}

export const SelectDeliveryLocation = ({
  open,
  onOpenChange,
  onLocationSelect,
}: SelectDeliveryLocationProps) => {
  const handleLocationSelect = (location: Location) => {
    onLocationSelect(location.lat.toString(), location.lng.toString());
  };

  return (
    <MapSelector
      open={open}
      onOpenChange={onOpenChange}
      onLocationSelect={handleLocationSelect}
      title="حدد موقع التوصيل"
      description="انقر على الخريطة لتحديد موقع التوصيل أو استخدم زر الكشف التلقائي"
      confirmLabel="البحث عن فروع قريبة"
    />
  );
};
