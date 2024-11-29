import { forwardRef, useCallback, useMemo, type HTMLAttributes } from "react";
import { MovieImage } from "../MovieImage/MovieImage";
import { cn } from "../../../lib/utils";
import { Badge } from "../../atoms/Badge/Badge";
import type { GetMovieQuery } from "@/lib/graphql/generated/graphql";
import { Icon } from "@iconify/react/dist/iconify.js";

interface DetailedMovieCardProps extends HTMLAttributes<HTMLDivElement> {
  movie: GetMovieQuery["getMovie"];
}

export const DetailedMovieCard = forwardRef<
  HTMLDivElement,
  DetailedMovieCardProps
>(({ movie, className, ...props }, ref) => {
  const genres = useMemo(() => {
    return movie?.genres?.map((genreData) => genreData.name).join(", ");
  }, [movie?.genres]);

  const getImdbBadge = useCallback(
    (className?: string, hasImdbText = true) => (
      <Badge
        color="yellow"
        variant="secondary"
        size="sm"
        className={cn("flex flex-row items-center gap-1", className)}
      >
        {movie?.externalRating ?? "N/A"}
        {hasImdbText ? (
          <>
            <span className="mx-1.5">•</span>
            IMDb
          </>
        ) : (
          <Icon icon="material-symbols:star" />
        )}
      </Badge>
    ),
    [movie?.externalRating],
  );

  const hasImdbRating = (movie?.externalVotes ?? 0) > 0;

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg overflow-hidden bg-brand-3 w-full grid grid-cols-[5.5rem,1fr] xs:grid-cols-[7.25rem,1fr] md:grid-cols-[10rem,1fr]",
        className,
      )}
      {...props}
    >
      <div className="relative">
        <MovieImage
          src={movie?.posterUrl ?? ""}
          alt={`${movie?.title} poster`}
          hasHoverEffect={false}
          className="rounded-none [&>div]:rounded-none"
        />
        {hasImdbRating &&
          getImdbBadge("absolute top-2 right-2 shadow-2xl sm:hidden", false)}
      </div>
      <div className="p-2 sm:p-4 overflow-hidden">
        <div className="flex flex-row items-center gap-1 ">
          <h3
            title={movie?.title}
            className="xs:text-lg sm:text-xl font-semibold truncate min-w-0 "
          >
            {movie?.title}
          </h3>
          {movie?.yearReleased && (
            <span className="text-xs sm:text-sm text-brand-11 flex-shrink-0">
              ({movie.yearReleased})
            </span>
          )}
          {hasImdbRating && getImdbBadge("hidden sm:block ml-auto")}
        </div>
        <span className="text-xs truncate min-w-0">{genres}</span>
        <p className="text-xs md:text-sm mt-4 max-h-16 md:max-h-[8.5rem] text-ellipsis overflow-hidden line-clamp-3 xs:line-clamp-4 md:line-clamp-[7]">
          {movie?.plot}
        </p>
      </div>
    </div>
  );
});
