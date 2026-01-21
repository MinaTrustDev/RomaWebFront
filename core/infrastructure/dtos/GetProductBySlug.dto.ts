export interface GetProductBySlugResponseDTO {
    id: number
    name: string
    slug: string
    date_created: DateCreated
    date_modified: DateModified
    status: string
    featured: boolean
    catalog_visibility: string
    description: string
    short_description: string
    sku: string
    global_unique_id: string
    price: string
    regular_price: string
    sale_price: string
    date_on_sale_from: any
    date_on_sale_to: any
    total_sales: number
    tax_status: string
    tax_class: string
    manage_stock: boolean
    stock_quantity: any
    stock_status: string
    backorders: string
    low_stock_amount: string
    sold_individually: boolean
    weight: string
    length: string
    width: string
    height: string
    upsell_ids: any[]
    cross_sell_ids: any[]
    parent_id: number
    reviews_allowed: boolean
    purchase_note: string
    attributes: any[]
    default_attributes: any[]
    menu_order: number
    post_password: string
    virtual: boolean
    downloadable: boolean
    category_ids: number[]
    tag_ids: any[]
    shipping_class_id: number
    downloads: any[]
    image_id: string
    gallery_image_ids: any[]
    download_limit: number
    download_expiry: number
    rating_counts: any[]
    average_rating: string
    review_count: number
    meta_data: MetaDaum[]
    name_en: string
    name_ar: string
    description_en: string
    description_ar: string
    image: string
    price_tax: number
    price_tax_sale: number
    points: number
    on_sale: boolean
    related_ids: number[]
    type: string
    branch_ids: number[]
  }
  
interface DateCreated {
    date: string
    timezone_type: number
    timezone: string
  }
  
interface DateModified {
    date: string
    timezone_type: number
    timezone: string
  }
  
interface MetaDaum {
    id: number
    key: string
    value: any
  }
  