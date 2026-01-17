"use server";

import { GetNearbyBranchesUseCase } from "@/core/application/use-cases/GetNearbyBranchesUseCase";
import { getNearbyBranchesUseCase } from "@/core/di";
import { z } from "zod";
import { createServerAction } from "zsa";


export const getNearbyBranches = async (
  {latitude, longitude}:{latitude: number,
  longitude: number}
) => {
  try {
    const result = await getNearbyBranchesUseCase.execute(
      latitude,
      longitude
    );
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("getNearbyBranches action error:", error);
    throw error;
  }
};

export const getNearbyBranchesAction = createServerAction()
  .input(
    z.object({
      latitude: z.number(),
      longitude: z.number(),
    })
  )
  .handler(async ({ input }: { input: { latitude: number, longitude: number } }) => {
    const result = await getNearbyBranchesUseCase.execute(
      input.latitude,
      input.longitude
    );
    return JSON.parse(JSON.stringify(result));
  });