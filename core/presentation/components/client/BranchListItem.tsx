import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { setDeliveryConfigurationUseCase } from '@/core/di';
import { CircleSmall, Loader2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { setDeliveryConfiguration } from '../../actions/set-delivery-configuration.action';
import { queryClient } from '@/lib/providers/query-provider';
import { useServerActionMutation } from '@/core/infrastructure/config/server-action-hooks';
import { cn } from '@/lib/utils';

export default function BranchListItem({ branchId, order_type, address, image, branchName } : { branchId: number, order_type: string, address: string, image: string, branchName: string }) {
  const { mutate: setDeliveryConfigurationMutation, isPending } = useServerActionMutation(
    setDeliveryConfiguration,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["delivery-configuration"] });
      },
    }
  );
  return (
    <Item
          key={branchId}
          variant="outline"
          className={cn(
            "justify-center items-center hover:shadow-lg transition-all",
            isPending && "opacity-60 cursor-wait pointer-events-none"
          )}
          onClick={() => {
            if (!isPending) {
              setDeliveryConfigurationMutation({
                deliveryConfiguration: {
                  order_type: order_type as "dinein" | "pickup" | "delivery",
                  branchId: branchId,
                  address: address,
                  branchName: branchName,
                },
              });
            }
          }}
        >
          <ItemMedia className="relative items-center justify-center">
            {isPending ? (
              <div className="w-[50px] h-[50px] rounded-sm bg-muted/20 flex items-center justify-center">
                <Loader2 className="h-5 w-5 text-primary animate-spin" />
              </div>
            ) : (
              <Image
                src={image}
                alt={branchName}
                width={50}
                height={50}
              />
            )}
            {/* {branch.ordering_status === "open" ? (
              <CircleSmall className="size-3 absolute top-0 start-0 text-green-500 fill-green-500" />
            ) : (
              <CircleSmall className="size-3 absolute top-0 start-0 text-red-500 fill-red-500" />
            )} */}
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="text-md font-bold">
              {branchName}
            </ItemTitle>
            <ItemDescription className="text-xs text-muted-foreground">
              {address}
            </ItemDescription>
          </ItemContent>
        </Item>
  )
}
