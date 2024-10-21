import type { ReactNode } from "react";
import clsx from "clsx";
import { Navbar } from "../organisms/Navbar";
import "@fontsource/playfair-display";

interface MainLayoutProps {
  limitWidth?: boolean;
  includePadding?: boolean;
  children: ReactNode;
}

export const MainLayout = ({
  limitWidth = true,
  includePadding = true,
  children,
}: MainLayoutProps) => {
  return (
    <div className="w-full bg-primary min-h-screen flex flex-col font-roboto">
      <Navbar />
      <main
        className={clsx(
          { "max-w-screen-lg mx-auto mt-32 mb-16": limitWidth },
          { "px-6": includePadding },
        )}
      >
        {children}
      </main>
      {/* Footer goes here */}
    </div>
  );
};
