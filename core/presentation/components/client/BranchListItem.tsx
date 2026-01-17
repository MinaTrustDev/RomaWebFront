import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { setDeliveryConfigurationUseCase } from '@/core/di';
import { CircleSmall } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { setDeliveryConfiguration } from '../../actions/set-delivery-configuration.action';
import { queryClient } from '@/lib/providers/query-provider';
import { useServerActionMutation } from '@/core/infrastructure/config/server-action-hooks';

export default function BranchListItem({ branchId, order_type, address, image, branchName } : { branchId: number, order_type: string, address: string, image: string, branchName: string }) {
  const { mutate: setDeliveryConfigurationMutation } = useServerActionMutation(
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
          className="justify-center items-center hover:shadow-lg"
          onClick={() => setDeliveryConfigurationMutation({
            deliveryConfiguration: {
              order_type: order_type as "dinein" | "pickup" | "delivery",
              branchId: branchId,
              address: address,
            },
          })}
        >
          <ItemMedia className="relative items-center justify-center">
            <Image
              src={image}
              alt={branchName}
              width={50}
              height={50}
            />
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
