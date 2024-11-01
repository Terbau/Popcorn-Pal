import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-brand-3 flex flex-col items-center text-white text-center p-4 shadow-lg w-full h-44">
      <div className="mb-4 mt-4 flex">
        <p className="text-1xl hidden md:block font-bold text-purple-500 font-playfair">
          Resources provided by
        </p>
      </div>
      <div className="flex justify-center space-x-8 font-roboto">
        <Link
          to="https://iconify.design/"
          className="flex flex-col items-center"
        >
          <Icon icon="ph:smiley" width="3em" height="3em" />
          <p className="text-l hidden md:block font-bold text-purple-500 font-playfair">
            Iconify
          </p>
        </Link>
        <Link to="https://www.imdb.com/" className="flex flex-col items-center">
          <Icon icon="mdi-movie-open-play" width="3em" height="3em" />
          <p className="text-l hidden md:block font-bold text-purple-500 font-playfair">
            IMDb
          </p>
        </Link>
      </div>
    </footer>
  );
};
