export interface GetCartResponseDTO {
  cart_items: CartItem[]
  total_price: string
  VAT: string
  VATDinein: string
  total_price_with_tax: string
  total_price_with_tax_dinein: string
  total_items: number
  total_points: string
  user_points: number
  points_worth: number
}

interface CartItem {
  product_id: number
  product_name: string
  product_name_en: string
  product_name_ar: string
  quantity: number
  price: string
  addon_price: number
  image: string
  addons: any[]
  points: string
  total: string
}
