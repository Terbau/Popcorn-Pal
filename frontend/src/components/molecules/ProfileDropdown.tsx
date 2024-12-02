import { useAuth } from "../../lib/context/authContext";
import { Avatar } from "./Avatar/Avatar";
import { useMutation } from "@apollo/client";
import { EditableAvatar } from "./Avatar/EditableAvatar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { EditProfileModal } from "../organisms/EditProfileModal";
import { createInitials } from "../../lib/utils";
import { SIGN_OUT } from "@/lib/graphql/mutations/auth";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu/DropdownMenu";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";

export const ProfileDropdown = ({
  ...props
}: RadixDropdownMenu.DropdownMenuProps) => {
  const { currentUser } = useAuth();

  const [editProfileIsOpen, setEditProfileIsOpen] = useState(false);
  const [logout] = useMutation(SIGN_OUT);

  // Should never happen as the navbar user content will then be hidden
  if (!currentUser) {
    return null;
  }

  const initials = createInitials(currentUser.firstName, currentUser.lastName);

  return (
    <DropdownMenuRoot {...props} modal={false}>
      <EditProfileModal
        open={editProfileIsOpen}
        onOpenChange={setEditProfileIsOpen}
      />
      <DropdownMenuTrigger className="rounded-full">
        <Avatar
          src={currentUser.avatarUrl ?? undefined}
          fallback={initials}
          className="cursor-pointer"
          size="md"
          overrideSizeChange
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={16}
        align="end"
        className="max-h-[calc(100vh-5rem)] overflow-y-auto"
      >
        <div className="p-4 flex flex-row gap-3">
          {/* Need to use an unstyles item here */}
          <RadixDropdownMenu.Item asChild>
            <EditableAvatar
              src={currentUser.avatarUrl ?? undefined}
              fallback={initials}
              size="lg"
              onClick={() => setEditProfileIsOpen(true)}
            />
          </RadixDropdownMenu.Item>
          <div>
            <p className="text-lg font-bold">
              {currentUser.firstName} {currentUser.lastName}
            </p>
            <p className="text-sm text-brand-8">{currentUser.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={`/profile/${currentUser.id}`}>
            <DropdownMenuItemIcon icon="mdi:user" />
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/watchlist/${currentUser.id}`}>
            <DropdownMenuItemIcon icon="mdi:movie-open-outline" />
            My Watchlist
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <DropdownMenuItemIcon icon="ic:round-logout" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};
