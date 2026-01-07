import { createStore } from "@/lib/createStore";
import { DELIVERY_METHODS } from "@/domain/constants/delivery-methods.constant";

type DeliveryMethod = (typeof DELIVERY_METHODS)[number] | null;

interface LocalStore {
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (
    deliveryMethod: (typeof DELIVERY_METHODS)[number]
  ) => void;
  selectedBranchId: string | null;
  setSelectedBranchId: (branchId: string | null) => void;
}

export const useLocalStore = createStore<LocalStore>(
  (set) => ({
    deliveryMethod: null,
    setDeliveryMethod: (deliveryMethod) => {
      set({ deliveryMethod });
    },
    selectedBranchId: null,
    setSelectedBranchId: (branchId) => {
      set({ selectedBranchId: branchId });
    },
  }),
  {
    name: "local-store",
    skipPersist: false,
  }
);
