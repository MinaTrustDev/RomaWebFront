import { IBranchRepository } from "../interfaces/IBranchRepository.interface";
import { BranchEntity } from "@/domain/entities/branch.entity";
import { BranchDTO } from "@/domain/dtos/branch.dto";

export class GetNearbyBranchesUseCase {
  constructor(private branchRepository: IBranchRepository) {}

  async execute(latitude: string, longitude: string): Promise<BranchDTO[]> {
    const branches = await this.branchRepository.getNearbyBranches(
      latitude,
      longitude
    );
    // Convert BranchEntity instances to DTOs for server-to-client serialization
    return branches.map((branch) => this.toBranchDTO(branch));
  }

  private toBranchDTO(branch: BranchEntity): BranchDTO {
    return {
      id: branch.id,
      branch_name: branch.branch_name,
      order_type: branch.order_type,
      delivery_time: branch.delivery_time,
      shipping_cost: branch.shipping_cost,
      shipping_cost_tax: branch.shipping_cost_tax,
      address: branch.address,
      ordering_status: branch.ordering_status,
      latitude: branch.latitude,
      longitude: branch.longitude,
      image: branch.image,
      categories: branch.categories.map((cat) => ({
        id: cat.id,
        name_en: cat.name_en,
        name_ar: cat.name_ar,
        image: cat.image,
        products: [], // Nearby branches list doesn't need products
      })),
    };
  }
}
