import React from "react";
import { Button } from "../ui/button";

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
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        قبلی
      </Button>
      <span className="text-sm text-gray-600">
        صفحه {currentPage} از {totalPages}
      </span>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        بعدی
      </Button>
    </div>
  );
}
