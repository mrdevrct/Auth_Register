import React from "react";

export default function ProductPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="w-full lg:w-[40%] max-w-[420px] flex flex-col-reverse md:flex-row gap-4 flex-shrink-0 mx-auto">
          <div className="flex flex-row lg:flex-col gap-2 w-20 flex-shrink-0">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-16 h-16 rounded-md bg-gray-200"
              ></div>
            ))}
          </div>
          <div className="w-full max-w-[400px] h-96 bg-gray-200 rounded-lg"></div>
        </div>
        {/* Info Section */}
        <div className="w-full lg:w-[60%] flex-grow">
          <div className="h-4 w-1/2 bg-gray-200 mb-4"></div>
          <div className="h-8 w-3/4 bg-gray-200 mb-4"></div>
          <div className="h-6 w-1/3 bg-gray-200 mb-6"></div>
          <div className="flex gap-4 mb-6">
            <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
            <div className="h-10 w-48 bg-gray-200 rounded-md"></div>
          </div>
          <div className="h-10 w-40 bg-gray-200 rounded-md mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
      {/* Description and Reviews */}
      <div className="mt-8 h-20 bg-gray-200 rounded-lg"></div>
      <div className="mt-8 h-40 bg-gray-200 rounded-lg"></div>
    </div>
  );
}
