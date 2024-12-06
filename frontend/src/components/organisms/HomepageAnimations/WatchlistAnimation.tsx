import { mockMovieData } from "./movieData";
import { watchlistItemLabelsOptions } from "../WatchlistItemLabel/WatchlistItemLabelPickerPopover";
import { MockedDetailedMovieCard } from "@/components/molecules/DetailedMovieCard/MockedDetailedMovieCard";

const ITEM_LABELS = watchlistItemLabelsOptions.map((option) => option.value);

export const WatchlistAnimation = () => {
  const movies = mockMovieData;

  return (
    <div className="flex flex-col gap-6 animate-scroll-y">
      {movies.map((movie, index) => (
        <MockedDetailedMovieCard
          key={movie.id}
          movie={movie}
          watchlistItemLabel={ITEM_LABELS[index % ITEM_LABELS.length]}
          lineClampClass="line-clamp-1"
        />
      ))}
    </div>
  );
};
