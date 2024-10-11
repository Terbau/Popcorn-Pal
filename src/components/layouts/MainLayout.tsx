import type { ReactNode } from "react";
import clsx from "clsx";
import { Navbar } from "../organisms/Navbar";
import "@fontsource/playfair-display";

interface MainLayoutProps {
  limitWidth?: boolean;
  children: ReactNode;
}

export const MainLayout = ({
  limitWidth = true,
  children,
}: MainLayoutProps) => {
  return (
    <div className="w-full bg-primary min-h-screen flex flex-col font-roboto">
      <Navbar />
      <main
        className={clsx(
          { "max-w-screen-xl mx-auto mt-32 mb-16": limitWidth },
          "px-6"
        )}
      >
        {children}
      </main>
      {/* Footer goes here */}
    </div>
  );
};
