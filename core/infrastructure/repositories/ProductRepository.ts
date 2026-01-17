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

export class ProductRepository implements IProductRepository {
  async getProductById(productId: number): Promise<ProductEntity> {
    const response: Response = await fetch(
      `${API_CONFIG.BASE_URL}/custom-api/v1/products?product_id=${productId}`,
      {
        method: "GET",
        headers: API_CONFIG.HEADERS,
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data: GetProductByIdResponseDTO[] = await response.json();
    return GetProductByIdMapper.toDomain(data[0]);
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    const response: Response = await fetch(
      `${API_CONFIG.BASE_URL}/custom-api/v1/products/`,
      {
        method: "GET",
        headers: API_CONFIG.HEADERS,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: ProductsResponseDTO[] = await response.json();
    return ProductsResponseMapper.toDomainList(data);
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    const response: Response = await fetch(
      `${API_CONFIG.BASE_URL}/custom-api/v1/categories/`,
      {
        method: "GET",
        headers: API_CONFIG.HEADERS,
      }
    );

    

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data: CategoriesResponseDTO[] = await response.json();
    return CategoriesResponseMapper.toDomainList(data);
  }
}
