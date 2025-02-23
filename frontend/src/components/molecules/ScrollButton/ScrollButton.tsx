import { cn } from "@/lib/utils/classUtils";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { ButtonHTMLAttributes } from "react";

export interface ScrollButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right";
}

export const ScrollButton = ({
  direction,
  className,
  ...props
}: ScrollButtonProps) => {
  const icon =
    direction === "left" ? "mingcute:left-fill" : "mingcute:right-fill";

  return (
    <button
      className={cn(
        "text-white z-10 h-10 w-10 sm:h-14 sm:w-14 rounded-full text-5xl bg-black/80 shrink-0 flex items-center justify-center hover:bg-black/90",
        className,
      )}
      type="button"
      {...props}
      aria-label={`${direction}`}
    >
      <Icon icon={icon} className="h-6 w-6 sm:h-8 sm:w-8" />
    </button>
  );
};
