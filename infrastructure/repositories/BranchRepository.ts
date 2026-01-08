import { IBranchRepository } from "@/application/interfaces/IBranchRepository.interface";
import { BranchEntity } from "@/domain/entities/branch.entity";
import { CategoryEntity } from "@/domain/entities/category.entity";
import { ProductEntity } from "@/domain/entities/product.entity";
import { VariantsEntity, AttributeEntity } from "@/domain/entities/variants.entity";
import { axiosClient } from "@/lib/axiosClient";

export class BranchRepository implements IBranchRepository {
  async getBranchesByOrderType(orderType: string): Promise<BranchEntity[]> {
    try {
      console.log("BranchRepository.getBranchesByOrderType - orderType:", orderType);
      const url = `/stora/v1/branch-items?order_type=${orderType}`;
      const baseURL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://roma2go.com/wp-json";
      console.log("Fetching from URL:", url);
      console.log("Full URL:", `${baseURL}${url}`);
      
      const response = await axiosClient.get(url);
      const data = response.data;

      console.log("API Response Status:", response.status);
      console.log("API Response Headers:", response.headers);
      console.log("API Response Data:", JSON.stringify(data, null, 2));
      console.log("Is Array?", Array.isArray(data));
      console.log("Data type:", typeof data);
      
      // Handle different response formats
      let branchesArray: any[] = [];
      
      if (Array.isArray(data)) {
        branchesArray = data;
      } else if (data && typeof data === "object") {
        // Try common response wrapper formats
        if (Array.isArray(data.data)) {
          branchesArray = data.data;
        } else if (Array.isArray(data.branches)) {
          branchesArray = data.branches;
        } else if (Array.isArray(data.items)) {
          branchesArray = data.items;
        } else if (Array.isArray(data.results)) {
          branchesArray = data.results;
        } else if (data.branch_items && Array.isArray(data.branch_items)) {
          branchesArray = data.branch_items;
        } else {
          // If it's a single object, wrap it in an array
          branchesArray = [data];
        }
      }

      console.log("Extracted branches array length:", branchesArray.length);

      if (branchesArray.length === 0) {
        console.warn("No branches found for orderType:", orderType);
        console.warn("Full response was:", JSON.stringify(data, null, 2));
        return [];
      }

      const branches = this.transformToBranchEntities(branchesArray);
      console.log("Transformed branches count:", branches.length);
      console.log("First branch sample:", branches[0] ? JSON.stringify({
        id: branches[0].id,
        name: branches[0].branch_name,
        status: branches[0].ordering_status
      }, null, 2) : "N/A");
      
      return branches;
    } catch (error: any) {
      console.error("Error fetching branches:", error);
      
      // Handle AggregateError (multiple errors)
      if (error instanceof AggregateError) {
        console.error("AggregateError detected with", error.errors?.length || 0, "errors");
        error.errors?.forEach((err: any, index: number) => {
          console.error(`Error ${index + 1}:`, err);
        });
        // Extract the first meaningful error
        const firstError = error.errors?.[0] || error;
        if (firstError.response) {
          console.error("Response status:", firstError.response.status);
          console.error("Response data:", JSON.stringify(firstError.response.data, null, 2));
        }
        throw new Error(
          `Failed to fetch branches: ${firstError.message || "Network error"}`
        );
      }
      
      // Handle axios errors
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        console.error("Response data:", JSON.stringify(error.response.data, null, 2));
        throw new Error(
          `API Error (${error.response.status}): ${
            error.response.data?.message || error.response.data?.error || "Failed to fetch branches"
          }`
        );
      } else if (error.request) {
        console.error("Request made but no response:", error.request);
        throw new Error("Network error: No response from server");
      } else {
        console.error("Error setting up request:", error.message);
        throw new Error(`Request error: ${error.message || "Unknown error"}`);
      }
    }
  }

  async getBranchById(branchId: string): Promise<BranchEntity | null> {
    try {
      const response = await axiosClient.get(
        `/stora/v1/branch-items?branch_id=${branchId}`
      );
      const data = response.data;

      if (!Array.isArray(data) || data.length === 0) {
        return null;
      }

      const branches = this.transformToBranchEntities(data);
      return branches[0] || null;
    } catch (error) {
      console.error("Error fetching branch:", error);
      throw error;
    }
  }

  async getNearbyBranches(
    latitude: string,
    longitude: string
  ): Promise<BranchEntity[]> {
    try {
      // Validate coordinates
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      if (isNaN(lat) || isNaN(lng)) {
        throw new Error("Invalid latitude or longitude");
      }

      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        throw new Error("Coordinates out of valid range");
      }

      const latStr = latitude.trim();
      const lngStr = longitude.trim();

      if (!latStr || !lngStr) {
        throw new Error("Latitude and longitude cannot be empty");
      }

      const response = await axiosClient.post(`/stora/v1/branches/nearby`, {
        latitude: latStr,
        longitude: lngStr,
      });

      const data = response.data;

      // Handle different response formats
      let branchesArray: any[] = [];

      if (Array.isArray(data)) {
        branchesArray = data;
      } else if (data && typeof data === "object") {
        if (Array.isArray(data.branches)) {
          branchesArray = data.branches;
        } else if (Array.isArray(data.data)) {
          branchesArray = data.data;
        } else if (Array.isArray(data.results)) {
          branchesArray = data.results;
        } else if (Array.isArray(data.items)) {
          branchesArray = data.items;
        } else {
          branchesArray = [data];
        }
      }

      if (branchesArray.length === 0) {
        return [];
      }

      return this.transformToBranchEntities(branchesArray);
    } catch (error: any) {
      console.error("Error fetching nearby branches:", error);

      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }

      if (error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Invalid request. Please check the coordinates.";
        throw new Error(errorMessage);
      }

      throw error;
    }
  }

  private transformToBranchEntities(data: any[]): BranchEntity[] {
    return data.map((item: any) => {
      const categories: CategoryEntity[] = (item.categories || []).map(
        (cat: any) => {
          // Transform products if they exist in the category
          const transformVariants = (variants: any[]): VariantsEntity[] => {
            return (variants || []).map((variant: any) => {
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

          const products = (cat.products || []).map((product: any) => {
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
              product.image || "",
              product.banner_image || product.image || "",
              product.stock_status === "instock"
                ? "instock"
                : product.stock_status === "outofstock"
                ? "outofstock"
                : "lowstock",
              product.points || 0,
              transformVariants(product.variations || product.variants || []),
              product.related_ids || product.related_products || []
            );
          });

          return new CategoryEntity(
            cat.id.toString(),
            cat.name_en || "",
            cat.name_ar || "",
            cat.image || "",
            products
          );
        }
      );

      return new BranchEntity(
        item.id.toString(),
        item.branch_name || "",
        item.order_type || "",
        item.delivery_time || "",
        item.shipping_cost || 0,
        item.shipping_cost_tax || 0,
        item.address || "",
        item.ordering_status === "open" ? "open" : "closed",
        item.latitude || 0,
        item.longitude || 0,
        item.image || "",
        categories
      );
    });
  }
}

