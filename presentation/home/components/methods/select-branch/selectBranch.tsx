"use client";

import { useEffect, useState } from "react";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { getBranches } from "@/presentation/actions/get-branches.action";
import { BranchEntity } from "@/domain/entities/branch.entity";
import { BranchItem } from "./branchItem";
import { useLocalStore } from "@/presentation/store/local.store";
import { useRouter } from "next/navigation";
import { LoadingState } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";
import { AlertCircle } from "lucide-react";

export const SelectBranch = ({
  orderType,
  onContinue,
}: {
  orderType: string;
  onContinue?: () => void;
}) => {
  const [branches, setBranches] = useState<BranchEntity[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<BranchEntity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setSelectedBranchId } = useLocalStore();
  const router = useRouter();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        setError(null);
        const orderTypeParam = orderType === "dine-in" ? "dinein" : orderType;
        const data = await getBranches(orderTypeParam);
        setBranches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch branches");
        console.error("Error fetching branches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [orderType]);

  const handleContinue = async () => {
    if (selectedBranch) {
      setSelectedBranchId(selectedBranch.id);
      
      // Save to cookie for server-side access
      document.cookie = `branch_id=${selectedBranch.id}; path=/; max-age=${60 * 60 * 24 * 30}`;
      
      if (onContinue) {
        onContinue();
      }
      
      // Refresh to trigger server-side fetch
      router.refresh();
    }
  };

  return (
    <DrawerContent className="max-h-[85vh] bg-gradient-to-b from-background to-background/95">
      <DrawerHeader className="text-center border-b border-border/50 pb-4">
        <DrawerTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          اختر الفرع
        </DrawerTitle>
        <DrawerDescription className="text-base text-muted-foreground mt-2">
          اختر الفرع الذي تريد الطلب منه
        </DrawerDescription>
      </DrawerHeader>

      <div className="px-4 pb-4 flex-1 overflow-y-auto">
        {loading && <LoadingState text="جاري التحميل..." />}
        {error && (
          <EmptyState
            icon={<AlertCircle className="text-destructive" />}
            title="حدث خطأ"
            description={error}
          />
        )}
        {!loading && !error && branches.length === 0 && (
          <EmptyState
            title="لا توجد فروع متاحة"
            description="لا توجد فروع متاحة لهذا النوع من الطلب حالياً"
          />
        )}
        {!loading && !error && branches.length > 0 && (
          <div className="grid grid-cols-1 gap-3 py-2">
            {branches.map((branch) => (
              <BranchItem
                key={branch.id}
                branch={branch}
                selectedBranch={selectedBranch}
                onClick={setSelectedBranch}
              />
            ))}
          </div>
        )}
      </div>

      <DrawerFooter className="gap-3 border-t border-border/50 pt-4 bg-gradient-to-t from-background to-background/95">
        <Button
          disabled={!selectedBranch}
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
          size="lg"
          onClick={handleContinue}
        >
          متابعة
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
};
