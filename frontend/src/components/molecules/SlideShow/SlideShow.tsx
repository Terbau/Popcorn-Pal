import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Icon } from "@iconify/react";

import { Link } from "react-router-dom";
import type { GetFeaturedMoviesQuery } from "@/lib/graphql/generated/graphql";
import { transformAndResizeImageUrl } from "@/lib/utils";
import { Button } from "@/components/atoms/Button/Button";

interface SlideShowProps {
  movies: GetFeaturedMoviesQuery["getFeaturedMovies"];
}

export const SlideShow = ({ movies }: SlideShowProps) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const movieSlides = movies?.map((movie) => ({
    id: movie.id,
    image: transformAndResizeImageUrl(
      movie.landscapePosterUrl ?? "",
      1920,
      movie.landscapePosterWidth ?? undefined,
      movie.landscapePosterHeight ?? undefined,
    ),
    text: movie.title,
    rating: movie.externalRating,
    year: movie.yearReleased,
  }));

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {movieSlides?.map((slide, index) => (
          <div
            className="relative flex-shrink-0 w-full h-[28rem]"
            key={slide.id}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full object-cover object-right-top"
            />
            <div className="absolute flex items-end bottom-0 left-0 dark:bg-gradient-to-b dark:from-transparent dark:to-primary h-full text-white p-6 text-4xl w-full font-roboto">
              <div className="pl-2">
                <p className="font-bold text-4xl">{slide.text}</p>
                <div className="flex items-center space-x-2">
                  <Icon
                    icon="noto:star"
                    width="0.5em"
                    height="1.5em"
                    className="pt-2"
                  />
                  <p className="text-xl pt-2 pr-0 mr-0 ">{slide.rating}</p>

                  <Icon
                    icon="ci:line-m"
                    width="1.2em"
                    height="1.2em"
                    className="pt-2 pl-0"
                  />
                  <p className="text-xl pt-2">{slide.year}</p>
                </div>
                <Button className="pl-10 pr-10 flex items-center w-fit" asChild>
                  <Link to={`/movie/${slide.id}`}>Read more</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
