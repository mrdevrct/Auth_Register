// components/pagination/Pagination.tsx
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages < 1 || currentPage < 1) return null;

  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center gap-1 rounded-lg p-2">
        {/* Previous Page Button */}
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`w-8 h-8 md:w-10 md:h-10 text-sm md:text-base bg-white hover:bg-gray-100 text-gray-600 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </Button>

        {/* Page Numbers */}
        <div className="flex gap-1">
          {currentPage > 3 && totalPages > 5 && (
            <>
              <Button
                onClick={() => onPageChange(1)}
                className="w-8 h-8 md:w-10 md:h-10 text-sm md:text-base p-0 bg-white hover:bg-gray-100 text-gray-600"
              >
                1
              </Button>
              <span className="flex items-center px-1 text-xs md:text-sm text-gray-400">
                ...
              </span>
            </>
          )}

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <Button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 md:w-10 md:h-10 text-sm md:text-base p-0 ${
                  currentPage === pageNum
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-white hover:bg-gray-100 text-gray-600"
                }`}
              >
                {pageNum}
              </Button>
            );
          })}

          {currentPage < totalPages - 2 && totalPages > 5 && (
            <>
              <span className="flex items-center px-1 text-xs md:text-sm text-gray-400">
                ...
              </span>
              <Button
                onClick={() => onPageChange(totalPages)}
                className="w-8 h-8 md:w-10 md:h-10 text-sm md:text-base p-0 bg-white hover:bg-gray-100 text-gray-600"
              >
                {totalPages}
              </Button>
            </>
          )}
        </div>

        {/* Next Page Button */}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`w-8 h-8 md:w-10 md:h-10 text-sm md:text-base bg-white hover:bg-gray-100 text-gray-600 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </div>
    </div>
  );
}
