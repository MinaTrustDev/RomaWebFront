import { GetBranchesUseCase } from "@/application/use-cases/GetBranchesUseCase";
import { GetBranchByIdUseCase } from "@/application/use-cases/GetBranchByIdUseCase";
import { GetNearbyBranchesUseCase } from "@/application/use-cases/GetNearbyBranchesUseCase";
import { GetProductByIdUseCase } from "@/application/use-cases/GetProductByIdUseCase";
import { BranchRepository } from "@/infrastructure/repositories/BranchRepository";
import { ProductRepository } from "@/infrastructure/repositories/ProductRepository";

// Singleton instances
const branchRepository = new BranchRepository();
const productRepository = new ProductRepository();

export const useCases = {
  getBranches: new GetBranchesUseCase(branchRepository),
  getBranchById: new GetBranchByIdUseCase(branchRepository),
  getNearbyBranches: new GetNearbyBranchesUseCase(branchRepository),
  getProductById: new GetProductByIdUseCase(productRepository),
};
