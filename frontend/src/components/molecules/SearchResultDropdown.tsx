import type { HTMLAttributes } from "react";
import { cn, transformAndResizeImageUrl } from "../../lib/utils";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { SearchMovie } from "../../__generated__/types";

interface SearchResultDropdownProps extends HTMLAttributes<HTMLDivElement> {
  searchResults: SearchMovie[];
  externalSearchResults: SearchMovie[];
  onClose?: () => void;
}

export const SearchResultDropdown = ({
  searchResults,
  externalSearchResults,
  onClose,
  className,
  ...props
}: SearchResultDropdownProps) => {
  const results: (SearchMovie & { isExternal?: boolean })[] = [
    ...searchResults,
    ...externalSearchResults.map((result) => ({
      ...result,
      isExternal: true,
    })),
  ].map((result) => ({
    ...result,
    posterUrl: transformAndResizeImageUrl(
      result.posterUrl ?? "",
      result.posterWidth ?? 0,
      result.posterHeight ?? 0,
      264,
    ),
  }));

  return (
    <div className={cn("w-full h-screen flex flex-col", className)} {...props}>
      <div className="bg-brand-2 p-4">
        <div className="flex flex-row justify-between mb-2">
          <span className="font-semibold text-lg">
            Loaded {results.length} results...
          </span>
          <div className="flex flex-row items-center gap-6">
            <Link
              to="/search"
              className="text-sm text-brand-11 hover:text-brand-12"
            >
              Advanced search &rarr;
            </Link>
            <button type="button">
              <Icon
                icon="iconamoon:close"
                className="h-8 w-8 text-brand-11 hover:text-brand-12"
                onClick={onClose}
              />
            </button>
          </div>
        </div>

        <ul className="flex flex-row gap-12 overflow-x-auto p-4">
          {results.map((result) => (
            <li key={result.id} className="relative">
              <Link to={`/movie/${result.id}`} onClick={() => onClose?.()}>
                <img
                  src={result.posterUrl ?? ""}
                  alt={result.title}
                  className="h-44 aspect-[2/3]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="bg-black/60 w-full grow cursor-default"
      />
    </div>
  );
};
