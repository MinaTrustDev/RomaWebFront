import { IProductRepository } from "@/core/application/interfaces/IProductRepository.interface";
import { ProductEntity } from "@/core/domain/entities/product.entity";
import { API_CONFIG } from "../config/api.config";
import { ProductsResponseMapper } from "../mappers/ProductsResponse.mapper";
import { ProductsResponseDTO } from "../dtos/ProductsResponse.dto";
import { CategoryEntity } from "@/core/domain/entities/category.entity";
import { CategoriesResponseDTO } from "../dtos/CategoriesResponse.dto";
import { CategoriesResponseMapper } from "../mappers/CategoriesResponse.mapper";
import { GetProductByIdMapper } from "../mappers/GetProductById.mapper";
import { GetProductByIdResponseDTO } from "../dtos/GetProductByIdResponse.dto";
import { axiosClient } from "@/lib/axiosClient";

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
    return GetProductByIdMapper.toDomain(data[0]);
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
}
