import { CategoryDTO } from "./category.dto";

export type BranchDTO = {
  id: string;
  branch_name: string;
  order_type: string;
  delivery_time: string;
  shipping_cost: number;
  shipping_cost_tax: number;
  address: string;
  ordering_status: "open" | "closed";
  latitude: number;
  longitude: number;
  image: string;
  categories: CategoryDTO[];
};

