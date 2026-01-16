export class VariationEntity {
  public readonly id: string;

  public readonly name: string;
  public readonly name_en: string;
  public readonly name_ar: string;

  public readonly slug: string;

  public readonly price: string;
  public readonly price_tax: number;

  public readonly menu_order: number;

  public readonly stock_status: string;

  public readonly attributes: AttributeEntity;
  public readonly attribute_summary: string;

  public readonly points: number;
  constructor({
    id,
    name,
    name_en,
    name_ar,
    slug,
    price,
    price_tax,
    menu_order,
    stock_status,
    attributes,
    attribute_summary,
    points,
  }: {
    id: string;

    name: string;
    name_en: string;
    name_ar: string;

    slug: string;

    price: string;
    price_tax: number;

    menu_order: number;

    stock_status: string;

    attributes: AttributeEntity;
    attribute_summary: string;

    points: number;
  }) {
    this.id = id;
    this.name = name;
    this.name_en = name_en;
    this.name_ar = name_ar;
    this.slug = slug;
    this.price = price;
    this.price_tax = price_tax;
    this.menu_order = menu_order;
    this.stock_status = stock_status;
    this.attributes = attributes;
    this.attribute_summary = attribute_summary;
    this.points = points;
  }
}

export class AttributeEntity {
  constructor(public readonly pa_size: string) {}
}
