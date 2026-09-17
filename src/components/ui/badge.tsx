import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2 focus:ring-offset-abyss",
  {
    variants: {
      variant: {
        default: "border-transparent bg-cobalt text-lilac",
        secondary: "border-obsidian bg-deep-sea text-mist",
        destructive: "border-transparent bg-destructive/20 text-destructive",
        outline: "border-obsidian text-ash",
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
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
