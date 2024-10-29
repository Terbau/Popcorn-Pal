import { Link } from "react-router-dom";
import { SearchInput } from "../molecules/SearchInput";
import { Button } from "../atoms/Button/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@fontsource/playfair-display"; // Importerer Playfair Display fonten
import "@fontsource/roboto"; // Importerer Roboto fonten
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../../lib/context/authContext";

const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const Navbar = () => {
  const [logout] = useMutation(SIGN_OUT);
  const { currentUser } = useAuth();

  return (
    <nav className="fixed bg-brand-3 w-full h-20 flex flex-row px-5 py-2 z-50 items-center gap-12 font-roboto">
      <div className="flex items-center space-x-4 font-playfair">
        <Icon icon="emojione:popcorn" width="4em" height="4em" />
        <p className="text-4xl hidden md:block font-bold text-purple-500 drop-shadow-[0_0_10px_rgba(128,90,213,0.8)]">
          POPCORN PAL
        </p>
      </div>

      <div className="ml-auto flex flex-row items-center gap-4">
        <Button>
          <Icon icon="mynaui:play-solid" width="1.2em" height="1.2em" />
          <Link to="/another" className="font-roboto">
            Random Movie
          </Link>
        </Button>

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
