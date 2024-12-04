import {
  FilterableMovieList,
  FilterableMovieListContent,
  FilterableMovieListContentList,
  FilterableMovieListHeader,
  FilterableMovieListSidebar,
  ORDER_BY_OPTIONS,
  ORDER_DIRECTION_OPTIONS,
} from "@/components/organisms/FilterableMovieList";
import { parseAsInteger, parseAsStringLiteral, useQueryState } from "nuqs";
import { useMemo } from "react";
import { useMovies } from "@/lib/hooks/useMovies";
import { useSessionStorageState } from "ahooks";
import { SkeletonDetailedMovieCard } from "@/components/molecules/DetailedMovieCard/SkeletonDetailedMovieCard";
import { DetailedMovieCard } from "@/components/molecules/DetailedMovieCard/DetailedMovieCard";
import { GenreSidebarFilter } from "@/components/organisms/GenreSidebarFilter";

export default function DiscoverPage() {
  // Use query state to store the filter options. This is so that the filters can
  // easily be shared by copy-pasting the URL.
  const [orderBy, setOrderBy] = useQueryState(
    "orderBy",
    parseAsStringLiteral(ORDER_BY_OPTIONS).withDefault("externalRating"),
  );
  const [orderDirection, setOrderDirection] = useQueryState(
    "orderDirection",
    parseAsStringLiteral(ORDER_DIRECTION_OPTIONS).withDefault("desc"),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize] = useQueryState("pageSize", parseAsInteger.withDefault(20));

  const [possiblyUndefinedGenres, setGenres] = useSessionStorageState(
    "discoverGenres",
    {
      defaultValue: [] as string[],
    },
  );
  const genres = useMemo(
    () => possiblyUndefinedGenres ?? [],
    [possiblyUndefinedGenres],
  );

  const { movies, totalResults, loading } = useMovies({
    orderBy,
    orderDirection,
    page: page - 1, // The API uses 0-based indexing
    pageSize,
    genres,
  });

  return (
    <div className="max-w-screen-lg mx-auto w-[90vw]">
      <h1 className="mx-auto md:mx-0 font-bold text-5xl mt-6 w-fit">
        Discover
      </h1>
      <FilterableMovieList
        totalResults={totalResults}
        orderBy={orderBy}
        onOrderByChange={setOrderBy}
        orderDirection={orderDirection}
        onOrderDirectionChange={setOrderDirection}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        isLoading={loading}
      >
        <FilterableMovieListSidebar>
          <GenreSidebarFilter genres={genres} onGenresChange={setGenres} />
        </FilterableMovieListSidebar>
        <FilterableMovieListContent>
          <FilterableMovieListHeader />
          <FilterableMovieListContentList>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <makes sense to use i here>
                <SkeletonDetailedMovieCard key={i} />
              ))
            ) : movies.length > 0 ? (
              movies.map((movie) => (
                <DetailedMovieCard
                  key={movie.id}
                  movie={movie}
                  href={`/movie/${movie.id}`}
                />
              ))
            ) : (
              <p className="text-2xl mt-6 mx-auto md:ml-[20%]">
                No movies found
              </p>
            )}
          </FilterableMovieListContentList>
        </FilterableMovieListContent>
      </FilterableMovieList>
    </div>
  );
}
