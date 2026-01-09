"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, MapPin } from "lucide-react";
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
        "flex flex-row items-center gap-4 cursor-pointer p-4 border transition-all duration-300 rounded-2xl group",
        isSelected
          ? "bg-primary border-primary shadow-lg shadow-primary/25"
          : "bg-card border-border/60 hover:border-primary/50 hover:bg-muted/30 hover:shadow-md"
      )}
    >
      <div className={cn(
        "relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden ring-2 ring-offset-2 ring-offset-background transition-all",
        isSelected ? "ring-white/30" : "ring-transparent group-hover:ring-primary/10"
      )}>
        <Image
          src={branch.image}
          alt={branch.branch_name}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            isSelected || "group-hover:scale-110"
          )}
          sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h5
            className={cn(
              "font-bold text-lg truncate",
              isSelected ? "text-primary-foreground" : "text-foreground"
            )}
          >
            {branch.branch_name}
          </h5>
          <Badge
            variant={isOpen ? "success" : "destructive"}
            className={cn(
              "text-xs px-2 py-0.5 rounded-full shadow-sm",
              isSelected && isOpen && "bg-white/20 text-white border-white/20 hover:bg-white/30"
            )}
          >
            {isOpen ? "مفتوح" : "مغلق"}
          </Badge>
        </div>

        {branch.address && (
          <div className={cn(
            "flex items-center gap-1.5 text-sm",
            isSelected ? "text-primary-foreground/90" : "text-muted-foreground"
          )}>
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <p className="truncate">{branch.address}</p>
          </div>
        )}

        {branch.delivery_time && (
          <div className={cn(
            "flex items-center gap-1.5 text-xs font-medium",
            isSelected ? "text-primary-foreground/80" : "text-primary/80"
          )}>
            <Clock className="h-3.5 w-3.5 flex-shrink-0" />
            <span>وقت التوصيل: {branch.delivery_time}</span>
          </div>
        )}
      </div>

      {isSelected && (
        <div className="flex-shrink-0 animate-in zoom-in spin-in-12 duration-300">
          <div className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      )}
    </Card>
  );
};
