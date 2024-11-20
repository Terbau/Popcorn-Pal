import { useState } from "react";
import {
  FilterBar,
  type FilterBarItem,
} from "../molecules/FilterBar/FilterBar";
import { MovieGrid } from "../molecules/MovieGrid";
import type { Movie } from "../../__generated__/types";

interface FilterableMovieSectionProps {
  movies: Movie[];
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
      className="w-full flex flex-col gap-8"
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
        movies={movies.filter((movie: Movie) =>
          movie?.genres?.some((genres) => {
            return filters.some(
              (filter) => filter.isSelected && filter.value === genres
            );
          })
        )}
        isLoading={isLoading}
      />
    </section>
  );
};
