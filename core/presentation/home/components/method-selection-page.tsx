"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft } from "lucide-react";
import { DeliveryMethodTabs } from "./delivery-method-tabs";
import { OrderFlowManager } from "./order-flow-manager";
import { useLocalStore } from "@/core/presentation/store/local.store";
import { cn } from "@/lib/utils";

const PageHeader = () => (
  <div className="text-center mb-8 space-y-4 relative z-10">
    <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
      <Sparkles className="h-4 w-4" />
      <span className="text-sm font-medium">تجربة طعام مميزة</span>
    </div>
    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
      مرحباً بك <span className="text-primary">مجدداً</span>
    </h1>
    <p className="text-lg md:text-xl text-muted-foreground/80 max-w-md mx-auto">
      نحن هنا لتقديم أفضل تجربة بيتزا لك. كيف تود أن تطلب اليوم؟
    </p>
  </div>
);

const DecorativeBackground = () => (
  <>
    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
  </>
);

export const MethodSelectionPage = () => {
  const { deliveryMethod } = useLocalStore();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <DecorativeBackground />

      <PageHeader />

      <Card className="w-full max-w-xl border border-primary/10 shadow-2xl shadow-primary/5 bg-card/80 backdrop-blur-sm relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/20 via-primary to-primary/20" />

        <CardHeader className="pt-8 pb-2 text-center">
          <CardTitle className="text-2xl font-bold">طريقة الاستلام</CardTitle>
          <p className="text-sm text-muted-foreground">
            اختر الطريقة التي تفضلها لاستلام طلبك
          </p>
        </CardHeader>

        <CardContent className="p-6 md:p-8 space-y-8">
          <DeliveryMethodTabs />

          <div
            className={cn(
              "transition-all duration-500 ease-in-out origin-top overflow-hidden",
              deliveryMethod
                ? "opacity-100 max-h-32 scale-100"
                : "opacity-0 max-h-0 scale-95"
            )}
          >
            {deliveryMethod && (
              <OrderFlowManager>
                <Button
                  size="lg"
                  className="w-full text-lg font-bold h-14 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-[1.02]"
                >
                  ابدأ الطلب الآن
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
              </OrderFlowManager>
            )}
          </div>
        </CardContent>
      </Card>

      <p className="mt-8 text-sm text-muted-foreground/60 text-center relative z-10">
        أفضل بيتزا في المدينة، تُحضر بكل حب 🍕
      </p>
    </div>
  );
};
