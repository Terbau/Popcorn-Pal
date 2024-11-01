import * as Select from "@radix-ui/react-select";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import React from "react";

interface SelectProps {
  onSortChange: (value: string) => void; // Sender valgt verdi til foreldrekomponent
}

export const SortSelect: React.FC<SelectProps> = ({ onSortChange }) => {
  return (
    <div>
      <Select.Root onValueChange={onSortChange}>
        <Select.Trigger
          className="inline-flex items-center justify-center rounded px-4 py-2 text-sm bg-brand-8 shadow-md focus:outline-none focus:ring-2 focus:ring-black gap-1"
          aria-label="Sort Options"
        >
          <Select.Value placeholder="Filter" />
          <Select.Icon className="text-white">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="overflow-hidden bg-black rounded-lg shadow-lg mt-2"
            position="popper"
            style={{ zIndex: 50 }}
          >
            <Select.ScrollUpButton className="flex items-center justify-center h-6 text-brand-8 bg-black cursor-default">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-1">
              <Select.Group>
                <SortSelectItem value="alphabetical">Title</SortSelectItem>
                <SortSelectItem value="release_date">
                  Release Date
                </SortSelectItem>
                <SortSelectItem value="rating">Rating</SortSelectItem>
                <SortSelectItem value="run_time">Run Time</SortSelectItem>
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className="flex items-center justify-center h-6 text-brand-8 cursor-default">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

interface SelectItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
}

const SortSelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={`text-sm leading-none text-violet-700 rounded-md flex items-center h-6 px-6 py-1 relative cursor-pointer select-none focus:outline-none focus:bg-violet-300 hover:bg-violet-200 data-[highlighted]:bg-violet-300 data-[highlighted]:text-white ${className}`}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-6 flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
SortSelectItem.displayName = "SortSelectItem";
