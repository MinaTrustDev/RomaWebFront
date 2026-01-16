import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const ProductBackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="mb-8 md:mb-12 text-muted-foreground hover:text-foreground hover:bg-muted/50 -mr-4"
    >
      <ArrowRight className="h-5 w-5 ml-2" />
      <span className="text-lg">العودة للقائمة</span>
    </Button>
  );
};
