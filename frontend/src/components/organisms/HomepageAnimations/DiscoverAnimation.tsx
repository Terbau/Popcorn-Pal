import { mockMovieData } from "./movieData";
import { MockedDetailedMovieCard } from "@/components/molecules/DetailedMovieCard/MockedDetailedMovieCard";

export const DiscoverAnimation = () => {
  const movies = mockMovieData;

  return (
    <div className="flex flex-col gap-6 animate-scroll-y">
      {movies.map((movie) => (
        <MockedDetailedMovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
