import { BranchEntity } from "@/core/domain/entities/branch.entity";
import { BranchItemsDTO } from "../dtos/BranchItems.dto";
import { CategoriesResponseMapper } from "./CategoriesResponse.mapper";

export class BranchItemsResponseMapper {
  static toDomain(branchItems: BranchItemsDTO): BranchEntity {
    return new BranchEntity({
      id: branchItems.id,
      branch_name: branchItems.branch_name,
      order_type: branchItems.order_type,
      delivery_time: branchItems.delivery_time,
      shipping_cost: branchItems.shipping_cost,
      shipping_cost_tax: branchItems.shipping_cost_tax,
      address: branchItems.address,
      ordering_status: branchItems.ordering_status as "open" | "closed",
      latitude: branchItems.latitude,
      longitude: branchItems.longitude,
      image: branchItems.image,
      categories: CategoriesResponseMapper.toDomainList(branchItems.categories),
    });
  }
}
