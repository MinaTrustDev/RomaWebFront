import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-fit p-5 flex items-center justify-center bg-gradient-to-b from-background via-background to-muted/20">
      <div className="text-center space-y-4">
        <p className="text-xl text-muted-foreground">المنتج غير موجود</p>
        <Link href="/">
          <Button className="mt-4">
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة للصفحة الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
}

