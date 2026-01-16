import {
  getDeliveryConfigurationUseCase,
  removeDeliveryConfigurationUseCase,
} from "@/core/di";
import {
  UtensilsCrossed,
  ShoppingBag,
  Truck,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import { DeliveryConfiguration } from "@/core/domain/value-objects/deliveryConfigurations";
import { MethodSelectionDialog } from "./methodSelectionDialog";
import { DeleteDeliveryConfigurationButton } from "./deleteDeliveryConfigurationButton";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";

const methodIcons = {
  dinein: UtensilsCrossed,
  pickup: ShoppingBag,
  delivery: Truck,
};

const methodLabels = {
  dinein: "في المطعم",
  pickup: "الاستلام",
  delivery: "التوصيل",
};

export const MethodHeader = async () => {
  try {
    const deliveryConfiguration =
      await getDeliveryConfigurationUseCase.execute();

    return (
      <SelectedMethodHeader deliveryConfiguration={deliveryConfiguration} />
    );
  } catch (error) {
    return <NoDeliveryConfigurationHeader />;
  }
};

const SelectedMethodHeader = ({
  deliveryConfiguration,
}: {
  deliveryConfiguration: DeliveryConfiguration;
}) => {
  return (
    <div className="relative z-10 container mx-auto px-4 pt-6 pb-12 flex flex-col items-center justify-center gap-6">
      <Item className=" bg-background/90 backdrop-blur-sm p-4 pr-6 rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-6 border border-white/20 w-full max-w-2xl">
        <ItemContent>
          <ItemTitle className="text-lg font-bold text-primary">
            {methodLabels[deliveryConfiguration.order_type]}
          </ItemTitle>
          <ItemDescription className="text-primary w-full">
            {deliveryConfiguration.address}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <DeleteDeliveryConfigurationButton />
        </ItemActions>
      </Item>
    </div>
  );
};

const NoDeliveryConfigurationHeader = () => {
  return (
    <div className="relative z-10 container mx-auto px-4 pt-6 pb-12 flex flex-col items-center justify-center gap-6">
      <div className="bg-background/90 backdrop-blur-sm p-2 pr-6 rounded-full shadow-xl shadow-primary/20 flex items-center gap-4 border border-white/20">
        <MethodSelectionDialog />
      </div>
    </div>
  );
};
