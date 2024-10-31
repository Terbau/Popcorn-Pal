import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { Movie } from "../../__generated__/types";
import { Link } from "react-router-dom";
import { Spinner } from "../atoms/Spinner/Spinner";

interface SearchResultDropdownProps extends HTMLAttributes<HTMLDivElement> {
  searchResults: Movie[];
  isLoading?: boolean;
}

export const SearchResultDropdown = ({
  searchResults,
  isLoading,
  className,
  ...props
}: SearchResultDropdownProps) => {
  return (
    <div
      className={cn(
        "w-full bg-brand-2",
        { "p-4": isLoading || searchResults.length > 0 },
        className
      )}
      {...props}
    >
      {isLoading && <Spinner />}
      {searchResults.length > 0 && (
        <div className="flex flex-row justify-between items-center">
          <span className="font-semibold text-lg mb-2">
            Loaded {searchResults.length} results...
          </span>
          <Link
            to="/search"
            className="text-sm text-brand-11 hover:text-brand-12"
          >
            Advanced search &rarr;
          </Link>
        </div>
      )}
      <ul className="flex flex-row gap-8 overflow-x-auto">
        {searchResults.map((result) => (
          <img src={result.posterUrl} className="h-44" />
        ))}
      </ul>
    </div>
  );
};
