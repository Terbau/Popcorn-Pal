import { Link } from "react-router-dom";
import type { Movie } from "../../__generated__/types";
import { AllSidesIcon } from "@radix-ui/react-icons";

interface MovieDisplayProps {
  movie: Movie;
}

export const MovieDisplay = ({ movie }: MovieDisplayProps) => {
  return (
    <div>
      <Link to={`/movie/${movie.id}`}>
        <div
          key={movie.id}
          className="bg-brand-8 w-11/12 pt-2 pb-2 pl-4 pr-4 mb-4 mt-4 rounded-lg flex hover:scale-105 duration-300"
        >
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-36 object-cover cursor-pointer rounded-lg h-full"
          />
          <div className="ml-4 flex flex-col">
            <p className="text-lg text-white font-bold mb-2">{movie.title}</p>
            <p className="text-base text- mb-2">{movie.rating}</p>
            <p className="text-base text-black mb-2">{movie.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
