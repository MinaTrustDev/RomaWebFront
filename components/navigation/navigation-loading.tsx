"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function NavigationLoading() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 100);

    // Reset loading state after navigation completes
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 200);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <>
      {/* Top Progress Bar */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-1 bg-primary/10",
          "transition-opacity duration-300"
        )}
      >
        <div
          className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Center Loading Spinner */}
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-none">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-primary animate-spin" strokeWidth={2.5} />
          <p className="text-sm text-muted-foreground font-medium">جاري التحميل...</p>
        </div>
      </div>
    </>
  );
}

