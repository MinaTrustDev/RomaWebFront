import { AddonEntity } from "@/core/domain/entities/Addons.entity";
import { IProductRepository } from "../interfaces/IProductRepository.interface";

export class GetAddonsUseCase {
    constructor(private productRepository: IProductRepository) {}

    async execute(productId: number): Promise<AddonEntity[]> {
        const addons = await this.productRepository.getAddons(productId);
        return addons;
    }
}