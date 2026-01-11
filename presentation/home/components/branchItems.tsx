import { getBranchItems } from "@/presentation/actions/get-branch-items.action";
import { ProductSlider } from "./productSlider";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { BranchDTO } from "@/domain/dtos/branch.dto";
import { StructuredData } from "./structured-data";
import { BranchHeader } from "./branch-header";
import { cn } from "@/lib/utils";
import OffersSlider from "./OffersSlider";

export const BranchItems = async ({ branchId }: { branchId: string }) => {
  const branchData = (await getBranchItems(branchId)) as BranchDTO | null;

  if (!branchData) {
    return null;
  }

  // Sort categories: "Offers" (عروض) first, then others
  const sortedCategories = [...branchData.categories].sort((a, b) => {
    const isOfferA =
      a.name_ar?.includes("عروض") || a.name_en?.toLowerCase().includes("offer");
    const isOfferB =
      b.name_ar?.includes("عروض") || b.name_en?.toLowerCase().includes("offer");

    if (isOfferA && !isOfferB) return -1;
    if (!isOfferA && isOfferB) return 1;
    return 0; // Keep original order for others
  });

  return (
    <>
      <StructuredData branch={branchData} type="Restaurant" />

      {/* Branch Info Header Section */}
      <div className="relative w-full overflow-hidden bg-primary/5 border-b border-primary/10">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

        <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="bg-background/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 shadow-xl shadow-primary/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1 space-y-4">
              <BranchHeader branchName={branchData.branch_name} />

              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-muted-foreground font-medium">
                {branchData.address && (
                  <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{branchData.address}</span>
                  </div>
                )}
                {branchData.delivery_time && (
                  <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>وقت التوصيل: {branchData.delivery_time}</span>
                  </div>
                )}
              </div>
            </div>

            <Badge
              variant={
                branchData.ordering_status === "open"
                  ? "success"
                  : "destructive"
              }
              className="text-base px-6 py-2 rounded-full shadow-lg flex items-center gap-1"
            >
              <span className="relative flex items-center gap-2 h-2 w-2 mr-2">
                {branchData.ordering_status === "open" && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                )}
                <span
                  className={cn(
                    "relative inline-flex rounded-full h-2 w-2",
                    branchData.ordering_status === "open"
                      ? "bg-green-500"
                      : "bg-red-500"
                  )}
                ></span>
              </span>
              {branchData.ordering_status === "open"
                ? "مفتوح للطلب"
                : "مغلق حالياً"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Categories Sections */}
      <div className="flex flex-col w-full space-y-8 md:space-y-12 pb-24">
        <section className="w-full relative overflow-visible">
          <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
            <OffersSlider
              products={
                sortedCategories.find((category) =>
                  category.name_ar.includes("عروض")
                )?.products || []
              }
              title=""
            />
          </div>
        </section>
        {sortedCategories.slice(1).map((category) => (
          <section
            key={category.id}
            className="w-full relative overflow-visible"
          >
            <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
              <ProductSlider
                title={category.name_en}
                products={category.products}
                aspectRatio={"square"}
              />
            </div>
          </section>
        ))}
      </div>
    </>
  );
};
