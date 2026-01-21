import { ProductEntity } from "@/core/domain/entities/product.entity";
import { IProductRepository } from "../interfaces/IProductRepository.interface";

export class GetDontMissUseCase {
    constructor(private productRepository: IProductRepository) {}

    async execute(): Promise<number[]> {
        const products = await this.productRepository.getDontMessProductsId();
        return products;
    }
}