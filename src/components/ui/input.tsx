import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-obsidian bg-void px-3 py-2 text-[15px] text-quartz ring-offset-abyss file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50 focus-visible:border-sapphire disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
