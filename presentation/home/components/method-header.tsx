"use client";

import { DeliveryMethodTabs } from "./delivery-method-tabs";
import { Card } from "@/components/ui/card";
import { useLocalStore } from "@/presentation/store/local.store";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const MethodHeader = () => {
  const { deliveryMethod, selectedBranchId, setSelectedBranchId } =
    useLocalStore();
  const router = useRouter();
  const [hasBranchId, setHasBranchId] = useState(false);

  // Check if branch_id cookie exists
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split(";");
      const branchIdCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("branch_id=")
      );
      setHasBranchId(!!branchIdCookie);
    }
  }, []);

  const handleHeaderClick = useCallback(() => {
    // Clear branch selection
    setSelectedBranchId(null);
    // Clear cookies
    if (typeof window !== "undefined") {
      document.cookie = `branch_id=; path=/; max-age=0`;
      document.cookie = `delivery_method=; path=/; max-age=0`;
    }
    // Refresh the page to show method selection
    router.refresh();
  }, [router, setSelectedBranchId]);

  // Show header if deliveryMethod is set OR if branch_id cookie exists OR if selectedBranchId is set
  if (!deliveryMethod && !hasBranchId && !selectedBranchId) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
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
