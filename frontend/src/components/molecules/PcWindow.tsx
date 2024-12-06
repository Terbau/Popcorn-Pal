import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export const PcWindow = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "relative h-64 aspect-video dark:bg-black/70 bg-cream-secondary rounded-lg border border-purple-border dark:border-blue-7 shadow-lg flex flex-col overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="flex items-center px-4 py-2 bg-black z-10 rounded-t-lg">
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-red-10 rounded-full" />
          <span className="w-3 h-3 bg-yellow-10 rounded-full" />
          <span className="w-3 h-3 bg-green-10 rounded-full" />
        </div>
      </div>

      <div className="p-6 grow">{children}</div>
    </div>
  );
};
