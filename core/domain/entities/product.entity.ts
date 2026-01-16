import { VariationEntity } from "./variants.entity";

export class ProductEntity {
  public readonly id: number;

  public readonly name: string;
  public readonly name_en: string;
  public readonly name_ar: string;

  public readonly slug: string;

  public readonly description: string;
  public readonly description_en: string;
  public readonly description_ar: string;

  public readonly price: string;
  public readonly price_tax: number;

  public readonly image: string;
  public readonly offer_menu_image: string;

  public readonly stock_status: string;

  public readonly points: number;

  public readonly variants?: VariationEntity[];
  public readonly related_products?: number[];
  constructor({
    id,
    name,
    name_en,
    name_ar,
    slug,
    description,
    description_en,
    description_ar,
    price,
    price_tax,
    image,
    offer_menu_image,
    stock_status,
    points,
    variants,
    related_products,
  }: {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
    slug: string;
    description: string;
    description_en: string;
    description_ar: string;
    price: string;
    price_tax: number;
    image: string;
    offer_menu_image: string;
    stock_status: string;
    points: number;
    variants?: VariationEntity[];
    related_products?: number[];
  }) {
    this.id = id;
    this.name = name;
    this.name_en = name_en;
    this.name_ar = name_ar;
    this.slug = slug;
    this.description = description;
    this.description_en = description_en;
    this.description_ar = description_ar;
    this.price = price;
    this.price_tax = price_tax;
    this.image = image;
    this.offer_menu_image = offer_menu_image;
    this.stock_status = stock_status;
    this.points = points;
    this.variants = variants;
    this.related_products = related_products;
  }
}
