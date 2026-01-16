"use client";

interface ProductHeaderProps {
    name: string;
    description?: string;
}

export const ProductHeader = ({ name, description }: ProductHeaderProps) => {
    return (
        <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl md:leading-tight font-black text-foreground tracking-tight">
                {name}
            </h1>
            {description && (
                <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed font-light">
                    {description}
                </p>
            )}
        </div>
    );
};
