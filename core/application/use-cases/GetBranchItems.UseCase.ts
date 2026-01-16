import { BranchEntity } from "@/core/domain/entities/branch.entity";
import { IBranchRepository } from "../interfaces/IBranchRepository.interface";

export class GetBranchItemsUseCase {
  constructor(private readonly branchRepository: IBranchRepository) {}

  async execute(branchId: string): Promise<BranchEntity> {
    return this.branchRepository.getBranchById(branchId);
  }
}
