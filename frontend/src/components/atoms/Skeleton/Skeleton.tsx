import { cn } from "@/lib/utils/classUtils";
import type { ComponentProps } from "react";

export const Skeleton = ({ className, ...props }: ComponentProps<"span">) => (
  <span
    className={cn(
      "block h-3 md:h-4 w-32 bg-slate-11 dark:bg-brand-5 rounded-full animate-pulse",
      className,
    )}
    {...props}
  />
);
