import React from "react";

const NewsItemSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row space mb-4 space-y-2 md:space-y-0 md:space-x-4 animate-pulse">
      <div className="md:w-1/2 w-full h-40 md:h-60 rounded-lg bg-gray-200"></div>
      <div className="w-full flex items-center justify-between gap-6 bg-gray-100 rounded-lg py-4 px-6">
        <div className="w-full">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="size-12 bg-gray-200 rounded-lg"></div>
          <div className="size-12 bg-gray-200 rounded-lg"></div>
          <div className="size-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default NewsItemSkeleton;
