export interface NearbyBranchResponseDTO {
    success: boolean
    branches: Branch[]
  }
  
   interface Branch {
    id: number
    name: string
    address: string
    latitude: number
    longitude: number
    delivery_time: string
    shipping_cost: number
    shipping_cost_tax: number
    "order-type": string
    is_open: string
    image: string
    matched_area_id: string
    matched_area_title: string
    area_shipping_rate: number
    area_shipping_rate_tax: number
    cost_calculation: string
  }
  