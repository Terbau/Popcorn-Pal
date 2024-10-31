import { Icon } from "@iconify/react/dist/iconify.js";
import { ChangeEvent } from "react";
import { Spinner } from "../../atoms/Spinner/Spinner";
import { cn } from "../../../lib/utils";

interface SearchInputProps {
  query: string;
  onChange?: (query: string) => void;
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
}

export const SearchInput = ({
  query,
  placeholder = "Search...",
  className,
  onChange,
  isLoading = false,
}: SearchInputProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div
      className={cn(
        "text-lg py-1 px-3 bg-brand-4 rounded-lg font-roboto flex flex-row items-center gap-2 flex-nowrap çfocus-within:ring-2 focus-within:ring-brand-11",
        className
      )}
    >
      <input
        className="grow outline-none bg-transparent placeholder-brand-11"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <span className="ml-auto">
        {isLoading ? <Spinner /> : <Icon icon="ic:twotone-search" />}
      </span>
    </div>
  );
};
