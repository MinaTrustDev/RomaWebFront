"use client";

interface PriceDisplayProps {
    price: number;
    priceTax: number;
}

export const PriceDisplay = ({ price, priceTax }: PriceDisplayProps) => {
    return (
        <div className="flex items-baseline gap-2 pb-4 border-b border-border/40">
            <span className="text-5xl md:text-6xl font-black text-primary tracking-tighter">
                {Math.floor(price)}
                <span className="text-2xl md:text-3xl font-bold text-muted-foreground/60 mr-2">
                    .{(price % 1).toFixed(2).split(".")[1]}
                </span>
            </span>
            <span className="text-xl md:text-2xl font-medium text-muted-foreground pb-2">
                ج.م
            </span>

            {priceTax > price && (
                <span className="text-xl text-muted-foreground/50 line-through decoration-primary/30 mr-4">
                    {priceTax.toFixed(0)}
                </span>
            )}
        </div>
    );
};
