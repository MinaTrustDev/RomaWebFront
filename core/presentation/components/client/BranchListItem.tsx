"use client";

import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import Image from 'next/image';
import { setDeliveryConfigurationAction } from '../../actions/set-delivery-configuration.action';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { getDeliveryConfigurationAction } from '../../actions/get-delivery-configuration.action';
import { useServerActionMutation, useServerActionQuery } from '@/core/infrastructure/config/server-action-hooks';
import { queryClient } from '@/lib/providers/query-provider';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DeliveryConfiguration } from '@/core/domain/value-objects/deliveryConfigurations';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';



export default function BranchListItem({ branchId, order_type, address, image, branchName, deliveryConfig } : { branchId: number, order_type: string, address: string, image: string, branchName: string, deliveryConfig: DeliveryConfiguration | null }) {
  const {mutate: setDeliveryConfiguration, isPending} = useServerActionMutation(setDeliveryConfigurationAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-configuration"] });
    },
  })
  return (
    <Item
          key={branchId}
          variant="outline"
          className={cn(
            "justify-center items-center hover:shadow-lg transition-all",
            isPending && "opacity-60 cursor-wait pointer-events-none",
            // isLoadingDeliveryConfig && "opacity-60 cursor-wait pointer-events-none",
            deliveryConfig?.branchId === branchId && "bg-primary/10"
          )}
          onClick={async () => {
            setDeliveryConfiguration({
              deliveryConfiguration: {
                order_type: order_type as "dinein" | "pickup" | "delivery",
                branchId: branchId,
                address: address,
                branchName: branchName,
              },
            });
          }}
        >
          <ItemMedia className="relative items-center justify-center">
            <Image
                src={image}
                alt={branchName}
                width={50}
                height={50}
              />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="text-md font-bold">
              {branchName}
            </ItemTitle>
            <ItemDescription className="text-xs text-muted-foreground">
              {address}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="icon" className="group-hover:-translate-x-1 transition-transform">
              <ArrowRight className="size-4 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </ItemActions>
        </Item>
  )
}
