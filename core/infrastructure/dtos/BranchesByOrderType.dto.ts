export interface BranchByOrderTypeDTO {
  userid: number;
  id: number;
  branch_name: string;
  order_type: string;
  delivery_time: string;
  shipping_areas: string;
  shipping_cost: number;
  shipping_cost_tax: number;
  address: string;
  over_order_hours_global: string;
  ordering_status: string;
  order_hours: string;
  timezone: string;
  latitude: number;
  longitude: number;
  image: string;
  categories: Category[];
}

interface Category {
  id: number;
  name_en: string;
  name_ar: string;
  image: string;
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  slug: string;
  date_created: DateCreated;
  date_modified: DateModified;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  global_unique_id: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: any;
  date_on_sale_to: any;
  total_sales: number;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: any;
  stock_status: string;
  backorders: string;
  low_stock_amount: string;
  sold_individually: boolean;
  weight: string;
  length: string;
  width: string;
  height: string;
  upsell_ids: any[];
  cross_sell_ids: any[];
  parent_id: number;
  reviews_allowed: boolean;
  purchase_note: string;
  attributes: any;
  default_attributes: any;
  menu_order: number;
  post_password: string;
  virtual: boolean;
  downloadable: boolean;
  category_ids: number[];
  tag_ids: any[];
  shipping_class_id: number;
  downloads: any[];
  image_id: string;
  gallery_image_ids: number[];
  download_limit: number;
  download_expiry: number;
  rating_counts: any[];
  average_rating: string;
  review_count: number;
  meta_data: MetaDaum[];
  is_favorite: boolean;
  branch_ids: number[];
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  image: string;
  price_tax: number;
  price_tax_sale: number;
  points: number;
  on_sale: boolean;
  related_ids: number[];
  type: string;
  offer_menu_image: string;
  related_products: number[];
  variations?: Variation[];
}

interface DateCreated {
  date: string;
  timezone_type: number;
  timezone: string;
}

interface DateModified {
  date: string;
  timezone_type: number;
  timezone: string;
}

interface MetaDaum {
  id: number;
  key: string;
  value: any;
}

interface Variation {
  id: number;
  name: string;
  slug: string;
  date_created: DateCreated2;
  date_modified: DateModified2;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  global_unique_id: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: any;
  date_on_sale_to: any;
  total_sales: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: any;
  stock_status: string;
  backorders: string;
  low_stock_amount: string;
  sold_individually: boolean;
  weight: string;
  length: string;
  width: string;
  height: string;
  upsell_ids: any[];
  cross_sell_ids: any[];
  parent_id: number;
  reviews_allowed: boolean;
  purchase_note: string;
  attributes: Attributes;
  default_attributes: any[];
  menu_order: number;
  post_password: string;
  virtual: boolean;
  downloadable: boolean;
  category_ids: any[];
  tag_ids: any[];
  shipping_class_id: number;
  downloads: any[];
  image_id: number;
  gallery_image_ids: any[];
  download_limit: number;
  download_expiry: number;
  rating_counts: any[];
  average_rating: number;
  review_count: number;
  attribute_summary: string;
  meta_data: MetaDaum2[];
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price_tax: number;
  price_tax_sale: number;
  points: number;
}

interface DateCreated2 {
  date: string;
  timezone_type: number;
  timezone: string;
}

interface DateModified2 {
  date: string;
  timezone_type: number;
  timezone: string;
}

interface Attributes {
  pa_size: string;
}

interface MetaDaum2 {
  id: number;
  key: string;
  value: any;
}
