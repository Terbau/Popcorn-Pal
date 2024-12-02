import { Navbar } from "../organisms/Navbar";
import "@fontsource/playfair-display";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../lib/context/authContext";
import { useCallback, useEffect } from "react";
import { Footer } from "../molecules/Footer";
import { Bounce, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import type { GetCurrentUserQuery } from "@/lib/graphql/generated/graphql";

export const Layout = () => {
  const { currentUser, setCurrentUser, session } = useAuth();

  const { refetch } = useCurrentUser({
    skip: !!session && !!currentUser,
    onCompleted: (data) => {
      handleSetCurrentUser(data);
    },
  });

  const handleSetCurrentUser = useCallback(
    (data: GetCurrentUserQuery) => {
      if (!data.getUser) {
        return;
      }

      setCurrentUser(data.getUser);
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
      <main className="mb-16 flex-grow">
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
