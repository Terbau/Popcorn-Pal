import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import type { Query } from "../__generated__/types";
import { useAuth } from "../lib/context/authContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { EditableAvatar } from "../components/molecules/Avatar/EditableAvatar";
import { Button } from "../components/atoms/Button/Button";
import { createInitials } from "../lib/utils";
import { EditProfileModal } from "../components/organisms/EditProfileModal";
import { useState } from "react";
import { LoadingPageSpinner } from "../components/atoms/Spinner/LoadingPageSpinner";

const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      firstName
      lastName
      avatarUrl
      createdAt
      updatedAt
    }
  }
`;

export default function ProfilePage() {
  const { userId } = useParams();
  const { currentUser } = useAuth();

  const [editProfileIsOpen, setEditProfileIsOpen] = useState(false);

  const isCurrentUser = userId === currentUser?.id;

  const { data, loading, error } = useQuery<Pick<Query, "getUser">>(
    GET_USER_QUERY,
    { skip: !userId || isCurrentUser, variables: { id: userId } },
  );

  // Use currentUser if the user is viewing their own profile. This is because
  // the data of currentUser is updated in real-time when the user updates their
  // profile. This is not the case for other users' profiles.
  const user = isCurrentUser ? currentUser : data?.getUser;

  if (error) return <p>Error: {error.message}</p>;
  if (loading || !currentUser) return <LoadingPageSpinner />;

  if (!user) {
    return (
      <p className="flex justify-center text-2xl mt-6">User not found</p>
    )
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
          <div className="flex gap-2 sm:gap-8 flex-row items-center w-full -translate-y-1/2 absolute top-0 left-0 px-3 md:px-8">
            <EditableAvatar
              src={user?.avatarUrl ?? undefined}
              fallback={createInitials(user?.firstName, user?.lastName)}
              size="4xl"
              className="p-1 bg-brand-3"
              onClick={() => setEditProfileIsOpen(true)}
            />
            <div className="flex flex-row gap-4 mt-20 sm:mt-16">
              <div className="hidden sm:flex gap-x-4 gap-y-1 flex-row text-sm sm:text-base">
                <p>
                  <span className="font-bold text-brand-11 mr-2">1.25K</span>
                  Followers
                </p>
                <p>
                  <span className="font-bold text-brand-11 mr-2">455</span>
                  Followings
                </p>
              </div>
            </div>
          </div>
          <div className="pt-16 md:pt-28 flex flex-col gap-2">
            <div className="flex sm:hidden gap-x-2 gap-y-1 flex-row text-sm sm:text-base">
              <p>
                <span className="font-bold text-brand-11 mr-2">1.25K</span>
                Followers
              </p>
              <p>
                <span className="font-bold text-brand-11 mr-2">455</span>
                Followings
              </p>
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
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-3 right-3 sm:top-5 sm:right-5"
            onClick={() => setEditProfileIsOpen(true)}
          >
            Edit profile
          </Button>
        </div>
      </div>
    </>
  );
}
