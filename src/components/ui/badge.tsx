import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1  w-4 h-4",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 rounded-full w-4 h-4",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full w-4 h-4",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 rounded-full w-4 h-4",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
