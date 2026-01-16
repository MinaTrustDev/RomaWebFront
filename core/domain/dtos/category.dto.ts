import { ProductDTO } from "./product.dto";

export type CategoryDTO = {
  id: string;
  name_en: string;
  name_ar: string;
  image: string;
  products: ProductDTO[];
};

