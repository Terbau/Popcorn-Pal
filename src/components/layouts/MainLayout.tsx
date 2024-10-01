import type { ReactNode } from "react";

interface MainLayoutProps {
	children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="w-full bg-primary min-h-screen">
      <main className="">
        {children}
      </main>
    </div>
  )
};
