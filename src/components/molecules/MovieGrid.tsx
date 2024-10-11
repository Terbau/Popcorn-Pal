import { Link } from "react-router-dom";
import type { Movie } from "../../lib/types";

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <ul className="flex flex-wrap gap-8 justify-center">
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
