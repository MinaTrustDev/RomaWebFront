import dynamic from "next/dynamic";
import { MethodHeader } from "@/core/presentation/home/components/method-header";
import type { Metadata } from "next";
import { SEO_CONSTANTS } from "@/core/domain/constants/seo.constant";
import { getAllProductsUseCase } from "@/core/di";
import { BranchInfoHeader } from "@/core/presentation/home/components/BranchInfoHeader";
import { getDeliveryConfigurationAction } from "@/core/presentation/actions/get-delivery-configuration.action";

// Lazy load PageProducts (contains sliders and product lists)
const PageProducts = dynamic(() => import("@/core/presentation/home/components/PageProducts").then(mod => ({ default: mod.PageProducts })), {
  ssr: true, // Keep SSR for SEO
});

export const metadata: Metadata = {
  title: "الرئيسية",
  description: SEO_CONSTANTS.defaultDescription,
  openGraph: {
    title: SEO_CONSTANTS.defaultTitle,
    description: SEO_CONSTANTS.defaultDescription,
  },
};

export default async function Home() {
  const [deliveryConfigurationData, _] = await getDeliveryConfigurationAction();
  const branch = await getAllProductsUseCase.execute();

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      

      {deliveryConfigurationData?.branchId !== undefined && (
        <>
          <BranchInfoHeader branchData={branch} />
        </>
      )}

      <PageProducts branch={JSON.parse(JSON.stringify(branch))} />
    </div>
  );
}
