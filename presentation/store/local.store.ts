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
      // Also store in cookie for server-side access
      if (typeof window !== "undefined") {
        document.cookie = `delivery_method=${deliveryMethod}; path=/; max-age=${
          60 * 60 * 24 * 30
        }`; // 30 days
      }
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
