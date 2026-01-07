import { CategoryEntity } from "./category.entity";
import { LocationEntity } from "./location.entity";

export class BranchEntity {
  constructor(
    public readonly id: string,
    public readonly branch_name: string,

    public readonly order_type: string,

    public readonly delivery_time: string,
    public readonly shipping_cost: number,
    public readonly shipping_cost_tax: number,
    public readonly address: string,
    public readonly ordering_status: "open" | "closed",

    public readonly latitude: number,
    public readonly longitude: number,

    public readonly image: string,

    public readonly categories: CategoryEntity[]
  ) {}
}
