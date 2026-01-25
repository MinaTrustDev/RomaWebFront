import { AddonEntity } from "./Addons.entity";

export class CartItemEntity {
    public readonly productId: number;
    public readonly quantity: number;
    public readonly addons: {
        addonId: string,
        name: string,
        price: number,
    }[];
    public readonly price?: string;
    public readonly points?: string;
    public readonly total?: string;
    public readonly image?: string;
    public readonly productName?: string;
    public readonly productNameAr?: string;
    public readonly productNameEn?: string;
    constructor(
            {productId, quantity, addons, price, points, total, image, productName, productNameAr, productNameEn}:{
                productId: number,
            quantity: number,
                addons: {
                addonId: string,
                name: string,
                price: number,
            }[],
            price?: string,
            points?: string,
            total?: string,
            image?: string,
            productName?: string,
            productNameAr?: string,
            productNameEn?: string,
        }
    ) {
        this.productId = productId;
        this.quantity = quantity;
        this.addons = addons.map((addon) => ({
            addonId: addon.addonId,
            name: addon.name,
            price: addon.price,
        }));
        this.price = price;
        this.points = points;
        this.total = total;
        this.image = image;
        this.productName = productName;
        this.productNameAr = productNameAr;
        this.productNameEn = productNameEn;
    }
}