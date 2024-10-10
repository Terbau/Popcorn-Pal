import { FC, useRef } from "react";

interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  URL: string;
}

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
      <h2 className="text-left text-3xl font-semibold underline text-white mb-4">
        {componentHeader}
      </h2>
      {/* Left Scroll Button */}
      <button
        onClick={handleScrollLeft}
        className="absolute left-4 top-1/2 transform -translate-y-1/3 text-white z-20 bg-green-7 pt-2 px-3 pb-3 rounded-full text-4xl hover:bg-green-9"
      >
        &#8249;
      </button>

      {/* Scrollable Movie Container */}
      <div
        className="flex overflow-x-auto w-full snap-x scroll-smooth"
        ref={scrollContainerRef}
      >
        {movieList.map((movie, index) => (
          <div
            key={movie.id}
            className="shrink-0 p-4 relative w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 snap-center"
          >
            {/* Large Background Number */}
            <span className="text-9xl font-extrabold text-white drop-shadow-md absolute -top-4 left-0 z-10">
              {index + 1}
            </span>

            {/* Movie Poster */}
            <a className="relative ml-auto" href={movie.URL}>
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-40 object-cover hover:scale-105 duration-300 cursor-pointer rounded-lg"
              />
            </a>
          </div>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={handleScrollRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/3 text-white z-20 bg-green-7 pt-2 px-3 pb-3  rounded-full text-4xl  hover:bg-green-9"
      >
        &#8250;
      </button>
    </div>
  );
};
