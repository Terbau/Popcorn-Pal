import { useEffect, useState } from "react";
import { SearchInput } from "../molecules/SearchInput/SearchInput";
import { SearchResultDropdown } from "../molecules/SearchResultDropdown";
import { useLazyQuery } from "@apollo/client";
import { cn } from "../../lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SEARCH_MOVIES } from "@/lib/graphql/queries/movie";
import type { SearchMoviesQuery } from "@/lib/graphql/generated/graphql";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { toast } from "react-toastify";

interface MovieSearchDropdownProps {
  isMobile?: boolean;
  onMobileOverlayClose?: () => void;
}

const PAGE_SIZE = 30;

export const MovieSearchDropdown = ({
  isMobile,
  onMobileOverlayClose,
}: MovieSearchDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchResultDropdownIsOpen, setSearchResultDropdownIsOpen] =
    useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [queryResult, setQueryResult] = useState<
    SearchMoviesQuery["searchMovies"] | undefined
  >(undefined);

  const hasValidSearchQuery = searchQuery.length > 1;

  const [fetchSearch, { data, loading, fetchMore }] = useLazyQuery(
    SEARCH_MOVIES,
    {
      onError: () => {
        toast.error("Failed to search for movies");
      },
      onCompleted: () => {
        setSearchResultDropdownIsOpen(true);
      },
    },
  );

  // Only allow one search request at a time, and only allow it every 300ms.
  const [
    debouncedFetchSearch,
    { isPending: debounceIsPending, cancel: cancelDebounce },
  ] = useDebounce(fetchSearch, 300);

  const results = queryResult?.results ?? [];
  const totalResults = queryResult?.totalResults ?? 0;
  // calculate if there is a next page based on current page and total results
  const hasNextPage = (currentPage + 1) * PAGE_SIZE < totalResults;

  const handleOnClose = () => {
    setSearchResultDropdownIsOpen(false);
    onMobileOverlayClose?.();
  };

  useEffect(() => {
    if (!hasValidSearchQuery) {
      setSearchResultDropdownIsOpen(false);
      cancelDebounce();
    } else {
      debouncedFetchSearch({
        variables: { query: searchQuery, page: 0, pageSize: PAGE_SIZE },
      });
    }
  }, [hasValidSearchQuery, searchQuery, debouncedFetchSearch, cancelDebounce]);

  // This effect is responsible for fetching more data whenever
  // the state variable `currentPage` changes.
  useEffect(() => {
    const handleFetchMore = async () => {
      setIsLoadingMore(true);
      try {
        await fetchMore({
          variables: { page: currentPage, pageSize: PAGE_SIZE },
        });
      } finally {
        setIsLoadingMore(false);
      }
    };

    if (currentPage > 0) {
      handleFetchMore();
    }
  }, [currentPage, fetchMore]);

  useEffect(() => {
    if (data) {
      setQueryResult(data.searchMovies);
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-row gap-3">
        {isMobile && (
          <button
            type="button"
            className="shrink-0"
            onClick={onMobileOverlayClose}
          >
            <Icon icon="ion:chevron-back-sharp" className="h-6 w-6" />
          </button>
        )}
        <SearchInput
          className={cn({ "ml-auto": !isMobile }, { grow: isMobile })}
          query={searchQuery}
          onFocus={() =>
            hasValidSearchQuery &&
            results.length > 0 &&
            setSearchResultDropdownIsOpen(true)
          }
          onQueryChange={(query) => setSearchQuery(query)}
          isLoading={loading || debounceIsPending}
        />
      </div>
      <SearchResultDropdown
        className={cn(
          { "absolute top-full left-0": !isMobile },
          { "mt-6": isMobile },
          {
            hidden: !searchResultDropdownIsOpen,
          },
        )}
        searchResults={results}
        totalSearchResults={totalResults}
        isLoading={isLoadingMore}
        canFetchMore={hasNextPage}
        isMobile={isMobile}
        onClose={handleOnClose}
        onFetchMore={() => setCurrentPage((prev) => prev + 1)}
      />
    </>
  );
};
