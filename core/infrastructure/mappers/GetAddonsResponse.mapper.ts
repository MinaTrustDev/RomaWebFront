import { AddonEntity, AddonOptionEntity, MinMaxRulesEntity } from "@/core/domain/entities/Addons.entity";
import { GetAddonsResponseDTO } from "../dtos/GetAddonsResponse.dto";

export class GetAddonsResponseMapper {
    static toDomain(addon: GetAddonsResponseDTO["blocks"][number]["addons"][number]): AddonEntity {
        return new AddonEntity({
            id: addon.id,
            title: addon.title_ar,
            min_max_rules: new MinMaxRulesEntity({
                min: addon.min_max_rules.min,
                max: addon.min_max_rules.max,
                exact: addon.min_max_rules.exact,
            }),
            required: addon.required,
            IsMultiChoise: addon.IsMultiChoise,
            options: addon.options.map((option) => new AddonOptionEntity({
                selected_by_default: option.selected_by_default,
                title: option.label_ar,
                price: option.price,
                price_type: option.price_type,
                price_method: option.price_method,
                tooltip: option.tooltip,
                description: option.description,
                image: option.image,
                show_image: option.show_image,
                label_in_cart: option.label_in_cart,
                label_in_cart_opt: option.label_in_cart_opt,
            })),
        })
    }

    static toDomainList(addons: GetAddonsResponseDTO["blocks"][number]["addons"]): AddonEntity[] {
        return addons.map((addon) => this.toDomain(addon));
    }
}