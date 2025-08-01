import React from "react";

const CartItemSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center gap-4 mb-4 animate-pulse">
      <div className="w-full sm:w-24 h-24 bg-gray-200 rounded-md flex-shrink-0"></div>
      <div className="flex-grow flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col w-full sm:w-auto">
          <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto sm:mr-0 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto sm:mr-0 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto sm:mr-0"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-10 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
