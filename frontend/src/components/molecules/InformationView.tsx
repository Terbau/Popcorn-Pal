import { Link } from "react-router-dom";
import { PcWindow } from "@/components/molecules/PcWindow";
import { Button } from "../atoms/Button/Button";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface InformationViewProps extends ComponentProps<"div"> {
  title: string;
  text: string;
  buttonLink: string;
  reverse?: boolean;
}

export const InformationView = ({
  title,
  text,
  buttonLink,
  reverse = false,
  className,
  children,
  ...props
}: InformationViewProps) => {
  return (
    <div
      className={cn("relative w-full flex flex-col py-16 sm:py-20", className)}
      {...props}
      data-cy="information-view"
    >
      <div
        className={`max-w-screen-lg w-[90vw] flex gap-8 flex-col ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } items-center justify-between mx-auto`}
      >
        <div className="flex flex-col justify-start items-center text-center mb-4 md:mb-0">
          <h2
            className="text-2xl dark:text-white font-bold mb-4 mt-0"
            data-cy="information-view-title"
          >
            {title}
          </h2>
          <p className="text-lg dark:text-white text-purple-medium mb-4">
            {text}
          </p>
          <Button asChild>
            <Link
              className="hover:scale-105 transition duration-200"
              to={buttonLink}
            >
              Explore
            </Link>
          </Button>
        </div>

        <div
          className={`flex justify-center items-center ${
            reverse ? "md:pl-6" : "md:pr-6"
          }`}
        >
          <PcWindow>{children}</PcWindow>
        </div>
      </div>
    </div>
  );
};
