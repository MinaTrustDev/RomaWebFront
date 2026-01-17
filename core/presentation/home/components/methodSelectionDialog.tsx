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
import { DeliveryMethodTabs } from "./delivery-method-tabs";
import { useEffect, useState } from "react";
import { useServerActionQuery } from "@/core/infrastructure/config/server-action-hooks";
import { getDeliveryConfiguration } from "../../actions/get-delivery-configuration.action";

export const MethodSelectionDialog = ({ isOpen }: { isOpen: boolean }) => {
  const { data: deliveryConfiguration } = useServerActionQuery(
    getDeliveryConfiguration,
    {
      input: undefined,
      queryKey: ["delivery-configuration"],
    }
  );

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
