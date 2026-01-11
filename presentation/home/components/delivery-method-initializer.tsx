"use client";

import { useEffect } from "react";
import { useLocalStore } from "@/presentation/store/local.store";
import { DELIVERY_METHODS } from "@/domain/constants/delivery-methods.constant";

/**
 * Component that initializes the delivery method from cookies on mount
 * This ensures the delivery method is restored when the page loads
 */
export const DeliveryMethodInitializer = () => {
  const { deliveryMethod, setDeliveryMethod } = useLocalStore();

  useEffect(() => {
    // Only initialize if deliveryMethod is not already set
    if (!deliveryMethod && typeof window !== "undefined") {
      // Try to get delivery method from cookie
      const cookies = document.cookie.split(";");
      const deliveryMethodCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("delivery_method=")
      );

      if (deliveryMethodCookie) {
        const method = deliveryMethodCookie.split("=")[1]?.trim();
        if (method && DELIVERY_METHODS.includes(method as typeof DELIVERY_METHODS[number])) {
          setDeliveryMethod(method as typeof DELIVERY_METHODS[number]);
        }
      }
    }
  }, [deliveryMethod, setDeliveryMethod]);

  return null; // This component doesn't render anything
};










