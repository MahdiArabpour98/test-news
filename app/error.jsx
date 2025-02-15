"use client";

import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const ErrorPage = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <Frown className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">ERROR</h2>
      <p>مشکلی پیش آمده است. لطفا مجددا تلاش فرمایید!</p>
      <div className="mt-4 flex gap-2">
        <Button
          onClick={() => reset()}
          className="rounded-md border-none bg-rose-500 px-4 py-2 text-sm text-white transition-colors hover:bg-rose-500/80 hover:text-white"
        >
          تلاش مجدد
        </Button>
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
};

export default ErrorPage;
