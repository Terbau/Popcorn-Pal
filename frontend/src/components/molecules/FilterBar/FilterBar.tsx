import { cn } from "@/lib/utils/classUtils";
import type { HTMLAttributes } from "react";

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
        "flex flex-row gap-4 rounded-full p-2 dark:bg-brand-1 bg-cream-light w-fit overflow-x-auto max-w-full",
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
              "rounded-full py-1 px-2 text-sm md:text-base whitespace-nowrap dark:text-brand-11 outline-none focus:ring-purple-border focus:ring-2 dark:focus:ring-brand-9",
              item.isSelected &&
                "outline dark:outline-brand-9 outline-purple-border",
            )}
            data-cy={`filter-${item.value}`} // Dynamically add data-cy based on value
            aria-label={`${item.label}`}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
};
