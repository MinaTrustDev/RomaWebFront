export class BranchTypeEntity {
  public readonly id: number;
  public readonly branch_name: string;
  public readonly address: string;
  public readonly ordering_status: "open" | "closed";
  public readonly image: string;

  constructor({
    id,
    branch_name,
    address,
    ordering_status,
    image,
  }: {
    id: number;
    branch_name: string;
    address: string;
    ordering_status: "open" | "closed";
    image: string;
  }) {
    this.id = id;
    this.branch_name = branch_name;
    this.address = address;
    this.ordering_status = ordering_status;
    this.image = image;
  }
}
