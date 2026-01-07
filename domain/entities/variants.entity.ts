export class VariantsEntity {
  constructor(
    public readonly id: string,

    public readonly name: string,
    public readonly name_en: string,
    public readonly name_ar: string,

    public readonly slug: string,

    public readonly price: number,
    public readonly price_tax: number,

    public readonly menu_order: number,

    public readonly stock_status: "instock" | "outofstock" | "lowstock",

    public readonly attributes: AttributeEntity,
    public readonly attribute_summary: string,

    public readonly points: number
  ) {}
}

export class AttributeEntity {
  constructor(public readonly pa_size: string) {}
}
