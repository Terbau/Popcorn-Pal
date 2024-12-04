import { MovieCarousel } from "../components/molecules/MovieCarousel";
import { SlideShow } from "../components/molecules/SlideShow";
import { FilterableMovieSection } from "../components/organisms/FilterableMovieSection";
import { useFeaturedMovies } from "@/lib/hooks/useFeaturedMovies";
import { useMovies } from "@/lib/hooks/useMovies";
import { InformationView } from "@/components/molecules/informationView";
import { PcWindow } from "@/components/molecules/PcWindow";

export default function HomePage() {
  const { movies: featuredMovies } = useFeaturedMovies();
  const { movies: top10Movies, loading: top10MoviesLoading } = useMovies({
    orderBy: "externalRating",
    orderDirection: "desc",
    pageSize: 10,
  });
  useMovies({
    orderBy: "externalRating",
    orderDirection: "desc",
    pageSize: 30, // need pagination here in the future
  });

  return (
    <>
      <SlideShow movies={featuredMovies ?? []} />
      <div className=" mb-16">
        <div className="flex items-center justify-center mt-12 mb-4 max-w-screen-xl mx-auto w-[90vw]">
          <MovieCarousel
            movieList={top10Movies ?? []}
            isLoading={top10MoviesLoading}
            label="Top Movies"
          />
        </div>

        <div className="mt-10">
          {" "}
          {/* Legg til margin over komponenten */}
          <div className="h-68 bg-brand-3 my-16">
            <InformationView
              title="Welcome to Discover"
              text="Explore a wide range of content tailored just for you."
              buttonLink="/discover"
            />
          </div>
          <div className="h-68  mt-16">
            <InformationView
              title="Favorite movies"
              text=" Find your favorite movies and save them to your list."
              buttonLink="/favorites"
              reverse={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
