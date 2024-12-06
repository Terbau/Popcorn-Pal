import { useEffect, useRef, useState } from "react";
import {
  SearchInput,
  type SearchInputSelectOption,
} from "../molecules/SearchInput/SearchInput";
import { SearchResultDropdown } from "../molecules/SearchResultDropdown";
import { useLazyQuery } from "@apollo/client";
import { cn, createInitials } from "../../lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SEARCH_MOVIES } from "@/lib/graphql/queries/movie";
import type {
  SearchMoviesQuery,
  SearchUsersQuery,
} from "@/lib/graphql/generated/graphql";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { toast } from "react-toastify";
import { SEARCH_USERS } from "@/lib/graphql/queries/user";
import { Link } from "react-router-dom";
import { MovieImage } from "../molecules/MovieImage/MovieImage";
import * as RadixPopover from "@radix-ui/react-popover";
import { Avatar } from "../molecules/Avatar/Avatar";
import { highlightText } from "@/lib/utils/textUtils";
import { useSessionStorageState } from "ahooks";

interface SearchDropdownProps {
  isMobile?: boolean;
  onMobileOverlayClose?: () => void;
}

const MOVIE_PAGE_SIZE = 30;
const USER_PAGE_SIZE = 5;

const selectOptions: SearchInputSelectOption[] = [
  {
    label: "Movies",
    value: "movies",
    icon: <Icon icon="mdi:film-open-outline" />,
    inputPlaceholder: "Search movies...",
  },
  {
    label: "Users",
    value: "users",
    icon: <Icon icon="mdi:user" />,
    inputPlaceholder: "Search users...",
  },
];

export const SearchDropdown = ({
  isMobile,
  onMobileOverlayClose,
}: SearchDropdownProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchInputClearButtonRef = useRef<HTMLButtonElement>(null);

  const [movieSearchQuery, setMovieSearchQuery] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [currentMoviePage, setCurrentMoviePage] = useState(0);
  const [searchResultDropdownIsOpen, setResultDropdownIsOpen] = useState(false);
  const [selectedSearchOptionValue, setSelectedSearchOptionValue] =
    useSessionStorageState("selectedSearchOptionValue", {
      defaultValue: "movies",
    });

  const selectedOption =
    selectOptions.find(
      (option) => option.value === selectedSearchOptionValue,
    ) ?? selectOptions[0];

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [movieQueryResult, setMovieQueryResult] = useState<
    SearchMoviesQuery["searchMovies"] | undefined
  >(undefined);
  const [userQueryResult, setUserQueryResult] = useState<
    SearchUsersQuery["searchUsers"] | undefined
  >(undefined);

  const hasValidMovieSearchQuery = movieSearchQuery.length > 1;
  const hasValidUserSearchQuery = userSearchQuery.length > 1;

  const [
    fetchMovieSearch,
    { data: movieData, loading: movieLoading, fetchMore: fetchMoreMovies },
  ] = useLazyQuery(SEARCH_MOVIES, {
    onError: () => {
      toast.error("Failed to search for movies");
    },
    onCompleted: () => {
      setResultDropdownIsOpen(true);
    },
  });
  const [fetchUserSearch, { data: userData, loading: userLoading }] =
    useLazyQuery(SEARCH_USERS, {
      onError: () => {
        toast.error("Failed to search for users");
      },
      onCompleted: () => {
        setResultDropdownIsOpen(true);
      },
    });

  // Only allow one search request at a time, and only allow it every 300ms.
  const [
    debouncedFetchMovieSearch,
    {
      isPending: debounceMovieSearchIsPending,
      cancel: cancelDebounceMovieSearch,
    },
  ] = useDebounce(fetchMovieSearch, 300);
  const [
    debouncedFetchUserSearch,
    {
      isPending: debounceUserSearchIsPending,
      cancel: cancelDebounceUserSearch,
    },
  ] = useDebounce(fetchUserSearch, 300);

  const movieResults = movieQueryResult?.results ?? [];
  const userResults = userQueryResult?.results ?? [];
  const totalMovieResults = movieQueryResult?.totalResults ?? 0;

  // calculate if there is a next page based on current page and total movieResults
  const hasNextMoviePage =
    (currentMoviePage + 1) * MOVIE_PAGE_SIZE < totalMovieResults;

  const handleOnQueryChange = (query: string) => {
    if (selectedOption.value === "movies") {
      setMovieSearchQuery(query);
    } else if (selectedOption.value === "users") {
      setUserSearchQuery(query);
    }
  };

  useEffect(() => {
    if (!hasValidMovieSearchQuery) {
      setResultDropdownIsOpen(false);
      cancelDebounceMovieSearch();
    } else {
      debouncedFetchMovieSearch({
        variables: {
          query: movieSearchQuery,
          page: 0,
          pageSize: MOVIE_PAGE_SIZE,
        },
      });
    }
  }, [
    hasValidMovieSearchQuery,
    movieSearchQuery,
    debouncedFetchMovieSearch,
    cancelDebounceMovieSearch,
  ]);

  useEffect(() => {
    if (!hasValidUserSearchQuery) {
      setResultDropdownIsOpen(false);
      cancelDebounceUserSearch();
    } else {
      debouncedFetchUserSearch({
        variables: {
          query: userSearchQuery,
          page: 0,
          pageSize: USER_PAGE_SIZE,
        },
      });
    }
  }, [
    hasValidUserSearchQuery,
    userSearchQuery,
    debouncedFetchUserSearch,
    cancelDebounceUserSearch,
  ]);

  // This effect is responsible for fetching more movieData whenever
  // the state variable `currentMoviePage` changes.
  useEffect(() => {
    const handleFetchMore = async () => {
      setIsLoadingMore(true);
      try {
        await fetchMoreMovies({
          variables: { page: currentMoviePage, pageSize: MOVIE_PAGE_SIZE },
        });
      } finally {
        setIsLoadingMore(false);
      }
    };

    if (currentMoviePage > 0) {
      handleFetchMore();
    }
  }, [currentMoviePage, fetchMoreMovies]);

  useEffect(() => {
    if (movieData) {
      setMovieQueryResult(movieData.searchMovies);
    }
  }, [movieData]);

  useEffect(() => {
    if (userData) {
      setUserQueryResult(userData.searchUsers);
    }
  }, [userData]);

  const handleOnOpenChange = (open: boolean) => {
    if (open) {
      if (
        selectedOption.value === "movies" &&
        hasValidMovieSearchQuery &&
        movieResults.length > 0
      ) {
        setResultDropdownIsOpen(true);
      } else if (
        selectedOption.value === "users" &&
        hasValidUserSearchQuery &&
        userResults.length > 0
      ) {
        setResultDropdownIsOpen(true);
      }
    } else {
      setResultDropdownIsOpen(false);
    }
  };

  return (
    <RadixPopover.Root
      open={searchResultDropdownIsOpen}
      onOpenChange={handleOnOpenChange}
    >
      <RadixPopover.Anchor className="flex flex-row gap-3">
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
          ref={searchInputRef}
          className={cn({ "ml-auto": !isMobile }, { grow: isMobile })}
          query={
            selectedOption.value === "movies"
              ? movieSearchQuery
              : userSearchQuery
          }
          onFocus={() => handleOnOpenChange(true)}
          selectOptions={selectOptions}
          selectValue={selectedSearchOptionValue}
          onSelectValueChange={setSelectedSearchOptionValue}
          onQueryChange={handleOnQueryChange}
          clearButtonRef={searchInputClearButtonRef}
          isLoading={
            movieLoading ||
            debounceMovieSearchIsPending ||
            userLoading ||
            debounceUserSearchIsPending
          }
        />
      </RadixPopover.Anchor>
      {selectedOption.value === "movies" ? (
        <SearchResultDropdown
          sideOffset={15}
          className="w-screen"
          amountSearchResults={movieResults?.length ?? 0}
          totalSearchResults={totalMovieResults}
          isLoading={isLoadingMore}
          canFetchMore={hasNextMoviePage}
          isMobile={isMobile}
          onClose={() => handleOnOpenChange(false)}
          onFetchMore={() => setCurrentMoviePage((prev) => prev + 1)}
          onFocusOutside={(e) =>
            (e.target === searchInputRef.current ||
              e.target === searchInputClearButtonRef.current) &&
            e.preventDefault()
          }
        >
          <ul
            className={cn(
              "md:gap-12 w-full grid grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] xs:grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 sm:gap-6",
              { "px-6": isMobile },
            )}
          >
            {movieResults?.map((result) => (
              <li key={result.id} className="relative mx-auto">
                <Link
                  to={`/movie/${result.id}`}
                  onClick={() => handleOnOpenChange(false)}
                >
                  <MovieImage src={result.posterUrl ?? ""} alt={result.title} />
                </Link>
              </li>
            ))}
          </ul>
        </SearchResultDropdown>
      ) : (
        <RadixPopover.Content
          sideOffset={12}
          className={cn(
            " outline-0",
            isMobile
              ? "w-screen px-8"
              : "w-72 bg-brand-4 border border-brand-7",
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onFocusOutside={(e) =>
            (isMobile ||
              e.target === searchInputRef.current ||
              e.target === searchInputClearButtonRef.current) &&
            e.preventDefault()
          }
          onInteractOutside={(e) => isMobile && e.preventDefault()}
        >
          {userResults?.length > 0 ? (
            <ul className="flex flex-col w-full">
              {userResults?.map((result) => (
                <li key={result.id}>
                  <Link
                    to={`/profile/${result.id}`}
                    onClick={() => handleOnOpenChange(false)}
                    className="flex flex-row items-center gap-2 px-4 py-3 dark:bg-brand-3 bg-cream hover:bg-purple-hover dark:hover:bg-brand-5 outline-0 overflow-hidden dark:text-brand-12 focus:ring-2 focus:ring-brand-11"
                  >
                    <Avatar
                      src={result.avatarUrl ?? undefined}
                      fallback={createInitials(
                        result.firstName,
                        result.lastName,
                      )}
                      size="sm"
                      overrideSizeChange
                    />
                    <span className="text-sm whitespace-nowrap">
                      {highlightText(
                        `${result.firstName} ${result.lastName}`,
                        userSearchQuery,
                      ).map(([part, isMatch], index) => (
                        <span
                          // biome-ignore lint/suspicious/noArrayIndexKey: <needed>
                          key={index}
                          className={cn({
                            "font-semibold text-brand-11": isMatch,
                          })}
                        >
                          {part}
                        </span>
                      ))}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-row justify-center bg-cream dark:bg-brand-4 items-center p-4">
              <span className="text-sm dark:text-brand-11">
                No results found
              </span>
            </div>
          )}
        </RadixPopover.Content>
      )}
    </RadixPopover.Root>
  );
};
