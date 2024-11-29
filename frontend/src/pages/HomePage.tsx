import { MovieCarousel } from "../components/molecules/MovieCarousel";
import { SlideShow } from "../components/molecules/SlideShow";
import { FilterableMovieSection } from "../components/organisms/FilterableMovieSection";
import { useFeaturedMovies } from "@/lib/hooks/useFeaturedMovies";
import { useMovies } from "@/lib/hooks/useMovies";

export default function HomePage() {
  const { movies: featuredMovies } = useFeaturedMovies();
  const { movies: top10Movies, loading: top10MoviesLoading } = useMovies({
    orderBy: "externalRating",
    orderDirection: "desc",
    pageSize: 10,
  });
  const { movies: allMovies, loading: allMoviesLoading } = useMovies({
    orderBy: "externalRating",
    orderDirection: "desc",
    pageSize: 30, // need pagination here in the future
  });

  return (
    <>
      <SlideShow movies={featuredMovies ?? []} />
      <div className="max-w-screen-xl mx-auto w-[90vw] mb-16">
        <div className="flex items-center justify-center mt-12 mb-4 sm:mb-24">
          <MovieCarousel
            movieList={top10Movies ?? []}
            isLoading={top10MoviesLoading}
            label="Top Movies"
          />
        </div>
        <FilterableMovieSection
          movies={allMovies ?? []}
          isLoading={allMoviesLoading}
        />
      </div>
    </>
  );
}
