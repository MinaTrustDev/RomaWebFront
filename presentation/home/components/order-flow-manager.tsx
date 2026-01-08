"use client";

import { DELIVERY_METHODS } from "@/domain/constants/delivery-methods.constant";
import { useState, useEffect } from "react";
import { MethodSelectorDialog } from "@/components/common/method-selector-dialog";
import { BranchSelectorDialog } from "@/components/common/branch-selector-dialog";
import { SelectDeliveryLocation } from "./methods/select-delivery-location";
import { getBranches } from "@/presentation/actions/get-branches.action";
import { getNearbyBranches } from "@/presentation/actions/get-nearby-branches.action";
import { BranchDTO } from "@/domain/dtos/branch.dto";
import { useLocalStore } from "@/presentation/store/local.store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

type DeliveryStep = "location" | "branch";

export const OrderFlowManager = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedMethod, setSelectedMethod] = useState<
    (typeof DELIVERY_METHODS)[number] | null
  >(null);
  const [methodDialogOpen, setMethodDialogOpen] = useState(false);
  const [branchDialogOpen, setBranchDialogOpen] = useState(false);
  const [deliveryStep, setDeliveryStep] = useState<DeliveryStep>("location");
  const [deliveryLocation, setDeliveryLocation] = useState<{
    latitude: string;
    longitude: string;
  } | null>(null);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [branches, setBranches] = useState<BranchDTO[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<BranchDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { deliveryMethod, setDeliveryMethod, setSelectedBranchId } =
    useLocalStore();
  const router = useRouter();

  // Handle continue button click - open appropriate dialog
  const handleContinue = () => {
    if (deliveryMethod) {
      console.log("handleContinue - deliveryMethod:", deliveryMethod);
      setSelectedMethod(deliveryMethod);
      if (deliveryMethod === "delivery") {
        setDeliveryStep("location");
        setMapDialogOpen(true);
      } else if (deliveryMethod === "dine-in" || deliveryMethod === "pickup") {
        // Reset branches and error when opening dialog to trigger fresh fetch
        setBranches([]);
        setError(null);
        setBranchDialogOpen(true);
      }
    }
  };

  // Fetch branches when method is selected
  useEffect(() => {
    if (selectedMethod && selectedMethod !== "delivery" && branchDialogOpen) {
      const fetchBranches = async () => {
        try {
          setLoading(true);
          setError(null);
          console.log("Fetching branches for method:", selectedMethod);
          const data = await getBranches(selectedMethod);
          console.log("Branches received:", data);
          console.log("Number of branches:", data?.length || 0);
          setBranches(data || []);
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to fetch branches";
          setError(errorMessage);
          console.error("Error fetching branches:", err);
          setBranches([]);
        } finally {
          setLoading(false);
        }
      };
      fetchBranches();
    }
  }, [selectedMethod, branchDialogOpen]);

  // Fetch nearby branches for delivery
  useEffect(() => {
    // Use deliveryMethod from store as fallback if selectedMethod is null
    const method = selectedMethod || deliveryMethod;

    console.log("Nearby branches useEffect triggered:", {
      selectedMethod,
      deliveryMethod,
      method,
      deliveryLocation,
      deliveryStep,
      branchDialogOpen,
      condition:
        method === "delivery" &&
        deliveryLocation &&
        deliveryStep === "branch" &&
        branchDialogOpen,
    });

    if (
      method === "delivery" &&
      deliveryLocation &&
      deliveryStep === "branch" &&
      branchDialogOpen
    ) {
      console.log("Fetching nearby branches for:", deliveryLocation);
      const fetchNearbyBranches = async () => {
        try {
          setLoading(true);
          setError(null);
          setBranches([]); // Clear previous branches
          console.log(
            "Calling getNearbyBranches with:",
            deliveryLocation.latitude,
            deliveryLocation.longitude
          );
          const data = await getNearbyBranches(
            deliveryLocation.latitude,
            deliveryLocation.longitude
          );
          console.log("Nearby branches received:", data);
          console.log("Number of nearby branches:", data?.length || 0);
          if (data && Array.isArray(data)) {
            setBranches(data);
          } else {
            console.warn("Received non-array data for nearby branches:", data);
            setBranches([]);
          }
        } catch (err) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "Failed to fetch nearby branches";
          setError(errorMessage);
          console.error("Error fetching nearby branches:", err);
          setBranches([]);
        } finally {
          setLoading(false);
        }
      };
      fetchNearbyBranches();
    } else {
      console.log("Nearby branches fetch skipped - conditions not met");
    }
  }, [
    selectedMethod,
    deliveryMethod,
    deliveryLocation,
    deliveryStep,
    branchDialogOpen,
  ]);

  const handleMethodContinue = () => {
    if (selectedMethod) {
      setDeliveryMethod(selectedMethod); // This will also save to cookie
      setMethodDialogOpen(false);
      if (selectedMethod === "delivery") {
        setDeliveryStep("location");
        setMapDialogOpen(true);
      } else {
        setBranchDialogOpen(true);
      }
    }
  };

  const handleLocationSelect = (latitude: string, longitude: string) => {
    console.log("handleLocationSelect called with:", { latitude, longitude });
    console.log("Current selectedMethod:", selectedMethod);
    console.log("Current deliveryMethod:", deliveryMethod);

    // Ensure selectedMethod is set to delivery BEFORE setting other state
    // This ensures the useEffect will see the correct selectedMethod value
    const methodToUse = selectedMethod || deliveryMethod || "delivery";
    setSelectedMethod(methodToUse);

    setDeliveryLocation({ latitude, longitude });
    setDeliveryStep("branch");
    setMapDialogOpen(false);

    // Use a small timeout to ensure state updates are processed before opening dialog
    // This ensures the useEffect sees the correct state values
    setTimeout(() => {
      setBranchDialogOpen(true);
      console.log("Branch dialog opened with selectedMethod:", methodToUse);
    }, 0);

    console.log("After setting state - will trigger nearby branches fetch");
  };

  const handleBranchContinue = async () => {
    if (selectedBranch) {
      setSelectedBranchId(selectedBranch.id);
      document.cookie = `branch_id=${selectedBranch.id}; path=/; max-age=${
        60 * 60 * 24 * 30
      }`;
      // Ensure delivery method is saved to cookie before refresh
      const methodToSave = selectedMethod || deliveryMethod;
      if (methodToSave) {
        document.cookie = `delivery_method=${methodToSave}; path=/; max-age=${
          60 * 60 * 24 * 30
        }`;
      }
      setBranchDialogOpen(false);
      setSelectedMethod(null);
      setDeliveryStep("location");
      setDeliveryLocation(null);
      setSelectedBranch(null);
      router.refresh();
    }
  };

  const handleMapDialogClose = (open: boolean) => {
    setMapDialogOpen(open);
    if (!open) {
      // If map closes and we're on location step, reset delivery method
      if (deliveryStep === "location") {
        setSelectedMethod(null);
        // Don't reset deliveryMethod in store - let user change it via tabs
      }
    }
  };

  const handleBranchDialogClose = (open: boolean) => {
    setBranchDialogOpen(open);
    if (!open) {
      // Reset selection when branch dialog closes
      setSelectedBranch(null);
    } else {
      // When dialog opens, ensure we trigger a fresh fetch by resetting state
      // The useEffect will handle the fetch
      console.log(
        "Branch dialog opened, will fetch branches for:",
        selectedMethod
      );
    }
  };

  const getBranchDialogTitle = () => {
    if (selectedMethod === "delivery") {
      return "اختر الفرع الأقرب";
    }
    return "اختر الفرع";
  };

  const getBranchDialogDescription = () => {
    if (selectedMethod === "delivery") {
      return "اختر الفرع الأقرب لموقع التوصيل";
    }
    return "اختر الفرع الذي تريد الطلب منه";
  };

  return (
    <>
      <MethodSelectorDialog
        open={methodDialogOpen}
        onOpenChange={setMethodDialogOpen}
        selectedMethod={selectedMethod}
        onMethodSelect={setSelectedMethod}
        onContinue={handleMethodContinue}
      />

      <BranchSelectorDialog
        open={branchDialogOpen}
        onOpenChange={handleBranchDialogClose}
        title={getBranchDialogTitle()}
        description={getBranchDialogDescription()}
        branches={branches}
        selectedBranch={selectedBranch}
        onBranchSelect={setSelectedBranch}
        onContinue={handleBranchContinue}
        loading={loading}
        error={error}
        headerAction={
          selectedMethod === "delivery" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setBranchDialogOpen(false);
                setDeliveryStep("location");
                setMapDialogOpen(true);
              }}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              تغيير الموقع
            </Button>
          )
        }
      />

      <SelectDeliveryLocation
        open={mapDialogOpen}
        onOpenChange={handleMapDialogClose}
        onLocationSelect={handleLocationSelect}
      />

      <div onClick={handleContinue} className="cursor-pointer">
        {children}
      </div>
    </>
  );
};
