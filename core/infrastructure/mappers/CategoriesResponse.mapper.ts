import { CategoryEntity } from "@/core/domain/entities/category.entity";
import { CategoriesResponseDTO } from "../dtos/CategoriesResponse.dto";
import { ProductEntity } from "@/core/domain/entities/product.entity";

export class CategoriesResponseMapper {
  static toDomain(category: CategoriesResponseDTO): CategoryEntity {
    return new CategoryEntity(
      category.id.toString(),
      category.name_en,
      category.name_ar,
      category.image,
      category.products.map(
        (product) =>
          new ProductEntity({
            id: product.id.toString(),
            name: product.name,
            name_en: product.name_en,
            name_ar: product.name_ar,
            slug: product.slug,
            description: product.description,
            description_en: product.description_en,
            description_ar: product.description_ar,
            price: parseFloat(product.price),
            price_tax: parseFloat(product.price_tax.toString()),
            image: product.image,
            offer_menu_image: product.offer_menu_image,
            stock_status: product.stock_status as
              | "instock"
              | "outofstock"
              | "lowstock",
            points: product.points,
          })
      )
    );
  }

  static toDomainList(categories: CategoriesResponseDTO[]): CategoryEntity[] {
    return categories.map((category) => this.toDomain(category));
  }
}
