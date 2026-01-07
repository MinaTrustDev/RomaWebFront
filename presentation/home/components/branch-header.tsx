"use client";

import { useRouter } from "next/navigation";
import { useLocalStore } from "@/presentation/store/local.store";
import { useCallback } from "react";

interface BranchHeaderProps {
  branchName: string;
}

export const BranchHeader = ({ branchName }: BranchHeaderProps) => {
  const router = useRouter();
  const { setSelectedBranchId } = useLocalStore();

  const handleClick = useCallback(() => {
    // Clear branch selection
    setSelectedBranchId(null);
    // Clear branch_id cookie
    if (typeof window !== "undefined") {
      document.cookie = `branch_id=; path=/; max-age=0`;
    }
    // Refresh the page to show method selection
    router.refresh();
  }, [router, setSelectedBranchId]);

  return (
    <h1
      className="text-3xl md:text-4xl font-bold mb-3 bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`العودة إلى اختيار طريقة الطلب - ${branchName}`}
    >
      {branchName}
    </h1>
  );
};

