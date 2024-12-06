import { cn } from "@/lib/utils/classUtils";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import {
  forwardRef,
  type MutableRefObject,
  type ReactNode,
  type RefAttributes,
} from "react";

type ScrollAreaProps = RadixScrollArea.ScrollAreaProps &
  RefAttributes<HTMLDivElement> & {
    orientation: "horizontal" | "vertical";
    children: ReactNode;
    viewportRef?: MutableRefObject<HTMLDivElement | null>;
  };

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      orientation,
      className,
      children,
      viewportRef,
      ...props
    }: ScrollAreaProps,
    ref,
  ) => {
    return (
      <RadixScrollArea.Root
        ref={ref}
        className={cn("overflow-hidden", className)}
        {...props}
      >
        <RadixScrollArea.Viewport
          className="h-full w-full rounded-[inherit]"
          ref={viewportRef}
        >
          {children}
        </RadixScrollArea.Viewport>
        <RadixScrollArea.Scrollbar
          orientation={orientation}
          className={cn(
            "flex select-none touch-none p-0.5 transition duration-150 ease-out",
            orientation === "horizontal" ? "h-2 flex-col" : "w-2 flex-row",
          )}
        >
          <RadixScrollArea.Thumb
            className={cn(
              "flex-1 bg-brand-4 rounded-lg relative",
              "before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:translate-x-1/2",
              "before:translate-y-1/2 before:w-full before:h-full before:min-w-10 before:min-h-10",
            )}
          />
        </RadixScrollArea.Scrollbar>
        <RadixScrollArea.Corner className="bg-brand-6" />
      </RadixScrollArea.Root>
    );
  },
);
