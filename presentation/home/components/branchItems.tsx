import { getBranchItems } from "@/presentation/actions/get-branch-items.action";
import { ProductSlider, ProductData } from "./productSlider";
import { SectionHeader } from "@/components/common/section-header";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { BranchDTO } from "@/domain/dtos/branch.dto";
import { CategoryDTO } from "@/domain/dtos/category.dto";
import { ProductDTO } from "@/domain/dtos/product.dto";
import { StructuredData } from "./structured-data";
import { BranchHeader } from "./branch-header";

export const BranchItems = async ({ branchId }: { branchId: string }) => {
  const branchData = (await getBranchItems(branchId)) as BranchDTO | null;

  if (!branchData) {
    return null;
  }

  return (
    <>
      <StructuredData branch={branchData} type="Restaurant" />
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12 bg-linear-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 border border-primary/20">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <BranchHeader branchName={branchData.branch_name} />
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {branchData.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{branchData.address}</span>
                  </div>
                )}
                {branchData.delivery_time && (
                  <div className="flex items-center gap-2">
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
              className="text-sm px-3 py-1.5"
            >
              {branchData.ordering_status === "open" ? "مفتوح" : "مغلق"}
            </Badge>
          </div>
        </div>

        <div className="space-y-16">
          {branchData.categories.map((category) => (
            <ProductSlider
              key={category.id}
              title={category.name_ar || category.name_en}
              products={category.products}
            />
          ))}
        </div>
      </div>
    </>
  );
};
