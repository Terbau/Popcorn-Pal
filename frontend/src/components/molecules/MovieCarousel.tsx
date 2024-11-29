import { type FC, useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { ScrollButton } from "./ScrollButton/ScrollButton";
import { MovieImage } from "./MovieImage/MovieImage";
import { SkeletonMovieImage } from "./MovieImage/SkeletonMovieImage";
import { ScrollArea } from "./ScrollArea/ScrollArea";
import type { GetMoviesQuery } from "@/lib/graphql/generated/graphql";

interface MovieCarouselProps {
  movieList: GetMoviesQuery["getMovies"]["results"];
  isLoading?: boolean;
  label?: string;
}

export const MovieCarousel: FC<MovieCarouselProps> = ({
  movieList,
  isLoading = false,
  label,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full" data-cy="top10-movies">
      {label && (
        <h2 className="text-left text-4xl font-semibold text-white mb-4 mt-1">
          {label}
        </h2>
      )}

      {/* Scrollable Movie Container */}
      <div className="relative w-full h-56 xs:h-64 sm:h-[19rem]">
        <div className="h-full w-full absolute flex flex-row items-center justify-between">
          <ScrollButton
            direction="left"
            onClick={handleScrollLeft}
            data-cy="next-button"
          />
          <ScrollButton direction="right" onClick={handleScrollRight} />
        </div>
        <ScrollArea orientation="horizontal" viewportRef={scrollContainerRef}>
          <ul
            className={cn(
              "flex gap-3 sm:gap-6 md:gap-12 w-full h-full snap-x scroll-smooth",
              { "pt-8": !!label },
            )}
          >
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <needed>
                <li key={index} className="shrink-0 p-4">
                  <SkeletonMovieImage />
                </li>
              ))
              : movieList?.map((movie, index) => (
                <li
                  key={movie.id}
                  className="shrink-0 p-4 relative snap-center h-full"
                >
                  {/* Large Background Number */}
                  <span className="text-7xl xs:text-8xl sm:text-9xl font-extrabold text-white drop-shadow-md absolute -top-6 sm:-top-8 left-0 z-10">
                    {index + 1}
                  </span>

                  {/* Movie Poster */}
                  <Link
                    className="relative ml-auto h-full"
                    to={`/movie/${movie.id}`}
                  >
                    <MovieImage
                      src={movie.posterUrl ?? ""}
                      alt={movie.title}
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </ScrollArea>
      </div>
    </div>
  );
};
