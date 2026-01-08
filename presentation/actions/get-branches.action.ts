"use server";

import { useCases } from "@/infrastructure/factories/UseCaseFactory";
import { unstable_cache } from "next/cache";

// Cache branches list for 1 hour
// Each order type gets its own cache entry via the cache key
export const getBranches = async (orderType: string) => {
  return unstable_cache(
    async () => {
      try {
        console.log("getBranches action called with orderType:", orderType);
        const result = await useCases.getBranches.execute(orderType);
        console.log("getBranches action result:", result?.length || 0, "branches");
        return result;
      } catch (error: any) {
        console.error("getBranches action error:", error);
        
        // Handle AggregateError
        if (error instanceof AggregateError) {
          const firstError = error.errors?.[0] || error;
          const errorMessage = firstError.message || "Failed to fetch branches";
          console.error("AggregateError details:", error.errors);
          throw new Error(errorMessage);
        }
        
        // Handle regular errors
        if (error instanceof Error) {
          throw error;
        }
        
        // Handle unknown error types
        throw new Error(
          typeof error === "string" ? error : "Failed to fetch branches"
        );
      }
    },
    [`branches-${orderType}`],
    {
      revalidate: 3600, // 1 hour
      tags: ["branches"],
    }
  )();
};

