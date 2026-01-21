import { ProductEntity } from "@/core/domain/entities/product.entity";
import { IProductRepository } from "../interfaces/IProductRepository.interface";

export class GetProductBySlugUseCase {
    constructor(private productRepository: IProductRepository) {}

    async execute(slug: string, branchId?: number): Promise<ProductEntity> {
        const product = await this.productRepository.getProductBySlug(slug, branchId);
        return product;
    }
}