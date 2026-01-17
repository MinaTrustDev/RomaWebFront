import { BranchEntity } from "@/core/domain/entities/branch.entity";
import { NearbyBranchResponseDTO } from "../dtos/GetNearbyBranchResponse.dto";
import { NearbyBranchEntity } from "@/core/domain/entities/NearbyBranch.entity";

export class NearbyResponseMapper {
  static toDomain(data: NearbyBranchResponseDTO['branches'][number]): NearbyBranchEntity {
    return new NearbyBranchEntity({
      id: data.id,
      name: data.name,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      delivery_time: data.delivery_time,
      shipping_cost: data.shipping_cost,
      shipping_cost_tax: data.shipping_cost_tax,
      order_type: data["order-type"],
      is_open: data.is_open,
      image: data.image,
      matched_area_id: data.matched_area_id,
      matched_area_title: data.matched_area_title,
      area_shipping_rate: data.area_shipping_rate,
      area_shipping_rate_tax: data.area_shipping_rate_tax,
      cost_calculation: data.cost_calculation,
    });
  }
  static toDomainList(data: NearbyBranchResponseDTO['branches']): NearbyBranchEntity[] {
    return data.map((item) => this.toDomain(item));
  }
}