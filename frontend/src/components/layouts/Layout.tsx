import { Navbar } from "../organisms/Navbar";
import "@fontsource/playfair-display";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../lib/context/authContext";
import { useCallback, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import type { Query } from "../../__generated__/types";
import { Footer } from "../molecules/Footer";
import { Bounce, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getUser {
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

export const constructUser = (data: Query["getUser"]) => {
  return {
    id: data?.id ?? "",
    email: data?.email ?? "",
    firstName: data?.firstName ?? "",
    lastName: data?.lastName ?? "",
    avatarUrl: data?.avatarUrl ?? "",
    createdAt: new Date(data?.createdAt ?? 0),
    updatedAt: new Date(data?.updatedAt ?? 0),
  };
};

export const Layout = () => {
  const { currentUser, setCurrentUser, session } = useAuth();

  const { refetch } = useQuery<Pick<Query, "getUser">>(GET_CURRENT_USER, {
    skip: !!session && !!currentUser,
    onCompleted: (data) => {
      handleSetCurrentUser(data);
    },
  });

  const handleSetCurrentUser = useCallback(
    (data: Pick<Query, "getUser">) => {
      if (!data.getUser) {
        return;
      }

      setCurrentUser({
        id: data.getUser.id,
        email: data.getUser.email ?? "",
        firstName: data.getUser.firstName ?? "",
        lastName: data.getUser.lastName ?? "",
        avatarUrl: data.getUser.avatarUrl ?? "",
        createdAt: new Date(data.getUser.createdAt ?? 0),
        updatedAt: new Date(data.getUser.updatedAt ?? 0),
      });
    },
    [setCurrentUser],
  );

  useEffect(() => {
    if (session && !currentUser) {
      refetch().then((data) => {
        handleSetCurrentUser(data.data);
      });
    } else if (!session) {
      setCurrentUser(undefined);
    }
  }, [session, currentUser, setCurrentUser, refetch, handleSetCurrentUser]);

  return (
    <div className="w-full bg-primary min-h-screen flex flex-col font-roboto">
      <Navbar />
      <main className="mt-20 mb-16 flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};
