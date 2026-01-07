"use server";

import { useCases } from "@/infrastructure/factories/UseCaseFactory";
import { unstable_cache } from "next/cache";

// Cache branch items for 30 minutes
// Each branch gets its own cache entry via the cache key
export const getBranchItems = async (branchId: string) => {
  return unstable_cache(
    async () => {
      try {
        console.log("getBranchItems action called with branchId:", branchId);
        const result = await useCases.getBranchById.execute(branchId);
        console.log("getBranchItems result:", result ? {
          id: result.id,
          name: result.branch_name,
          categoriesCount: result.categories?.length || 0,
          totalProducts: result.categories?.reduce((sum: number, cat: any) => sum + (cat.products?.length || 0), 0) || 0
        } : "null");
        return result;
      } catch (error) {
        console.error("getBranchItems action error:", error);
        throw error;
      }
    },
    [`branch-items-${branchId}`],
    {
      revalidate: 1800, // 30 minutes
      tags: ["branch-items"],
    }
  )();
};

