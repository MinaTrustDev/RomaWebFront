import { ProductEntity } from "./product.entity";

export class CategoryEntity {
  constructor(
    public readonly id: string,
    public readonly name_en: string,
    public readonly name_ar: string,
    public readonly image: string,

    public readonly products: ProductEntity[]
  ) {}
}
