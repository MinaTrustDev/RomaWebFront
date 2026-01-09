import { IProductRepository } from "../interfaces/IProductRepository.interface";
import { ProductEntity } from "@/domain/entities/product.entity";
import { ProductDTO, VariantDTO } from "@/domain/dtos/product.dto";

export class GetProductByIdUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(productId: string): Promise<ProductDTO | null> {
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      return null;
    }
    return this.toProductDTO(product);
  }

  private toProductDTO(product: ProductEntity): ProductDTO {
    return {
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
      stock_status: product.stock_status,
      points: product.points,
      variants: product.variants.map((variant) => this.toVariantDTO(variant)),
      related_products: product.related_products,
    };
  }

  private toVariantDTO(variant: any): VariantDTO {
    return {
      id: variant.id?.toString() || "",
      name: variant.name || "",
      name_en: variant.name_en || variant.name || "",
      name_ar: variant.name_ar || variant.name || "",
      slug: variant.slug || "",
      price:
        typeof variant.price === "number"
          ? variant.price
          : parseFloat(variant.price) || 0,
      price_tax:
        typeof variant.price_tax === "number"
          ? variant.price_tax
          : parseFloat(variant.price_tax) || parseFloat(variant.price) || 0,
      menu_order: variant.menu_order || 0,
      stock_status:
        variant.stock_status === "instock"
          ? "instock"
          : variant.stock_status === "outofstock"
          ? "outofstock"
          : "lowstock",
      attributes: {
        pa_size: variant.attributes?.pa_size || "",
      },
      attribute_summary: variant.attribute_summary || "",
      points: variant.points || 0,
    };
  }
}
