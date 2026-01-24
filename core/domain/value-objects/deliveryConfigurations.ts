export type DeliveryConfiguration = {
  order_type: "dinein" | "pickup" | "delivery";
  branchId: number;
  branchName: string;
  address: string;
};
