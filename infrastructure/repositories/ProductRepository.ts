import { IProductRepository } from "@/application/interfaces/IProductRepository.interface";
import { ProductEntity } from "@/domain/entities/product.entity";
import { VariantsEntity, AttributeEntity } from "@/domain/entities/variants.entity";
import { axiosClient } from "@/lib/axiosClient";

export class ProductRepository implements IProductRepository {
  async getProductById(productId: string): Promise<ProductEntity | null> {
    try {
      const response = await axiosClient.get(
        `/custom-api/v1/products/?product_id=${productId}`
      );
      const data = response.data;

      // Handle different response formats
      let product;
      if (Array.isArray(data)) {
        if (data.length === 0) {
          return null;
        }
        product = data[0];
      } else if (data && typeof data === "object") {
        product = data;
      } else {
        return null;
      }

      if (!product || !product.id) {
        return null;
      }

      return this.transformToProductEntity(product);
    } catch (error: any) {
      console.error("Error fetching product details:", error);

      if (error.response?.status === 401) {
        console.error("Authentication required for product details endpoint");
        return null;
      }

      if (error.response?.status === 404) {
        console.error("Product not found");
        return null;
      }

      throw error;
    }
  }

  private transformToProductEntity(product: any): ProductEntity {
    const transformVariants = (variants: any[]): VariantsEntity[] => {
      return variants.map((variant: any) => {
        const attributes = new AttributeEntity(
          variant.attributes?.pa_size || ""
        );

        return new VariantsEntity(
          variant.id.toString(),
          variant.name || "",
          variant.name_en || variant.name || "",
          variant.name_ar || variant.name || "",
          variant.slug || "",
          parseFloat(variant.price) || 0,
          parseFloat(variant.price_tax) || parseFloat(variant.price) || 0,
          variant.menu_order || 0,
          variant.stock_status === "instock"
            ? "instock"
            : variant.stock_status === "outofstock"
            ? "outofstock"
            : "lowstock",
          attributes,
          variant.attribute_summary || "",
          variant.points || 0
        );
      });
    };

    const imageDomain = process.env.NEXT_PUBLIC_IMAGE_DOMAIN || "roma2go.com";
    let imageUrl = "";
    if (product.image) {
      imageUrl = product.image;
    } else if (product.image_id) {
      imageUrl = `https://${imageDomain}/wp-content/uploads/${product.image_id}`;
    } else if (product.meta_data && Array.isArray(product.meta_data)) {
      const bannerImageMeta = product.meta_data.find(
        (meta: any) => meta.key === "banner_image" || meta.key === "_banner_image"
      );
      if (bannerImageMeta?.value) {
        const imageId =
          typeof bannerImageMeta.value === "string"
            ? bannerImageMeta.value
            : bannerImageMeta.value.toString();
        imageUrl = `https://${imageDomain}/wp-content/uploads/${imageId}`;
      }
    }

    return new ProductEntity(
      product.id.toString(),
      product.name || "",
      product.name_en || product.name || "",
      product.name_ar || product.name || "",
      product.slug || "",
      product.description || "",
      product.description_en || product.description || "",
      product.description_ar || product.description || "",
      parseFloat(product.price) || 0,
      parseFloat(product.price_tax) || parseFloat(product.price) || 0,
      imageUrl,
      product.banner_image || imageUrl,
      product.stock_status === "instock"
        ? "instock"
        : product.stock_status === "outofstock"
        ? "outofstock"
        : "lowstock",
      product.points || 0,
      transformVariants(product.variations || []),
      product.related_ids || []
    );
  }
}

