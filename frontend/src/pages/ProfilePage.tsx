import { Link, useParams } from "react-router-dom";
import { useAuth } from "../lib/context/authContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { EditableAvatar } from "../components/molecules/Avatar/EditableAvatar";
import { Button } from "../components/atoms/Button/Button";
import { createInitials } from "../lib/utils";
import { EditProfileModal } from "../components/organisms/EditProfileModal";
import { useState } from "react";
import { LoadingPageSpinner } from "../components/atoms/Spinner/LoadingPageSpinner";
import { useUser } from "@/lib/hooks/useUser";
import { Separator } from "@/components/atoms/Separator/Separator";
import { Avatar } from "@/components/molecules/Avatar/Avatar";
import { useFollowerInfo } from "@/lib/hooks/useFollowerInfo";
import { useCreateFollow } from "@/lib/hooks/useCreateFollow";
import { useDeleteFollow } from "@/lib/hooks/useDeleteFollow";
import { LoadingButton } from "@/components/molecules/LoadingButton/LoadingButton";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { userId } = useParams();
  const { currentUser } = useAuth();

  const [editProfileIsOpen, setEditProfileIsOpen] = useState(false);

  const isCurrentUser = userId === currentUser?.id;

  const {
    user: apiUser,
    loading,
    error,
  } = useUser({
    skip: !userId || isCurrentUser,
    variables: { id: userId ?? "" },
  });

  // Use currentUser if the user is viewing their own profile. This is because
  // the data of currentUser is updated in real-time when the user updates their
  // profile. This is not the case for other users' profiles.
  const user = isCurrentUser ? currentUser : apiUser;
  const initials = createInitials(user?.firstName, user?.lastName);

  const { followerInfo } = useFollowerInfo(
    { userId: user?.id ?? "" },
    {
      skip: !user,
    },
  );

  const [createFollow, { loading: createFollowLoading }] = useCreateFollow(
    { currentUserId: currentUser?.id ?? "" },
    {
      onError: () => {
        toast.error("Failed to follow user");
      },
    },
  );
  const [deleteFollow, { loading: deleteFollowLoading }] = useDeleteFollow(
    { currentUserId: currentUser?.id ?? "" },
    {
      onError: () => {
        toast.error("Failed to unfollow user");
      },
    },
  );

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <LoadingPageSpinner />;

  if (!user) {
    return <p className="flex justify-center text-2xl mt-6">User not found</p>;
  }

  return (
    <>
      <EditProfileModal
        open={editProfileIsOpen}
        onOpenChange={setEditProfileIsOpen}
      />
      <div className="max-w-screen-lg w-[90vw] mx-auto mt-8 md:mt-16 rounded-lg overflow-hidden">
        <div className="w-full bg-brand-2 h-32 md:h-56" />
        <div className="bg-brand-3 relative flex flex-col px-6 md:px-12 pb-6 md:pb-12">
          <div className="absolute top-3 right-3 sm:top-5 sm:right-5 flex flex-row gap-3 z-10">
            {isCurrentUser && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setEditProfileIsOpen(true)}
              >
                Edit profile
              </Button>
            )}
            {currentUser &&
              (followerInfo?.currentUserIsFollowing ? (
                <LoadingButton
                  size="sm"
                  variant="secondary"
                  isLoading={deleteFollowLoading}
                  onClick={() =>
                    deleteFollow({ variables: { userId: user.id } })
                  }
                >
                  Unfollow
                </LoadingButton>
              ) : (
                <LoadingButton
                  size="sm"
                  variant="primary"
                  isLoading={createFollowLoading}
                  onClick={() =>
                    createFollow({ variables: { userId: user.id } })
                  }
                >
                  Follow
                </LoadingButton>
              ))}
          </div>
          <div className="flex gap-2 sm:gap-8 flex-row items-center w-full -translate-y-1/2 absolute top-0 left-0 px-3 md:px-8">
            {isCurrentUser ? (
              <EditableAvatar
                src={user?.avatarUrl ?? undefined}
                fallback={initials}
                size="4xl"
                className="p-1 bg-brand-3"
                onClick={() => setEditProfileIsOpen(true)}
              />
            ) : (
              <div className="p-1 bg-brand-3 rounded-full">
                <Avatar
                  src={user?.avatarUrl ?? undefined}
                  fallback={initials}
                  size="4xl"
                />
              </div>
            )}
            <div className="flex flex-row gap-4 mt-20 sm:mt-16">
              <div className="hidden sm:flex gap-x-4 gap-y-1 flex-row text-sm sm:text-base">
                {followerInfo && (
                  <>
                    <p>
                      <span className="font-bold text-brand-11 mr-2">
                        {followerInfo.followerCount}
                      </span>
                      Followers
                    </p>
                    <p>
                      <span className="font-bold text-brand-11 mr-2">
                        {followerInfo.followingCount}
                      </span>
                      Followings
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="pt-16 md:pt-28 flex flex-col gap-2">
            <div className="flex sm:hidden gap-x-2 gap-y-1 flex-row text-sm sm:text-base">
              {followerInfo && (
                <>
                  <p>
                    <span className="font-bold text-brand-11 mr-2">1.25K</span>
                    Followers
                  </p>
                  <p>
                    <span className="font-bold text-brand-11 mr-2">455</span>
                    Followings
                  </p>
                </>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold flex flex-row gap-1 md:gap-3 items-center">
              {user?.firstName} {user?.lastName}{" "}
              <span>
                <Icon
                  icon="solar:verified-check-bold"
                  className="text-blue-9"
                />
              </span>
            </h1>
            <p className="mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem deserunt officiis, dolores ab vitae aut quo omnis
              minima quam reprehenderit mollitia nostrum dignissimos dolorem!
              Odio, dolores? Voluptatum aperiam non debitis!
            </p>
          </div>
          <Separator
            orientation="horizontal"
            includeMargin={false}
            className="my-6"
          />
          <div className="flex flex-row gap-4">
            <Button asChild variant="secondary">
              <Link to={`/watchlist/${user?.id}`}>Check out Watchlist</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
