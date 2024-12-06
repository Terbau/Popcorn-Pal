import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { SIGN_OUT } from "@/lib/graphql/mutations/auth";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../DropdownMenu/DropdownMenu";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/lib/context/authContext";
import { createInitials } from "@/lib/utils/textUtils";
import { EditProfileModal } from "@/components/organisms/EditProfileModal";
import { Avatar } from "../Avatar/Avatar";
import { EditableAvatar } from "../Avatar/EditableAvatar";

export const ProfileDropdown = ({
  ...props
}: RadixDropdownMenu.DropdownMenuProps) => {
  const { currentUser } = useAuth();

  const [editProfileIsOpen, setEditProfileIsOpen] = useState(false);
  const [logout] = useMutation(SIGN_OUT);

  const handleLogout = useCallback(async () => {
    await logout();
    window.location.reload();
  }, [logout]);

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
        className="max-h-[calc(100vh-5rem)] bg-cream dark:bg-brand-3 overflow-y-auto"
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
            <p className="text-lg font-bold text-purple-text dark:text-brand-12">
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
        <DropdownMenuItem
          onClick={handleLogout}
          className="bg-slate-12 dark:bg-brand-3"
        >
          <DropdownMenuItemIcon icon="ic:round-logout" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};
