import { ProductEntity } from "@/core/domain/entities/product.entity";
import { ProductsResponseDTO } from "../dtos/ProductsResponse.dto";

export class ProductsResponseMapper {
  static toDomain(product: ProductsResponseDTO): ProductEntity {
    return new ProductEntity({
      id: product.id,
      name: product.name,
      name_en: product.name_en,
      name_ar: product.name_ar,
      slug: product.slug,
      description: product.description,
      description_en: product.description_en,
      description_ar: product.description_ar,
      price: product.price,
      price_tax: product.price_tax,
      image: product.image,
      offer_menu_image: product.offer_menu_image,
      stock_status: product.stock_status as
        | "instock"
        | "outofstock"
        | "lowstock",
      points: product.points,
    });
  }

  static toDomainList(products: ProductsResponseDTO[]): ProductEntity[] {
    return products.map((product) => this.toDomain(product));
  }
}
