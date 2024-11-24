import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ProfileDropdownItem,
  ProfileDropdownItemIcon,
} from "./ProfileDropdownItem";
import { ProfileDropdownSeparator } from "./ProfileDropdownSeparator";
import { useAuth } from "../../../lib/context/authContext";
import { Avatar } from "../Avatar/Avatar";
import { gql, useMutation } from "@apollo/client";
import { EditableAvatar } from "../Avatar/EditableAvatar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { EditProfileModal } from "../../organisms/EditProfileModal";
import { createInitials } from "../../../lib/utils";

interface ProfileDropdownProps extends RadixDropdownMenu.DropdownMenuProps {}

const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const ProfileDropdown = ({ ...props }: ProfileDropdownProps) => {
  const { currentUser } = useAuth();

  const [editProfileIsOpen, setEditProfileIsOpen] = useState(false);
  const [logout] = useMutation(SIGN_OUT);

  // Should never happen as the navbar user content will then be hidden
  if (!currentUser) {
    return null;
  }

  const initials = createInitials(currentUser.firstName, currentUser.lastName);

  return (
    <RadixDropdownMenu.Root {...props} modal={false}>
      <EditProfileModal
        open={editProfileIsOpen}
        onOpenChange={setEditProfileIsOpen}
      />
      <RadixDropdownMenu.Trigger className="rounded-full">
        <Avatar
          src={currentUser.avatarUrl ?? undefined}
          fallback={initials}
          className="cursor-pointer"
          size="md"
          overrideSizeChange
        />
      </RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          sideOffset={16}
          align="end"
          className="border border-brand-5 z-30 min-w-64 bg-brand-3 rounded-md shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto"
        >
          <div className="p-4 flex flex-row gap-3">
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

          <ProfileDropdownSeparator />
          <ProfileDropdownItem asChild>
            <Link to={`/profile/${currentUser.id}`}>
              <ProfileDropdownItemIcon icon="mdi:user" />
              My Profile
            </Link>
          </ProfileDropdownItem>
          <ProfileDropdownItem asChild>
            <Link to={`/watchlist/${currentUser.id}`}>
              <ProfileDropdownItemIcon icon="mdi:movie-open-outline" />
              My Watchlist
            </Link>
          </ProfileDropdownItem>
          <ProfileDropdownSeparator />
          <ProfileDropdownItem onClick={() => logout()}>
            <ProfileDropdownItemIcon icon="ic:round-logout" />
            Logout
          </ProfileDropdownItem>
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};
