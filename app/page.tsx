import { MethodSelectionPage } from "@/presentation/home/components/method-selection-page";
import { BranchItems } from "@/presentation/home/components/branchItems";
import { MethodHeader } from "@/presentation/home/components/method-header";
import { OrderFlowManager } from "@/presentation/home/components/order-flow-manager";
import { DeliveryMethodInitializer } from "@/presentation/home/components/delivery-method-initializer";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { SEO_CONSTANTS } from "@/domain/constants/seo.constant";

export const metadata: Metadata = {
  title: "الرئيسية",
  description: SEO_CONSTANTS.defaultDescription,
  openGraph: {
    title: SEO_CONSTANTS.defaultTitle,
    description: SEO_CONSTANTS.defaultDescription,
  },
};

// Enable static generation with revalidation
export const revalidate = 1; // Revalidate every hour
// export const dynamic = "force-dynamic"; // Allow dynamic content based on cookies

export default async function Home() {
  const cookieStore = await cookies();
  const branchId = cookieStore.get("branch_id")?.value || null;

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      <DeliveryMethodInitializer />
      <MethodHeader />
      <OrderFlowManager>
        <div />
      </OrderFlowManager>
      {!branchId ? (
        <MethodSelectionPage />
      ) : (
        <div className="w-full">
          <BranchItems branchId={branchId} />
        </div>
      )}
    </div>
  );
}
