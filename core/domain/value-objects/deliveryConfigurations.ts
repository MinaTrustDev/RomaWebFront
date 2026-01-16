export type DeliveryConfiguration = {
  order_type: "dinein" | "pickup" | "delivery";
  branchId: number;
  address: string;
};
