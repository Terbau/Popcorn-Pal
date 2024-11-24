import {
  DropdownMenuSeparator,
  type DropdownMenuSeparatorProps,
} from "@radix-ui/react-dropdown-menu";
import { cn } from "../../../lib/utils";

export const ProfileDropdownSeparator = ({
  className,
  ...props
}: DropdownMenuSeparatorProps) => {
  return (
    <DropdownMenuSeparator
      className={cn("h-px bg-brand-6", className)}
      {...props}
    />
  );
};
