import { type ComponentProps, useMemo } from "react";
import type { DetailedMovieCardProps } from "./DetailedMovieCard";
import { watchlistItemLabelsOptions } from "@/components/organisms/WatchlistItemLabel/WatchlistItemLabelPickerPopover";
import { cn } from "@/lib/utils/classUtils";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MovieImage } from "../MovieImage/MovieImage";

interface MockedDetailedMovieCardProps extends ComponentProps<"div"> {
  movie: DetailedMovieCardProps["movie"];
  watchlistItemLabel?: string;
  lineClampClass?: string;
}

export const MockedDetailedMovieCard = ({
  movie,
  watchlistItemLabel,
  lineClampClass = "line-clamp-2",
  className,
  ...props
}: MockedDetailedMovieCardProps) => {
  const watchlistItemOption = watchlistItemLabelsOptions.find(
    (option) => option.value === watchlistItemLabel,
  );
  const genres = useMemo(() => {
    return movie?.genres?.map((genreData) => genreData.name).join(", ");
  }, [movie?.genres]);

  return (
    <div
      className={cn(
        "flex flex-row gap-1 dark:bg-brand-3 bg-cream-tertiaryTest shadow-lg rounded-lg relative overflow-hidden",
        className,
      )}
      {...props}
    >
      <Badge
        variant="secondary"
        color="yellow"
        size="xs"
        className="flex flex-row items-center gap-1 absolute top-2 right-2"
      >
        {movie?.externalRating}
        <Icon icon="material-symbols:star" />
      </Badge>
      <MovieImage
        hasHoverEffect={false}
        src={movie?.posterUrl ?? ""}
        alt="Movie poster"
        size="xs"
        className="rounded-none [&>div]:rounded-none"
      />
      <div className="flex flex-col justify-between p-2">
        <div>
          <p className="flex flex-row gap-1 dark:text-brand-12 items-center text-sm">
            {movie?.title}
            <span className="text-xss text-brand-11 flex-shrink-0">
              ({movie?.yearReleased})
            </span>
          </p>
          <span className="hidden dark:text-brand-12 text-purple-medium xs:block text-xss truncate min-w-0">
            {genres}
          </span>
          <p
            className={cn("mt-1.5 text-xss dark:text-brand-12", lineClampClass)}
          >
            {movie?.plot}
          </p>
        </div>
        {watchlistItemLabel && (
          <Badge
            variant="secondary"
            size="xs"
            color={watchlistItemOption?.color}
            className="w-fit text-xss px-2 -mb-1 -ml-0.5"
          >
            {watchlistItemOption?.label}
          </Badge>
        )}
      </div>
    </div>
  );
};
