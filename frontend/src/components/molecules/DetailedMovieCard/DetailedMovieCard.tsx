import { forwardRef, useCallback, useMemo, type HTMLAttributes } from "react";
import { MovieImage } from "../MovieImage/MovieImage";
import { Badge } from "../../atoms/Badge/Badge";
import type {
  GetMovieQuery,
  GetWatchlistItemQuery,
} from "@/lib/graphql/generated/graphql";
import { Icon } from "@iconify/react/dist/iconify.js";
import { EditableWatchlistItemLabelBadge } from "@/components/organisms/WatchlistItemLabel/EditableWatchlistItemLabelBadge";
import { useResponsive } from "ahooks";
import { OptionalLink } from "@/components/atoms/OptionalLink";
import { cn } from "@/lib/utils/classUtils";
import { Link } from "react-router-dom";
import type { WatchlistItemLabel } from "@/components/organisms/WatchlistItemLabel/WatchlistItemLabelSidebarFilter";

export interface DetailedMovieCardProps extends HTMLAttributes<HTMLDivElement> {
  movie: GetMovieQuery["getMovie"];
  watchlistItem?: GetWatchlistItemQuery["getWatchlistItem"];
  href?: string;
  isCurrentUser?: boolean;
  hasDeleteButton?: boolean;
  disabled?: boolean;
  overrideMovieImageSize?: "xs" | "sm" | "md" | "lg";
  onDeleteClick?: () => void;
  onWatchlistItemLabelUpdate?: (label: WatchlistItemLabel) => void;
}

export const DetailedMovieCard = forwardRef<
  HTMLDivElement,
  DetailedMovieCardProps
>(
  (
    {
      movie,
      watchlistItem,
      href,
      isCurrentUser = false,
      hasDeleteButton,
      onDeleteClick,
      disabled = false,
      overrideMovieImageSize,
      onWatchlistItemLabelUpdate,
      className,
      ...props
    },
    ref,
  ) => {
    const { sm } = useResponsive();
    const badgeSize = sm ? "sm" : "xs";
    const movieLink = `/movie/${movie?.id}`;

    const genres = useMemo(() => {
      return movie?.genres?.map((genreData) => genreData.name).join(", ");
    }, [movie?.genres]);

    const getImdbBadge = useCallback(
      (className?: string, hasImdbText = true) => (
        <OptionalLink
          className={className}
          to={`https://www.imdb.com/title/${movie?.id}/`}
          disabled={disabled}
        >
          <Badge
            color="yellow"
            variant="secondary"
            size="sm"
            className="flex flex-row items-center gap-1"
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
        </OptionalLink>
      ),
      [movie?.externalRating, movie?.id, disabled],
    );

    const hasImdbRating = (movie?.externalVotes ?? 0) > 0;

    return (
      <div
        ref={ref}
        className={cn(
          // The grid cols comnes from a bug where truncate doesn't work with computed widths like when
          // flex grow is used.
          "group rounded-lg overflow-hidden bg-cream shadow-lg dark:bg-brand-3 w-full grid grid-cols-[4.75rem,1fr] xs:grid-cols-[6.2rem,1fr] md:grid-cols-[8.75rem,1fr]",
          className,
        )}
        {...props}
      >
        <div className="relative">
          <Link to={movieLink}>
            <MovieImage
              src={movie?.posterUrl ?? ""}
              alt={`${movie?.title} poster`}
              hasHoverEffect={false}
              size={overrideMovieImageSize ?? "sm"}
              className="rounded-none [&>div]:rounded-none"
            />
          </Link>
          {hasImdbRating &&
            getImdbBadge("absolute top-2 right-2 shadow-2xl sm:hidden", false)}
        </div>
        <div className="px-2 py-2 md:px-4 md:pt-4 md:pb-3 overflow-hidden flex flex-col">
          <div className="flex flex-col grow">
            <div className="flex flex-row items-center gap-1">
              <Link to={movieLink}>
                <h3
                  title={movie?.title}
                  className="xs:text-lg sm:text-xl dark:text-brand-12 font-semibold truncate min-w-0 "
                >
                  {movie?.title}
                </h3>
              </Link>
              {movie?.yearReleased && (
                <span className="text-xs sm:text-sm text-brand-11 flex-shrink-0">
                  ({movie.yearReleased})
                </span>
              )}
              <div className="ml-auto flex flex-row gap-3">
                {hasDeleteButton && isCurrentUser && !disabled && (
                  <button
                    type="button"
                    className="shrink-0 hidden group-focus-within:block group-hover:block"
                    onClick={onDeleteClick}
                    aria-label={`Remove ${movie?.title} from watchlist`}
                  >
                    <Icon
                      icon="material-symbols:delete-outline"
                      className="h-6 w-6 text-brand-11 hover:text-brand-10"
                    />
                  </button>
                )}
                {hasImdbRating && getImdbBadge("hidden sm:block")}
              </div>
            </div>
            <span className="hidden xs:block dark:text-brand-11 text-purple-medium text-xs truncate min-w-0">
              {genres}
            </span>

            <p className="text-xs dark:text-brand-12 md:text-sm mt-2 xs:mt-4 max-h-16 md:max-h-[8.5rem] text-ellipsis overflow-hidden line-clamp-2 xs:line-clamp-2 md:line-clamp-4">
              {movie?.plot}
            </p>
          </div>
          <div className="flex flex-row items-center">
            {watchlistItem?.label && (
              <EditableWatchlistItemLabelBadge
                watchlistItem={watchlistItem}
                badgeSize={badgeSize}
                isEditable={isCurrentUser && !disabled}
                onUpdate={onWatchlistItemLabelUpdate}
              />
            )}
            {href && (
              <OptionalLink
                to={href}
                className="ml-auto cursor-pointer flex flex-row gap-1 items-center dark:text-brand-11 text-purple-medium hover:bg-purple-hover dark:hover:bg-brand-4 px-3 py-1 rounded-full text-xs md:text-base"
                aria-label={`Go to ${movie?.title} page`}
                disabled={disabled}
              >
                Read more
                <Icon icon="majesticons:open" />
              </OptionalLink>
            )}
          </div>
        </div>
      </div>
    );
  },
);
