"use server";

import { useCases } from "@/infrastructure/factories/UseCaseFactory";
import { unstable_cache } from "next/cache";

// Cache nearby branches for 15 minutes (location-based, shorter cache)
// Each location gets its own cache entry via the cache key
export const getNearbyBranches = async (latitude: string, longitude: string) => {
  return unstable_cache(
    async () => {
      try {
        console.log("getNearbyBranches action called with:", { latitude, longitude });
        const result = await useCases.getNearbyBranches.execute(latitude, longitude);
        console.log("getNearbyBranches action result:", result?.length || 0, "branches");
        return result;
      } catch (error) {
        console.error("getNearbyBranches action error:", error);
        throw error;
      }
    },
    [`nearby-branches-${latitude}-${longitude}`],
    {
      revalidate: 900, // 15 minutes
      tags: ["nearby-branches"],
    }
  )();
};

