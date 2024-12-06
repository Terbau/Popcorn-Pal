import { type FC, useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { ScrollButton } from "../ScrollButton/ScrollButton";
import { MovieImage } from "../MovieImage/MovieImage";
import { SkeletonMovieImage } from "../MovieImage/SkeletonMovieImage";
import { ScrollArea } from "../ScrollArea/ScrollArea";
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
        <h2
          className="text-left text-4xl font-semibold dark:text-white mb-4 mt-1"
          id="carousel-label"
        >
          {label}
        </h2>
      )}

      {/* Scrollable Movie Container */}
      <div
        className="relative w-full h-56 xs:h-64 sm:h-[19rem]"
        role="region"
        aria-labelledby="carousel-label"
      >
        <div className="h-full w-full absolute flex flex-row items-center justify-between">
          <ScrollButton
            direction="left"
            onClick={handleScrollLeft}
            data-cy="next-button"
            aria-label="Scroll left"
          />
          <ScrollButton
            direction="right"
            onClick={handleScrollRight}
            aria-label="Scroll right"
          />
        </div>
        <ScrollArea
          orientation="horizontal"
          viewportRef={scrollContainerRef}
          aria-label="Movie carousel scroll area"
        >
          <ul
            className={cn(
              "flex gap-3 sm:gap-6 md:gap-12 w-full h-full snap-x scroll-smooth",
              { "pt-8": !!label },
            )}
            role="list"
          >
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                <li key={index} className="shrink-0 p-4" role="listitem">
                  <SkeletonMovieImage aria-label="Loading movie image" />
                </li>
              ))
              : movieList?.map((movie, index) => (
                <li
                  key={movie.id}
                  className="shrink-0 p-4 relative snap-center h-full"
                  role="listitem"
                >
                  <span
                    className="text-7xl xs:text-8xl sm:text-9xl font-extrabold text-white drop-shadow-md absolute -top-6 sm:-top-8 left-0 z-10"
                    // aria-hidden="true"
                  >
                    {index + 1}
                  </span>

                  {/* Movie Poster */}
                  <Link
                    className="relative ml-auto h-full"
                    to={`/movie/${movie.id}`}
                    aria-label={`View details for ${movie.title}`}
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
