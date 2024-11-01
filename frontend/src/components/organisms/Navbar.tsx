import { Link, useNavigate } from "react-router-dom";
import { SearchInput } from "../molecules/SearchInput/SearchInput";
import { Button } from "../atoms/Button/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@fontsource/playfair-display"; // Importerer Playfair Display fonten
import "@fontsource/roboto"; // Importerer Roboto fonten
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useAuth } from "../../lib/context/authContext";
import { SearchResultDropdown } from "../molecules/SearchResultDropdown";
import { useEffect, useRef, useState } from "react";
import type { Query } from "../../__generated__/types";
import { cn } from "../../lib/utils";
import { LoadingButton } from "../molecules/LoadingButton/LoadingButton";

const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

const RANDOM_MOVIE = gql`
  query randomMovie {
    randomMovie {
      id
    }
  }
`;

const SEARCH_MOVIES = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      movies {
        id
        title
        yearReleased
        posterUrl
        posterHeight
        posterWidth
        externalRating
      }
      externalMovies {
        id
        title
        yearReleased
        posterUrl
        posterHeight
        posterWidth
        externalRating
      }
      totalResults
    }
  }
`;

export const Navbar = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultDropdownIsOpen, setSearchResultDropdownIsOpen] =
    useState(false);
  const [searchResultData, setSearchResultData] = useState<
    Query["searchMovies"]
  >({});

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const [logout] = useMutation(SIGN_OUT);
  const { loading, refetch } = useQuery<Pick<Query, "searchMovies">>(
    SEARCH_MOVIES,
    {
      variables: { query: searchQuery },
      // we want to control when the query is executed
      skip: true,
      onCompleted: (data) => {
        setSearchResultDropdownIsOpen(true);
        setSearchResultData(data.searchMovies);
      },
    },
  );

  const [fetchRandomMovie] = useLazyQuery<Pick<Query, "randomMovie">>(
    RANDOM_MOVIE,
    {
      fetchPolicy: "no-cache",
    },
  );

  const handleRandomMovie = async () => {
    setLoading(true);
    const { data } = await fetchRandomMovie();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (data?.randomMovie) {
      navigate(`/movie/${data.randomMovie.id}`);
    }
    setLoading(false);
  };

  // Only allow a search every 500ms
  const handleQueryChange = (query: string) => {
    setSearchQuery(query);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      refetch({ query });
      searchTimeout.current = null;
    }, 300);
  };

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResultData({});
      setSearchResultDropdownIsOpen(false);
    }
  }, [searchQuery]);

  return (
    <header className="fixed bg-brand-3 w-full h-20 z-50">
      <nav className="relative w-full h-full flex flex-row px-5 py-2 items-center gap-12 font-roboto">
        <Link
          className="flex items-center space-x-4 font-playfair cursor-pointer hover:scale-105 transition duration-200"
          to={"/"}
        >
          <Icon icon="emojione:popcorn" width="4em" height="4em" />
          <p className="text-4xl hidden md:block font-bold text-purple-500 drop-shadow-[0_0_10px_rgba(128,90,213,0.8)]">
            POPCORN PAL
          </p>
        </Link>

        <div className="ml-auto flex flex-row items-center gap-4">
          <LoadingButton
            isLoading={isLoading}
            leftIcon={<Icon icon="mynaui:play-solid" />}
            onClick={!isLoading ? handleRandomMovie : undefined}
          >
            Random Movie
          </LoadingButton>

          <SearchInput
            className="ml-auto"
            query={searchQuery}
            onFocus={() =>
              (searchResultData?.totalResults ?? 0) > 0 &&
              setSearchResultDropdownIsOpen(true)
            }
            onQueryChange={(query) => handleQueryChange(query)}
            isLoading={loading || searchTimeout.current !== null}
          />
          <SearchResultDropdown
            className={cn("absolute top-full left-0", {
              hidden: !searchResultDropdownIsOpen,
            })}
            searchResults={searchResultData?.movies ?? []}
            externalSearchResults={searchResultData?.externalMovies ?? []}
            onClose={() => setSearchResultDropdownIsOpen(false)}
          />

          {currentUser ? (
            <>
              <Button variant="secondary" onClick={() => logout()}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button asChild variant="secondary">
              <Link to="/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};
