// Provides a simple and fast dropdown menu component. Consider using the building blocks provided at the end of this file
// for more complex use cases.

import { cn } from "@/lib/utils";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import type * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";

export type SimpleDropdownMenuItemColor = "brand" | "red";

export interface SimpleDropdownMenuItem {
  label: string;
  icon: string;
  color?: SimpleDropdownMenuItemColor;
  onClick?: () => void;
}

export interface SimpleDropdownMenuProps
  extends RadixDropdownMenu.DropdownMenuProps {
  groups: SimpleDropdownMenuItem[][];
}

export const SimpleDropdownMenu = ({
  groups,
  children,
  ...props
}: SimpleDropdownMenuProps) => {
  const getColor = (color: SimpleDropdownMenuItemColor) => {
    switch (color) {
      case "brand":
        return "text-brand-11 data-[highlighted]:text-brand-11";
      case "red":
        return "text-red-11 data-[highlighted]:text-red-11";
    }
  };

  return (
    <DropdownMenuRoot {...props} modal={false}>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={4} align="start">
        {groups.map((group, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <needed>
          <div key={`group-${i}`} className="flex flex-col">
            {group.map((item, j) => {
              const color = getColor(item.color ?? "brand");
              return (
                <DropdownMenuItem
                  // biome-ignore lint/suspicious/noArrayIndexKey: <needed>
                  key={`item-${j}`}
                  onClick={item.onClick}
                  className={cn(color)}
                >
                  <DropdownMenuItemIcon
                    icon={item.icon}
                    className={cn(color)}
                  />
                  {item.label}
                </DropdownMenuItem>
              );
            })}
            {i < groups.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};
