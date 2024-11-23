import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { SearchMovie } from "../../__generated__/types";
import { MovieImage } from "./MovieImage/MovieImage";
import { ScrollArea } from "./ScrollArea/ScrollArea";
import { LoadingButton } from "./LoadingButton/LoadingButton";

interface SearchResultDropdownProps extends HTMLAttributes<HTMLDivElement> {
  searchResults: SearchMovie[];
  totalSearchResults: number;
  isLoading?: boolean;
  canFetchMore?: boolean;
  onClose?: () => void;
  onFetchMore?: () => void;
}

export const SearchResultDropdown = ({
  searchResults,
  totalSearchResults,
  isLoading = false,
  canFetchMore = false,
  onClose,
  onFetchMore,
  className,
  ...props
}: SearchResultDropdownProps) => {
  return (
    <div className={cn("w-full flex flex-col h-screen", className)} {...props}>
      <ScrollArea orientation="vertical">
        <div className="bg-brand-2 p-4 h-full flex flex-col items-center pb-28">
          <div className="flex flex-row justify-between mb-2 w-full">
            <span className="font-semibold text-lg">
              Showing {searchResults.length} / {totalSearchResults} results
            </span>
            <div className="flex flex-row items-center gap-6">
              <button type="button">
                <Icon
                  icon="iconamoon:close"
                  className="h-8 w-8 text-brand-11 hover:text-brand-12"
                  onClick={onClose}
                />
              </button>
            </div>
          </div>

          <ul className="gap-6 md:gap-12 p-4 w-full grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
            {searchResults.map((result) => (
              <li key={result.id} className="relative mx-auto">
                <Link to={`/movie/${result.id}`} onClick={() => onClose?.()}>
                  <MovieImage src={result.posterUrl ?? ""} alt={result.title} />
                </Link>
              </li>
            ))}
          </ul>
          {canFetchMore && searchResults.length > 0 && (
            <LoadingButton
              className="mt-8 w-fit"
              variant="secondary"
              isLoading={isLoading}
              onClick={() => onFetchMore?.()}
            >
              Load more
            </LoadingButton>
          )}
        </div>
      </ScrollArea>
      <button
        type="button"
        onClick={onClose}
        className="bg-black/60 w-full grow cursor-default"
      />
    </div>
  );
};
