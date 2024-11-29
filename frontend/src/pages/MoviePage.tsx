import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieImage } from "../components/molecules/MovieImage/MovieImage";
import { transformAndResizeImageUrl } from "../lib/utils";
import { Badge, type BadgeProps } from "../components/atoms/Badge/Badge";
import { LoadingPageSpinner } from "../components/atoms/Spinner/LoadingPageSpinner";
import { ToggleBadge } from "../components/molecules/ToggleBadge/ToggleBadge";
import { useMovie } from "@/lib/hooks/useMovie";

export default function MoviePage() {
  const { movieId } = useParams();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { movie, loading, error } = useMovie(
    { id: movieId ?? "" },
    {
      skip: !movieId,
    },
  );

  const ratingAndBadgeComponents = useCallback(
    (size: BadgeProps["size"]) => (
      <div className="flex gap-2 justify-end items-center">
        <Badge color="slate" variant="secondary" size={size}>
          Rate
        </Badge>
        <ToggleBadge
          pressed={liked}
          onPressedChange={setLiked}
          size={size}
          variant="secondary"
          color="red"
        >
          {liked ? "Liked" : "Like"}
        </ToggleBadge>
        <Badge color="yellow" variant="secondary" size={size} asChild>
          <Link to={`https://www.imdb.com/title/${movie?.id}/`} target="_blank">
            {movie?.externalRating ?? "N/A"}
            <span className="mx-1.5">•</span>
            IMDb
          </Link>
        </Badge>
      </div>
    ),
    [movie?.externalRating, movie?.id, liked],
  );

  if (loading) return <LoadingPageSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  if (!movie)
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
      <div className="w-full bg-brand-2 h-32 md:h-56 overflow-hidden relative">
        {landscapePosterUrl && (
          <img
            src={landscapePosterUrl}
            alt={`${movie.title} landscape poster`}
            className="h-full w-full object-cover"
          />
        )}
        <div className="flex sm:hidden gap-x-4 gap-y-1 flex-row text-sm sm:text-base absolute bottom-3 right-6">
          {ratingAndBadgeComponents("sm")}
        </div>
      </div>
      <div className="bg-brand-3 relative flex flex-col pb-6 md:pb-12">
        <div className="flex flex-row gap-4 sm:gap-8 w-full h-24 md:h-36 px-4 sm:px-10">
          <MovieImage
            src={movie.posterUrl ?? ""}
            alt={`${movie.title} poster`}
            hasHoverEffect={false}
            className="-translate-y-1/2"
          />
          <div className="flex flex-row gap-4 w-full h-fit pt-6 items-center">
            <ul className="flex flex-row gap-2 items-start overflow-x-auto w-full h-fit py-2">
              {movie.genres?.map((genre) => (
                <Badge
                  key={genre.id}
                  color="slate"
                  variant="secondary"
                  size="sm"
                  asChild
                >
                  <li className="w-fit h-fit whitespace-nowrap">
                    {genre.name}
                  </li>
                </Badge>
              ))}
            </ul>
            <div className="ml-auto hidden sm:flex gap-x-4 gap-y-1 flex-row text-sm sm:text-base">
              {ratingAndBadgeComponents("md")}
            </div>
          </div>
        </div>
        <section className="px-5 sm:px-12 grid gap-4 grid-cols-[2fr]">
          <section>
            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-2xl md:text-3xl font-semibold w-fit">
                {movie.title}
              </h1>
              <span className="text-sm text-brand-11 grow">
                ({movie.yearReleased})
              </span>
            </div>
            <p className="mt-1">{movie.plot}</p>
          </section>
        </section>
      </div>
    </div>
  );
}
