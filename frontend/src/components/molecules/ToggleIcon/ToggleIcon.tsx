import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "../../../lib/utils";
import * as RadixToggle from "@radix-ui/react-toggle";

export interface ToggleIconProps extends RadixToggle.ToggleProps {
  toggledIcon: string;
  untoggledIcon: string;
}

export const ToggleIcon = ({
  toggledIcon,
  untoggledIcon,
  pressed,
  className,
  ...props
}: ToggleIconProps) => {
  return (
    <RadixToggle.Root
      className={cn("h-10 w-10 text-brand-8", className)}
      {...props}
    >
      <Icon
        icon={pressed ? toggledIcon : untoggledIcon}
        className="w-full h-full"
      />
    </RadixToggle.Root>
  );
};
