"use server";

import { useCases } from "@/infrastructure/factories/UseCaseFactory";

// Caching disabled: always fetch fresh branch items
export const getBranchItems = async (branchId: string) => {
  try {
    console.log("getBranchItems action called with branchId:", branchId);
    const result = await useCases.getBranchById.execute(branchId);
    console.log(
      "getBranchItems result:",
      result
        ? {
            id: result.id,
            name: result.branch_name,
            categoriesCount: result.categories?.length || 0,
            totalProducts:
              result.categories?.reduce(
                (sum: number, cat: any) => sum + (cat.products?.length || 0),
                0
              ) || 0,
          }
        : "null"
    );
    return result;
  } catch (error) {
    console.error("getBranchItems action error:", error);
    throw error;
  }
};
