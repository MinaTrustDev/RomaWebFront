import { CategoryEntity } from "@/core/domain/entities/category.entity";
import { ProductEntity } from "@/core/domain/entities/product.entity";
import { VariationEntity } from "@/core/domain/entities/variants.entity";

export interface IProductRepository {
  getProductById(productId: number): Promise<ProductEntity>;
  getAllProducts(): Promise<ProductEntity[]>;
  getAllCategories(): Promise<CategoryEntity[]>;
  getProductBySlug(slug: string, branchId?: number): Promise<ProductEntity>;
  getProductVariations(productId: number): Promise<VariationEntity[]>;
  getDontMessProductsId(): Promise<number[]>;
}
