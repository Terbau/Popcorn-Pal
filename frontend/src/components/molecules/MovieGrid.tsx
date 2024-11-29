import { Link } from "react-router-dom";
import { MovieImage } from "./MovieImage/MovieImage";
import { SkeletonMovieImage } from "./MovieImage/SkeletonMovieImage";
import type { GetMoviesQuery } from "@/lib/graphql/generated/graphql";

interface MovieGridProps {
  movies: GetMoviesQuery["getMovies"]["results"];
  isLoading?: boolean;
}

export const MovieGrid = ({ movies, isLoading = false }: MovieGridProps) => {
  return (
    <ul
      className="grid place-items-center grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] xs:grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 sm:gap-8 w-full overflow-hidden"
      data-cy="movie-grid"
    >
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <needed>
          <li key={index} data-cy="movie-skeleton">
            <SkeletonMovieImage />
          </li>
        ))
        : movies?.map((movie) => (
          <li key={movie.id} data-cy="movie-item">
            <Link to={`/movie/${movie.id}`}>
              <MovieImage src={movie.posterUrl ?? ""} alt={movie.title} />
            </Link>
          </li>
        ))}
    </ul>
  );
};
