"use client";

import { BranchItem } from "@/core/presentation/home/components/methods/select-branch/branchItem";
import { BranchDTO } from "@/core/domain/dtos/branch.dto";

interface BranchListProps {
  branches: BranchDTO[];
  selectedBranch: BranchDTO | null;
  onBranchSelect: (branch: BranchDTO) => void;
}

export const BranchList = ({
  branches,
  selectedBranch,
  onBranchSelect,
}: BranchListProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 py-2">
      {branches.map((branch) => (
        <BranchItem
          key={branch.id}
          branch={branch}
          selectedBranch={selectedBranch}
          onClick={onBranchSelect}
        />
      ))}
    </div>
  );
};
