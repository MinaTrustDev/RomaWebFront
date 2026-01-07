import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "centered";
}

export const SectionHeader = React.forwardRef<
  HTMLDivElement,
  SectionHeaderProps
>(({ className, title, description, action, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between mb-6",
        variant === "centered" && "flex-col text-center gap-2",
        className
      )}
      {...props}
    >
      <div className={cn("flex flex-col", variant === "centered" && "items-center")}>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
});
SectionHeader.displayName = "SectionHeader";

