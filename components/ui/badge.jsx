import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary pt-1 text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary pt-1 text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive pt-1 text-destructive-foreground hover:bg-destructive/80",
        success:
          "border-transparent bg-green-700 pt-1 text-destructive-foreground hover:bg-green-700/80",
        pending:
          "border-transparent bg-yellow-700 pt-1 text-destructive-foreground hover:bg-yellow-700/80",
        gray: "border-transparent bg-gray-400 pt-1 text-destructive-foreground hover:bg-gray-400/80 dark:bg-gray-700",
        outline: "text-foreground pt-1",
        small:
          "border-transparent bg-gray-400 text-xs font-light px-1.5 text-destructive-foreground hover:bg-gray-400/80 dark:bg-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
