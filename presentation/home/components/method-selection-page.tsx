"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { DeliveryMethodTabs } from "./delivery-method-tabs";
import { OrderFlowManager } from "./order-flow-manager";
import { useLocalStore } from "@/presentation/store/local.store";

export const MethodSelectionPage = () => {
  const { deliveryMethod } = useLocalStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
      <div className="text-center mb-8 space-y-3">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            مرحبا بك مجددا
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          ما هي طريقة الطلب التي تفضلها؟
        </p>
      </div>

      <Card className="w-full max-w-2xl border-2 border-primary/20 shadow-xl bg-gradient-to-br from-card to-card/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-xl font-semibold text-foreground">
            اختر طريقة الطلب
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DeliveryMethodTabs />
          {deliveryMethod && (
            <div className="mt-6 pt-6 border-t border-border">
              <OrderFlowManager>
                <Button className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                  متابعة الطلب
                </Button>
              </OrderFlowManager>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

