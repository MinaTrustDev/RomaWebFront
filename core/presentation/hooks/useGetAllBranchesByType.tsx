import { getBranchesByOrderTypeUseCase } from "@/core/di";
import { useQuery } from "@tanstack/react-query";

export const useGetBranchesByOrderType = ({
  order_type,
}: {
  order_type: string;
}) => {
  return useQuery({
    queryKey: ["branches", order_type],
    queryFn: () =>
      getBranchesByOrderTypeUseCase.execute({ order_type: order_type }),
    enabled: !!order_type,
  });
};
