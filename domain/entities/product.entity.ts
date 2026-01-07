import { VariantsEntity } from "./variants.entity";

export class ProductEntity {
  constructor(
    public readonly id: string,

    public readonly name: string,
    public readonly name_en: string,
    public readonly name_ar: string,

    public readonly slug: string,

    public readonly description: string,
    public readonly description_en: string,
    public readonly description_ar: string,

    public readonly price: number,
    public readonly price_tax: number,

    public readonly image: string,
    public readonly offer_menu_image: string,

    public readonly stock_status: "instock" | "outofstock" | "lowstock",

    public readonly points: number,

    public readonly variants: VariantsEntity[],

    public readonly related_products: number[]
  ) {}
}
