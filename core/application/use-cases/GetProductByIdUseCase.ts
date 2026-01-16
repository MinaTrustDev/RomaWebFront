import { IProductRepository } from "../interfaces/IProductRepository.interface";
import { ProductEntity } from "@/core/domain/entities/product.entity";
import { ProductDTO, VariantDTO } from "@/core/domain/dtos/product.dto";

export class GetProductByIdUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(productId: number): Promise<ProductEntity> {
    const product = await this.productRepository.getProductById(productId);
    return product;
  }
}
