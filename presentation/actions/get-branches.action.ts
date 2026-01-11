"use server";

import { useCases } from "@/infrastructure/factories/UseCaseFactory";

// Caching disabled: call the use case directly to always fetch fresh data
export const getBranches = async (orderType: string) => {
  try {
    console.log("getBranches action called with orderType:", orderType);
    const result = await useCases.getBranches.execute(orderType);
    console.log("getBranches action result:", result?.length || 0, "branches");
    return result;
  } catch (error: any) {
    console.error("getBranches action error:", error);

    if (error instanceof AggregateError) {
      const firstError = error.errors?.[0] || error;
      const errorMessage = firstError.message || "Failed to fetch branches";
      console.error("AggregateError details:", error.errors);
      throw new Error(errorMessage);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      typeof error === "string" ? error : "Failed to fetch branches"
    );
  }
};
