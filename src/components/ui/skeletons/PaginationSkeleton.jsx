import React from "react";

const PaginationSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-0 md:gap-2 mb-6 animate-pulse">
      <div className="bg-gray-200 h-10 w-24 rounded-lg mt-4"></div>
      <div className="bg-gray-200 h-10 w-10 rounded-lg mt-4"></div>
      <div className="bg-gray-200 h-10 w-10 rounded-lg mt-4"></div>
      <div className="bg-gray-200 h-10 w-10 rounded-lg mt-4"></div>
      <div className="bg-gray-200 h-10 w-24 rounded-lg mt-4"></div>
    </div>
  );
};

export default PaginationSkeleton;
