import { GetProductsUseCase } from "../application/use-cases/GetAllProducts.UseCase";
import { GetBranchesByOrderTypeUseCase } from "../application/use-cases/GetBranchesByOrderType.UseCase";
import { GetDeliveryConfigurationUseCase } from "../application/use-cases/GetDeliveryConfiguration.UseCase";
import { GetProductByIdUseCase } from "../application/use-cases/GetProductByIdUseCase";
import { RemoveDeliveryConfigurationUseCase } from "../application/use-cases/RemoveDeliveryConfiguration.UseCase";
import { SetDeliveryConfigurationUseCase } from "../application/use-cases/SetDeliveryConfiguration.UseCase";
import { BranchRepository } from "../infrastructure/repositories/BranchRepository";
import { CookiesStorageRepository } from "../infrastructure/repositories/cookiesStorage.repository";
import { ProductRepository } from "../infrastructure/repositories/ProductRepository";

// repositories
const branchRepository = new BranchRepository();
const productRepository = new ProductRepository();
const storageRepository = new CookiesStorageRepository();

// use cases
export const getAllProductsUseCase = new GetProductsUseCase(
  branchRepository,
  productRepository,
  storageRepository
);
export const getBranchesByOrderTypeUseCase = new GetBranchesByOrderTypeUseCase(
  branchRepository
);
export const getDeliveryConfigurationUseCase =
  new GetDeliveryConfigurationUseCase(storageRepository);
export const setDeliveryConfigurationUseCase =
  new SetDeliveryConfigurationUseCase(storageRepository);
export const removeDeliveryConfigurationUseCase =
  new RemoveDeliveryConfigurationUseCase(storageRepository);
export const getProductByIdUseCase = new GetProductByIdUseCase(
  productRepository
);
