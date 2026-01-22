export class AddonEntity {
    public readonly id: string;
    public readonly title: string;
    public readonly min_max_rules: MinMaxRulesEntity;
    public readonly required: boolean;
    public readonly IsMultiChoise: boolean;
    public readonly options: AddonOptionEntity[];
    
    constructor({
        id,
        title,
        min_max_rules,
        required,
        IsMultiChoise,
        options,
    }: {
        id: string;
        title: string;
        min_max_rules: MinMaxRulesEntity;
        required: boolean;
        IsMultiChoise: boolean;
        options: AddonOptionEntity[];
    }) {
        this.id = id;
        this.title = title;
        this.min_max_rules = min_max_rules;
        this.required = required;
        this.IsMultiChoise = IsMultiChoise;
        this.options = options;
    }
}


export class MinMaxRulesEntity {
    public readonly min: number;
    public readonly max: number;
    public readonly exact: number;

    constructor({
        min,
        max,
        exact,
    }: {
        min: number;
        max: number;
        exact: number;
    }) {
        this.min = min;
        this.max = max;
        this.exact = exact;
    }
}


export class AddonOptionEntity {
    public readonly selected_by_default: boolean;
    public readonly title: string;
    public readonly price: string;
    public readonly price_type: string;
    public readonly price_method: string;
    public readonly tooltip: string;
    public readonly description: string;
    public readonly image: string;
    public readonly show_image: boolean;
    public readonly label_in_cart: boolean;
    public readonly label_in_cart_opt: string;


    constructor({
        selected_by_default,
        title,
        price,
        price_type,
        price_method,
        tooltip,
        description,
        image,
        show_image,
        label_in_cart,
        label_in_cart_opt,
    }: {
        selected_by_default: boolean;
        title: string;
        price: string;
        price_type: string;
        price_method: string;
        tooltip: string;
        description: string;
        image: string;
        show_image: boolean;
        label_in_cart: boolean;
        label_in_cart_opt: string;
    }) {
        this.selected_by_default = selected_by_default;
        this.title = title;
        this.price = price;
        this.price_type = price_type;
        this.price_method = price_method;
        this.tooltip = tooltip;
        this.description = description;
        this.image = image;
        this.show_image = show_image;
        this.label_in_cart = label_in_cart;
        this.label_in_cart_opt = label_in_cart_opt;
    }
}