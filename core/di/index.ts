import { AddToCardUseCase } from "../application/use-cases/AddToCard.UseCase";
import { GetAddonsUseCase } from "../application/use-cases/GetAddons.UseCase";
import { GetProductsUseCase } from "../application/use-cases/GetAllProducts.UseCase";
import { GetBranchesByOrderTypeUseCase } from "../application/use-cases/GetBranchesByOrderType.UseCase";
import { GetCartUseCase } from "../application/use-cases/GetCart.UseCase";
import { GetDeliveryConfigurationUseCase } from "../application/use-cases/GetDeliveryConfiguration.UseCase";
import { GetDontMissUseCase } from "../application/use-cases/GetDontMiss.UseCase";
import { GetGuestIdUseCase } from "../application/use-cases/GetGuestId.UseCase";
import { GetNearbyBranchesUseCase } from "../application/use-cases/GetNearbyBranchesUseCase";
import { GetProductByIdUseCase } from "../application/use-cases/GetProductByIdUseCase";
import { GetProductBySlugUseCase } from "../application/use-cases/GetProductBySlug.UseCase";
import { GetProductVariationsUseCase } from "../application/use-cases/GetProductVariations.UseCase";
import { RemoveDeliveryConfigurationUseCase } from "../application/use-cases/RemoveDeliveryConfiguration.UseCase";
import { SetDeliveryConfigurationUseCase } from "../application/use-cases/SetDeliveryConfiguration.UseCase";
import { AuthRepository } from "../infrastructure/repositories/AuthRepository";
import { BranchRepository } from "../infrastructure/repositories/BranchRepository";
import { CartRepository } from "../infrastructure/repositories/Cart.repository";
import { CookiesStorageRepository } from "../infrastructure/repositories/cookiesStorage.repository";
import { ProductRepository } from "../infrastructure/repositories/ProductRepository";

// repositories
const branchRepository = new BranchRepository();
const productRepository = new ProductRepository();
export const storageRepository = new CookiesStorageRepository();
export const authRepository = new AuthRepository();
export const cartRepository = new CartRepository();

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
export const addToCartUseCase = new AddToCardUseCase(
  cartRepository,
  storageRepository
);
export const getNearbyBranchesUseCase = new GetNearbyBranchesUseCase(
  branchRepository
);
export const getProductBySlugUseCase = new GetProductBySlugUseCase(
  productRepository
);
export const getProductVariationsUseCase = new GetProductVariationsUseCase(
  productRepository
);
export const getDontMissUseCase = new GetDontMissUseCase(
  productRepository
);
export const getAddonsUseCase = new GetAddonsUseCase(
  productRepository
);
export const getGuestIdUseCase = new GetGuestIdUseCase(
  storageRepository,
  authRepository
);
export const getCartUseCase = new GetCartUseCase(
  cartRepository,
  storageRepository
);