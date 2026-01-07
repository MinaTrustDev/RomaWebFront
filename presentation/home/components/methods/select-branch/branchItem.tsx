"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { BranchDTO } from "@/domain/dtos/branch.dto";

export const BranchItem = ({
  branch,
  selectedBranch,
  onClick,
}: {
  branch: BranchDTO;
  selectedBranch: BranchDTO | null;
  onClick: (branch: BranchDTO) => void;
}) => {
  const isSelected = selectedBranch?.id === branch.id;
  const isOpen = branch.ordering_status === "open";

  return (
    <Card
      onClick={() => onClick(branch)}
      className={cn(
        "flex flex-row items-center gap-4 cursor-pointer p-4 border-2 transition-all duration-300 hover:shadow-lg",
        isSelected
          ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-primary shadow-lg ring-2 ring-primary/20"
          : "bg-card border-border hover:border-primary/50 hover:bg-accent/30"
      )}
    >
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden ring-2 ring-offset-2 ring-offset-background ring-primary/20">
        <Image
          src={branch.image}
          alt={branch.branch_name}
          fill
          className={cn(
            "object-cover transition-transform duration-300",
            isSelected && "scale-105"
          )}
          sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h5
            className={cn(
              "font-semibold text-base truncate",
              isSelected ? "text-primary-foreground" : "text-foreground"
            )}
          >
            {branch.branch_name}
          </h5>
          <Badge
            variant={isOpen ? "success" : "destructive"}
            className={cn(
              "text-xs",
              isSelected &&
                isOpen &&
                "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
            )}
          >
            {isOpen ? "مفتوح" : "مغلق"}
          </Badge>
        </div>
        {branch.address && (
          <p
            className={cn(
              "text-sm truncate",
              isSelected
                ? "text-primary-foreground/90"
                : "text-muted-foreground"
            )}
          >
            {branch.address}
          </p>
        )}
        {branch.delivery_time && (
          <p
            className={cn(
              "text-xs mt-1 font-medium",
              isSelected
                ? "text-primary-foreground/80"
                : "text-muted-foreground"
            )}
          >
            ⏱️ وقت التوصيل: {branch.delivery_time}
          </p>
        )}
      </div>
      {isSelected && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>
        </div>
      )}
    </Card>
  );
};
