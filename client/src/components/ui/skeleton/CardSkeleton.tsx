import React from "react";

const CardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col w-full border rounded-lg p-4 space-y-4">
      {/* Image Skeleton */}
      <div className="relative h-36 w-full bg-gray-300 rounded-lg">
        <div className="absolute top-2 left-2 bg-gray-400 h-6 w-16 rounded-md"></div>
      </div>

      {/* Location & Rating Skeleton */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-10 bg-gray-300 rounded"></div>
        </div>
        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
      </div>

      {/* Date & Price Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
