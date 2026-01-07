import { BranchEntity } from "@/domain/entities/branch.entity";

export interface IBranchRepository {
  getBranchesByOrderType(orderType: string): Promise<BranchEntity[]>;
  getBranchById(branchId: string): Promise<BranchEntity | null>;
  getNearbyBranches(latitude: string, longitude: string): Promise<BranchEntity[]>;
}

