import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { FilePlus } from "lucide-react";

const DataPageHeader = ({ title, text, link, btnTitle, createComponent }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-2">
          <h3>{title}</h3>
          <span
            className={cn("text-sm text-muted-foreground", !text && "hidden")}
          >
            {text}
          </span>
        </div>
        {link && btnTitle && (
          <Link href={link}>
            <Button variant="ghost2">
              <FilePlus className="h-4 w-4 text-foreground group-hover:text-primary" />
              <span className="text-sm font-normal text-foreground group-hover:text-primary">
                {btnTitle}
              </span>
            </Button>
          </Link>
        )}
        {createComponent && createComponent}
      </div>
      <Separator className="mb-4 h-[1px] rounded-xl bg-yellow-600" />
    </div>
  );
};

export default DataPageHeader;
