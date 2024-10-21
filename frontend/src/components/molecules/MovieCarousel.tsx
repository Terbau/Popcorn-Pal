import { type FC, useRef } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "../../__generated__/types";
import { cn } from "../../lib/utils";
import { ScrollButton } from "./ScrollButton/ScrollButton";

interface MovieCarouselProps {
  movieList: Movie[];
  label?: string;
}

export const MovieCarousel: FC<MovieCarouselProps> = ({ movieList, label }) => {
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
      <div className="relative w-full h-72">
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
          {movieList.map((movie, index) => (
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
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="h-full object-cover hover:scale-105 duration-300 cursor-pointer rounded-lg"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={handleScrollRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/3 text-white z-20 bg-brand-9 pt-2 px-3 pb-3  rounded-full text-4xl  hover:bg-brand-7"
        type="button"
      >
        &#8250;
      </button>
    </div>
  );
};
