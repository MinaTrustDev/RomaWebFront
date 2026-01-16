import { BranchEntity } from "@/core/domain/entities/branch.entity";
import { BranchTypeEntity } from "@/core/domain/entities/branchType.entity";
import { CategoryEntity } from "@/core/domain/entities/category.entity";

export interface IBranchRepository {
  getBranchesByOrderType(order_type: string): Promise<BranchTypeEntity[]>;
  getBranchById(branchId: number): Promise<BranchEntity>;
  getNearbyBranches(
    latitude: string,
    longitude: string
  ): Promise<BranchEntity[]>;
  // getBranchItems(branchId: string): Promise<BranchEntity>;
}
