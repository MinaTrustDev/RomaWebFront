import { BranchEntity } from "@/core/domain/entities/branch.entity";
import { BranchByOrderTypeDTO } from "../dtos/BranchesByOrderType.dto";
import { BranchTypeEntity } from "@/core/domain/entities/branchType.entity";

export class BranchByOrderTypeMapper {
  static toDomain(
    branchByOrderTypeDTO: BranchByOrderTypeDTO
  ): BranchTypeEntity {
    return new BranchTypeEntity({
      address: branchByOrderTypeDTO.address,
      branch_name: branchByOrderTypeDTO.branch_name,
      id: branchByOrderTypeDTO.id,
      image: branchByOrderTypeDTO.image,
      ordering_status:
        branchByOrderTypeDTO.ordering_status as BranchTypeEntity["ordering_status"],
    });
  }

  static toDomainList(
    branchesByOrderTypeDTO: BranchByOrderTypeDTO[]
  ): BranchTypeEntity[] {
    return branchesByOrderTypeDTO.map(this.toDomain);
  }
}
