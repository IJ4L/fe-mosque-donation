import React from "react";

const DonationItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white mb-4 animate-pulse">
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-5 bg-gray-200 rounded w-1/6"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex justify-between items-center mt-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded-full w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default DonationItemSkeleton;
