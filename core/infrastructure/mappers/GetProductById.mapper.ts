import { ProductEntity } from "@/core/domain/entities/product.entity";
import {
  GetProductByIdResponseDTO,
  VariationDTO,
} from "../dtos/GetProductByIdResponse.dto";
import { VariationEntity } from "@/core/domain/entities/variants.entity";

export class GetProductByIdMapper {
  static toDomain(product: GetProductByIdResponseDTO): ProductEntity {
    return new ProductEntity({
      id: product.id,
      name: product.name,
      name_en: product.name_en,
      name_ar: product.name_ar,
      slug: product.slug,
      description: product.description,
      description_en: product.description_en,
      description_ar: product.description_ar,
      image: product.image,
      offer_menu_image: product.offer_menu_image,
      points: product.points,
      price: product.price,
      price_tax: product.price_tax,
      stock_status: product.stock_status,
      related_products: product.related_ids,
      variants: ProductVariationMapper.toDomainList(product.variations),
    });
  }
}

export class ProductVariationMapper {
  static toDomain(variation: VariationDTO): VariationEntity {
    return new VariationEntity({
      id: variation.id.toString(),
      name: variation.name,
      name_en: variation.name_en,
      name_ar: variation.name_ar,
      slug: variation.slug,
      price: variation.price,
      price_tax: variation.price_tax,
      menu_order: variation.menu_order,
      stock_status: variation.stock_status,
      attributes: variation.attributes,
      attribute_summary: variation.attribute_summary,
      points: variation.points,
    });
  }

  static toDomainList(variations: VariationDTO[]): VariationEntity[] {
    return variations.map((variation) => this.toDomain(variation));
  }
}
