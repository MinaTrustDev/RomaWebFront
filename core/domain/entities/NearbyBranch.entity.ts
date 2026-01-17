export class NearbyBranchEntity {
  public readonly id: number;
  public readonly name: string;
  public readonly address: string;
  public readonly latitude: number;
  public readonly longitude: number;
  public readonly delivery_time: string;
  public readonly shipping_cost: number;
  public readonly shipping_cost_tax: number;
  public readonly order_type: string;
  public readonly is_open: string;
  public readonly image: string;
  public readonly matched_area_id: string;
  public readonly matched_area_title: string;
  public readonly area_shipping_rate: number;
  public readonly area_shipping_rate_tax: number;
  public readonly cost_calculation: string;

  constructor({
    id,
    name,
    address,
    latitude,
    longitude,
    delivery_time,
    shipping_cost,
    shipping_cost_tax,
    order_type,
    is_open,
    image,
    matched_area_id,
    matched_area_title,
    area_shipping_rate,
    area_shipping_rate_tax,
    cost_calculation,
  }: {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    delivery_time: string;
    shipping_cost: number;
    shipping_cost_tax: number;
    order_type: string;
    is_open: string;
    image: string;
    matched_area_id: string;
    matched_area_title: string;
    area_shipping_rate: number;
    area_shipping_rate_tax: number;
    cost_calculation: string;
  }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.delivery_time = delivery_time;
    this.shipping_cost = shipping_cost;
    this.shipping_cost_tax = shipping_cost_tax;
    this.order_type = order_type;
    this.is_open = is_open;
    this.image = image;
    this.matched_area_id = matched_area_id;
    this.matched_area_title = matched_area_title;
    this.area_shipping_rate = area_shipping_rate;
    this.area_shipping_rate_tax = area_shipping_rate_tax;
    this.cost_calculation = cost_calculation;
  }
}