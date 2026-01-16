import { BranchTypeEntity } from "@/core/domain/entities/branchType.entity";
import { IBranchRepository } from "../interfaces/IBranchRepository.interface";

export class GetBranchesByOrderTypeUseCase {
  constructor(private branchRepository: IBranchRepository) {}

  async execute({
    order_type,
  }: {
    order_type: string;
  }): Promise<BranchTypeEntity[]> {
    const branches = await this.branchRepository.getBranchesByOrderType(
      order_type
    );
    return branches;
  }
}
