import { IBranchRepository } from "../interfaces/IBranchRepository.interface";
import { BranchEntity } from "@/core/domain/entities/branch.entity";
import { BranchDTO } from "@/core/domain/dtos/branch.dto";
import { NearbyBranchEntity } from "@/core/domain/entities/NearbyBranch.entity";

export class GetNearbyBranchesUseCase {
  constructor(private branchRepository: IBranchRepository) {}

  async execute(latitude: number, longitude: number): Promise<NearbyBranchEntity> {
    const nearbyBranch = await this.branchRepository.getNearbyBranches(
      latitude,
      longitude
    );
    
    return nearbyBranch;
  }
}
