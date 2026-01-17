import dynamic from "next/dynamic";
import { MethodHeader } from "@/core/presentation/home/components/method-header";
import type { Metadata } from "next";
import { SEO_CONSTANTS } from "@/core/domain/constants/seo.constant";
import { getAllProductsUseCase } from "@/core/di";
import drawsBg from "@/public/draws.svg";
import { BranchInfoHeader } from "@/core/presentation/home/components/BranchInfoHeader";

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
  const branch = await getAllProductsUseCase.execute();

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      <div className="relative w-full  bg-primary/5 pb-4">
        <div
          className="absolute inset-0 w-full h-full bg-primary"
          style={{
            backgroundImage: `url(${drawsBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderBottomLeftRadius: "50% 20%",
            borderBottomRightRadius: "50% 20%",
          }}
        />

        <MethodHeader />
      </div>

      {branch.id !== undefined && (
        <>
          <BranchInfoHeader branchData={JSON.parse(JSON.stringify(branch))} />
        </>
      )}

      <PageProducts branch={JSON.parse(JSON.stringify(branch))} />
    </div>
  );
}
