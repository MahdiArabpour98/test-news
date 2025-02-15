"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const FullSearch = ({ queryTitle, className }) => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      q: searchParams.get(queryTitle) || "",
    },
  });

  const { setValue } = form;

  function onSubmit(values) {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      ["page"]: 1,
      [queryTitle]: values.q || null,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "relative mb-2 flex w-full items-center md:w-1/3 lg:w-1/4",
          className,
        )}
      >
        <Button
          type="button"
          className="absolute right-2 h-7 rounded-none border-none bg-transparent px-0 text-muted-foreground hover:bg-transparent"
          onClick={() => {
            onSubmit({
              q: "",
            });
            setValue("q", "");
          }}
        >
          <X size={14} />
        </Button>
        <FormField
          control={form.control}
          name="q"
          render={({ field }) => (
            <FormItem className="w-full">
              <Input
                placeholder="جستجو..."
                {...field}
                className="h-9 rounded-l-none border border-l-0 border-muted-foreground pr-7 text-xs placeholder:text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="ghost"
          className="h-9 rounded-r-none border border-r-0 border-muted-foreground bg-background px-2 text-muted-foreground hover:bg-transparent"
        >
          <Search size={14} />
        </Button>
      </form>
    </Form>
  );
};

export default FullSearch;
