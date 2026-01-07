import { ProductEntity } from "@/domain/entities/product.entity";

export interface IProductRepository {
  getProductById(productId: string): Promise<ProductEntity | null>;
}

