import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieImage } from "../components/molecules/MovieImage/MovieImage";
import { cn, transformAndResizeImageUrl } from "../lib/utils";
import { Badge } from "../components/atoms/Badge/Badge";
import { LoadingPageSpinner } from "../components/atoms/Spinner/LoadingPageSpinner";
import { useMovie } from "@/lib/hooks/useMovie";
import { useQueryState } from "nuqs";
import { CommentsSection } from "@/components/organisms/CommentsSection";
import { useAuth } from "@/lib/context/authContext";
import { useWatchlistItem } from "@/lib/hooks/useWatchlistItem";
import { useDeleteWatchlistItem } from "@/lib/hooks/useDeleteWatchlistItem";
import { useCreateWatchlistItem } from "@/lib/hooks/useCreateWatchlistItem";
import { toast } from "react-toastify";
import { WatchlistItemLabelPickerPopover } from "@/components/organisms/WatchlistItemLabel/WatchlistItemLabelPickerPopover";
import type { WatchlistItemLabel } from "@/components/organisms/WatchlistItemLabel/WatchlistItemLabelSidebarFilter";
import { useResponsive, useSessionStorageState } from "ahooks";
import { EditableWatchlistItemLabelBadge } from "@/components/organisms/WatchlistItemLabel/EditableWatchlistItemLabelBadge";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function MoviePage() {
  const { movieId } = useParams();
  const { currentUser } = useAuth();

  const [liked, setLiked] = useState(false);
  const [isViewingFullBanner, setIsViewingFullBanner] = useState(false);
  const [rootParentId, setRootParentId] = useQueryState("commentId");
  const [_, setDiscoverGenres] = useSessionStorageState("discoverGenres", {
    defaultValue: [] as string[],
  });

  const { md } = useResponsive();
  const size = md ? "md" : "sm";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [createWatchlistItem] = useCreateWatchlistItem({
    onCompleted: () => {
      toast.success("Movie added to watchlist");
    },
    onError: () => {
      toast.error("An error occurred while adding movie to watchlist");
    },
  });
  const [deleteWatchlistItem] = useDeleteWatchlistItem(
    { userId: currentUser?.id ?? "" },
    {
      onCompleted: () => {
        toast.success("Movie removed from watchlist");
      },
      onError: () => {
        toast.error("An error occurred while removing movie from watchlist");
      },
    },
  );

  const { movie, loading, error } = useMovie(
    { id: movieId ?? "" },
    {
      skip: !movieId,
    },
  );

  const { watchlistItem } = useWatchlistItem(
    {
      userId: currentUser?.id ?? "",
      movieId: movieId ?? "",
    },
    {
      skip: !currentUser || !movieId,
    },
  );

  const handleWatchlistButtonClick = useCallback(() => {
    if (!currentUser || !movieId) return;

    if (watchlistItem) {
      deleteWatchlistItem({
        variables: {
          movieId: watchlistItem.movieId,
        },
      });
    }
  }, [currentUser, movieId, watchlistItem, deleteWatchlistItem]);

  const onLabelChange = useCallback(
    (label: WatchlistItemLabel | undefined) => {
      if (!currentUser || !movieId) return;

      if (label) {
        if (!watchlistItem) {
          createWatchlistItem({
            variables: {
              input: {
                movieId,
                label: label,
              },
            },
          });
        }
      }
    },
    [currentUser, movieId, watchlistItem, createWatchlistItem],
  );

  if (loading) return <LoadingPageSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  if (!movie || !movieId)
    return <p className="flex justify-center text-2xl mt-6">Movie not found</p>;

  const landscapePosterUrl = movie.landscapePosterUrl
    ? transformAndResizeImageUrl(
        movie.landscapePosterUrl,
        1920, // Resize image to 1280 width to save bandwidth
        movie.landscapePosterWidth ?? 0,
        movie.landscapePosterHeight ?? 0,
      )
    : null;

  return (
    <div className="max-w-screen-lg w-[90vw] mx-auto mt-8 md:mt-16 rounded-lg overflow-hidden">
      <button
        type="button"
        className={cn("w-full bg-brand-2 overflow-hidden relative group", {
          "h-32 md:h-56": !isViewingFullBanner,
        })}
        onClick={() => setIsViewingFullBanner((prev) => !prev)}
      >
        {landscapePosterUrl && (
          <img
            src={landscapePosterUrl}
            alt={`${movie.title} landscape poster`}
            className="h-full w-full object-cover object-right-top"
          />
        )}
        <div className="absolute bottom-0 w-full flex flex-row justify-center mb-2">
          <div className="flex flex-col items-center rounded-2xl font-medium px-8 py-1 transition-opacity opacity-0 group-hover:opacity-100 group-hover:bg-black/90">
            <Icon
              icon="si:expand-more-fill"
              className={cn("w-6 h-6", { "rotate-180": isViewingFullBanner })}
            />
          </div>
        </div>
      </button>
      <div className="bg-brand-3 relative flex flex-col pb-6 md:pb-12 -mt-2">
        <div className="flex flex-row gap-4 w-full h-24 md:h-36 px-4 sm:px-10">
          <MovieImage
            src={movie.posterUrl ?? ""}
            alt={`${movie.title} poster`}
            hasHoverEffect={false}
            className="-translate-y-1/2"
          />
          <div className="flex flex-row gap-4 w-full pt-6 items-start">
            <Link
              to={`https://www.imdb.com/title/${movie?.id}/`}
              target="_blank"
            >
              <Badge color="yellow" variant="secondary" size={size}>
                {movie?.externalRating ?? "N/A"}
                <span className="mx-1.5">•</span>
                IMDb
              </Badge>
            </Link>
            <div className="ml-auto flex flex-wrap gap-x-3 gap-y-1 text-sm sm:text-base items-center">
              <button type="button">
                <Badge
                  size={size}
                  variant="secondary"
                  color="red"
                  onClick={() => setLiked((prev) => !prev)}
                >
                  {liked ? "Liked" : "Like"}
                </Badge>
              </button>
              {currentUser &&
                (watchlistItem ? (
                  <button type="button" onClick={handleWatchlistButtonClick}>
                    <Badge size={size} variant="secondary">
                      Remove from watchlist
                    </Badge>
                  </button>
                ) : (
                  <WatchlistItemLabelPickerPopover
                    label={undefined} // Set to undefined to prevent showing the selection
                    onLabelChange={onLabelChange}
                  >
                    <button type="button">
                      <Badge size={size} variant="primary">
                        Add to watchlist
                      </Badge>
                    </button>
                  </WatchlistItemLabelPickerPopover>
                ))}
            </div>
          </div>
        </div>
        <section className="px-5 sm:px-12 grid gap-4 grid-cols-[2fr]">
          <div className="flex flex-wrap gap-2 items-center">
            <h1 className="text-2xl md:text-3xl font-semibold w-fit">
              {movie.title}
            </h1>
            <span className="text-sm text-brand-11 mr-1">
              ({movie.yearReleased})
            </span>
            {watchlistItem && (
              <EditableWatchlistItemLabelBadge
                watchlistItem={watchlistItem}
                badgeSize="sm"
              />
            )}
          </div>
          <p className="mt-1 m">{movie.plot}</p>
          <ul className="flex flex-row gap-2 items-start overflow-x-auto w-full h-fit py-2">
            {movie.genres?.map((genre) => (
              <Link
                key={genre.id}
                to="/discover"
                onClick={() => setDiscoverGenres([genre.id])}
              >
                <Badge color="slate" variant="secondary" size="sm" asChild>
                  <li className="w-fit h-fit whitespace-nowrap">
                    {genre.name}
                  </li>
                </Badge>
              </Link>
            ))}
          </ul>
        </section>

        <CommentsSection
          className="mt-10 px-5 sm:px-12"
          movieId={movieId}
          rootParentId={rootParentId}
          setRootParentId={setRootParentId}
        />
      </div>
    </div>
  );
}
