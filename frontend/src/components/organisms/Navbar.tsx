import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonLeftIcon } from "../atoms/Button/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@fontsource/playfair-display"; // Importerer Playfair Display fonten
import "@fontsource/roboto"; // Importerer Roboto fonten
import { gql, useLazyQuery } from "@apollo/client";
import { useAuth } from "../../lib/context/authContext";
import { useState } from "react";
import type { Query } from "../../__generated__/types";
import { LoadingButton } from "../molecules/LoadingButton/LoadingButton";
import { MovieSearchDropdown } from "./MovieSearchDropdown";
import { ProfileDropdown } from "../molecules/ProfileDropdown/ProfileDropdown";
import { Sheet } from "../molecules/Sheet/Sheet";
import { MobileSearchOverlay } from "./MobileSearchOverlay";
import {
  SidebarItem,
  SidebarItemBadge,
  SidebarItemLabel,
} from "../molecules/SidebarItem";
import { Separator } from "../atoms/Separator/Separator";

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
  const [profileDropdownIsOpen, setProfileDropdownIsOpen] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [mobileSearchOverlayIsOpen, setMobileSearchOverlayIsOpen] =
    useState(false);

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
    <header className="fixed bg-brand-3 w-full h-20 z-20">
      <nav className="relative w-full h-full flex flex-row justify-between sm:justify-start px-3 xss:px-5 py-2 items-center gap-1 xs:gap-3 sm:gap-6 md:gap-12 font-roboto">
        <button
          type="button"
          className="block sm:hidden"
          onClick={() => setSidebarIsOpen(true)}
        >
          <Icon icon="material-symbols:menu" className="h-8 w-8" />
        </button>

        <Link
          className="flex items-center space-x-2 sm:space-x-4 font-playfair cursor-pointer hover:scale-105 transition duration-200"
          to="/"
        >
          <Icon
            icon="emojione:popcorn"
            className="h-8 w-8 sm:h-14 sm:w-14 hidden xss:block"
          />
          <p className="text-lg xss:xl sm:text-2xl md:text-4xl font-bold text-purple-500 whitespace-nowrap drop-shadow-[0_0_10px_rgba(128,90,213,0.8)]">
            POPCORN PAL
          </p>
        </Link>

        <div className="sm:ml-auto flex flex-row items-center gap-2 xss:gap-4">
          <LoadingButton
            isLoading={isLoading}
            onClick={!isLoading ? handleRandomMovie : undefined}
            className="hidden md:flex"
          >
            <ButtonLeftIcon icon="mynaui:play-solid" />
            Random Movie
          </LoadingButton>

          <div className="hidden sm:block">
            <MovieSearchDropdown />
          </div>

          <button
            type="button"
            onClick={() => setMobileSearchOverlayIsOpen(true)}
            className="sm:hidden"
          >
            {/* Search icon */}
            <Icon icon="ic:twotone-search" className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          {currentUser ? (
            <ProfileDropdown
              open={profileDropdownIsOpen}
              onOpenChange={setProfileDropdownIsOpen}
            />
          ) : (
            <Button asChild variant="secondary">
              <Link to="/signin">Sign In</Link>
            </Button>
          )}

          {/* Sidebar */}
          <Sheet
            title="Popcorn Pal"
            side="left"
            open={sidebarIsOpen}
            onOpenChange={setSidebarIsOpen}
          >
            <Separator orientation="horizontal" />
            <SidebarItem disabled>
              <SidebarItemLabel asChild>
                <Link to="/for-you">For You</Link>
              </SidebarItemLabel>
              <SidebarItemBadge color="red" variant="secondary" size="sm">
                Coming soon
              </SidebarItemBadge>
            </SidebarItem>

            <SidebarItem disabled>
              <SidebarItemLabel asChild>
                <Link to="/discover">Discover</Link>
              </SidebarItemLabel>
              <SidebarItemBadge color="red" variant="secondary" size="sm">
                Coming soon
              </SidebarItemBadge>
            </SidebarItem>
          </Sheet>

          <MobileSearchOverlay
            open={mobileSearchOverlayIsOpen}
            onOpenChange={setMobileSearchOverlayIsOpen}
          />
        </div>
      </nav>
    </header>
  );
};
