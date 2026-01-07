import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ className, text, size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-8 gap-3",
          className
        )}
        {...props}
      >
        <Loader2
          className={cn("animate-spin text-primary", sizeClasses[size])}
        />
        {text && (
          <p className="text-sm text-muted-foreground">{text}</p>
        )}
      </div>
    );
  }
);
LoadingState.displayName = "LoadingState";

