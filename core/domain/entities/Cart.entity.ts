import { CartItemEntity } from "./CartItem.entity";

export class CartEntity {
    public readonly cartItems: CartItemEntity[];
    public readonly totalPrice: string;
    public readonly VAT: string;
    public readonly VATDinein: string;
    public readonly totalPriceWithTax: string;
    public readonly totalPriceWithTaxDinein: string;
    public readonly totalItems: number;
    public readonly totalPoints: string;
    public readonly userPoints: number;
    public readonly pointsWorth: number;

    constructor({cartItems, totalPrice, VAT, VATDinein, totalPriceWithTax, totalPriceWithTaxDinein, totalItems, totalPoints, userPoints, pointsWorth}: {cartItems: CartItemEntity[], totalPrice: string, VAT: string, VATDinein: string, totalPriceWithTax: string, totalPriceWithTaxDinein: string, totalItems: number, totalPoints: string, userPoints: number, pointsWorth: number}) {
        this.cartItems = cartItems;
        this.totalPrice = totalPrice;
        this.VAT = VAT;
        this.VATDinein = VATDinein;
        this.totalPriceWithTax = totalPriceWithTax;
        this.totalPriceWithTaxDinein = totalPriceWithTaxDinein;
        this.totalItems = totalItems;
        this.totalPoints = totalPoints;
        this.userPoints = userPoints;
        this.pointsWorth = pointsWorth;
    }
}