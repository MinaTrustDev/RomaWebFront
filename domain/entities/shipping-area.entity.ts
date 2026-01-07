export class BranchShippingAreaEntity {
  constructor(
    public readonly branch_id: string,
    public readonly shipping_areas: ShippingAreaEntity[]
  ) {}
}

export class ShippingAreaEntity {
  constructor(
    public readonly id: string,
    public readonly delivery_area_id: number,
    public readonly title: string,
    public readonly delivery_area: string
  ) {}
}
