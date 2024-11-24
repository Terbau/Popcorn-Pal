import type { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";

export const MovieImageSkeleton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "h-[10.5rem] w-28 md:h-60 md:w-40 shrink-0 rounded-lg bg-slate-3 animate-pulse",
        className,
      )}
      {...props}
    />
  );
};
