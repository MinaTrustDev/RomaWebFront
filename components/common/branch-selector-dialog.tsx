"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";
import { BranchList } from "@/components/common/branch-list";
import { AlertCircle } from "lucide-react";
import { BranchDTO } from "@/core/domain/dtos/branch.dto";

interface BranchSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  branches: BranchDTO[];
  selectedBranch: BranchDTO | null;
  onBranchSelect: (branch: BranchDTO) => void;
  onContinue: () => void;
  loading?: boolean;
  error?: string | null;
  headerAction?: React.ReactNode;
}

export const BranchSelectorDialog = ({
  open,
  onOpenChange,
  title,
  description,
  branches,
  selectedBranch,
  onBranchSelect,
  onContinue,
  loading = false,
  error = null,
  headerAction,
}: BranchSelectorDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] bg-gradient-to-b from-background to-background/95">
        <DialogHeader className="text-center border-b border-border/50 pb-4">
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent flex-1">
              {title}
            </DialogTitle>
            {headerAction}
          </div>
          <DialogDescription className="text-base text-muted-foreground mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 pb-4 flex-1 overflow-y-auto max-h-[60vh]">
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
            <BranchList
              branches={branches}
              selectedBranch={selectedBranch}
              onBranchSelect={onBranchSelect}
            />
          )}
        </div>

        <DialogFooter className="gap-3 border-t border-border/50 pt-4 bg-gradient-to-t from-background to-background/95">
          <Button
            disabled={!selectedBranch}
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            size="lg"
            onClick={onContinue}
          >
            متابعة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
