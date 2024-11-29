import { parseAsInteger, parseAsStringLiteral, useQueryState } from "nuqs";
import { useMovies } from "../lib/hooks/useMovies";
import { DetailedMovieCard } from "../components/molecules/DetailedMovieCard/DetailedMovieCard";
import { Link } from "react-router-dom";
import { Select } from "../components/molecules/Select/Select";
import { ToggleIcon } from "../components/molecules/ToggleIcon/ToggleIcon";
import { useMemo, useState } from "react";
import { useGenres } from "@/lib/hooks/useGenres";
import {
  SidebarCheckboxFilter,
  type SidebarCheckboxFilterItemProps,
} from "@/components/molecules/SidebarCheckboxFilter";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { Button } from "@/components/atoms/Button/Button";
import { Sheet } from "@/components/molecules/Sheet/Sheet";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { SkeletonDetailedMovieCard } from "@/components/molecules/DetailedMovieCard/SkeletonDetailedMovieCard";
import { useSessionStorageState } from "ahooks";

const ORDER_BY_OPTIONS = [
  "title",
  "externalRating",
  "runtime",
  "yearReleased",
] as const;
const ORDER_DIRECTION_OPTIONS = ["asc", "desc"] as const;

type OrderByOptions = (typeof ORDER_BY_OPTIONS)[number];

export default function DiscoverPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    "genres",
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
  const { genres: allGenres, loading: genresLoading } = useGenres({
    onCompleted: (data) => {
      if (data.getGenres && genres.length === 0) {
        setGenres(data.getGenres.map((genre) => genre.id));
      }
    },
  });

  const orderByOptions = useMemo(
    () =>
      ORDER_BY_OPTIONS.map((option) => ({
        value: option,
        // Capitalize the first letter of the option and replace camel case with spaces
        label:
          option.charAt(0).toUpperCase() +
          option.slice(1).replace(/([A-Z])/g, " $1"),
      })),
    [],
  );

  const genreOptions: SidebarCheckboxFilterItemProps[] = useMemo(() => {
    return allGenres.map((genre) => ({
      value: genre.id,
      label: genre.name,
      isChecked: genres.includes(genre.id),
    }));
  }, [allGenres, genres]);

  const handleGenreItemClick = (item: SidebarCheckboxFilterItemProps) => {
    if (genres.includes(item.value)) {
      setGenres((prev) => (prev ?? []).filter((genre) => genre !== item.value));
    } else {
      setGenres((prev) => [...(prev ?? []), item.value]);
    }
  };

  const handleAllGenresCheckedChange = () => {
    if (genres.length === allGenres.length) {
      setGenres([]);
    } else {
      setGenres(allGenres.map((genre) => genre.id));
    }
  };

  const totalPages = Math.ceil(totalResults / pageSize);
  const firstResultForPage = (page - 1) * pageSize + 1;
  const lastResultForPage = Math.min(page * pageSize, totalResults);
  const resultsText =
    totalResults > 0
      ? `Showing ${firstResultForPage}-${lastResultForPage} of ${totalResults} results`
      : "Showing 0 results";

  return (
    <div className="max-w-screen-lg w-[90vw] mx-auto">
      <Sheet
        title="Genres"
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        side="right"
      >
        <SidebarCheckboxFilter
          className="h-screen overflow-y-auto pl-1 pt-1"
          items={genreOptions}
          onItemClick={handleGenreItemClick}
          isAllChecked={genres.length === allGenres.length}
          onAllCheckedChange={handleAllGenresCheckedChange}
        />
      </Sheet>
      <div className="grid md:grid-cols-[14rem_minmax(16rem,_1fr)] gap-8">
        <section className="hidden md:block relative">
          {allGenres.length > 0 && (
            <SidebarCheckboxFilter
              title="Genres"
              className="sticky top-12 bottom-0 h-[calc(100vh-2rem)] pt-12 pb-10 overflow-y-auto pl-1"
              items={genreOptions}
              onItemClick={handleGenreItemClick}
              isAllChecked={genres.length === allGenres.length}
              onAllCheckedChange={handleAllGenresCheckedChange}
            />
          )}
        </section>
        <section className="mt-10 flex flex-col gap-2 md:gap-0">
          <div className="flex flex-col gap-2 md:flex-row md:items-end h-16 md:h-12">
            {loading ? (
              <Skeleton className="ml-auto md:ml-0 w-44" />
            ) : (
              <p className="ml-auto md:ml-0 text-brand-11">{resultsText}</p>
            )}
            <div className="flex flex-row gap-1 items-center grow">
              {genresLoading ? (
                <Skeleton className="md:hidden h-10" />
              ) : (
                <Button
                  className="md:hidden"
                  variant="secondary"
                  onClick={() => setSidebarOpen(true)}
                >
                  Open filters
                </Button>
              )}
              {loading ? (
                <>
                  <Skeleton className="h-10 w-10 ml-auto" />
                  <Skeleton className="h-10" />
                </>
              ) : (
                <>
                  <ToggleIcon
                    className="ml-auto"
                    toggledIcon="lucide:sort-asc"
                    untoggledIcon="lucide:sort-desc"
                    pressed={orderDirection === "asc"}
                    onClick={() =>
                      setOrderDirection((prev) =>
                        prev === "asc" ? "desc" : "asc",
                      )
                    }
                  />
                  <Select
                    placeholder="Order by"
                    value={orderBy}
                    onValueChange={(value) =>
                      setOrderBy(value as OrderByOptions)
                    }
                    options={orderByOptions}
                    buttonProps={{ variant: "secondary" }}
                  />
                </>
              )}
            </div>
          </div>
          <ul className="flex flex-col gap-4 mt-4">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <makes sense to use i here>
                <SkeletonDetailedMovieCard key={i} />
              ))
              : movies.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <DetailedMovieCard movie={movie} />
                </Link>
              ))}
          </ul>
        </section>
      </div>
      {totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(pageNum) => setPage(pageNum)}
          className="mt-8"
        />
      )}
    </div>
  );
}
