import { VariationEntity } from "@/core/domain/entities/variants.entity";
import { IProductRepository } from "../interfaces/IProductRepository.interface";

export class GetProductVariationsUseCase {
    constructor(private productRepository: IProductRepository) {}

    async execute(productId: number): Promise<VariationEntity[]> {
        const variations = await this.productRepository.getProductVariations(productId);
        return variations;
    }
}