"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useServerActionMutation } from "@/core/infrastructure/config/server-action-hooks";
import { deleteDeliveryConfiguration } from "../../actions/delete-delivery-configuration.actions";
import { queryClient } from "@/lib/providers/query-provider";

export function DeleteDeliveryConfigurationButton() {
  const { mutate, isPending } = useServerActionMutation(
    deleteDeliveryConfiguration,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["delivery-configuration"] });
      },
    }
  );

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-between text-primary bg-primary/10 group transition-all rounded-xl px-4 py-2 shrink-0 border border-primary disabled:opacity-60 disabled:cursor-wait"
      onClick={() => mutate(undefined)}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="font-bold text-base">جاري التغيير...</span>
        </>
      ) : (
        <>
          <span className="font-bold text-base">تغيير</span>
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        </>
      )}
    </Button>
  );
}
