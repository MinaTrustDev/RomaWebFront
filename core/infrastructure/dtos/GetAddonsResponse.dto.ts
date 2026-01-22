export interface GetAddonsResponseDTO {
    product: Product
    blocks: Block[]
  }
  
interface Product {
    id: number
    name: string
    name_ar: string
    price: string
    type: string
  }
  
interface Block {
    id: string
    name: string
    product_association: string
    exclude_products: string
    user_association: string
    exclude_users: string
    addons: Addon[]
  }
  
interface Addon {
    id: string
    title: string
    title_ar: string
    min_max_rules: MinMaxRules
    required: boolean
    IsMultiChoise: boolean
    options: Option[]
  }
  
interface MinMaxRules {
    min: number
    max: number
    exact: number
  }
  
interface Option {
    selected_by_default: boolean
    required: boolean
    addon_enabled: boolean
    label: string
    label_ar: string
    price: string
    price_type: string
    price_method: string
    tooltip: string
    description: string
    image: string
    show_image: boolean
    label_in_cart: boolean
    label_in_cart_opt: string
  }
  