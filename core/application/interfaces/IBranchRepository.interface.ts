import { BranchEntity } from "@/core/domain/entities/branch.entity";
import { BranchTypeEntity } from "@/core/domain/entities/branchType.entity";
import { CategoryEntity } from "@/core/domain/entities/category.entity";
import { NearbyBranchEntity } from "@/core/domain/entities/NearbyBranch.entity";

export interface IBranchRepository {
  getBranchesByOrderType(order_type: string): Promise<BranchTypeEntity[]>;
  getBranchById(branchId: number): Promise<BranchEntity>;
  getNearbyBranches(
    latitude: number,
    longitude: number
  ): Promise<NearbyBranchEntity>;
}
