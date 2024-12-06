import { Icon } from "@iconify/react/dist/iconify.js";
import {
  forwardRef,
  type RefObject,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { cn } from "../../../lib/utils";
import * as RadixSelect from "@radix-ui/react-select";
import { SelectContent } from "../Select/Select";

export interface SearchInputSelectOption {
  label: string;
  value: string;
  icon: ReactNode;
  inputPlaceholder?: string;
}

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  query: string;
  placeholder?: string;
  selectOptions?: SearchInputSelectOption[];
  selectValue?: string;
  onSelectValueChange?: (value: string) => void;
  hasRemoveButton?: boolean;
  isLoading?: boolean;
  clearButtonRef?: RefObject<HTMLButtonElement>;
  onQueryChange?: (query: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      query,
      placeholder = "Search...",
      selectOptions,
      selectValue,
      onSelectValueChange,
      hasRemoveButton = true,
      className,
      isLoading = false,
      clearButtonRef,
      onQueryChange,
      ...props
    },
    ref,
  ) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      onQueryChange?.(event.target.value);
    };
    const hasSelectOptions = selectOptions && selectOptions.length > 0;
    const selectedOption = selectOptions?.find(
      (option) => option.value === selectValue,
    );
    const inputPlaceholder = selectedOption?.inputPlaceholder ?? placeholder;

    return (
      <div
        className={cn(
          "dark:bg-brand-4 bg-cream-secondary border border-purple-border dark:border-0 rounded-lg font-roboto flex flex-row text-brand-11",
          className,
        )}
      >
        {hasSelectOptions && (
          <RadixSelect.Root
            value={selectedOption?.value}
            onValueChange={onSelectValueChange}
          >
            <RadixSelect.Trigger className="flex flex-row items-center gap-0.5 border-r dark:border-brand-5 border-purple-border pr-2 pl-3 py-1 rounded-l-lg outline-0 focus:ring-2 focus:ring-brand-11">
              {selectedOption?.icon}
              <RadixSelect.Icon>
                <Icon icon="lucide:chevron-down" />
              </RadixSelect.Icon>
            </RadixSelect.Trigger>
            <SelectContent options={selectOptions} />
          </RadixSelect.Root>
        )}
        <div
          className={cn(
            "text-lg py-2 px-3 flex flex-row items-center gap-2 flex-nowrap focus-within:ring-2 dark:focus-within:ring-brand-11 grow",
            hasSelectOptions ? "rounded-r-lg" : "rounded-lg",
          )}
        >
          <input
            ref={ref}
            className="grow outline-none bg-transparent placeholder-brand-11"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={inputPlaceholder}
            {...props}
          />
          <span className="ml-auto h-full flex justify-center items-center">
            {isLoading ? (
              <Spinner />
            ) : hasRemoveButton && query.length > 1 ? (
              <button
                ref={clearButtonRef}
                type="button"
                onClick={() => onQueryChange?.("")}
                className="flex justify-center items-center"
              >
                <Icon icon="ic:twotone-close" />
              </button>
            ) : (
              <Icon icon="ic:twotone-search" />
            )}
          </span>
        </div>
      </div>
    );
  },
);
