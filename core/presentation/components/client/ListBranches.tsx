"use client";

import {
  useServerActionMutation,
  useServerActionQuery,
} from "@/core/infrastructure/config/server-action-hooks";
import { useGetBranchesByOrderType } from "../../hooks/useGetAllBranchesByType";
import { getBranchesByType } from "../../actions/get-branches-by-type";
import { BranchTypeEntity } from "@/core/domain/entities/branchType.entity";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, CircleSmall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { setDeliveryConfiguration } from "../../actions/set-delivery-configuration.action";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { queryClient } from "@/lib/providers/query-provider";
import BranchListItem from "./BranchListItem";

export default function ListBranches({ order_type }: { order_type: string }) {
  const router = useRouter();
  
  const { data, isLoading, error } = useServerActionQuery(getBranchesByType, {
    input: { order_type },
    queryKey: ["branches", order_type],
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-2">
      {data?.filter((branch: BranchTypeEntity) => branch.ordering_status === "open").map((branch: BranchTypeEntity) => (
        <BranchListItem key={branch.id} branchId={branch.id} order_type={order_type} address={branch.address} image={branch.image} branchName={branch.branch_name} />
      ))}
    </div>
  );
}
