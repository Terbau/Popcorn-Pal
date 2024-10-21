import { Navbar } from "../organisms/Navbar";
import "@fontsource/playfair-display";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="w-full bg-primary min-h-screen flex flex-col font-roboto">
      <Navbar />
      <main className="mt-20 mb-16">
        <Outlet />
      </main>
      {/* Footer goes here */}
    </div>
  );
};
