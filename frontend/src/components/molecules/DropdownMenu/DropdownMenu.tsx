import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { Icon, type IconProps } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils/classUtils";

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
        "border border-purple-border dark:border-brand-5 z-30 min-w-64 bg-brand-3 rounded-md shadow-2xl",
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
        "text-sm dark:text-brand-12 text-purple-text rounded-sm pl-3 pr-4 py-2.5 relative cursor-pointer select-none outline-none flex flex-row items-center gap-2",
        'data-[disabled="true"]:text-slate-11 data-[disabled="true"]:pointer-events-none',
        "data-[highlighted]:text-purple-medium data-[highlighted]:bg-brand-12 dark:data-[highlighted]:text-brand-11 dark:data-[highlighted]:bg-brand-4",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export const DropdownMenuItemIcon = ({ className, ...props }: IconProps) => {
  return (
    <Icon
      className={cn("dark:text-brand-11 text-purple-text h-4 w-4", className)}
      {...props}
    />
  );
};

export const DropdownMenuSeparator = ({
  className,
  ...props
}: RadixDropdownMenu.DropdownMenuSeparatorProps) => {
  return (
    <RadixDropdownMenu.Separator
      className={cn("h-px dark:bg-brand-6 bg-purple-border", className)}
      {...props}
    />
  );
};
