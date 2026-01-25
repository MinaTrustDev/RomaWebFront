import { IBranchRepository } from "../interfaces/IBranchRepository.interface";
import { BranchEntity } from "@/core/domain/entities/branch.entity";
import { BranchDTO } from "@/core/domain/dtos/branch.dto";
import { CategoryDTO } from "@/core/domain/dtos/category.dto";
import { ProductDTO, VariantDTO } from "@/core/domain/dtos/product.dto";
import { IProductRepository } from "../interfaces/IProductRepository.interface";
import { IStorageRepository } from "../interfaces/iStorage.interface";
import { CategoryEntity } from "@/core/domain/entities/category.entity";
import { DeliveryConfiguration } from "@/core/domain/value-objects/deliveryConfigurations";

export class GetProductsUseCase {
  constructor(
    private branchRepository: IBranchRepository,
    private productRepository: IProductRepository,
    private storageRepository: IStorageRepository
  ) {}

  async execute(): Promise<BranchEntity> {
    const deliveryConfiguration: DeliveryConfiguration =
      await this.storageRepository.get("delivery_configuration");
      
    if (!deliveryConfiguration || deliveryConfiguration === null) {
      const categories = await this.productRepository.getAllCategories();
      return new BranchEntity({ categories: categories });
    }

    const branch = await this.branchRepository.getBranchById(
      deliveryConfiguration.branchId
    );
    return branch;
  }
}
