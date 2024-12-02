import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { cn } from "../../../lib/utils";
import { Icon, type IconProps } from "@iconify/react/dist/iconify.js";

export const DropdownMenuRoot = RadixDropdownMenu.Root;

export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

export const DropdownMenuPortal = RadixDropdownMenu.Portal;

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Content>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>
>(({ className, ...props }, ref) => (
  <RadixDropdownMenu.Portal>
    <RadixDropdownMenu.Content
      ref={ref}
      className={cn(
        "border border-brand-5 z-30 min-w-64 bg-brand-3 rounded-md shadow-2xl",
        className,
      )}
      {...props}
    />
  </RadixDropdownMenu.Portal>
));

export const DropdownMenuItem = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Item>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadixDropdownMenu.Item
      className={cn(
        "text-sm text-brand-12 rounded-sm pl-3 pr-4 py-2.5 relative cursor-pointer select-none outline-none flex flex-row items-center gap-2",
        'data-[disabled="true"]:text-slate-11 data-[disabled="true"]:pointer-events-none',
        "data-[highlighted]:text-brand-11 data-[highlighted]:bg-brand-4",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export const DropdownMenuItemIcon = ({ className, ...props }: IconProps) => {
  return <Icon className={cn("text-brand-11 h-4 w-4", className)} {...props} />;
};

export const DropdownMenuSeparator = ({
  className,
  ...props
}: RadixDropdownMenu.DropdownMenuSeparatorProps) => {
  return (
    <RadixDropdownMenu.Separator
      className={cn("h-px bg-brand-6", className)}
      {...props}
    />
  );
};
