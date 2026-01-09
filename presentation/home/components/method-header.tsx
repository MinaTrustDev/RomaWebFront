"use client";

import { DeliveryMethodTabs } from "./delivery-method-tabs";
import { useLocalStore } from "@/presentation/store/local.store";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import drawsBg from "@/public/draws.svg?url";

export const MethodHeader = () => {
  const { deliveryMethod, selectedBranchId, setSelectedBranchId } =
    useLocalStore();
  const router = useRouter();
  const [hasBranchId, setHasBranchId] = useState(false);

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
    setSelectedBranchId(null);
    if (typeof window !== "undefined") {
      document.cookie = `branch_id=; path=/; max-age=0`;
      document.cookie = `delivery_method=; path=/; max-age=0`;
    }
    router.refresh();
  }, [router, setSelectedBranchId]);

  if (!deliveryMethod && !hasBranchId && !selectedBranchId) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden bg-primary/5 pb-4">
      {/* Background with draws.svg */}
      <div
        className="absolute inset-0 w-full h-full bg-primary"
        style={{
          backgroundImage: `url(${drawsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderBottomLeftRadius: "50% 20%",
          borderBottomRightRadius: "50% 20%",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 pt-6 pb-12 flex flex-col items-center justify-center gap-6">
        <div className="bg-background/90 backdrop-blur-sm p-2 pr-6 rounded-full shadow-xl shadow-primary/20 flex items-center gap-4 border border-white/20">
          <Button
            variant="ghost"
            onClick={handleHeaderClick}
            className="text-primary hover:bg-primary/5 hover:text-primary/80 group transition-all rounded-full px-0"
          >
            <ArrowRight className="h-5 w-5 ml-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-lg">تغيير</span>
          </Button>

          <div className="h-8 w-px bg-border" />

          <DeliveryMethodTabs variant="inline" className="bg-transparent" />
        </div>
      </div>
    </div>
  );
};
