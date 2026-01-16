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

export default function ListBranches({ order_type }: { order_type: string }) {
  const { mutate: setDeliveryConfigurationMutation } = useServerActionMutation(
    setDeliveryConfiguration,
    {}
  );
  const { data, isLoading, error } = useServerActionQuery(getBranchesByType, {
    input: { order_type },
    queryKey: ["branches", order_type],
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-2">
      {data?.map((branch: BranchTypeEntity) => (
        <Item
          key={branch.id}
          variant="outline"
          className="justify-center items-center hover:shadow-lg"
          onClick={() => {
            setDeliveryConfigurationMutation({
              deliveryConfiguration: {
                order_type: order_type as "dinein" | "pickup" | "delivery",
                branchId: branch.id,
                address: branch.address,
              },
            });
          }}
        >
          <ItemMedia className="relative items-center justify-center">
            <Image
              src={branch.image}
              alt={branch.branch_name}
              width={50}
              height={50}
            />
            {branch.ordering_status === "open" ? (
              <CircleSmall className="size-3 absolute top-0 start-0 text-green-500 fill-green-500" />
            ) : (
              <CircleSmall className="size-3 absolute top-0 start-0 text-red-500 fill-red-500" />
            )}
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="text-md font-bold">
              {branch.branch_name}
            </ItemTitle>
            <ItemDescription className="text-xs text-muted-foreground">
              {branch.address}
            </ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}
