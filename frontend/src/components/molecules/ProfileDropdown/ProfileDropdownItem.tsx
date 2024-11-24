import {
  DropdownMenuItem,
  type DropdownMenuItemProps,
} from "@radix-ui/react-dropdown-menu";
import { cn } from "../../../lib/utils";
import { forwardRef } from "react";
import { Icon, type IconProps } from "@iconify/react/dist/iconify.js";

interface ProfileDropdownItemProps extends DropdownMenuItemProps {
  href?: string;
}

export const ProfileDropdownItem = forwardRef<
  HTMLDivElement,
  ProfileDropdownItemProps
>(({ className, children, ...props }, ref) => {
  return (
    <DropdownMenuItem
      className={cn(
        "text-sm text-brand-12 rounded-sm pl-3 pr-4 py-2.5 relative cursor-pointer select-none outline-none flex flex-row items-center gap-2",
        'data-[disabled="true"]:text-slate-11 data-[disabled="true"]:pointer-events-none',
        "data-[highlighted]:text-brand-11 data-[highlighted]:bg-brand-4",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </DropdownMenuItem>
  );
});

export const ProfileDropdownItemIcon = ({ className, ...props }: IconProps) => {
  return <Icon className={cn("text-brand-11 h-4 w-4", className)} {...props} />;
};
