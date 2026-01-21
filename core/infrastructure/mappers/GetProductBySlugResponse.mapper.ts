import { ProductEntity } from "@/core/domain/entities/product.entity";
import { GetProductBySlugResponseDTO } from "../dtos/GetProductBySlug.dto";

export class GetProductBySlugResponseMapper {
    static toDomain(product: GetProductBySlugResponseDTO): ProductEntity {
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
            stock_status: product.stock_status,
            points: product.points,
            related_products: product.related_ids,
            branch_ids: product.branch_ids,
        });
    }
}