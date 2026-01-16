import { IBranchRepository } from "../interfaces/IBranchRepository.interface";
import { BranchEntity } from "@/core/domain/entities/branch.entity";
import { BranchDTO } from "@/core/domain/dtos/branch.dto";
import { CategoryDTO } from "@/core/domain/dtos/category.dto";

export class GetBranchesUseCase {
  constructor(private branchRepository: IBranchRepository) {}

  async execute(orderType: string): Promise<BranchDTO[]> {
    // Convert "dine-in" to "dinein" for API
    const orderTypeParam = orderType === "dine-in" ? "dinein" : orderType;
    console.log(
      "GetBranchesUseCase.execute - orderType:",
      orderType,
      "-> orderTypeParam:",
      orderTypeParam
    );
    const branches = await this.branchRepository.getBranchesByOrderType(
      orderTypeParam
    );
    console.log("GetBranchesUseCase.execute - result count:", branches.length);
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
        products: [], // Branches list doesn't need products
      })),
    };
  }
}
