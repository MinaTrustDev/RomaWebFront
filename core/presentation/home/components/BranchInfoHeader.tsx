import { BranchEntity } from "@/core/domain/entities/branch.entity";
import React from "react";
import { BranchHeader } from "./branch-header";
import { Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const BranchInfoHeader = ({
  branchData,
}: {
  branchData: BranchEntity;
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-primary/5 border-b border-primary/10">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="bg-background/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 shadow-xl shadow-primary/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            <BranchHeader branchName={branchData.branch_name!} />

            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-muted-foreground font-medium">
              {branchData.address && (
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{branchData.address}</span>
                </div>
              )}
              {branchData.delivery_time && (
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>وقت التوصيل: {branchData.delivery_time}</span>
                </div>
              )}
            </div>
          </div>

          <Badge
            variant={
              branchData.ordering_status === "open" ? "success" : "destructive"
            }
            className="text-base px-6 py-2 rounded-full shadow-lg flex items-center gap-1"
          >
            <span className="relative flex items-center gap-2 h-2 w-2 mr-2">
              {branchData.ordering_status === "open" && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              )}
              <span
                className={cn(
                  "relative inline-flex rounded-full h-2 w-2",
                  branchData.ordering_status === "open"
                    ? "bg-green-500"
                    : "bg-red-500"
                )}
              ></span>
            </span>
            {branchData.ordering_status === "open"
              ? "مفتوح للطلب"
              : "مغلق حالياً"}
          </Badge>
        </div>
      </div>
    </div>
  );
};
