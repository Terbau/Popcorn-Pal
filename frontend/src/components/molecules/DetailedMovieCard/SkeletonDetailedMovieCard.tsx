import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { SkeletonMovieImage } from "../MovieImage/SkeletonMovieImage";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";

export const SkeletonDetailedMovieCard = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn("flex flex-row w-full rounded-lg bg-brand-3", className)}
    {...props}
  >
    <SkeletonMovieImage className="bg-brand-5 rounded-b-none rounded-r-none" />
    <div className="p-2 sm:p-4 grow w-full">
      <div className="flex flex-row gap-2">
        <Skeleton className="w-4/6" />
        <Skeleton className="w-1/6 ml-auto" />
      </div>
      <Skeleton className="w-3/6 mt-2" />

      <Skeleton className="w-full mt-6 sm:mt-12" />
      <Skeleton className="w-9/12 mt-2" />
      <Skeleton className="w-9/12 mt-2" />
    </div>
  </div>
);
