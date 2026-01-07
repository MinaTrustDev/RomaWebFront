import { IProductRepository } from "../interfaces/IProductRepository.interface";
import { ProductEntity } from "@/domain/entities/product.entity";

export class GetProductByIdUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(productId: string): Promise<ProductEntity | null> {
    return this.productRepository.getProductById(productId);
  }
}

