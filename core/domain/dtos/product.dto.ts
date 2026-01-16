import { VariationEntity } from "../entities/variants.entity";

export type VariantDTO = {
  id: string;
  name: string;
  name_en: string;
  name_ar: string;
  slug: string;
  price: number;
  price_tax: number;
  menu_order: number;
  stock_status: "instock" | "outofstock" | "lowstock";
  attributes: {
    pa_size: string;
  };
  attribute_summary: string;
  points: number;
};

export type ProductDTO = {
  id: string;
  name: string;
  name_en: string;
  name_ar: string;
  slug: string;
  description: string;
  description_en: string;
  description_ar: string;
  price: number;
  price_tax: number;
  image: string;
  offer_menu_image: string;
  stock_status: "instock" | "outofstock" | "lowstock";
  points: number;
  variants: VariantDTO[];
  related_products: number[];
};
