import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MovieImage } from "./MovieImage/MovieImage";
import { ScrollArea } from "./ScrollArea/ScrollArea";
import { LoadingButton } from "./LoadingButton/LoadingButton";
import type { SearchMoviesQuery } from "@/lib/graphql/generated/graphql";

interface SearchResultDropdownProps extends HTMLAttributes<HTMLDivElement> {
  searchResults: SearchMoviesQuery["searchMovies"]["results"];
  totalSearchResults: number;
  isLoading?: boolean;
  canFetchMore?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
  onFetchMore?: () => void;
}

export const SearchResultDropdown = ({
  searchResults,
  totalSearchResults,
  isLoading = false,
  canFetchMore = false,
  isMobile = false,
  onClose,
  onFetchMore,
  className,
  ...props
}: SearchResultDropdownProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col",
        { "h-screen": !isMobile },
        { "h-[calc(100vh-5.5rem)]": isMobile },
        className,
      )}
      {...props}
    >
      <ScrollArea orientation="vertical">
        <div
          className={cn(
            "h-full flex flex-col items-center",
            {
              "p-4 bg-brand-2 pb-28": !isMobile,
            },
            { "pb-12": isMobile },
          )}
        >
          <div className="flex flex-row justify-between mb-2 w-full">
            <span
              className={cn("font-semibold sm:text-lg", {
                "w-full text-center": isMobile,
              })}
            >
              Showing {searchResults?.length} / {totalSearchResults} results
            </span>
            {!isMobile && (
              <button type="button">
                <Icon
                  icon="iconamoon:close"
                  className="h-8 w-8 text-brand-11 hover:text-brand-12"
                  onClick={onClose}
                />
              </button>
            )}
          </div>

          <ul className="md:gap-12 w-full grid grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] xs:grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 sm:gap-6">
            {searchResults?.map((result) => (
              <li key={result.id} className="relative mx-auto">
                <Link to={`/movie/${result.id}`} onClick={() => onClose?.()}>
                  <MovieImage src={result.posterUrl ?? ""} alt={result.title} />
                </Link>
              </li>
            ))}
          </ul>
          {canFetchMore && (searchResults?.length ?? 0) > 0 && (
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
