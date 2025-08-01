import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useProductImage } from "../hooks/useProductImage";

interface ProductImageSectionProps {
  images: (string | null | false)[];
  productName: string;
}

export function ProductImageSection({
  images,
  productName,
}: ProductImageSectionProps) {
  const validImages = images.filter((img): img is string => !!img);
  const { currentImageIndex, nextImage, prevImage, selectImage } =
    useProductImage(validImages);

  const hasImages = validImages.length > 0;

  return (
    <div className="w-full lg:w-[40%] max-w-[420px] flex flex-col-reverse md:flex-row gap-4 flex-shrink-0 mx-auto">
      {/* Thumbnails */}
      {hasImages && (
        <div className="flex flex-col gap-2 w-20 flex-shrink-0">
          {validImages.map((img, index) => (
            <div
              key={index}
              className={`relative w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 flex-shrink-0 ${
                currentImageIndex === index
                  ? "border-blue-500"
                  : "border-gray-200"
              }`}
              onClick={() => selectImage(index)}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="relative w-full max-w-[400px] h-96 bg-white rounded-lg overflow-hidden">
        {hasImages ? (
          <>
            <img
              src={validImages[currentImageIndex]}
              alt={productName}
              className="object-contain w-full h-full"
            />
            {validImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
                >
                  <FaChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
                >
                  <FaChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-white rounded-md flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h18v18H3V3zm6 6h6m-3-3v6"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
