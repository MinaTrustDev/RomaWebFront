import { IBranchRepository } from "@/core/application/interfaces/IBranchRepository.interface";
import { BranchEntity } from "@/core/domain/entities/branch.entity";
import { CategoryEntity } from "@/core/domain/entities/category.entity";
import { ProductEntity } from "@/core/domain/entities/product.entity";
import {
  VariationEntity,
  AttributeEntity,
} from "@/core/domain/entities/variants.entity";
import { axiosClient } from "@/lib/axiosClient";
import { API_CONFIG } from "../config/api.config";
import { BranchByOrderTypeDTO } from "../dtos/BranchesByOrderType.dto";
import { BranchByOrderTypeMapper } from "../mappers/BranchByOrderType.mapper";
import { BranchTypeEntity } from "@/core/domain/entities/branchType.entity";
import { CategoriesResponseDTO } from "../dtos/CategoriesResponse.dto";
import { CategoriesResponseMapper } from "../mappers/CategoriesResponse.mapper";
import { BranchItemsDTO } from "../dtos/BranchItems.dto";
import { BranchItemsResponseMapper } from "../mappers/BranchItemsResponse.mapper";
import { NearbyResponseMapper } from "../mappers/NearbyResponseMapper";
import { NearbyBranchResponseDTO } from "../dtos/GetNearbyBranchResponse.dto";
import { NearbyBranchEntity } from "@/core/domain/entities/NearbyBranch.entity";

export class BranchRepository implements IBranchRepository {
  async getBranchesByOrderType(
    order_type: string
  ): Promise<BranchTypeEntity[]> {
    console.log("getBranchesByOrderType - orderType:", order_type);
    const response: Response = await fetch(
      `${API_CONFIG.BASE_URL}/stora/v1/branch-items?order_type=${order_type}`,
      {
        method: "GET",
        headers: API_CONFIG.HEADERS,
      }
    );

    console.log("getBranchesByOrderType - response:", response);

    if (!response.ok) {
      throw new Error("Failed to fetch branches");
    }

    const data: BranchByOrderTypeDTO[] = await response.json();
    return BranchByOrderTypeMapper.toDomainList(data);
  }

  async getNearbyBranches(
    latitude: number,
    longitude: number
  ): Promise<NearbyBranchEntity> {

    const response: Response = await fetch(
      `${API_CONFIG.BASE_URL}/stora/v1/branches/nearby`,
      {
        method: "POST",
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify({ latitude: latitude.toString(), longitude: longitude.toString() }),
      }
    );


    console.log("error", response.bodyUsed);
    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data: NearbyBranchResponseDTO = await response.json();
    return NearbyResponseMapper.toDomain(data.branches[0]);
  }

  async getBranchById(branchId: number): Promise<BranchEntity> {
    console.log("getBranchById - branchId:", branchId);
    const response: Response = await fetch(
      `${API_CONFIG.BASE_URL}/stora/v1/branch-items?branch_id=${branchId}`,
      {
        method: "GET",
        headers: API_CONFIG.HEADERS,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data: BranchItemsDTO[] = await response.json();
    return BranchItemsResponseMapper.toDomain(data[0]);
  }
}
