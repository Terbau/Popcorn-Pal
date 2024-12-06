import { Link } from "react-router-dom";
import { PcWindow } from "@/components/molecules/PcWindow";
import { Button } from "../atoms/Button/Button";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/classUtils";

interface InformationViewProps extends ComponentProps<"section"> {
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
    <section
      className={cn("relative flex flex-col py-16 sm:py-20", className)}
      {...props}
      data-cy="information-view"
    >
      <div
        className={`gap-8 items-center md:items-center flex flex-col max-w-screen-lg w-[90vw] ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row "
        } mx-auto`}
      >
        <div className="flex flex-col justify-start items-center text-center mb-4 md:mb-0 w-[90%]">
          <h2
            className="text-2xl dark:text-white font-bold mb-4 mt-0"
            data-cy="information-view-title"
          >
            {title}
          </h2>
          <p className="text-lg dark:text-white text-purple-medium mb-4">
            {text}
          </p>
          <Button asChild aria-label={`Explore ${title}`}>
            <Link
              className="hover:scale-105 transition duration-200"
              to={buttonLink}
            >
              Explore
            </Link>
          </Button>
        </div>

        <PcWindow className="mx-auto scale-75 sm:scale-100 h-64 w-[24rem] sm:w-[32rem] lg:w-[50rem]">
          {children}
        </PcWindow>
      </div>
    </section>
  );
};
