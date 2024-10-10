import type { HTMLAttributes } from "react";
import { cn } from "../../../lib/utils";

export interface FilterBarItem {
  label: string;
  value: string;
  isSelected: boolean;
}

export interface FilterBarProps extends HTMLAttributes<HTMLUListElement> {
  items: FilterBarItem[];
  onItemClick?: (item: FilterBarItem) => void;
}

export const FilterBar = ({
  items,
  onItemClick,
  className,
  ...props
}: FilterBarProps) => {
  return (
    <ul
      className={cn(
        "flex flex-row gap-4 rounded-full p-2 bg-brand-1 w-fit",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <li key={item.value}>
          <button
            type="button"
            onClick={() => onItemClick?.(item)}
            className={cn(
              "rounded-full py-1 px-2 text-brand-11 outline-none focus:ring-2 focus:ring-brand-9",
              item.isSelected && "outline outline-brand-9",
            )}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
};
