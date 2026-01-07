import { IBranchRepository } from "../interfaces/IBranchRepository.interface";
import { BranchEntity } from "@/domain/entities/branch.entity";
import { BranchDTO } from "@/domain/dtos/branch.dto";
import { CategoryDTO } from "@/domain/dtos/category.dto";
import { ProductDTO, VariantDTO } from "@/domain/dtos/product.dto";

export class GetBranchByIdUseCase {
  constructor(private branchRepository: IBranchRepository) {}

  async execute(branchId: string): Promise<BranchDTO | null> {
    const branch = await this.branchRepository.getBranchById(branchId);
    if (!branch) {
      return null;
    }
    return this.toBranchDTO(branch);
  }

  private toBranchDTO(branch: BranchEntity): BranchDTO {
    return {
      id: branch.id,
      branch_name: branch.branch_name,
      order_type: branch.order_type,
      delivery_time: branch.delivery_time,
      shipping_cost: branch.shipping_cost,
      shipping_cost_tax: branch.shipping_cost_tax,
      address: branch.address,
      ordering_status: branch.ordering_status,
      latitude: branch.latitude,
      longitude: branch.longitude,
      image: branch.image,
      categories: branch.categories.map((cat) => this.toCategoryDTO(cat)),
    };
  }

  private toCategoryDTO(category: {
    id: string;
    name_en: string;
    name_ar: string;
    image: string;
    products: any[];
  }): CategoryDTO {
    return {
      id: category.id,
      name_en: category.name_en,
      name_ar: category.name_ar,
      image: category.image,
      products: (category.products || []).map((product) =>
        this.toProductDTO(product)
      ),
    };
  }

  private toProductDTO(product: any): ProductDTO {
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
      variants: product.variants.map((variant: any) =>
        this.toVariantDTO(variant)
      ),
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
