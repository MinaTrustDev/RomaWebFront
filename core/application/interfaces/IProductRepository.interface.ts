import { CategoryEntity } from "@/core/domain/entities/category.entity";
import { ProductEntity } from "@/core/domain/entities/product.entity";

export interface IProductRepository {
  getProductById(productId: number): Promise<ProductEntity>;
  getAllProducts(): Promise<ProductEntity[]>;
  getAllCategories(): Promise<CategoryEntity[]>;
}
