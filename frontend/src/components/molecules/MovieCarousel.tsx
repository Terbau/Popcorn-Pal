import { type FC, useRef } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "../../__generated__/types";
import { cn } from "../../lib/utils";
import { ScrollButton } from "./ScrollButton/ScrollButton";
import { MovieImage } from "./MovieImage/MovieImage";
import { MovieImageSkeleton } from "./MovieImage/MovieImageSkeleton";

interface MovieCarouselProps {
  movieList: Movie[];
  isLoading?: boolean;
  label?: string;
}

export const MovieCarousel: FC<MovieCarouselProps> = ({
  movieList,
  isLoading = false,
  label,
}) => {
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);

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
    <div className="w-full">
      {label && (
        <h2 className="text-left text-3xl font-semibold underline text-white mb-4 mt-1">
          {label}
        </h2>
      )}

      {/* Scrollable Movie Container */}
      <div className="relative w-full h-[19rem]">
        <div className="h-full w-full absolute flex flex-row items-center justify-between">
          <ScrollButton direction="left" onClick={handleScrollLeft} />
          <ScrollButton direction="right" onClick={handleScrollRight} />
        </div>
        <ul
          className={cn(
            "flex gap-6 md:gap-12 overflow-x-auto overflow-y-visible w-full h-full snap-x scroll-smooth",
            { "pt-8": !!label },
          )}
          ref={scrollContainerRef}
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <needed>
                <li key={index} className="shrink-0 p-4">
                  <MovieImageSkeleton />
                </li>
              ))
            : movieList.map((movie, index) => (
                <li
                  key={movie.id}
                  className="shrink-0 p-4 relative snap-center h-full"
                >
                  {/* Large Background Number */}
                  <span className="text-8xl md:text-9xl font-extrabold text-white drop-shadow-md absolute -top-8 left-0 z-10">
                    {index + 1}
                  </span>

                  {/* Movie Poster */}
                  <Link
                    className="relative ml-auto h-full"
                    to={`/movie/${movie.id}`}
                  >
                    <MovieImage src={movie.posterUrl ?? ""} alt={movie.title} />
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};
