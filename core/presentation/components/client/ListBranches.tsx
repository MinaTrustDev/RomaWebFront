"use client";

import {
  useServerActionMutation,
  useServerActionQuery,
} from "@/core/infrastructure/config/server-action-hooks";
import { useGetBranchesByOrderType } from "../../hooks/useGetAllBranchesByType";
import { getBranchesByType } from "../../actions/get-branches-by-type";
import { BranchTypeEntity } from "@/core/domain/entities/branchType.entity";
import { useRouter } from "next/navigation";
import { queryClient } from "@/lib/providers/query-provider";
import BranchListItem from "./BranchListItem";
import { BranchListItemSkeleton } from "./BranchListItemSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getDeliveryConfigurationAction } from "../../actions/get-delivery-configuration.action";

const getDeliveryConfigutation = () => {
  return useQuery({
    queryKey: ["delivery-configuration"],
    queryFn: async () => {
      const [deliveryConfig, error] = await getDeliveryConfigurationAction();
      if (error) {
        return null;
      }
      return deliveryConfig;
    },
    staleTime: 0, // No caching
    gcTime: 0, // No cache retention
    refetchOnMount: true,
  })
}

export default function ListBranches({ order_type }: { order_type: string }) {
  const router = useRouter();
  const {data: deliveryConfig} = getDeliveryConfigutation();
  const { data, isLoading, error } = useServerActionQuery(getBranchesByType, {
    input: { order_type },
    queryKey: ["branches", order_type],
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <BranchListItemSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (error) return <div className="p-4 text-destructive">Error: {error.message}</div>;

  const openBranches = data?.filter((branch: BranchTypeEntity) => branch.ordering_status === "open") || [];

  if (openBranches.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        لا توجد فروع متاحة
      </div>
    );
  }

  return ( 
    <div className="flex flex-col gap-2" dir="ltr"> 
      {openBranches.map((branch: BranchTypeEntity) => (
        <BranchListItem 
          key={branch.id} 
          branchId={branch.id} 
          order_type={order_type} 
          address={branch.address} 
          image={branch.image} 
          branchName={branch.branch_name} 
          deliveryConfig={deliveryConfig ?? null}
        />
      ))}
    </div>
  );
}
