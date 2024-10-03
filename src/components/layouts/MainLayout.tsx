import type { ReactNode } from "react";
import clsx from "clsx";

interface MainLayoutProps {
	limitWidth?: boolean;
	children: ReactNode;
}

export const MainLayout = ({
	limitWidth = true,
	children,
}: MainLayoutProps) => {
	return (
		<div className="w-full bg-primary min-h-screen flex flex-col px-6">
			{/* Navbar goes here */}
			<main className={clsx({ "max-w-screen-lg mx-auto my-16": limitWidth })}>
				{children}
			</main>
			{/* Footer goes here */}
		</div>
	);
};
