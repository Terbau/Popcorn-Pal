import { Icon } from "@iconify/react/dist/iconify.js";
import type { ChangeEvent, InputHTMLAttributes } from "react";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { cn } from "../../../lib/utils";

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  query: string;
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
  onQueryChange?: (query: string) => void;
}

export const SearchInput = ({
  query,
  placeholder = "Search...",
  className,
  isLoading = false,
  onQueryChange,
  ...props
}: SearchInputProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange?.(event.target.value);
  };

  return (
    <div
      className={cn(
        "text-lg py-1 px-3 bg-brand-4 rounded-lg font-roboto flex flex-row items-center gap-2 flex-nowrap focus-within:ring-2 focus-within:ring-brand-11",
        className,
      )}
    >
      <input
        className="grow outline-none bg-transparent placeholder-brand-11"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        {...props}
      />
      <span className="ml-auto h-full">
        {isLoading ? <Spinner /> : <Icon icon="ic:twotone-search" />}
      </span>
    </div>
  );
};
