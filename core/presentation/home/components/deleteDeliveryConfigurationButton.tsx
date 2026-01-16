"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useServerActionMutation } from "@/core/infrastructure/config/server-action-hooks";
import { deleteDeliveryConfiguration } from "../../actions/delete-delivery-configuration.actions";

export function DeleteDeliveryConfigurationButton() {
  const { mutate, isPending } = useServerActionMutation(
    deleteDeliveryConfiguration,
    {}
  );

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-between text-primary bg-primary/10 group transition-all rounded-xl px-4 py-2 shrink-0 border border-primary"
      onClick={() => mutate(undefined)}
      disabled={isPending}
    >
      <span className="font-bold text-base">تغيير</span>
      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
    </Button>
  );
}
