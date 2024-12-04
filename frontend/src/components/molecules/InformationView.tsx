import React from "react";
import { Link } from "react-router-dom";
import { PcWindow } from "@/components/molecules/PcWindow";

interface InformationViewProps {
  title: string;
  text: string;
  buttonLink: string;
  reverse?: boolean;
}

export const InformationView: React.FC<InformationViewProps> = ({
  title,
  text,
  buttonLink,
  reverse = false,
}) => {
  return (
    <div className="relative w-full flex flex-col p-16">
      <div
        className={`w-full flex gap-8 flex-col md:flex-row ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } items-stretch`}
      >
        <div className="w-full md:w-1/2 flex flex-col justify-start items-center text-center mb-4 md:mb-0">
          <h2 className="text-2xl text-white font-bold mb-4 mt-0">{title}</h2>
          <p className="text-lg text-white mb-4">{text}</p>
          <Link
            className="flex items-center space-x-4 md:space-x-6 cursor-pointer hover:scale-105 transition duration-200 mt-auto"
            to={buttonLink}
          >
            <button className="px-4 py-2 bg-brand-9 text-white rounded hover:bg-blue-600 mb-6 md:mb-0">
              Explore
            </button>
          </Link>
        </div>

        <div
          className={`w-full md:w-1/2 flex justify-center items-center ${
            reverse ? "md:pl-6" : "md:pr-6"
          }`}
        >
          <PcWindow />
        </div>
      </div>
    </div>
  );
};
