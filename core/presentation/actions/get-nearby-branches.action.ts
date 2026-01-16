"use server";

import { useCases } from "@/core/infrastructure/factories/UseCaseFactory";

// Caching disabled: always fetch fresh nearby branches
export const getNearbyBranches = async (
  latitude: string,
  longitude: string
) => {
  try {
    console.log("getNearbyBranches action called with:", {
      latitude,
      longitude,
    });
    const result = await useCases.getNearbyBranches.execute(
      latitude,
      longitude
    );
    console.log(
      "getNearbyBranches action result:",
      result?.length || 0,
      "branches"
    );
    return result;
  } catch (error) {
    console.error("getNearbyBranches action error:", error);
    throw error;
  }
};
