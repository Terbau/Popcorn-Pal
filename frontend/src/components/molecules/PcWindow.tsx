import React from "react";

export const PcWindow: React.FC = () => {
  return (
    <div className="relative w-96 h-56 bg-black/70 rounded-lg border border-blue-500 shadow-lg">
      <div className="flex items-center px-4 py-2 bg-black/80 rounded-t-lg">
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-red-10 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-10 rounded-full"></span>
          <span className="w-3 h-3 bg-green-10 rounded-full"></span>
        </div>
      </div>

      <div className="p-4 text-gray-300"></div>
    </div>
  );
};
