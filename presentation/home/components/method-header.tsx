"use client";

import { DeliveryMethodTabs } from "./delivery-method-tabs";
import { Card } from "@/components/ui/card";
import { useLocalStore } from "@/presentation/store/local.store";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const MethodHeader = () => {
  const { deliveryMethod, setSelectedBranchId } = useLocalStore();
  const router = useRouter();

  const handleHeaderClick = useCallback(() => {
    // Clear branch selection
    setSelectedBranchId(null);
    // Clear branch_id cookie
    if (typeof window !== "undefined") {
      document.cookie = `branch_id=; path=/; max-age=0`;
    }
    // Refresh the page to show method selection
    router.refresh();
  }, [router, setSelectedBranchId]);

  if (!deliveryMethod) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <Card className="border-0 shadow-none bg-transparent">
          <div 
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors rounded-lg p-2 -m-2"
            onClick={handleHeaderClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleHeaderClick();
              }
            }}
            aria-label="العودة إلى اختيار طريقة الطلب"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">
                طريقة الطلب الحالية:
              </span>
              <DeliveryMethodTabs variant="inline" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

