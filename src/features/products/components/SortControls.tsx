import React from "react";
import type { Filters } from "../types";
import Animate from "@/components/animate/Animate";

interface SortControlsProps {
  filters: Filters;
  totalProducts: number;
  onSortChange: (sort: string) => void;
}

const SortControls: React.FC<SortControlsProps> = ({
  filters,
  totalProducts,
  onSortChange,
}) => {
  return (
    <Animate animation="fadeIn" duration={0.5} className="mb-6">
      <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-gray-600 mb-3 sm:mb-0">
          نمایش {(filters.page - 1) * (filters.per_page || 12) + 1}-
          {Math.min(
            filters.page * (filters.per_page || 12),
            totalProducts || 0
          )}{" "}
          از {totalProducts || 0} محصول
        </div>
        <div>
          <select
            value={filters.sort || ""}
            onChange={(e) => onSortChange(e.target.value)}
            className="border border-gray-300 text-gray-600 p-2 rounded"
          >
            <option value="newest">جدیدترین</option>
            <option value="cheapest">ارزان‌ترین</option>
            <option value="most_expensive">گران‌ترین</option>
            <option value="popular">محبوب‌ترین</option>
          </select>
        </div>
      </div>
    </Animate>
  );
};

const SortControlsSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col sm:flex-row justify-between items-center animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded mb-3 sm:mb-0"></div>
      <div className="h-10 w-32 bg-gray-200 rounded"></div>
    </div>
  );
};

export { SortControls, SortControlsSkeleton };
