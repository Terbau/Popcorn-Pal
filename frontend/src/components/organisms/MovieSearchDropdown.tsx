import { useEffect, useRef, useState } from "react";
import { SearchInput } from "../molecules/SearchInput/SearchInput";
import { SearchResultDropdown } from "../molecules/SearchResultDropdown";
import type { Query } from "../../__generated__/types";
import { gql, useLazyQuery } from "@apollo/client";
import { cn } from "../../lib/utils";

const SEARCH_MOVIES = gql`
  query SearchMovies($query: String!, $page: Int!, $pageSize: Int!) {
    searchMovies(query: $query, page: $page, pageSize: $pageSize) {
      movies {
        id
        title
        yearReleased
        posterUrl
        posterHeight
        posterWidth
        externalRating
        similarity
      }
      totalResults
      nextPage
    }
  }
`;

export const MovieSearchDropdown = () => {
  const [isTimeoutActive, setIsTimeoutActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchResultDropdownIsOpen, setSearchResultDropdownIsOpen] =
    useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchResultData, setSearchResultData] = useState<
    Query["searchMovies"]
  >({});

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const [fetchSearch, { data, loading, fetchMore }] = useLazyQuery<
    Pick<Query, "searchMovies">
  >(SEARCH_MOVIES, {
    onCompleted: () => {
      setSearchResultDropdownIsOpen(true);
    },
  });

  // const searchResultData =
  //   searchQuery.length > 1 ? data?.searchMovies : undefined;

  // Only allow a search every 300ms
  const handleQueryChange = (query: string) => {
    setSearchQuery(query);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (query.length > 1) {
      setIsTimeoutActive(true);
      setCurrentPage(0);
      searchTimeout.current = setTimeout(async () => {
        await fetchSearch({ variables: { query, page: 0, pageSize: 30 } });

        if (searchTimeout.current) {
          clearTimeout(searchTimeout.current);
          setIsTimeoutActive(false);
        }

        searchTimeout.current = null;
      }, 300);
    }
  };

  useEffect(() => {
    if (data) {
      setSearchResultData(data.searchMovies);
    }
  }, [data]);

  useEffect(() => {
    if (searchQuery.length < 1) {
      setSearchResultData({});
      setSearchResultDropdownIsOpen(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleFetchMore = async () => {
      setIsLoadingMore(true);
      try {
        await fetchMore({
          variables: { page: currentPage },
        });
      } finally {
        setIsLoadingMore(false);
      }
    };

    if (currentPage > 0) {
      handleFetchMore();
    }
  }, [currentPage, fetchMore]);

  return (
    <>
      <SearchInput
        className="ml-auto"
        query={searchQuery}
        onFocus={() =>
          (searchResultData?.movies?.length ?? 0) > 0 &&
          setSearchResultDropdownIsOpen(true)
        }
        onQueryChange={(query) => handleQueryChange(query)}
        isLoading={loading || isTimeoutActive}
      />
      <SearchResultDropdown
        className={cn("absolute top-full left-0", {
          hidden: !searchResultDropdownIsOpen,
        })}
        searchResults={searchResultData?.movies ?? []}
        isLoading={isLoadingMore}
        canFetchMore={searchResultData?.nextPage !== null}
        onClose={() => setSearchResultDropdownIsOpen(false)}
        onFetchMore={() => setCurrentPage((prev) => prev + 1)}
      />
    </>
  );
};
