import { Icon, type IconProps } from "@iconify/react";
import { cn } from "../../../lib/utils";

export const Spinner = ({ className, ...props }: Omit<IconProps, "icon">) => {
  return (
    <Icon
      icon="prime:spinner"
      className={cn("animate-spin", className)}
      {...props}
    />
  );
};
