import React from "react";

interface ImagePlaceholderIconProps {
  className?: string;
}

const ImagePlaceholderIcon: React.FC<ImagePlaceholderIconProps> = ({
  className,
}) => {
  return (
    <svg
      className={className}
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
  );
};

export default ImagePlaceholderIcon;
