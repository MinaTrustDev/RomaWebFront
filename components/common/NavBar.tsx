"use client";

import React from 'react'
import { MethodHeader } from '@/core/presentation/home/components/method-header';
import { Button } from '../ui/button';
import { DeliveryIcon, PickupIcon, DineInIcon } from '../icons';
import { DeliveryConfiguration } from '@/core/domain/value-objects/deliveryConfigurations';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DeliveryContent, DineInContent, PickupContent } from '@/core/presentation/home/components/delivery-method-tabs';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { MapPin, ShoppingCart, User, XIcon } from 'lucide-react';
import Link from 'next/link';
import RomaLogo from '../icons/RomaLogo';

export default function NavBar({ deliveryConfig }: { deliveryConfig: DeliveryConfiguration | null }) {
    
  return (
    <div className="relative flex flex-row items-center justify-between gap-2 flex-wrap w-full p-4 bg-primary" dir="ltr">
        <div className="flex flex-row items-center justify-center gap-4">
            <Link href="/" className="text-2xl font-bold">
                <RomaLogo className="text-primary size-25" />
            </Link>
            <div className="flex gap-2 items-center">
                <DineinDialog deliveryConfig={deliveryConfig} />
                <PickupDialog deliveryConfig={deliveryConfig} />
                <DeliveryDialog deliveryConfig={deliveryConfig} />
            </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
            {deliveryConfig ? <Alert>
                <MapPin className="size-4" />
                <AlertTitle>
                    {deliveryConfig?.branchName}
                </AlertTitle>
                <AlertDescription>
                    {deliveryConfig?.address}
                </AlertDescription>
            </Alert> : <Alert>
                <XIcon className="size-4" />
                <AlertTitle>
                    No delivery configuration
                </AlertTitle>
                <AlertDescription>
                    Please select a delivery method
                </AlertDescription>
            </Alert>}
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
                <Button variant={"outline"} size={"icon"} className="flex flex-row items-center justify-center gap-2">
                    <ShoppingCart className="size-4" />
                </Button>
                <Button variant={"outline"} className="flex flex-row items-center justify-center gap-2">
                    <User className="size-4" />
                    Login
                </Button>
        </div>
      </div>
  );
}

const DeliveryDialog = ({ deliveryConfig }: { deliveryConfig: DeliveryConfiguration | null }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className={cn(!deliveryConfig?.order_type.includes("delivery") && "grayscale")}>
                    <DeliveryIcon className="text-red-500" />
                    Delivery
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Delivery
                    </DialogTitle>
                </DialogHeader>
                <DeliveryContent />
            </DialogContent>
        </Dialog>
    )
}


const DineinDialog = ({ deliveryConfig }: { deliveryConfig: DeliveryConfiguration | null }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className={cn(!deliveryConfig?.order_type.includes("dinein") && "grayscale")}>
                    <DineInIcon className="text-red-500" />
                    Dine In
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Dine In
                    </DialogTitle>
                </DialogHeader>
                <DineInContent />
            </DialogContent>
        </Dialog>
    )
}


const PickupDialog = ({ deliveryConfig }: { deliveryConfig: DeliveryConfiguration | null }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className={cn(!deliveryConfig?.order_type.includes("pickup") && "grayscale")}>
                    <PickupIcon className="text-red-500" />
                    Pickup
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Pickup
                    </DialogTitle>
                </DialogHeader>
                <PickupContent />
            </DialogContent>
        </Dialog>
    )
}
