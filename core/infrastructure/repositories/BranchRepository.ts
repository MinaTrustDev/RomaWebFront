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
    const response = await axiosClient.get<BranchByOrderTypeDTO[]>(
      `${API_CONFIG.API_URL}/stora/v1/branch-items?order_type=${order_type}`,
      {
        headers: API_CONFIG.HEADERS,
      }
    );

    const data: BranchByOrderTypeDTO[] = response.data;
    return BranchByOrderTypeMapper.toDomainList(data);
  }

  async getNearbyBranches(
    latitude: number,
    longitude: number
  ): Promise<NearbyBranchEntity> {

    const response = await axiosClient.post<NearbyBranchResponseDTO>(
      `${API_CONFIG.API_URL}/stora/v1/branches/nearby`,
      { latitude: latitude.toString(), longitude: longitude.toString() },
      {
        headers: API_CONFIG.HEADERS,
      }
    );

    const data: NearbyBranchResponseDTO = response.data;
    return NearbyResponseMapper.toDomain(data.branches[0]);
  }

  async getBranchById(branchId: number): Promise<BranchEntity> {
    const response = await axiosClient.get<BranchItemsDTO[]>(
      `${API_CONFIG.API_URL}/stora/v1/branch-items?branch_id=${branchId}`,
      {
        headers: API_CONFIG.HEADERS,
      }
    );
    
    const data: BranchItemsDTO[] = response.data;
    return BranchItemsResponseMapper.toDomain(data[0]);
  }
}
