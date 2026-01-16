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

export const MethodSelectionDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">اختر طريقه التوصيل</Button>
      </DialogTrigger>
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
