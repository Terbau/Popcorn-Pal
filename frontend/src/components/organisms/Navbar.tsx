import { Link, useLocation } from "react-router-dom";
import { Button } from "../atoms/Button/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@fontsource/playfair-display"; // Importerer Playfair Display fonten
import "@fontsource/roboto"; // Importerer Roboto fonten
import { useAuth } from "../../lib/context/authContext";
import { useState } from "react";
import { SearchDropdown } from "./SearchDropdown";

import { Sheet } from "../molecules/Sheet/Sheet";
import { MobileSearchOverlay } from "./MobileSearchOverlay";
import {
  SidebarItem,
  SidebarItemBadge,
  SidebarItemIcon,
  SidebarItemLabel,
} from "../molecules/SidebarItem/SidebarItem";
import { Separator } from "../atoms/Separator/Separator";
import { cn } from "@/lib/utils";
import { Badge, type BadgeProps } from "../atoms/Badge/Badge";
import { ProfileDropdown } from "../molecules/ProfileDropdown/ProfileDropdown";

interface NavLink {
  label: string;
  to: string;
  icon?: string;
  badgeText?: string;
  disabled?: boolean;
  badgeProps?: BadgeProps;
}

interface NavBarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const NAV_LINKS: NavLink[] = [
  {
    label: "Home",
    to: "/",
    icon: "material-symbols:home-outline",
  },
  {
    label: "Discover",
    to: "/discover",
    icon: "fluent:movies-and-tv-16-regular",
  },
  {
    label: "For You",
    to: "/foryou",
    icon: "ri:dvd-ai-fill",
  },
] as const;

export const Navbar = ({ darkMode, toggleDarkMode }: NavBarProps) => {
  const { pathname } = useLocation();
  const { currentUser } = useAuth();

  const [profileDropdownIsOpen, setProfileDropdownIsOpen] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [mobileSearchOverlayIsOpen, setMobileSearchOverlayIsOpen] =
    useState(false);

  const currentPath = pathname.split("/")[1];

  return (
    <header className="sticky top-0 dark:bg-brand-3 bg-cream w-full h-20 z-20 border-b border-purple-border dark:border-brand-6">
      <div className="relative w-full h-full flex flex-row md:justify-start px-3 xss:px-5 items-center gap-1 xs:gap-3 sm:gap-6 md:gap-12 font-roboto">
        <button
          type="button"
          className="block md:hidden"
          onClick={() => setSidebarIsOpen(true)}
        >
          <Icon icon="material-symbols:menu" className="h-8 w-8" />
        </button>

        <Link
          className="flex items-center space-x-2 md:space-x-4 font-playfair cursor-pointer hover:scale-105 transition duration-200"
          to="/"
        >
          <Icon
            icon="emojione:popcorn"
            className="h-8 w-8 md:h-12 md:w-12 hidden sm:block"
          />
          {/* Original text color on title was text-purple-500 */}
          <p className="text-base xss:lg md:hidden lg:block md:text-2xl font-bold text-purple-text dark:text-purple-5 whitespace-nowrap drop-shadow-[0_0_10px_rgba(128,90,213,0.8)]">
            POPCORN PAL
          </p>
        </Link>

        <nav className="h-full">
          <ul className="hidden md:flex gap-6 h-full">
            {NAV_LINKS.map((link) => {
              const Comp = link.disabled ? "span" : Link;

              return (
                <li
                  key={link.to}
                  className="h-full flex flex-row gap-2 items-center"
                >
                  <Comp
                    to={link.to}
                    className={cn(
                      "text-base dark:text-brand-11 text-purple-text h-full flex items-center",
                      { "hover:text-brand-10": !link.disabled },
                      {
                        "border-b-[3px] border-brand-9 pt-[3px]":
                          currentPath === link.to.split("/")[1],
                      },
                    )}
                  >
                    {link.label}
                  </Comp>
                  {link.badgeText && (
                    <Badge {...link.badgeProps}>{link.badgeText}</Badge>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          onClick={toggleDarkMode}
          className="dark:text-brand-12 hover:bg-black hover:bg-opacity-10 dark:hover:bg-opacity-70 rounded-full p-1 transition duration-200"
        >
          {darkMode ? (
            <Icon icon="tdesign:mode-dark" width="24" height="24" />
          ) : (
            <Icon icon="tdesign:mode-light" width="24" height="24" />
          )}
        </button>

        <div className="ml-auto flex flex-row items-center gap-2 xss:gap-4">
          {/* More to a more fitting place */}
          {/* <LoadingButton
            isLoading={isLoading}
            onClick={!isLoading ? handleRandomMovie : undefined}
            className="hidden md:flex"
          >
            <ButtonLeftIcon icon="mynaui:play-solid" />
            Random Movie
          </LoadingButton> */}

          <div className="hidden lg:block">
            <SearchDropdown />
          </div>

          <button
            type="button"
            onClick={() => setMobileSearchOverlayIsOpen(true)}
            className="lg:hidden dark:text-brand-12"
          >
            {/* Search icon */}
            <Icon icon="ic:twotone-search" className="h-6 w-6 md:h-8 md:w-8" />
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

            <nav className="flex flex-col gap-y-4">
              {NAV_LINKS.map((link) => (
                <SidebarItem
                  key={link.to}
                  isSelected={currentPath === link.to.split("/")[1]}
                  disabled={link.disabled}
                >
                  {link.icon && <SidebarItemIcon icon={link.icon} />}
                  <SidebarItemLabel asChild>
                    <Link to={link.to} onClick={() => setSidebarIsOpen(false)}>
                      {link.label}
                    </Link>
                  </SidebarItemLabel>
                  {link.badgeText && (
                    <SidebarItemBadge {...link.badgeProps}>
                      {link.badgeText}
                    </SidebarItemBadge>
                  )}
                </SidebarItem>
              ))}
            </nav>
          </Sheet>

          <MobileSearchOverlay
            open={mobileSearchOverlayIsOpen}
            onOpenChange={setMobileSearchOverlayIsOpen}
          />
        </div>
      </div>
    </header>
  );
};
