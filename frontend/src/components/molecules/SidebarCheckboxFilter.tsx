import { cn } from "@/lib/utils";
import { forwardRef, useId, type HTMLAttributes } from "react";
import { Checkbox } from "../atoms/Checkbox/Checkbox";
import { Separator } from "../atoms/Separator/Separator";
import { Slot } from "@radix-ui/react-slot";
import { Skeleton } from "../atoms/Skeleton/Skeleton";

export interface SidebarCheckboxFilterItemProps {
  label: string;
  value: string;
  isChecked: boolean;
}

export interface SidebarCheckboxFilterProps
  extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  items: SidebarCheckboxFilterItemProps[];
  onItemClick?: (item: SidebarCheckboxFilterItemProps) => void;
  isAllChecked: boolean;
  onAllCheckedChange?: () => void;
  isLoading?: boolean;
  asChild?: boolean;
}

export const SidebarCheckboxFilter = forwardRef<
  HTMLDivElement,
  SidebarCheckboxFilterProps
>(
  (
    {
      title,
      items,
      onItemClick,
      className,
      isAllChecked,
      onAllCheckedChange,
      isLoading = false,
      asChild,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "aside";

    return (
      <Comp
        className={cn("flex flex-col gap-2", className)}
        ref={ref}
        {...props}
      >
        {title &&
          (isLoading ? (
            <Skeleton className="w-1/2 h-5 md:h-6 mb-1" />
          ) : (
            <h2 className="text-2xl mb-1">{title}</h2>
          ))}
        {isLoading ? (
          <Skeleton className="w-1/4" />
        ) : (
          <SidebarCheckboxFilterItem
            isChecked={isAllChecked}
            onClick={() => onAllCheckedChange?.()}
            value="all"
            label="Select all"
          />
        )}
        <Separator orientation="horizontal" />
        {isLoading ? (
          <>
            <Skeleton className="w-1/4" />
            <Skeleton className="w-1/4" />
          </>
        ) : (
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <SidebarCheckboxFilterItem
                key={item.value}
                {...item}
                onClick={() => onItemClick?.({ ...item })}
              />
            ))}
          </ul>
        )}
      </Comp>
    );
  },
);

export const SidebarCheckboxFilterItem = ({
  label,
  value,
  isChecked,
  onClick,
}: SidebarCheckboxFilterItemProps & { onClick: () => void }) => {
  const id = useId();

  return (
    <li className="flex flex-row gap-2 items-center">
      <Checkbox
        id={id}
        checked={isChecked}
        onClick={() => onClick?.()}
        value={value}
      />
      <label htmlFor={id} className="text-brand-11">
        {label}
      </label>
    </li>
  );
};
