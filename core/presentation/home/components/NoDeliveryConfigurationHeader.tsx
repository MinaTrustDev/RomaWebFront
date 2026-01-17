"use client";
import React, { useState } from "react";
import { MethodSelectionDialog } from "./methodSelectionDialog";
import { Button } from "@/components/ui/button";

export default function NoDeliveryConfigurationHeader() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative z-10 container mx-auto px-4 pt-6 pb-12 flex flex-col items-center justify-center gap-6">
      <div className="bg-background/90 backdrop-blur-sm p-2 pr-6 rounded-full shadow-xl shadow-primary/20 flex items-center gap-4 border border-white/20">
        <MethodSelectionDialog isOpen={isOpen} />
        <Button onClick={() => setIsOpen(true)} variant="ghost">
          اختر طريقة التوصيل
        </Button>
      </div>
    </div>
  );
}
