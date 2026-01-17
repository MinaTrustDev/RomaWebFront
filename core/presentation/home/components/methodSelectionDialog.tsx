"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useServerActionQuery } from "@/core/infrastructure/config/server-action-hooks";
import { getDeliveryConfiguration } from "../../actions/get-delivery-configuration.action";

// Lazy load DeliveryMethodTabs (contains heavy components like MapSelector)
const DeliveryMethodTabs = dynamic(() => import("./delivery-method-tabs").then(mod => ({ default: mod.DeliveryMethodTabs })), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">جاري التحميل...</p>
      </div>
    </div>
  ),
  ssr: false,
});

export const MethodSelectionDialog = ({ isOpen }: { isOpen: boolean }) => {
  const { data: deliveryConfiguration } = useServerActionQuery(
    getDeliveryConfiguration,
    {
      input: undefined,
      queryKey: ["delivery-configuration"],
    }
  );

  // Open dialog immediately when isOpen is true and no delivery configuration exists
  // Don't wait for query loading state - just check if data exists
  return (
    <Dialog open={isOpen && !deliveryConfiguration}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">اختر طريقه التوصيل</Button>
      </DialogTrigger> */}
      <DialogContent className="max-w-2xl overflow-auto max-h-[80vh] bg-linear-to-b from-background to-background/95">
        <DialogHeader>
          <DialogTitle>اختر طريقه التوصيل</DialogTitle>
          <DialogDescription>
            اختر الطريقة التي تريد المتابعة بها
          </DialogDescription>
        </DialogHeader>
        <DeliveryMethodTabs variant="compact" />
      </DialogContent>
    </Dialog>
  );
};
