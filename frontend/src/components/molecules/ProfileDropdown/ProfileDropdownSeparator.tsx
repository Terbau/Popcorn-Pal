import {
  DropdownMenuSeparator,
  type DropdownMenuSeparatorProps,
} from "@radix-ui/react-dropdown-menu";
import { cn } from "../../../lib/utils";

interface ProfileDropdownSeparatorProps extends DropdownMenuSeparatorProps {}

export const ProfileDropdownSeparator = ({
  className,
  ...props
}: ProfileDropdownSeparatorProps) => {
  return <DropdownMenuSeparator className={cn("h-px bg-brand-6", className)} {...props} />;
};
