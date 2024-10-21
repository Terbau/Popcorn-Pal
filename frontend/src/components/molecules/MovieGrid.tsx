import { Link } from "react-router-dom";
import type { Movie } from "../../lib/types";

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <ul className="grid grid-cols-3 sm:grid-4 md:grid-cols-6 gap-8 w-full">
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-40 object-cover hover:scale-105 duration-300 cursor-pointer rounded-lg"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
