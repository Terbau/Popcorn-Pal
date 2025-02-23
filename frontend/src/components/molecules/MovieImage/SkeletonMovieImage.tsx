import { cn } from "@/lib/utils/classUtils";
import type { HTMLAttributes } from "react";

export const SkeletonMovieImage = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "h-32 xs:h-[10.5rem] md:h-60 aspect-[2/3] shrink-0 rounded-lg bg-slate-3 animate-pulse",
        className,
      )}
      role="img" 
      aria-label="Loading movie image" 
      {...props}
    />
  );
};
