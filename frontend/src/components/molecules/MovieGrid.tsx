import { Link } from "react-router-dom";
import type { Movie } from "../../__generated__/types";
import { MovieImage } from "./MovieImage/MovieImage";
import { MovieImageSkeleton } from "./MovieImage/MovieImageSkeleton";

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
}

export const MovieGrid = ({ movies, isLoading = false }: MovieGridProps) => {
  return (
    <ul className="grid grid-cols-3 sm:grid-4 md:grid-cols-6 gap-8 w-full" data-cy="movie-grid">
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            // Add data-cy for testing the loading skeleton
            <li key={index} data-cy="movie-skeleton">
              <MovieImageSkeleton />
            </li>
          ))
        : movies.map((movie) => (
            // Add data-cy for each movie item
            <li key={movie.id} data-cy="movie-item">
              <Link to={`/movie/${movie.id}`}>
                <MovieImage src={movie.posterUrl ?? ""} alt={movie.title} />
              </Link>
            </li>
          ))}
    </ul>
  );
};

