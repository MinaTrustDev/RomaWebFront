import { IProductRepository } from "@/core/application/interfaces/IProductRepository.interface";
import { ProductEntity } from "@/core/domain/entities/product.entity";
import { API_CONFIG } from "../config/api.config";
import { ProductsResponseMapper } from "../mappers/ProductsResponse.mapper";
import { ProductsResponseDTO } from "../dtos/ProductsResponse.dto";
import { CategoryEntity } from "@/core/domain/entities/category.entity";
import { CategoriesResponseDTO } from "../dtos/CategoriesResponse.dto";
import { CategoriesResponseMapper } from "../mappers/CategoriesResponse.mapper";
import { ProductDetailResponseMapper, ProductVariationMapper } from "../mappers/ProductDetailResponse.mapper";
import { GetProductByIdResponseDTO } from "../dtos/GetProductByIdResponse.dto";
import { axiosClient } from "@/lib/axiosClient";
import { ApiErrorMapper } from "../mappers/ApiErrorMapper";
import { GetProductBySlugRequestMapper } from "../mappers/GetProductBySlugRequest.mapper";
import { GetProductBySlugResponseMapper } from "../mappers/GetProductBySlugResponse.mapper";
import { GetProductBySlugResponseDTO } from "../dtos/GetProductBySlug.dto";
import { ProductVariationsResponseDTO } from "../dtos/ProductVariationsResponse.dto";
import { VariationEntity } from "@/core/domain/entities/variants.entity";
import { GetAddonsResponseDTO } from "../dtos/GetAddonsResponse.dto";
import { AddonEntity } from "@/core/domain/entities/Addons.entity";
import { GetAddonsResponseMapper } from "../mappers/GetAddonsResponse.mapper";

export class ProductRepository implements IProductRepository {
  async getProductById(productId: number): Promise<ProductEntity> {
    const response = await axiosClient.get<GetProductByIdResponseDTO[]>(
      `${API_CONFIG.BASE_URL}/custom-api/v1/products?product_id=${productId}`,
      {
        headers: API_CONFIG.HEADERS,
        withCredentials: true,
      }
    );

    const data: GetProductByIdResponseDTO[] = response.data;
    return ProductDetailResponseMapper.toDomain(data[0]);
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    const response = await axiosClient.get<ProductsResponseDTO[]>(
      `${API_CONFIG.BASE_URL}/custom-api/v1/products/`,
      {
        headers: API_CONFIG.HEADERS,
      }
    );

    const data: ProductsResponseDTO[] = response.data;
    return ProductsResponseMapper.toDomainList(data);
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    const response = await axiosClient.get<CategoriesResponseDTO[]>(
      `${API_CONFIG.BASE_URL}/custom-api/v1/categories/`,
      {
        headers: API_CONFIG.HEADERS,
      }
    );

    const data: CategoriesResponseDTO[] = response.data;
    return CategoriesResponseMapper.toDomainList(data);
  }

  async getProductBySlug(slug: string, branchId?: number): Promise<ProductEntity> {
    const params: string = GetProductBySlugRequestMapper.toRequest(slug, branchId);

    const response = await axiosClient.get<GetProductBySlugResponseDTO>(
      `${API_CONFIG.BASE_URL}/custom-api/v1/product-by-slug/?${params}`,
      {
        headers: API_CONFIG.HEADERS,
      }
    );
    

    if (response.status >= 300) {
      throw ApiErrorMapper.toDomain(response.data, response.status);
    }

    const data: GetProductBySlugResponseDTO = response.data;
    return GetProductBySlugResponseMapper.toDomain(data);
  }

  async getProductVariations(productId: number): Promise<VariationEntity[]> {
    const response = await axiosClient.get<GetProductByIdResponseDTO[]>(
      `${API_CONFIG.BASE_URL}/custom-api/v1/products/?product_id=${productId}`,
      {
        headers: API_CONFIG.HEADERS,
      }
    );

    const data: GetProductByIdResponseDTO[] = response.data;
    const variations = data[0].variations;
    
    return ProductVariationMapper.toDomainList(variations);
  }

  async getDontMessProductsId() : Promise<number[]> {
    const response = await axiosClient.get<{ products: number[] }>(
      `${API_CONFIG.BASE_URL}/simple-products/v1/get-ids`,
      {
        headers: API_CONFIG.HEADERS,
      }
    );

    const data: { products: number[] } = response.data;
    return data.products;
  }

  async getAddons(productId: number): Promise<AddonEntity[]> {
    const response = await axiosClient.get<GetAddonsResponseDTO>(
      `${API_CONFIG.BASE_URL}/proaddon/v1/get2?product_id2=${productId}`,
      {
        headers: API_CONFIG.HEADERS,
      }
    );

    const data: GetAddonsResponseDTO = response.data;
    return GetAddonsResponseMapper.toDomainList(data.blocks[0].addons);
  }
}
