import { Link, useNavigate } from "react-router-dom";
import { SearchInput } from "../molecules/SearchInput";
import { Button } from "../atoms/Button/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@fontsource/playfair-display"; // Import Playfair Display font
import "@fontsource/roboto"; // Import Roboto font
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useAuth } from "../../lib/context/authContext";
import { Query } from "../../__generated__/types";
import { LoadingButton } from "../molecules/LoadingButton/LoadingButton";

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

  const [logout] = useMutation(SIGN_OUT);
  const { currentUser } = useAuth();
  const [fetchRandomMovie, { loading }] = useLazyQuery<
    Pick<Query, "randomMovie">
  >(RANDOM_MOVIE, {
    fetchPolicy: "no-cache",
  });

  const handleRandomMovie = async () => {
    const { data } = await fetchRandomMovie();
    if (data?.randomMovie) {
      navigate(`/movie/${data.randomMovie.id}`);
    }
  };

  return (
    <nav className="fixed bg-brand-3 w-full h-20 flex flex-row px-5 py-2 z-50 items-center gap-12 font-roboto">
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
          isLoading={loading}
          leftIcon={<Icon icon="mynaui:play-solid" />}
          onClick={handleRandomMovie}
        >
          Random Movie
        </LoadingButton>

        <SearchInput
          className="ml-auto hidden md:block"
          onSearch={() => console.log("Search input change")}
        />

        {currentUser ? (
          <>
            <span>Logged in as: {currentUser?.email}</span>
            <Button asChild variant="secondary" onClick={() => logout()}>
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
  );
};
