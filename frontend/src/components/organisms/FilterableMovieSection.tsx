import { useState } from "react";
import {
  FilterBar,
  type FilterBarItem,
} from "../molecules/FilterBar/FilterBar";
import { MovieGrid } from "../molecules/MovieGrid";
import type { GetMoviesQuery } from "@/lib/graphql/generated/graphql";

interface FilterableMovieSectionProps {
  movies: GetMoviesQuery["getMovies"]["results"];
  isLoading?: boolean;
}

export const FilterableMovieSection = ({
  movies,
  isLoading,
}: FilterableMovieSectionProps) => {
  const [filters, setFilters] = useState<FilterBarItem[]>([
    { label: "Adventure", value: "Adventure", isSelected: false },
    { label: "Action", value: "Action", isSelected: false },
    { label: "Sci-Fi", value: "Sci-Fi", isSelected: false },
    { label: "Drama", value: "Drama", isSelected: true },
    { label: "Thriller", value: "Thriller", isSelected: false },
  ]);

  const handleItemClick = (item: FilterBarItem) => {
    const updatedFilters = filters.map((filter) => ({
      ...filter,
      isSelected: filter.value === item.value,
    }));

    setFilters(updatedFilters);
  };

  return (
    <section
      className="w-full flex flex-col gap-8 items-center justify-center"
      data-cy="filterable-movie-section"
    >
      <FilterBar
        items={filters.map((filter) => ({
          ...filter,
          "data-cy": `filter-${filter.value}`,
        }))}
        onItemClick={handleItemClick}
        className="mx-auto"
      />
      <MovieGrid
        movies={movies?.filter((movie) =>
          movie?.genres?.some((genreData) => {
            return filters.some(
              (filter) => filter.isSelected && filter.value === genreData.id,
            );
          }),
        )}
        isLoading={isLoading}
      />
    </section>
  );
};
