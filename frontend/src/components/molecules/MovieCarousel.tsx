import { type FC, useRef } from "react";
import type { Movie } from "../../lib/types";
import { Link } from "react-router-dom";

interface MovieCarouselProps {
  movieList: Movie[];
  componentHeader: string;
}

export const MovieCarousel: FC<MovieCarouselProps> = ({
  movieList,
  componentHeader,
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
    <div className="relative w-full overflow-hidden">
      <h2 className="text-left text-3xl font-semibold underline text-white mb-4 mt-1">
        {componentHeader}
      </h2>
      {/* Left Scroll Button */}
      <button
        onClick={handleScrollLeft}
        className="absolute left-4 top-1/2 transform -translate-y-1/3 text-white z-20 bg-brand-9 pt-2 px-3 pb-3 rounded-full text-4xl hover:bg-brand-7"
        type="button"
      >
        &#8249;
      </button>
      {/* Right Scroll Button */}
      <button
        onClick={handleScrollRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/3 text-white z-20 bg-green-7 pt-2 px-3 pb-3  rounded-full text-4xl  hover:bg-green-9"
        type="button"
      >
        &#8250;
      </button>

      {/* Scrollable Movie Container */}
      <div
        className="flex gap-6 md:gap-12 overflow-x-auto w-full snap-x scroll-smooth pt-8"
        ref={scrollContainerRef}
      >
        {movieList.map((movie, index) => (
          <div
            key={movie.id}
            className="shrink-0 p-4 relative snap-center"
          >
            {/* Large Background Number */}
            <span className="text-8xl md:text-9xl font-extrabold text-white drop-shadow-md absolute -top-4 left-0 z-10">
              {index + 1}
            </span>

            {/* Movie Poster */}
            <Link className="relative ml-auto" to={`/movie/${movie.id}`}>
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-32 md:w-40 object-cover hover:scale-105 duration-300 cursor-pointer rounded-lg"
              />
            </Link>
          </div>
        ))}
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
