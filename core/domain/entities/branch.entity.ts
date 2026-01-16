import { CategoryEntity } from "./category.entity";
import { LocationEntity } from "./location.entity";

export class BranchEntity {
  public readonly id?: number;
  public readonly branch_name?: string;

  public readonly order_type?: string;

  public readonly delivery_time?: string;
  public readonly shipping_cost?: number;
  public readonly shipping_cost_tax?: number;
  public readonly address?: string;
  public readonly ordering_status?: "open" | "closed";

  public readonly latitude?: number;
  public readonly longitude?: number;

  public readonly image?: string;

  public readonly categories?: CategoryEntity[];
  constructor({
    id,
    branch_name,
    order_type,
    delivery_time,
    shipping_cost,
    shipping_cost_tax,
    address,
    ordering_status,
    latitude,
    longitude,
    image,
    categories,
  }: {
    id?: number;
    branch_name?: string;
    order_type?: string;
    delivery_time?: string;
    shipping_cost?: number;
    shipping_cost_tax?: number;
    address?: string;
    ordering_status?: "open" | "closed";
    latitude?: number;
    longitude?: number;
    image?: string;
    categories?: CategoryEntity[];
  }) {
    this.id = id;
    this.branch_name = branch_name;
    this.order_type = order_type;
    this.delivery_time = delivery_time;
    this.shipping_cost = shipping_cost;
    this.shipping_cost_tax = shipping_cost_tax;
    this.address = address;
    this.ordering_status = ordering_status;
    this.latitude = latitude;
    this.longitude = longitude;
    this.image = image;
    this.categories = categories;
  }
}
