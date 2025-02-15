import { Button } from "@/components/ui/button";
import { routes } from "@/routes/routes";
import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <Frown className="w-10" />
      <h2 className="text-xl font-semibold">صفحه ۴۰۴</h2>
      <p>صفحه ای که به دنبال آن هستید یافت نشد</p>
      <div className="mt-4 flex gap-2">
        <Link href={routes.root.landing}>
          <Button>صفحه اصلی</Button>
        </Link>
        <Link href="#">
          <Button
            variant="outline"
            className="border-primary text-primary hover:border-foreground hover:bg-transparent hover:text-foreground"
          >
            صفحه ورود
          </Button>
        </Link>
      </div>
    </main>
  );
}
