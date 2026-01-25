export interface AddToCartRequestDTO {
  product_id: number
  quantity: number
  addons: Addon[]
}

interface Addon {
  addon_id: number
  name: string
  price: number
}
