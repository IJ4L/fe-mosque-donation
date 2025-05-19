import React from "react";

const MutationItemSkeleton = () => {
  return (
    <div className="flex justify-between bg-gray-100 border-2 border-black-600 rounded-lg px-6 py-4 shadow-md mt-4 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-1/4"></div>
      <div className="h-5 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
};

export default MutationItemSkeleton;
