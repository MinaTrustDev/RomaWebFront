import ProductCardById from "@/components/common/ProductCardById";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDeliveryConfigurationAction } from "@/core/presentation/actions/get-delivery-configuration.action";
import { getDontMissAction } from "@/core/presentation/actions/get-dont-miss.action";
import { getProductBySlugAction } from "@/core/presentation/actions/get-product-details.action";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

interface LayoutProps {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
  dontMiss: React.ReactNode;
}

export default async function Layout({
  params,
  children,
  dontMiss,
}: LayoutProps) {


  return (
    <div>
      {children}
      {dontMiss}
    </div>
  );
}
