import { Link, useNavigate } from "react-router-dom";
import { Button } from "../atoms/Button/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@fontsource/playfair-display"; // Importerer Playfair Display fonten
import "@fontsource/roboto"; // Importerer Roboto fonten
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useAuth } from "../../lib/context/authContext";
import { useState } from "react";
import type { Query } from "../../__generated__/types";
import { LoadingButton } from "../molecules/LoadingButton/LoadingButton";
import { MovieSearchDropdown } from "./MovieSearchDropdown";

const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

const RANDOM_MOVIE = gql`
  query randomMovie {
    randomMovie {
      id
    }
  }
`;

export const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [isLoading, setLoading] = useState(false);

  const [logout] = useMutation(SIGN_OUT);

  const [fetchRandomMovie] = useLazyQuery<Pick<Query, "randomMovie">>(
    RANDOM_MOVIE,
    {
      fetchPolicy: "no-cache",
    },
  );

  const handleRandomMovie = async () => {
    setLoading(true);
    const { data } = await fetchRandomMovie();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (data?.randomMovie) {
      navigate(`/movie/${data.randomMovie.id}`);
    }
    setLoading(false);
  };

  return (
    <header className="fixed bg-brand-3 w-full h-20 z-50">
      <nav className="relative w-full h-full flex flex-row px-5 py-2 items-center gap-12 font-roboto">
        <Link
          className="flex items-center space-x-4 font-playfair cursor-pointer hover:scale-105 transition duration-200"
          to={"/"}
        >
          <Icon icon="emojione:popcorn" width="4em" height="4em" />
          <p className="text-4xl hidden md:block font-bold text-purple-500 drop-shadow-[0_0_10px_rgba(128,90,213,0.8)]">
            POPCORN PAL
          </p>
        </Link>

        <div className="ml-auto flex flex-row items-center gap-4">
          <LoadingButton
            isLoading={isLoading}
            leftIcon={<Icon icon="mynaui:play-solid" />}
            onClick={!isLoading ? handleRandomMovie : undefined}
          >
            Random Movie
          </LoadingButton>

          <MovieSearchDropdown />

          {currentUser ? (
            <>
              <Button variant="secondary" onClick={() => logout()}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button asChild variant="secondary">
              <Link to="/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};
